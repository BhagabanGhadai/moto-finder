import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import carVariant from '../../models/car/car_variant.model.js'
import mongoose from 'mongoose';

export const addACarVariant = asyncHandler(async (req, res) => {
    const new_car = new carVariant(req.body)
    await new_car.save()
    return res.status(201).send(new ApiResponse(200,new_car,'car variant added successful'))
})

export const getSpecificCarVariant = asyncHandler(async (req, res) => {
    if (!req.query.car_variant_id) {
        throw new ApiError(400, 'car variant id is required')
    }
    let car = await carVariant.findById(req.query.car_variant_id)
    if (!car) {
        throw new ApiError(404, 'no such car variant found')
    }
    return res.status(200).send(new ApiResponse(200,car,'car variant details fetched successful'))
})

export const getAllCarVariant = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    if (req.query.brand) {
        pipeline.push({
            $match:{"car_brand":new mongoose.Types.ObjectId(req.query.brand)}
        })
    }
    if (req.query.model) {
        pipeline.push({
            $match:{"car_model":new mongoose.Types.ObjectId(req.query.model)}
        })
    }
    let car_brand_list = await carVariant.aggregate(pipeline)
    
    if (!car_brand_list.length) {
        throw new ApiError(404, 'no car variant found')
    }
    return res.status(200).send(new ApiResponse(200,car_brand_list,'car variant list fetched successful'))
})

export const updateSpecificCarVariant = asyncHandler(async (req, res) => {
    if (!req.query.car_variant_id) {
        throw new ApiError(400, 'car variant id is required')
    }

     let car = await carVariant.findById(req.query.car_variant_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car variant found')
    }
    let update_car = await carVariant.findOneAndUpdate({ _id: req.query.car_variant_id }, req.body, { new: true })

    if (!update_car) {
        throw new ApiError(400, 'car updation failed')
    }
    return res.status(200).send(new ApiResponse(200,update_car,"car variant details updated successful"))
})

export const deleteSpecificCarVariant = asyncHandler(async (req, res) => {
    if (!req.query.car_variant_id) {
        throw new ApiError(400, 'car variant id is required')
    }

     let car = await carVariant.findById(req.query.car_variant_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car variant found')
    }
    await carVariant.findOneAndDelete({ _id: req.query.car_variant_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})
