import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import carModel from '../../models/car/car_model.model.js'
import mongoose from 'mongoose';


export const addACarModel = asyncHandler(async (req, res) => {
    const new_car = new carModel(req.body)
    await new_car.save()
    return res.status(201).send(new ApiResponse(200,new_car,'car model added successful'))
})

export const getSpecificCarModel = asyncHandler(async (req, res) => {
    if (!req.query.car_model_id) {
        throw new ApiError(400, 'car model id is required')
    }

     let car = await carModel.findById(req.query.car_model_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car model found')
    }
    return res.status(200).send(new ApiResponse(200,car,'car model details fetched successful'))
})

export const getAllCarModel = asyncHandler(async (req, res) => {
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
    let car_brand_list = await carModel.aggregate(pipeline)
    
    if (!car_brand_list.length) {
        throw new ApiError(404, 'no car model found')
    }
    return res.status(200).send(new ApiResponse(200,car_brand_list,'car model list fetched successful'))
})

export const updateSpecificCarModel = asyncHandler(async (req, res) => {
    if (!req.query.car_model_id) {
        throw new ApiError(400, 'car model id is required')
    }

     let car = await carModel.findById(req.query.car_model_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car model found')
    }
    
    let update_car = await carModel.findOneAndUpdate({ _id: req.query.car_model_id }, req.body, { new: true })

    if (!update_car) {
        throw new ApiError(400, 'car updation failed')
    }
    return res.status(200).send(new ApiResponse(200,update_car,"car model details updated successful"))
})

export const deleteSpecificCarModel = asyncHandler(async (req, res) => {
    if (!req.query.car_model_id) {
        throw new ApiError(400, 'car model id is required')
    }

     let car = await carModel.findById(req.query.car_model_id)
   
    if (!car) {
        throw new ApiError(404, 'no such car model found')
    }
    await carModel.findOneAndDelete({ _id: req.query.car_model_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})
