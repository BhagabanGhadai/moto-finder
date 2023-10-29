import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const add_car_brand={
    body:Joi.object().keys({
        car_brand_name:Joi.string().required(),
        car_brand_image:Joi.any()
    })
}

export const update_car_brand={
    query:Joi.object().keys({
        car_brand_id:Joi.string().required().custom(objectId)
    }),
    body:Joi.object().keys({
        car_brand_name:Joi.string(),
        car_brand_image:Joi.any()
    })
}

export const delete_car_brand={
    query:Joi.object().keys({
        car_brand_id:Joi.string().required().custom(objectId)
    })
}

export const get_single_car={
    query:Joi.object().keys({
        car_brand_id:Joi.string().required().custom(objectId)
    })
}

export const get_all_car_brand={
    query:Joi.object().keys({
        search:Joi.string()
    })
}