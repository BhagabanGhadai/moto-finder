import Joi from 'joi';

export const subscribe={
    body:Joi.object().keys({
        email:Joi.string().email().required()
    })
}

export const unsubscribe={
    body:Joi.object().keys({
        email:Joi.string().email().required()
    })
}