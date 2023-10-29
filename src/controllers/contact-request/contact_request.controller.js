import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import contactRequest from '../../models/contact-request/contact_request.model.js';


export const addContactRequest=asyncHandler(async (req,res)=>{
    if(!req.body.mobile){
        throw new ApiError(400,'mobile number required')
    }
    let newContactRequest=await contactRequest.create({mobile:req.body.mobile})
    if(!newContactRequest){
        return res.status(400).send(new ApiResponse(400,[],'error while saving request'))
    }
    return res.status(201).send(new ApiResponse(201,newContactRequest,'request saved'))
})

export const deleteContactRequest=asyncHandler(async (req,res)=>{
    if(!req.body.mobile){
        throw new ApiError(400,'mobile number required')
    }
    let ContactRequest=await contactRequest.findOne({mobile:req.body.mobile})
    if(!ContactRequest){
        return res.status(404).send(new ApiResponse(404,[],'no request found'))
    }
    await contactRequest.findOneAndDelete({email:req.body.email})
    return res.status(204).send(new ApiResponse(204,[],'request deleted successful'))
})

export const updateContactRequest=asyncHandler(async(req,res)=>{
    if(!req.body.mobile){
        throw new ApiError(400,'mobile number required')
    }
    let ContactRequest=await contactRequest.findOne({mobile:req.body.mobile})
    if(!ContactRequest){
        return res.status(404).send(new ApiResponse(404,[],'no request found'))
    }
    let updateContactRequest=await contactRequest.findOneAndUpdate({mobile:req.body.mobile},req.body,{new:true})
    if(!updateContactRequest){
        throw new ApiError(400,'updation failed')
    }
    return res.status(200).send(new ApiResponse(200,updateContactRequest,'update successful'))
})

export const getAllContactRequest=asyncHandler(async(req,res)=>{
    let request_list=await contactRequest.find().sort({createdAt:-1})
    if(!request_list){
        throw new ApiError(404,'no list found')
    }
    return res.status(200).send(new ApiResponse(200,request_list,'contact list fetched successful'))
})