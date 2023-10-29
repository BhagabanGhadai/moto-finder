import { Router } from 'express';
const router = Router();
// const passport=require('passport')
import { validate } from '../../validator/validate.js';
import { UploadFile } from '../../middlewares/multer.middleware.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import {registerUser,loginUser,logoutUser,verifyEmail,resendEmailVerification,getCurrentUser,getAllUserByAdmin,deleteUserByAdmin,editCurrentUser,handleSocialLogin,refreshAccessToken,verifyEmailFogotPassword,forgotPasswordRequest,changePassword,addMemberByAdmin} from '../../controllers/user/user.controllers.js'
import { register,login,logout,refreshTokens,verify_email,resend_email_verification,forgotPassword,verifyEmailFogotPasswordOTP,change_password,updateUser,deleteUser,getSingleUser,getUsers,createMember } from '../../validator/user/user.validator.js'

// Unsecured route
router.route("/register").post(validate(register), UploadFile.fields([{ name: 'avatar', maxCount: 1 }]),registerUser);
router.route("/login").post(validate(login), loginUser);
router.route("/refresh-token").post(validate(refreshTokens),refreshAccessToken);
router.route("/verify-email").get(validate(verify_email),verifyEmail);
router.route("/resend-email-verification").post(validate(resend_email_verification),resendEmailVerification);
router.route("/forgot-password").post(validate(forgotPassword),forgotPasswordRequest);
router.route("/verify-otp").post(validate(verifyEmailFogotPasswordOTP),verifyEmailFogotPassword);
router.route("/change-password").patch(validate(change_password),changePassword)

// // Secured routes
router.route("/logout").post(verifyJWT,validate(logout), logoutUser);
router.route("/").patch(verifyJWT,validate(updateUser),UploadFile.fields([{ name: 'avatar', maxCount: 1 }]), editCurrentUser);
router.route("/remove").delete(verifyJWT,validate(deleteUser), verifyPermission,deleteUserByAdmin);
router.route("/").get(verifyJWT,validate(getSingleUser), getCurrentUser);
router.route("/list").get(verifyJWT,verifyPermission,validate(getUsers), getAllUserByAdmin);
router.route('/member').post(verifyJWT,verifyPermission,validate(createMember),addMemberByAdmin)

// // // SSO routes
// router.route("/google").get(passport.authenticate("google", {scope: ["profile", "email"],}),
//   (req, res) => {
//     res.send("redirecting to google...");
//   }
// );

// router.route("/google/callback").get(passport.authenticate("google"), handleSocialLogin);

export default router
