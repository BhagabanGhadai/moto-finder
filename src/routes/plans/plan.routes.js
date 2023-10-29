import { Router } from 'express';
const router = Router();
import {validate} from '../../validator/validate.js'
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import { addAPlan,getAPlan,getAllPlans,updateAPlan,deleteAPlan} from '../../controllers/plans/plans.controller.js'
import { create_plan,get_single_plan,update_plan,delete_plan} from '../../validator/plans/plans.validator.js'

router.route("/").post(verifyJWT,verifyPermission,validate(create_plan),addAPlan)
router.route("/").get(validate(get_single_plan),getAPlan)
router.route("/all").get(getAllPlans)
router.route("/").patch(verifyJWT,verifyPermission,validate(update_plan),updateAPlan)
router.route("/").delete(verifyJWT,verifyPermission,validate(delete_plan),deleteAPlan)

export default router
