import { Router } from 'express';
const router = Router();
import { validate } from '../../validator/validate.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import { addContactRequest,deleteContactRequest,updateContactRequest,getAllContactRequest} from '../../controllers/contact-request/contact_request.controller.js'
import { create_request,update_request,delete_request} from '../../validator/contact-request/contact-request.validation.js'

router.route("/").post(validate(create_request),addContactRequest)
router.route("/all").get(verifyJWT,verifyPermission,getAllContactRequest)
router.route("/").patch(verifyJWT,verifyPermission,validate(update_request),updateContactRequest)
router.route("/").delete(verifyJWT,verifyPermission,validate(delete_request),deleteContactRequest)

export default router
