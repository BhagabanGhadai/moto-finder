import { Router } from 'express';
const router = Router();
import { UploadFile } from '../../middlewares/multer.middleware.js';
import { validate } from '../../validator/validate.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import { addTestimonialAdmin,getAllTestimonial,deleteSpecificTestimonial} from '../../controllers/testimonial/testimonial.controller.js'
import { create_testimonial,get_testimonial,delete_testimonial} from '../../validator/testimonial/testimonial.validator.js'

router.route("/").post(verifyJWT,verifyPermission,validate(create_testimonial),UploadFile.fields([{ name: 'testimony_img', maxCount: 1} ,{name:'testimony_video',maxCount:1}]),addTestimonialAdmin)
router.route("/").get(validate(get_testimonial),getAllTestimonial)
router.route("/").delete(verifyJWT,verifyPermission,validate(delete_testimonial),deleteSpecificTestimonial)

export default router
