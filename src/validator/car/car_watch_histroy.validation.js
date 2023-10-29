import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const add_watch_hostory={
    body:Joi.object().keys({
        user_id:Joi.string().required().custom(objectId),
        car_id:Joi.string().required().custom(objectId)
    })
}

export const get_watch_hostory={
    query:Joi.object().keys({
        user_id:Joi.string().required().custom(objectId),
        car_id:Joi.string().required().custom(objectId)
    })
}