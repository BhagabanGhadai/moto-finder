import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import Plan from '../../models/plans/plans.model.js';
import mongoose from 'mongoose';

export const addAPlan = asyncHandler(async (req, res) => {
    const new_data = new Plan(req.body)
    await new_data.save()
    return res.status(201).send(new ApiResponse(200,new_data,'plan added successful'))
})

export const getAPlan = asyncHandler(async (req, res) => {
    if (!req.query.plan_id) {
        throw new ApiError(400, 'plan id is required')
    }

     let plan = await Plan.findById(req.query.plan_id)
   
    if (!plan) {
        throw new ApiError(404, 'no such plan found')
    }
    
    return res.status(200).send(new ApiResponse(200,plan,'plan fetched successful'))
})

export const getAllPlans = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    let plan_list = await Plan.aggregate(pipeline)
    
    if (!plan_list.length) {
        throw new ApiError(404, 'no plan found')
    }
    return res.status(200).send(new ApiResponse(200,plan_list,'All Plan fetched successful'))
})

export const updateAPlan = asyncHandler(async (req, res) => {
    if (!req.query.plan_id) {
        throw new ApiError(400, 'plan id is required')
    }

     let plan = await Plan.findById(req.query.plan_id)
   
    if (!plan) {
        throw new ApiError(404, 'no such plan found')
    }
    let update_plan=await Plan.findOneAndUpdate({ _id: req.query.plan_id },req.body,{new:true})
    if(!update_plan){
        throw new ApiError(400, 'plan updation failed') 
    }
    return res.status(200).send(new ApiResponse(200,update_plan,'plan updated successful'))
})

export const deleteAPlan = asyncHandler(async (req, res) => {
    if (!req.query.plan_id) {
        throw new ApiError(400, 'plan id is required')
    }

     let plan = await Plan.findById(req.query.plan_id)
   
    if (!plan) {
        throw new ApiError(404, 'no such plan found')
    }
    await Plan.findOneAndDelete({ _id: req.query.plan_id })
    
    return res.status(204).send(new ApiResponse(204,{},'plan deletion successful'))
})