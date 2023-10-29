import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import carBrand from '../../models/car/car_brand.model.js'
import { UPLOAD_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js';
import mongoose from 'mongoose';

export const addACarBrand = asyncHandler(async (req, res) => {
    if (req.files && req.files["car_brand_image"]) {
        let upload = await UPLOAD_IMAGE(req.files.car_brand_image[0])
        req.body.car_brand_image ={
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    const new_car = new carBrand(req.body)
    await new_car.save()
    return res.status(201).send(new ApiResponse(200,new_car,'car added successful'))
})

export const getSpecificCarBrand = asyncHandler(async (req, res) => {
    if (!req.query.car_brand_id) {
        throw new ApiError(400, 'car brand id is required')
    }

     let car = await carBrand.findById(req.query.car_brand_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    return res.status(200).send(new ApiResponse(200,car,'car brand details fetched successful'))
})

export const getAllCarBrand = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    if (req.query.search) {
        pipeline.push({
            $match:{"car_brand_name":{$regex:".*"+req.query.search+".*",$options:"i"}}
        })
    }
    let car_brand_list = await carBrand.aggregate(pipeline)
    
    if (!car_brand_list.length) {
        throw new ApiError(404, 'no car brand found')
    }
    return res.status(200).send(new ApiResponse(200,car_brand_list,'car brand list fetched successful'))
})

export const updateSpecificCarBrand = asyncHandler(async (req, res) => {
    if (!req.query.car_brand_id) {
        throw new ApiError(400, 'car brand id is required')
    }

     let car = await carBrand.findById(req.query.car_brand_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    if (req.files && req.files["car_brand_image"]) {
        await DELETE_IMAGE(car.car_brand_image.public_id)
        let upload = await UPLOAD_IMAGE(req.files.car_brand_image[0])
        req.body.car_brand_image = {
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    let update_car = await carBrand.findOneAndUpdate({ _id: req.query.car_brand_id }, req.body, { new: true })

    if (!update_car) {
        throw new ApiError(400, 'car updation failed')
    }
    return res.status(200).send(new ApiResponse(200,update_car,"car brand details updated successful"))
})

export const deleteSpecificCarBrand = asyncHandler(async (req, res) => {
    if (!req.query.car_brand_id) {
        throw new ApiError(400, 'car brand id is required')
    }

     let car = await carBrand.findById(req.query.car_brand_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car brand found')
    }
    await DELETE_IMAGE(car.car_brand_image.public_id)
    await carBrand.findOneAndDelete({ _id: req.query.car_brand_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})
