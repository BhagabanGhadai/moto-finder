import { Router } from 'express';
const router = Router();
import { validate } from '../../validator/validate.js';
import { UploadFile } from '../../middlewares/multer.middleware.js';
import { verifyJWT,verifyPermission } from '../../middlewares/auth.middleware.js';
import { addACarBrand,getSpecificCarBrand,getAllCarBrand,updateSpecificCarBrand,deleteSpecificCarBrand} from '../../controllers/car/car_brand.controller.js'
import { addACarModel,getSpecificCarModel,getAllCarModel,updateSpecificCarModel,deleteSpecificCarModel} from '../../controllers/car/car_model.controller.js'
import { addACarVariant,getSpecificCarVariant,getAllCarVariant,updateSpecificCarVariant,deleteSpecificCarVariant} from '../../controllers/car/car_variant.controller.js'
import { addRtoLocation,getSpecificRtoLocation,getAllRtoLocation,updateSpecificLocation,deleteSpecificLocation} from '../../controllers/car/rto_location.controller.js'
import {addACar,getSpecificCar,getAllCar,updateSpecificCar,deleteSpecificCar,countViews,addAndRemoveToWishList,getUserWishlist,addCarToUserWatchHistory,getUserWatchlistAdmin,getCarDetailsPublic,getCarOwnerInformation} from '../../controllers/car/car.controller.js'
import { add_car_brand,get_all_car_brand,get_single_car,update_car_brand,delete_car_brand} from '../../validator/car/car_brand.validation.js'
import { add_car_model,get_all_car_model,get_single_model,update_car_model,delete_car_model} from '../../validator/car/car_model.validation.js'
import { add_car_variant,get_all_car_variant,get_single_variant,update_car_variant,delete_car_variant} from '../../validator/car/car_variant.validation.js'
import { add_watch_hostory,get_watch_hostory} from '../../validator/car/car_watch_histroy.validation.js'
import { add_wishlist,get_wishlist} from '../../validator/car/car_wishlist.validation.js'

router.route("/brand").post( verifyJWT,verifyPermission,validate(add_car_brand),UploadFile.fields([{ name: 'car_brand_image', maxCount: 1 }]),addACarBrand);
router.route("/brand").get(verifyJWT,validate(get_single_car),getSpecificCarBrand)
router.route("/brand/all").get(validate(get_all_car_brand),getAllCarBrand)
router.route("/brand").patch(verifyJWT,verifyPermission,validate(update_car_brand),UploadFile.fields([{ name: 'car_brand_image', maxCount: 1 }]),updateSpecificCarBrand)
router.route("/brand").delete(verifyJWT,verifyPermission,validate(delete_car_brand),deleteSpecificCarBrand)

router.route("/model").post( verifyJWT,verifyPermission,validate(add_car_model),addACarModel);
router.route("/model").get(verifyJWT,validate(get_single_model),getSpecificCarModel)
router.route("/model/all").get(validate(get_all_car_model),getAllCarModel)
router.route("/model").patch(verifyJWT,verifyPermission,validate(update_car_model),updateSpecificCarModel)
router.route("/model").delete(verifyJWT,verifyPermission,validate(delete_car_model),deleteSpecificCarModel)

router.route("/variant").post( verifyJWT,verifyPermission,validate(add_car_variant),addACarVariant);
router.route("/variant").get(verifyJWT,validate(get_single_variant),getSpecificCarVariant)
router.route("/variant/all").get(validate(get_all_car_variant),getAllCarVariant)
router.route("/variant").patch(verifyJWT,verifyPermission,validate(update_car_variant),updateSpecificCarVariant)
router.route("/variant").delete(verifyJWT,verifyPermission,validate(delete_car_variant),deleteSpecificCarVariant)

router.route("/rto").post( verifyJWT,verifyPermission,UploadFile.fields([{ name: 'city_image', maxCount: 1 }]),addRtoLocation);
router.route("/rto").get(verifyJWT,getSpecificRtoLocation)
router.route("/rto/all").get(getAllRtoLocation)
router.route("/rto").patch(verifyJWT,verifyPermission,UploadFile.fields([{ name: 'city_image', maxCount: 1 }]),updateSpecificLocation)
router.route("/rto").delete(verifyJWT,verifyPermission,deleteSpecificLocation)

router.route("/").post( verifyJWT,UploadFile.fields([{name:'car_banner',maxCount:1},{ name: 'rc_photos', maxCount: 1 },{ name: 'exterior_photos', maxCount: 1 },{ name: 'interior_photos', maxCount: 1 },{ name: 'engine_photos', maxCount: 1 },{ name: 'tyre_photos', maxCount: 1 },{ name: 'dent_photos', maxCount: 1 }]),addACar);
router.route("/admin").get(verifyJWT,verifyPermission,getSpecificCar)
router.route("/public").get(verifyJWT,getCarDetailsPublic)
router.route("/contact-details").get(verifyJWT,getCarOwnerInformation)
router.route("/all").get(getAllCar)
router.route("/").patch(verifyJWT,UploadFile.fields([{name:'car_banner',maxCount:1},{ name: 'rc_photos', maxCount: 1 },{ name: 'exterior_photos', maxCount: 1 },{ name: 'interior_photos', maxCount: 1 },{ name: 'engine_photos', maxCount: 1 },{ name: 'tyre_photos', maxCount: 1 },{ name: 'dent_photos', maxCount: 1 }]),updateSpecificCar)
router.route("/").delete(verifyJWT,deleteSpecificCar)
router.route('/count').get(countViews)
router.route('/fav').post(verifyJWT,validate(add_wishlist),addAndRemoveToWishList)
router.route('/fav').get(verifyJWT,validate(get_wishlist),getUserWishlist)
router.route('/watch').post(verifyJWT,validate(add_watch_hostory),addCarToUserWatchHistory)
router.route('/admin/watch').get(verifyJWT,verifyPermission,validate(get_watch_hostory),getUserWatchlistAdmin)

export default router
