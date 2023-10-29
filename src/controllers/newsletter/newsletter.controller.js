import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import Newsletter from '../../models/newsletter/newsletter.model.js';


export const subscribeNewsletter=asyncHandler(async (req,res)=>{
    if(!req.body.email){
        throw new ApiError(400,'email id is required to subscribe')
    }
    let newsletter=await Newsletter.findOne({email:req.body.email})
    if(newsletter){
        return res.status(200).send(new ApiResponse(200,[],'Alreday subscribe'))
    }
    let subscribe=await Newsletter.create({email:req.body.email})
    return res.status(201).send(new ApiResponse(201,subscribe,'you subscribe the newsletter'))
})

export const unSubscribeNewsletter=asyncHandler(async (req,res)=>{
    if(!req.body.email){
        throw new ApiError(400,'email id is required to subscribe')
    }
    let newsletter=await Newsletter.findOne({email:req.body.email})
    if(!newsletter){
        return res.status(200).send(new ApiResponse(200,[],'you have alreday unsubscribed'))
    }
    let unsubscribe=await Newsletter.findOneAndDelete({email:req.body.email})
    return res.status(204).send(new ApiResponse(204,unsubscribe,'you unsubscribe the neesletter'))
})

export const getAllSubscriber=asyncHandler(async(req,res)=>{
    let subscriber_list=await Newsletter.find().sort({createdAt:-1})
    if(!subscriber_list){
        throw new ApiError(404,'no one subscribed to newsletter')
    }
    return res.status(200).send(new ApiResponse(200,subscriber_list,'subscribe list fetched successful'))
})