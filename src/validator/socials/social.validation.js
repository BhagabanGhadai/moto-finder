import Joi from 'joi';
import { objectId } from '../custom.validation.js'

export const create_blog={
    body:Joi.object().keys({
        blog_title: Joi.string().required(),
        date: Joi.string().required(),
        description: Joi.string().required(),
        blog_banner: Joi.any(),
        blog_video: Joi.any(),
      })
}

export const update_blog={
    query:Joi.object().keys({
        blog_id:Joi.string().custom(objectId).required()
    }),
    body:Joi.object().keys({
        blog_title: Joi.string().required(),
        date: Joi.string().required(),
        description: Joi.string().required(),
        blog_banner: Joi.any(),
        blog_video: Joi.any(),
      })
}

export const delete_blog={
    query:Joi.object().keys({
        blog_id:Joi.string().custom(objectId).required()
    })
}

export const get_single_blog={
    query:Joi.object().keys({
        blog_id:Joi.string().custom(objectId).required()
    })
}

export const create_instagram={
    body:Joi.object().keys({
        instagram_url: Joi.string().required(),
        instagram_title: Joi.string().required(),
        price: Joi.number().required(),
        instagram_banner: Joi.any(),
        instagram_video: Joi.any(),
      })
}

export const update_instagram={
    query:Joi.object().keys({
        placement_id:Joi.string().custom(objectId).required()
    }),
    body:Joi.object().keys({
        instagram_url: Joi.string().required(),
        instagram_title: Joi.string().required(),
        price: Joi.number().required(),
        instagram_banner: Joi.any(),
        instagram_video: Joi.any(),
      })
}

export const delete_instagram={
    query:Joi.object().keys({
        placement_id:Joi.string().custom(objectId).required()
    })
}

export const get_single_instagram={
    query:Joi.object().keys({
        placement_id:Joi.string().custom(objectId).required()
    })
}

export const create_youtube={
    body:Joi.object().keys({
        youtube_url: Joi.string().required(),
        youtube_title: Joi.string().required(),
        youtube_banner: Joi.any(),
        youtube_video: Joi.any(),
      })
}

export const update_youtube={
    query:Joi.object().keys({
        placement_id:Joi.string().custom(objectId).required()
    }),
    body:Joi.object().keys({
        youtube_url: Joi.string().required(),
        youtube_title: Joi.string().required(),
        youtube_banner: Joi.any(),
        youtube_video: Joi.any(),
      })
}

export const delete_youtube={
    query:Joi.object().keys({
        placement_id:Joi.string().custom(objectId).required()
    })
}

export const get_single_youtube={
    query:Joi.object().keys({
        placement_id:Joi.string().custom(objectId).required()
    })
}