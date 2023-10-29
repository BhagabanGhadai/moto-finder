import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const add_wishlist={
    body:Joi.object().keys({
        user_id:Joi.string().required().custom(objectId),
        car_id:Joi.string().required().custom(objectId)
    })
}

export const get_wishlist={
    query:Joi.object().keys({
        user_id:Joi.string().required().custom(objectId),
        car_id:Joi.string().required().custom(objectId)
    })
}