import { Router } from 'express';
const router = Router();
import { validate } from '../../validator/validate.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import { subscribeNewsletter,unSubscribeNewsletter,getAllSubscriber} from '../../controllers/newsletter/newsletter.controller.js'
import { subscribe,unsubscribe} from '../../validator/newsletter/newsletter.validation.js'
router.route("/subscriber").post(verifyJWT,verifyPermission,validate(subscribe),subscribeNewsletter)
router.route("/unsubscriber").post(verifyJWT,verifyPermission,validate(unsubscribe),unSubscribeNewsletter)
router.route("/all").get(verifyJWT,verifyPermission,getAllSubscriber)

export default router
