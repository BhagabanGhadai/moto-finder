import { Router } from 'express';
const router = Router();
import { validate } from '../../validator/validate.js'
import { UploadFile } from '../../middlewares/multer.middleware.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import {makeSellRequest,getSingleSellRequestDetails,getAllSellRequest,updateAsellRequest,deleteAsellRequest} from '../../controllers/car-sell-request/car_sell_req.controller.js'
import { create_sell_request,get_single_sell_request,get_sell_request,update_sell_request,delete_sell_request} from '../../validator/car-sell-request/car-sell-request.validation.js'

router.route('/').post(verifyJWT,validate(create_sell_request),makeSellRequest)
router.route('/').get(verifyJWT,validate(get_single_sell_request),getSingleSellRequestDetails)
router.route('/all').get(verifyJWT,validate(get_sell_request),getAllSellRequest)
router.route('/').patch(verifyJWT,validate(update_sell_request),updateAsellRequest)
router.route('/').delete(verifyJWT,validate(delete_sell_request),deleteAsellRequest)

export default router
