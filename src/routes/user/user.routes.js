import { Router } from 'express';
const router = Router();
// const passport=require('passport')
import { UploadFile } from '../../middlewares/multer.middleware.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import {registerUser,loginUser,logoutUser,verifyEmail,resendEmailVerification,getCurrentUser,getAllUserByAdmin,deleteUserByAdmin,editCurrentUser,handleSocialLogin,refreshAccessToken,verifyEmailFogotPassword,forgotPasswordRequest,changePassword,addMemberByAdmin} from '../../controllers/user/user.controllers.js'



// Unsecured route
router.route("/register").post( UploadFile.fields([{ name: 'avatar', maxCount: 1 }]),registerUser);
router.route("/login").post( loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email").get(verifyEmail);
router.route("/resend-email-verification").post(resendEmailVerification);
router.route("/forgot-password").post(forgotPasswordRequest);
router.route("/verify-otp").post(verifyEmailFogotPassword);
router.route("/change-password").patch(changePassword)

// // Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/").patch(verifyJWT,UploadFile.fields([{ name: 'avatar', maxCount: 1 }]), editCurrentUser);
router.route("/remove").delete(verifyJWT, verifyPermission,deleteUserByAdmin);
router.route("/").get(verifyJWT, getCurrentUser);
router.route("/list").get(verifyJWT,verifyPermission, getAllUserByAdmin);
router.route('/member').post(verifyJWT,verifyPermission,addMemberByAdmin)

// // // SSO routes
// router.route("/google").get(passport.authenticate("google", {scope: ["profile", "email"],}),
//   (req, res) => {
//     res.send("redirecting to google...");
//   }
// );

// router.route("/google/callback").get(passport.authenticate("google"), handleSocialLogin);

export default router
