import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import carModel from '../../models/car/car.model.js'
import { UPLOAD_IMAGE,UPLOAD_MULTIPLE_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js';
import carBrand from '../../models/car/car_brand.model.js'
import carModel from '../../models/car/car_model.model.js'
import carVariant from '../../models/car/car_variant.model.js'
import carWishList from '../../models/car/car_wishlist.model.js'
import User from '../../models/user/user.model.js';
import carWatchHistory from '../../models/car/car_watch_history.model.js'
import mongoose from 'mongoose';
import slugify from 'slugify';


export const addACar = asyncHandler(async (req, res) => {
    if (req.files && req.files["rc_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.rc_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                rc_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.rc_photos=images_list
    }
    if (req.files && req.files["exterior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.exterior_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                exterior_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.exterior_photos=images_list
    }
    if (req.files && req.files["interior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.interior_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                interior_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.interior_photos=images_list
    }
    if (req.files && req.files["engine_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.engine_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                engine_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.engine_photos=images_list
    }
    if (req.files && req.files["tyre_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.tyre_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                tyre_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.tyre_photos=images_list
    }
    if (req.files && req.files["dent_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.dent_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                dent_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.dent_photos=images_list
    }
    if (!req.body.car_brand_id) {
        throw new ApiError(400, 'car brand id is required')
    }
    let car_brand = await carBrand.findById(req.body.car_brand_id)
    if (!car_brand) {
        throw new ApiError(404, 'no such car brand found')
    }
    if (!req.body.car_model_id) {
        throw new ApiError(400, 'car model id is required')
    }
    let car_model = await carModel.findById(req.body.car_model_id)
    if (!car_model) {
        throw new ApiError(404, 'no such car model found')
    }
    if (!req.body.car_variant_id) {
        throw new ApiError(400, 'car variant id is required')
    }
    let car_variant = await carVariant.findById(req.body.car_variant_id)
    if (!car_variant) {
        throw new ApiError(404, 'no such car variant found')
    }
    req.body.car_slug=req.body.make_year+"-"+slugify(car_brand.car_brand_name)+"-"+slugify(car_model.car_model_name)+"-"+slugify(car_variant.car_variant_name)+"-"+req.body.fuel_type+"-"+req.body.kms_driven
    const new_car = new carModel(req.body)
    await new_car.save()
    return res.status(201).send(new ApiResponse(200,new_car,'car added successful'))
})

export const getSpecificCar = asyncHandler(async (req, res) => {
    if (!req.query.car_id) {
        throw new ApiError(400, 'car id is required')
    }

     let car = await carModel.findById(req.query.car_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    return res.status(200).send(new ApiResponse(200,car,'car details fetched successful'))
})

export const getAllCar = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]

    let car_list = await car.aggregate(pipeline)
    
    if (!car_list.length) {
        throw new ApiError(404, 'no car found')
    }
    return res.status(200).send(new ApiResponse(200,car_brand_list,'car list fetched successful'))
})

export const updateSpecificCar = asyncHandler(async (req, res) => {
    if (!req.query.car_id) {
        throw new ApiError(400, 'car id is required')
    }

     let car = await carModel.findById(req.query.car_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car found')
    }
    if (req.files && req.files["rc_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.rc_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                rc_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.rc_photos=images_list
    }
    if (req.files && req.files["exterior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.exterior_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                exterior_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.exterior_photos=images_list
    }
    if (req.files && req.files["interior_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.interior_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                interior_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.interior_photos=images_list
    }
    if (req.files && req.files["engine_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.engine_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                engine_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.engine_photos=images_list
    }
    if (req.files && req.files["tyre_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.tyre_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                tyre_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.tyre_photos=images_list
    }
    if (req.files && req.files["dent_photos"]) {
        let upload = await UPLOAD_MULTIPLE_IMAGE(req.files.dent_photos)
        let images_list=[]
        upload.forEach((x)=>{
            images_list.push({
                dent_img:{public_id:x.public_id,url:x.secure_url}
            })
        })
        req.body.dent_photos=images_list
    }
    if(req.body.is_booked){
        req.body.book_date=new Date()
    }
    if(req.body.is_sold){
        req.body.sold_date=new Date()
    }
    let update_car = await carModel.findOneAndUpdate({ _id: req.query.car_id }, req.body, { new: true })

    if (!update_car) {
        throw new ApiError(400, 'car updation failed')
    }
    return res.status(200).send(new ApiResponse(200,update_car,"car details updated successful"))
})

export const deleteSpecificCar = asyncHandler(async (req, res) => {
    if (!req.query.car_id) {
        throw new ApiError(400, 'car id is required')
    }
    let car = await carModel.findById(req.query.car_id)
    if (!car) {
        throw new ApiError(404, 'no such car found')
    }
    await carModel.findOneAndDelete({ _id: req.query.car_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})

export const addAndRemoveToWishList = asyncHandler (async (req, res) => {
    if (!req.user.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.user.user_id });
    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    if(!req.body.car_id){
        throw new ApiError(400, "carId is missing");
    }
    let getUserWishlist=await carWishList.findOne({user_id:user._id,car_id:req.body.car_id})
    if(getUserWishlist){
        await carWishList.findOneAndDelete({user_id:user._id,car_id:req.body.car_id})
        return res.status(204).send(new ApiResponse(200,{},'car remove from wishlist successful'))
    }else{
        const wishlist = new carWishList(req.body)
        await wishlist.save()
        return res.status(201).send(new ApiResponse(200,wishlist,'car added to wishlist successful'))
    }
})

export const getUserWishlist = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    if(req.body.user_id){
        pipeline.push({
            $match:{"user_id":mongoose.Types.ObjectId(req.body.user_id)}
        })
    }
    let car_list = await carWishList.aggregate(pipeline)
    
    if (!car_list.length) {
        throw new ApiError(404, 'no car found')
    }
    return res.status(200).send(new ApiResponse(200,car_brand_list,'car list fetched successful'))
})

export const addCarToUserWatchHistory = asyncHandler (async (req, res) => {
    if (!req.user.user_id) {
        throw new ApiError(400, "UserId is missing");
    }
    const user = await User.findOne({ _id: req.user.user_id });
    if (!user) {
        throw new ApiError(404, "User does not exists", []);
    }
    if(!req.body.car_id){
        throw new ApiError(400, "carId is missing");
    }
    let getUserWatchlist=await carWatchHistory.findOne({user_id:user._id,car_id:req.body.car_id})
    if(!getUserWatchlist){
        const UserWatchlis = new carWatchHistory(req.body)
        await UserWatchlis.save()
        return res.status(201).send(new ApiResponse(200,UserWatchlis,'car added to watchlist successful'))
    }
    return res.status(201).send(new ApiResponse(200,{},'car added to watchlist successful'))
})

export const getUserWatchlistAdmin = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    if(req.body.user_id){
        pipeline.push({
            $match:{"user_id":mongoose.Types.ObjectId(req.body.user_id)}
        })
    }
    let car_list = await carWatchHistory.aggregate(pipeline)
    
    if (!car_list.length) {
        throw new ApiError(404, 'no car found')
    }
    return res.status(200).send(new ApiResponse(200,car_brand_list,'car list fetched successful'))
})
