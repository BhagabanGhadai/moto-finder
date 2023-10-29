import { Router } from 'express';
const router = Router();
import { validate } from '../../validator/validate.js';
import { UploadFile } from '../../middlewares/multer.middleware.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import { addBlog,getSpecificBlog,getAllBlog,deleteSpecificBlog,addInstagramPlacement,getAllInstagramData,deleteSpecificInstagramPlacement,addYoutubePlacement,getAllYoutubeData,deleteSpecificYoutubePlacement} from '../../controllers/socials/mmf_social.controller.js'
import {create_blog,get_single_blog,delete_blog,create_instagram,get_single_instagram,delete_instagram,create_youtube,get_single_youtube,delete_youtube} from '../../validator/socials/social.validation.js'

router.route("/blog").post(verifyJWT,verifyPermission,validate(create_blog),UploadFile.fields([{ name: 'blog_banner', maxCount: 1} ,{name:'blog_video',maxCount:1}]),addBlog)
router.route("/blog").get(validate(get_single_blog),getSpecificBlog)
router.route("/blog/all").get(getAllBlog)
router.route("/blog").delete(validate(delete_blog),deleteSpecificBlog)

router.route("/reels").post(verifyJWT,verifyPermission,validate(create_instagram),UploadFile.fields([{ name: 'instagram_banner', maxCount: 1} ,{name:'instagram_video',maxCount:1}]),addInstagramPlacement)
router.route("/reels").get(getAllInstagramData)
router.route("/reels").delete(validate(delete_instagram),deleteSpecificInstagramPlacement)

router.route("/youtube").post(verifyJWT,verifyPermission,validate(create_youtube),UploadFile.fields([{ name: 'youtube_banner', maxCount: 1} ,{name:'youtube_video',maxCount:1}]),addYoutubePlacement)
router.route("/youtube").get(getAllYoutubeData)
router.route("/youtube").delete(validate(delete_youtube),deleteSpecificYoutubePlacement)

export default router
