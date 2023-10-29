import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const create_testimonial={
    body:Joi.object().keys(
        {
            customer_name:Joi.string().required(),
            customer_address:Joi.string().required(),
            testimony:Joi.string().required(),
            testimony_img:Joi.string(),
            testimony_video:Joi.string()
        }
    )
}

export const get_testimonial={
    query:Joi.object().keys({
        testimony_id: Joi.string().custom(objectId)
    })
}

export const delete_testimonial={
    query:Joi.object().keys({
        testimony_id: Joi.string().required().custom(objectId)
    })
}