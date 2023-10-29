import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import User from '../../models/user/user.model.js';
import { isPasswordCorrect, hashedPassword, generateAccessToken, generateRefreshToken, createOTP } from "../../utils/helper.js";
import env from '../../../env.js';
import jwt from 'jsonwebtoken';
import blackListModel from '../../models/blacklisttoken.model.js';
import moment from 'moment';
import { UPLOAD_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js';
import { sendEmail } from '../../utils/nodeMailer.js'

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating the access token"
        );
    }
};

export const registerUser = asyncHandler(async (req, res) => {
    if (req.files && req.files["avatar"]) {
        const avatarFile = req.files.avatar
        let upload = await UPLOAD_IMAGE(avatarFile[0]);
        req.body.avatar = {
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }

    const existedUser = await User.findOne({ "email": req.body.email, isEmailVerified: true });

    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }
    const existedUserPhone = await User.findOne({ "phone": req.body.phone, isEmailVerified: true });

    if (existedUserPhone) {
        throw new ApiError(409, "User with Phone already exists");
    }
    req.body.password = await hashedPassword(req.body.password)
    const user = await User.create(req.body);

    user.emailVerificationOTP = createOTP();
    user.emailVerificationExpiry = moment(new Date()).add(2, 'minutes').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "OTP from Moto Finder",
        message: user.emailVerificationOTP
        // mailgenContent: emailVerificationMailgenContent(
        //     user.name,
        //     user.emailVerificationOTP
        // ),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationOTP -emailVerificationExpiry"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "Users registered successfully and verification email has been sent on your email."
            )
        );
})
export const loginUser = asyncHandler(async (req, res) => {

    if (!req.body.email) {
        throw new ApiError(400, "email is required");
    }
    if (!req.body.password) {
        throw new ApiError(400, "password is required");
    }
    const user = await User.findOne({ email: req.body.email, isEmailVerified: true });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    if (user.loginType !== "EMAIL_PASSWORD") {
        throw new ApiError(
            400,
            "You have previously registered using " +
            user.loginType?.toLowerCase() +
            ". Please use the " +
            user.loginType?.toLowerCase() +
            " login option to access your account."
        );
    }
    const isPasswordValid = await isPasswordCorrect(req.body.password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -emailVerificationOTP -emailVerificationExpiry -forgotPasswordExpiry -forgotPasswordOTP"
    );

    const options = {
        httpOnly: true,
        secure: env.NODE_ENV === "prod",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
})
export const logoutUser = asyncHandler(async (req, res) => {
    let refreshToken = req.body.refreshToken || req.cookies.refreshToken
    let accessToken = req.body.accessToken || req.cookies.accessToken
    blackListModel.create({ "refresh_token": refreshToken, "access_token": accessToken }).then(() => {
        const options = {
            httpOnly: true,
            secure: env.NODE_ENV === "prod",
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged out"));
    })

})
export const verifyEmail = asyncHandler(async (req, res) => {
    if (!req.query.user_id) {
        throw new ApiError(400, "UserId is missing");
    }

    let user_details = await User.findOne({ "_id": req.query.user_id, "isEmailVerified": false }).exec()

    if (!user_details) {
        throw new ApiError(404, 'no such user found or may be the user alreday verified')
    }

    let current_time = moment(new Date())
    let token_exp_time = moment(user_details.emailVerificationExpiry)

    if (current_time > token_exp_time) {
        throw new ApiError(400, 'OTP expired!!')
    }

    if (user_details.emailVerificationOTP != req.body.otp) {
        throw new ApiError(400, 'invalid OTP')
    }
    await User.findOneAndUpdate({ "_id": req.query.user_id }, { isEmailVerified: true, emailVerificationOTP: null, emailVerificationExpiry: null }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, { isEmailVerified: true }, "Email is verified"));
})
export const resendEmailVerification = asyncHandler(async (req, res) => {
    if (!req.query.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findById(req.query.user_id);

    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }

    if (user.isEmailVerified) {
        throw new ApiError(409, "Email is already verified!");
    }

    user.emailVerificationOTP = createOTP();
    user.emailVerificationExpiry = moment(new Date()).add(env.PASSWORD_EXPIRATION_MINUTES, 'minutes').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "OTP from Moto Finder",
        message: user.emailVerificationOTP
        // mailgenContent: emailVerificationMailgenContent(
        //     user.name,
        //     user.emailVerificationOTP
        // ),
    });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Mail has been sent to your mail ID"));
})
export const getCurrentUser = asyncHandler(async (req, res) => {
    if (!req.query.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.query.user_id }).select(
        "-role -password -loginType -isEmailVerified -emailVerificationExpiry -emailVerificationOTP -forgotPasswordExpiry -forgotPasswordOTP"
    )

    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current user fetched successfully"));
})
export const deleteUserByAdmin = asyncHandler(async (req, res) => {
    if (!req.query.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findById(req.query.user_id);

    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    await DELETE_IMAGE(user.avatar.public_id)
    await User.findByIdAndDelete(req.query.user_id)
    return res
        .status(204)
        .json(new ApiResponse(204, "user deletion successfully"));
})
export const editCurrentUser = asyncHandler(async (req, res) => {
    if (!req.query.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.query.user_id });

    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    if (req.body.password) {
        req.body.password = await hashedPassword(req.body.password)
    }
    if (req.body.email) {
        throw new ApiError(400, "email can't be updated");
    }
    if (req.body.phone) {
        const existedUserPhone = await User.findOne({ "phone": req.body.phone });

        if (existedUserPhone) {
            throw new ApiError(409, "User with Phone already exists", []);
        }
    }
    if (req.files && req.files["avatar"]) {
        if (user?.avatar?.public_id) {
            await DELETE_IMAGE(user.avatar.public_id)
        }
        let upload = await UPLOAD_IMAGE(req.files.avatar[0]);
        req.body.avatar = {
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    if (!req.body.is_active) {
        if (!(req.user.role == "admin" && user.role == "member")) {
            throw new ApiError(403, "You can't perform this action");
        }
    }
    const update_user = await User.findOneAndUpdate({ _id: req.query.user_id }, req.body, { new: true })
    return res
        .status(200)
        .json(new ApiResponse(200, update_user, "user update successfully"));
})
export const handleSocialLogin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?.user_id);

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
    };

    return res
        .status(301)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .redirect(
            `${env.CLIENT_SSO_REDIRECT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
        );
})
export const refreshAccessToken = asyncHandler(async (req, res) => {
    let incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }
    incomingRefreshToken = incomingRefreshToken.replace("Bearer ", "");

    const user = await blackListModel.findOne({ "refresh_token": incomingRefreshToken });
    if (user) {
        throw new ApiError(401, "refresh token is Blacklisted");
    }
    const decodedToken = jwt.verify(
        incomingRefreshToken,
        env.REFRESH_TOKEN_SECRET
    );
    if (!decodedToken) {
        throw new ApiError(401, "invalid token");
    }

    const options = {
        httpOnly: true,
        secure: env.NODE_ENV === "prod",
    };

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(decodedToken.user_id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                "Access token refreshed"
            )
        );
})
export const forgotPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email, isEmailVerified: true });

    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }

    user.forgotPasswordOTP = createOTP();
    user.forgotPasswordExpiry = moment(new Date()).add(env.PASSWORD_EXPIRATION_MINUTES, 'minutes').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    await user.save({ validateBeforeSave: false });
    await sendEmail({
        email: user?.email,
        subject: "OTP from Moto Finder for Password reset request",
        message: user.forgotPasswordOTP
        // mailgenContent: forgotPasswordMailgenContent(
        //     user.name,
        //     user.forgotPasswordOTP
        // ),
    });
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user._id,
                "Password reset mail has been sent on your mail id"
            )
        );
})
export const verifyEmailFogotPassword = asyncHandler(async (req, res) => {
    if (!req.query.user_id) {
        throw new ApiError(400, "UserId is missing");
    }

    let user_details = await User.findOne({ "_id": req.query.user_id, "isEmailVerified": true }).exec()

    if (!user_details) {
        throw new ApiError(404, 'no such user found or may be the user alreday verified')
    }

    let current_time = moment(new Date())
    let token_exp_time = moment(user_details.forgotPasswordExpiry)

    if (current_time > token_exp_time) {
        throw new ApiError(400, 'OTP expired!!')
    }

    if (user_details.forgotPasswordOTP != req.body.otp) {
        throw new ApiError(400, 'invalid OTP')
    }
    await User.findOneAndUpdate({ "_id": req.query.user_id }, { "$set": { isEmailVerified: true }, emailVerificationOTP: null, emailVerificationExpiry: null }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "otp verified successful"));
})
export const changePassword = asyncHandler(async (req, res) => {
    if (!req.query.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.query.user_id, isEmailVerified: true });

    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    if (req.body.password) {
        req.body.password = await hashedPassword(req.body.password)
    }
    const update_user = await User.findOneAndUpdate({ _id: req.query.user_id }, req.body, { new: true })
    return res
        .status(200)
        .json(new ApiResponse(200, "password changed successfully"));
})
export const getAllUserByAdmin = asyncHandler(async (req, res) => {
    let page = 1
    if (req.query.page) {
        page = parseInt(req.query.page)
    }

    let page_size = 10
    if (req.query.page_size) {
        page_size = parseInt(req.query.page_size)
    }
    let pipeline = [
        {
            $sort: { createdAt: -1 }
        },
        {
            $match: {
                isEmailVerified: true
            }
        }
    ]
    if (req.query.role) {
        pipeline.push({
            $match: {
                role: req.query.role
            }
        })
    } else {
        pipeline.push({
            $match: {
                role: "user"
            }
        })
    }
    if (req.query.search) {
        pipeline.push({
            $match: {
                "name": { $regex: '.*' + req.query.search + '.*', $options: 'i' }
            }
        })
    }
    pipeline.push(
        {
            "$lookup": {
                from: "car-watch-history",
                let:{
                    user_id:"$_id"
                },
                pipeline:[
                    {
                        $match:{$expr:{$eq:["$user_id","$$user_id"]}}
                    },
                    {
                        $lookup:{
                            from:"car-details",
                            let:{
                                car_id:"$car_id"
                            },
                            pipeline:[
                                {
                                    $match:{$expr:{$eq:["$_id","$$car_id"]}}
                                },
                                {
                                    $project:{"car_title":1,"_id":0}
                                }
                            ],
                            // localField:"car_id",
                            // foreignField:"_id",
                            as:"car_details"
                        }
                    },
                    {
                        $project:{"car_details":1,"createdAt":1,"_id":0}
                    }
                ],
                // localField: "_id",
                // foreignField: "user_id",
                as: "recently_watched"
            }
        },
        {
            $project:{
                "name":1,
                "email":1,
                "phone":1,
                "recently_watched":1,
                "createdAt":1
            }
        },
        { "$skip": (page - 1) * page_size },
        { "$limit": page_size })

    let user_list = await User.aggregate(pipeline)
    if (!user_list.length) {
        throw new ApiError(404, "user list not found")
    }
    return res.status(200).send(new ApiResponse(200, user_list, "user list fetched successful"))
})
export const addMemberByAdmin = asyncHandler(async (req, res) => {
    const existedUser = await User.findOne({ "email": req.body.email, isEmailVerified: true });
    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }
    req.body.password = await hashedPassword(req.body.password)
    req.body.isEmailVerified = true
    req.body.name = req.body.firstName + " " + req.body.lastName
    req.body.role = "member"
    await User.create(req.body);
    return res
        .status(201)
        .json(
            new ApiResponse(
                200, {},
                "Member Added successfully."
            )
        );
})