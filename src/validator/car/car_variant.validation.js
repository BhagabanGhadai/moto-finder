import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const add_car_variant={
    body:Joi.object().keys({
        car_model:Joi.string().required().custom(objectId),
        car_brand:Joi.string().required().custom(objectId),
        car_variant_name:Joi.string().required()
    })
}

export const update_car_variant={
    query:Joi.object().keys({
        car_variant_id:Joi.string().required().custom(objectId)
    }),
    body:Joi.object().keys({
        car_model:Joi.string().custom(objectId),
        car_brand:Joi.string().custom(objectId),
        car_variant_name:Joi.string()
    })
}

export const delete_car_variant={
    query:Joi.object().keys({
        car_variant_id:Joi.string().required().custom(objectId)
    })
}

export const get_single_variant={
    query:Joi.object().keys({
        car_variant_id:Joi.string().required().custom(objectId)
    })
}

export const get_all_car_variant={
    query:Joi.object().keys({
        brand:Joi.string().custom(objectId),
        model:Joi.string().custom(objectId)
    })
}