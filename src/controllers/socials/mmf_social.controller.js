import asyncHandler from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { ApiError } from '../../utils/ApiError.js';
import Blog from '../../models/socials/mmf_blog.model.js'
import Instagram from '../../models/socials/mmf_instagram.model.js'
import Youtube from '../../models/socials/mmf_youtube.model.js'
import { UPLOAD_IMAGE, DELETE_IMAGE } from '../../utils/cloudinary.js';
import mongoose from 'mongoose';

export const addYoutubePlacement = asyncHandler(async (req, res) => {
    if (req.files && req.files["youtube_banner"]) {
        let upload = await UPLOAD_IMAGE(req.files.youtube_banner[0])
        req.body.youtube_banner ={
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    const new_data = new Youtube(req.body)
    await new_data.save()
    return res.status(201).send(new ApiResponse(200,new_data,'data added successful'))
})

export const getAllYoutubeData = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    let view_list = await Youtube.aggregate(pipeline)
    
    if (!view_list.length) {
        throw new ApiError(404, 'no data found')
    }
    return res.status(200).send(new ApiResponse(200,view_list,'Youtube list fetched successful'))
})

export const deleteSpecificYoutubePlacement = asyncHandler(async (req, res) => {
    if (!req.query.placement_id) {
        throw new ApiError(400, 'placement id is required')
    }

     let youtube = await Youtube.findById(req.query.placement_id)
   
    if (!youtube) {
        throw new ApiError(404, 'no such data found')
    }
    await Youtube.findOneAndDelete({ _id: req.query.placement_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})

export const addInstagramPlacement = asyncHandler(async (req, res) => {
    if (req.files && req.files["instagram_banner"]) {
        let upload = await UPLOAD_IMAGE(req.files.instagram_banner[0])
        req.body.instagram_banner ={
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    const new_data = new Instagram(req.body)
    await new_data.save()
    return res.status(201).send(new ApiResponse(200,new_data,'data added successful'))
})

export const getAllInstagramData = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        }
    ]
    let view_list = await Instagram.aggregate(pipeline)
    
    if (!view_list.length) {
        throw new ApiError(404, 'no data found')
    }
    return res.status(200).send(new ApiResponse(200,view_list,'Instagram list fetched successful'))
})

export const deleteSpecificInstagramPlacement = asyncHandler(async (req, res) => {
    if (!req.query.placement_id) {
        throw new ApiError(400, 'placement id is required')
    }

     let instagram = await Instagram.findById(req.query.placement_id)
   
    if (!instagram) {
        throw new ApiError(404, 'no such data found')
    }
    await Instagram.findOneAndDelete({ _id: req.query.placement_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})

export const addBlog = asyncHandler(async (req, res) => {
    if (req.files && req.files["blog_banner"]) {
        let upload = await UPLOAD_IMAGE(req.files.blog_banner[0])
        req.body.blog_banner ={
            public_id: upload.public_id,
            url: upload.secure_url
        }
    }
    const new_data = new Blog(req.body)
    await new_data.save()
    return res.status(201).send(new ApiResponse(200,new_data,'data added successful'))
})

export const getSpecificBlog=asyncHandler(async (req, res) => {
    if (!req.query.blog_id) {
        throw new ApiError(400, 'blog id is required')
    }

     let blog = await Blog.findById(req.query.blog_id)
   
    if (!blog) {
        throw new ApiError(404, 'no such testimony found')
    }
    return res.status(200).send(new ApiResponse(200,blog,'blog details fetched successful'))
})

export const getAllBlog = asyncHandler(async (req, res) => {
    let pipeline = [
        {
            $sort:{createdAt:-1}
        },
        {
            $project:{
                description:0
            }
        }
    ]
    let view_list = await Blog.aggregate(pipeline)
    
    if (!view_list.length) {
        throw new ApiError(404, 'no data found')
    }
    return res.status(200).send(new ApiResponse(200,view_list,'Blog list fetched successful'))
})

export const deleteSpecificBlog = asyncHandler(async (req, res) => {
    if (!req.query.blog_id) {
        throw new ApiError(400, 'blog id is required')
    }

     let blog = await Blog.findById(req.query.blog_id)
   
    if (!blog) {
        throw new ApiError(404, 'no such data found')
    }
    await Blog.findOneAndDelete({ _id: req.query.blog_id })
    
    return res.status(204).send(new ApiResponse(204,{},'deletion successful'))
})