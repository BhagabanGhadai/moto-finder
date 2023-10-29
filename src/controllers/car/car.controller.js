import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import carModel from '../../models/car/car.model.js'
import { UPLOAD_IMAGE, UPLOAD_MULTIPLE_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js';
import carBrand from '../../models/car/car_brand.model.js'
import carVariant from '../../models/car/car_variant.model.js'
import carWishList from '../../models/car/car_wishlist.model.js'
import User from '../../models/user/user.model.js';
import carWatchHistory from '../../models/car/car_watch_history.model.js'
import payment from '../../models/payments/payment.model.js'
import mongoose from 'mongoose';
import slugify from 'slugify';
import moment from 'moment';

export const addACar = asyncHandler(async (req, res) => {
    let car_brand = null;
    let car_model = null;
    let car_variant = null;
    if (req.files && req.files["car_banner"]) {
        let upload = await UPLOAD_IMAGE(req.files.car_banner[0])
        req.body.car_banner = {
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    if (req.files && req.files["rc_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.rc_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                rc_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.rc_photos = images_list
    }
    if (req.files && req.files["exterior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.exterior_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                exterior_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.exterior_photos = images_list
    }
    if (req.files && req.files["interior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.interior_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                interior_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.interior_photos = images_list
    }
    if (req.files && req.files["engine_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.engine_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                engine_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.engine_photos = images_list
    }
    if (req.files && req.files["tyre_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.tyre_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                tyre_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.tyre_photos = images_list
    }
    if (req.files && req.files["dent_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.dent_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                dent_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.dent_photos = images_list
    }
    if (req.body.car_brand_id) {
        car_brand = await carBrand.findById(req.body.car_brand_id)
        if (!car_brand) {
            throw new ApiError(404, 'no such car brand found')
        }
    }
    if (req.body.car_model_id) {
        car_model = await carModel.findById(req.body.car_model_id)
        if (!car_model) {
            throw new ApiError(404, 'no such car model found')
        }
    }
    if (req.body.car_variant_id) {
        car_variant = await carVariant.findById(req.body.car_variant_id)
        if (!car_variant) {
            throw new ApiError(404, 'no such car variant found')
        }
    }
    if (req.body.car_title) {
        req.body.car_slug = slugify(req.body.car_title)
    }
    if (req.body.make_year) {
        req.body.make_year = moment(req.body.make_year, 'DD-MMM-YY').toDate()
    }
    if (req.body.registration_year) {
        req.body.registration_year = moment(req.body.registration_year, 'DD-MMM-YY').toDate()
    }
    if (req.body.insurance_validity) {
        req.body.insurance_validity = moment(req.body.insurance_validity, 'DD-MMM-YY').toDate()
    }
    const new_car = new carModel(req.body)
    await new_car.save()
    return res.status(201).send(new ApiResponse(200, new_car, 'car added successful'))
});

export const getSpecificCar = asyncHandler(async (req, res) => {
    let data = null;
    if (req.query.car_id) {
        data = { _id: req.query.car_id }
    }
    if (req.query.car) {
        data = { car_slug: req.query.car }
    }
    let car = await carModel.findOne(data)
    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    return res.status(200).send(new ApiResponse(200, car, 'car details fetched successful'))
});

export const getCarDetailsPublic = asyncHandler(async (req, res) => {
    let data = null;
    if (req.query.car_id) {
        data = { _id: req.query.car_id }
    }
    if (req.query.car) {
        data = { car_slug: req.query.car }
    }
    let car = await carModel.findOne(data).select({ contact_details: 0 })
    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    return res.status(200).send(new ApiResponse(200, car, 'car details fetched successful'))
});

export const getCarOwnerInformation = asyncHandler(async (req, res) => {
    if (!req.user.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.user.user_id });
    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    let data = null;
    if (req.query.car_id) {
        data = { _id: req.query.car_id }
    }
    if (req.query.car) {
        data = { car_slug: req.query.car }
    }
    let car = await carModel.findOne(data)
    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    if(car.customer_type==="seller"){
        let find_payments=await payment.findOne({user_id:req.user.user_id,car_id:car._id,status:"success"})
        if(!find_payments){
            throw new ApiError(402,'payment required')
        }
    }
    let contact_details = await carModel.findOne(data).select({contact_details:1})
    return res.status(200).send(new ApiResponse(200, contact_details, 'contact details fetched successful'))
});

export const getAllCar = asyncHandler(async (req, res) => {
    let page = 1
    if (req.query.page) {
        page = parseInt(req.query.page)
    }
    let page_size = 10
    if (req.query.page_size) {
        page_size = parseInt(req.query.page_size)
    }
    let pipeline = [
        {
            $sort: { createdAt: -1 }
        }
    ]
    if (req.query.sort == "oldest") {
        pipeline.push(
            {
                $sort: { createdAt: 1 }
            }
        )
    }
    if (req.query.publish) {
        req.query.publish == "true" ? req.query.publish = true : req.query.publish = false
        pipeline.push({
            $match: { is_published: req.query.publish }
        })
    }
    if (req.query.booked) {
        req.query.booked == "true" ? req.query.booked = true : req.query.booked = false
        pipeline.push({
            $match: { is_booked: req.query.booked }
        })
    }
    if (req.query.sold) {
        req.query.sold == "true" ? req.query.sold = true : req.query.sold = false
        pipeline.push({
            $match: { is_sold: req.query.sold }
        })
    }
    if (req.query.customer_type) {
        pipeline.push({
            $match: { customer_type: req.query.customer_type }
        })
    }
    if (req.query.customer_type) {
        pipeline.push({
            $match: { customer_type: req.query.customer_type }
        })
    }
    if (req.query.body_type) {
        pipeline.push({
            $match: { body_type: req.query.body_type }
        })
    }
    if (req.query.lifestyle) {
        pipeline.push({
            $match: { lifestyle: req.query.lifestyle }
        })
    }
    if (req.query.fuel_type) {
        pipeline.push({
            $match: { fuel_type: req.query.fuel_type }
        })
    }
    if (req.query.make_year) {
        req.query.make_year = new Date(parseInt(req.query.make_year), 0, 1)
        pipeline.push({
            $match: { make_year: { $gte: req.query.make_year } }
        })
    }
    if (req.query.kms_driven) {
        pipeline.push({
            $match: { kms_driven: { $lte: Number(req.query.kms_driven) } }
        })
    }
    if (req.query.car_brand) {
        pipeline.push({
            $match: { car_brand: new mongoose.Types.ObjectId(req.query.car_brand) }
        })
    }
    if (req.query.car_model) {
        pipeline.push({
            $match: { car_model: new mongoose.Types.ObjectId(req.query.car_model) }
        })
    }
    if (req.query.car_variant) {
        pipeline.push({
            $match: { car_variant: new mongoose.Types.ObjectId(req.query.car_variant) }
        })
    }
    if (req.query.owner_serial_no) {
        pipeline.push({
            $match: { owner_serial_no: Number(req.query.owner_serial_no) }
        })
    }
    if (req.query.transmission) {
        pipeline.push({
            $match: { transmission: req.query.transmission }
        })
    }
    if (req.query.price) {
        req.query.price == "low-to-high" ? req.query.price = 1 : req.query.price = -1
        pipeline.push({
            $sort: {
                price: req.query.price
            }
        })
    }
    if (req.query.lte && req.query.gte) {
        pipeline.push(
            {
                $match: {
                    price: { $gte: req.query.gte, $lte: req.query.lte }
                }
            }
        )
    }
    if (req.query.search) {
        pipeline.push({
            $match: {
                "car_title": { $regex: '.*' + req.query.search + '.*', $options: 'i' }
            }
        })
    }
    pipeline.push(
        {
            $lookup: {
                from: "user-wishlist",
                localField: "_id",
                foreignField: "car_id",
                as: "shortlisted_cars"
            }
        },
        {
            $addFields: {
                no_of_people_shortlisted_the_car: {
                    $size: "$shortlisted_cars"
                }
            }
        },
        {
            "$project": {
                "car_slug": 1,
                "car_banner": 1,
                "car_title": 1,
                "kms_driven": 1,
                "owner_serial_no": 1,
                "fuel_type": 1,
                "views": 1,
                "customer_type": 1,
                "price": 1,
                "no_of_people_shortlisted_the_car": 1
            }
        },
        { "$skip": (page - 1) * page_size },
        { "$limit": page_size }
    )
    let car_list = await carModel.aggregate(pipeline)

    if (!car_list.length) {
        throw new ApiError(404, 'no car found')
    }
    return res.status(200).send(new ApiResponse(200, car_list, 'car list fetched successful'))
});

export const updateSpecificCar = asyncHandler(async (req, res) => {
    let car_brand = null;
    let car_model = null;
    let car_variant = null;
    if (!req.query.car_id) {
        throw new ApiError(400, 'car id is required')
    }

    let car = await carModel.findById(req.query.car_id)

    if (!car) {
        throw new ApiError(404, 'no such car found')
    }
    if (req.files && req.files["car_banner"]) {
        let upload = await UPLOAD_IMAGE(req.files.car_banner[0])
        req.body.car_banner = {
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    if (req.files && req.files["rc_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.rc_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                rc_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.rc_photos = images_list
    }
    if (req.files && req.files["exterior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.exterior_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                exterior_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.exterior_photos = images_list
    }
    if (req.files && req.files["interior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.interior_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                interior_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.interior_photos = images_list
    }
    if (req.files && req.files["engine_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.engine_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                engine_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.engine_photos = images_list
    }
    if (req.files && req.files["tyre_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.tyre_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                tyre_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.tyre_photos = images_list
    }
    if (req.files && req.files["dent_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.dent_photos)
        let images_list = []
        upload.forEach((x) => {
            images_list.push({
                dent_img: { public_id: x.public_id, url: x.secure_url }
            })
        })
        req.body.dent_photos = images_list
    }
    if (req.body.car_brand_id) {
        car_brand = await carBrand.findById(req.body.car_brand_id)
        if (!car_brand) {
            throw new ApiError(404, 'no such car brand found')
        }
    }
    if (req.body.car_model_id) {
        car_model = await carModel.findById(req.body.car_model_id)
        if (!car_model) {
            throw new ApiError(404, 'no such car model found')
        }
    }
    if (req.body.car_variant_id) {
        car_variant = await carVariant.findById(req.body.car_variant_id)
        if (!car_variant) {
            throw new ApiError(404, 'no such car variant found')
        }
    }
    if (req.body.is_booked) {
        req.body.book_date = new Date()
    }
    if (req.body.is_sold) {
        req.body.sold_date = new Date()
    }
    if (req.body.car_title) {
        req.body.car_slug = slugify(req.body.car_title)
    }
    if (req.body.make_year) {
        req.body.make_year = moment(req.body.make_year, 'DD-MMM-YY').toDate()
    }
    if (req.body.registration_year) {
        req.body.registration_year = moment(req.body.registration_year, 'DD-MMM-YY').toDate()
    }
    if (req.body.insurance_validity) {
        req.body.insurance_validity = moment(req.body.insurance_validity, 'DD-MMM-YY').toDate()
    }
    let update_car = await carModel.findOneAndUpdate({ _id: req.query.car_id }, req.body, { new: true })

    if (!update_car) {
        throw new ApiError(400, 'car updation failed')
    }
    return res.status(200).send(new ApiResponse(200, update_car, "car details updated successful"))
});

export const countViews = asyncHandler(async (req, res) => {
    if (!req.query.car_id) {
        throw new ApiError(400, 'car id is required')
    }

    let car = await carModel.findById(req.query.car_id)

    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    let update_car = await carModel.findOneAndUpdate({ _id: req.query.car_id }, { $inc: { views: 1 } }, { new: true })

    if (!update_car) {
        throw new ApiError(400, 'car updation failed')
    }
    return res.status(200).send(new ApiResponse(200, {}, "view marked"))
});

export const deleteSpecificCar = asyncHandler(async (req, res) => {
    if (!req.query.car_id) {
        throw new ApiError(400, 'car id is required')
    }
    let car = await carModel.findById(req.query.car_id)
    if (!car) {
        throw new ApiError(404, 'no such car found')
    }
    await carModel.findOneAndDelete({ _id: req.query.car_id })

    return res.status(204).send(new ApiResponse(204, {}, 'deletion successful'))
});

export const addAndRemoveToWishList = asyncHandler(async (req, res) => {
    if (!req.user.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.user.user_id });
    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    if (!req.body.car_id) {
        throw new ApiError(400, "carId is missing");
    }
    req.body.user_id = user._id
    let getUserWishlist = await carWishList.findOne(req.body)
    if (getUserWishlist) {
        await carWishList.findOneAndDelete(req.body)
        return res.status(204).send(new ApiResponse(200, {}, 'car remove from wishlist successful'))
    } else {
        const wishlist = new carWishList(req.body)
        await wishlist.save()
        return res.status(201).send(new ApiResponse(200, wishlist, 'car added to wishlist successful'))
    }
});

export const getUserWishlist = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort: { createdAt: -1 }
        }
    ]
    if (req.query.user_id) {
        pipeline.push({
            $match: { "user_id": new mongoose.Types.ObjectId(req.query.user_id) }
        })
    }
    if (req.query.car_id) {
        pipeline.push({
            $match: { "car_id": new mongoose.Types.ObjectId(req.query.car_id) }
        })
    }
    let car_list = await carWishList.aggregate(pipeline)

    if (!car_list.length) {
        throw new ApiError(404, 'no car found')
    }
    return res.status(200).send(new ApiResponse(200, car_list, 'car list fetched successful'))
});

export const addCarToUserWatchHistory = asyncHandler(async (req, res) => {
    if (!req.user.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.user.user_id });
    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    if (!req.body.car_id) {
        throw new ApiError(400, "carId is missing");
    }
    req.body.user_id = user._id
    let getUserWatchlist = await carWatchHistory.findOne(req.body)
    if (!getUserWatchlist) {
        const UserWatchlis = new carWatchHistory(req.body)
        await UserWatchlis.save()
        return res.status(201).send(new ApiResponse(200, UserWatchlis, 'car added to watchlist successful'))
    }
    return res.status(201).send(new ApiResponse(200, {}, 'car added to watchlist successful'))
});

export const getUserWatchlistAdmin = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort: { createdAt: -1 }
        }
    ]
    if (req.body.user_id) {
        pipeline.push({
            $match: { "user_id":new mongoose.Types.ObjectId(req.body.user_id) }
        })
    }
    if (req.body.car_id) {
        pipeline.push({
            $match: { "car_id":new mongoose.Types.ObjectId(req.body.car_id) }
        })
    }
    let car_list = await carWatchHistory.aggregate(pipeline)

    if (!car_list.length) {
        throw new ApiError(404, 'no car found')
    }
    return res.status(200).send(new ApiResponse(200, car_list, 'car list fetched successful'))
});
