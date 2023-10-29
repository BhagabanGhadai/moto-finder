import Joi from 'joi';
import { objectId } from '../custom.validation.js'

export const create_request={
    body:Joi.object().keys({
        mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        status:Joi.string().valid("pending","compelted").default("pending")
    })
}

export const update_request={
    body:Joi.object().keys({
        mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        status:Joi.string().valid("pending","compelted")
    })
}

export const delete_request={
    body:Joi.object().keys({
        mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required()
    })
}