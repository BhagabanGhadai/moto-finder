import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const add_car_model={
    body:Joi.object().keys({
        car_brand:Joi.string().required().custom(objectId),
        car_model_name:Joi.string().required()
    })
}

export const update_car_model={
    query:Joi.object().keys({
        car_model_id:Joi.string().required().custom(objectId)
    }),
    body:Joi.object().keys({
        car_brand:Joi.string().custom(objectId),
        car_model_name:Joi.string()
    })
}

export const delete_car_model={
    query:Joi.object().keys({
        car_model_id:Joi.string().required().custom(objectId)
    })
}

export const get_single_model={
    query:Joi.object().keys({
        car_model_id:Joi.string().required().custom(objectId)
    })
}

export const get_all_car_model={
    query:Joi.object().keys({
        brand:Joi.string().custom(objectId)
    })
}