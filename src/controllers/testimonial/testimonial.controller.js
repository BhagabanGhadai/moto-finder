import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import Testimonial from '../../models/testimonial/testimonial.model.js'
import { UPLOAD_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js';
import mongoose from 'mongoose';

export const addTestimonialAdmin = asyncHandler(async (req, res) => {
    if (req.files && req.files["testimony_img"]) {
        let upload = await UPLOAD_IMAGE(req.files.testimony_img[0])
        req.body.testimony_img ={
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    const new_testimony = new Testimonial(req.body)
    await new_testimony.save()
    return res.status(201).send(new ApiResponse(200,new_testimony,'testimony added successful'))
})

export const getAllTestimonial = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    let testimony_list = await Testimonial.aggregate(pipeline)
    
    if (!testimony_list.length) {
        throw new ApiError(404, 'no car brand found')
    }
    return res.status(200).send(new ApiResponse(200,testimony_list,'Testimony list fetched successful'))
})

export const deleteSpecificTestimonial = asyncHandler(async (req, res) => {
    if (!req.query.testimony_id) {
        throw new ApiError(400, 'testimony id is required')
    }

     let testimony = await Testimonial.findById(req.query.testimony_id)
   
    if (!testimony) {
        throw new ApiError(404, 'no such testimony found')
    }
    await Testimonial.findOneAndDelete({ _id: req.query.testimony_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})
