import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import env from '../../env.js'

export const isPasswordCorrect = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};
export const hashedPassword = async function (password) {
    return await bcrypt.hash(password, env.SALT_ROUND);
};
export const generateAccessToken = function (user) {
    return jwt.sign(
        {
            user_id: user._id,
            email: user.email,
            role: user.role,
            iat: Date.now() / 1000
        },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TOKEN_EXPIRY }
    );
};

export const generateRefreshToken = function (user) {
    return jwt.sign(
        {
            user_id: user._id,
        },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: env.REFRESH_TOKEN_EXPIRY }
    );
};


export const generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");
    const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

    return { unHashedToken, hashedToken, tokenExpiry };
};

export const createOTP=()=>{
    return Math.floor(1000+Math.random()*9000)
};