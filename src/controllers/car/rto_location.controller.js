import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import rtoCity from '../../models/car/rto_city.model.js'
import { UPLOAD_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js';
import mongoose from 'mongoose';


export const addRtoLocation = asyncHandler(async (req, res) => {
    if (req.files && req.files["city_image"]) {
        let upload = await UPLOAD_IMAGE(req.files.city_image[0])
        req.body.city_image = {
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    const new_car = new rtoCity(req.body)
    await new_car.save()
    return res.status(201).send(new ApiResponse(201,new_car,'rto location added'))
})

export const getSpecificRtoLocation = asyncHandler(async (req, res) => {
    if (!req.query.rto_location_id) {
        throw new ApiError(400, 'rto location id is required')
    }

     let location = await rtoCity.findById(req.query.rto_location_id)
   
    if (!location) {
        throw new ApiError(404, 'no such rto location found')
    }
    return res.status(200).send(new ApiResponse(200,location,'locationdetails fetched successful'))
})

export const getAllRtoLocation = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort: { createdAt: -1 }
        }
    ]
    if (req.query.search) {
        pipeline.push({
            $match: { "city_name": { $regex: ".*" + req.query.search + ".*", $options: "i" } }
        })
    }
    let rto_list = await rtoCity.aggregate(pipeline)

    if (!rto_list.length) {
        throw new ApiError(404, 'no rto found')
    }
    return res.status(200).send(new ApiResponse(200,rto_list,'rto list fetched successful'))
})

export const updateSpecificLocation = asyncHandler(async (req, res) => {
    if (!req.query.rto_location_id) {
        throw new ApiError(400, 'rto location id is required')
    }

     let location = await rtoCity.findById(req.query.rto_location_id)
   
     if (!location) {
        throw new ApiError(404, 'no such rto location found')
    }
    if (req.files && req.files["city_image"]) {
        let upload = await UPLOAD_IMAGE(req.files.city_image[0])
        req.body.city_image ={
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }

    let updateLocation = await rtoCity.findOneAndUpdate({ _id: req.query.rto_location_id }, req.body, { new: true })

    if (!updateLocation) {
        throw new ApiError(400, 'rto location updation failed')
    }
    return res.status(200).send(new ApiResponse(200,updateLocation,'update successful'))
}
)

export const deleteSpecificLocation = asyncHandler(async (req, res) => {
    if (!req.query.rto_location_id) {
        throw new ApiError(400, 'rto location id is required')
    }

     let location = await rtoCity.findById(req.query.rto_location_id)
   
     if (!location) {
        throw new ApiError(404, 'no such rto location found')
    }

    await rtoCity.findOneAndDelete({ _id: req.query.rto_location_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})