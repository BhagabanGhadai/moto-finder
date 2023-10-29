import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const create_plan = {
    body: Joi.object().keys({
        plan_name: Joi.string().required(),
        plan_amount: Joi.number().required(),
        plan_description: Joi.array().items(Joi.string()).required(),
        number_of_leads: Joi.number().required(),
        is_best_deal: Joi.boolean().default(false)
    })
}

export const get_single_plan={
    query:Joi.object().keys({
        plan_id:Joi.string().required().custom(objectId)
    })
}

export const update_plan={
    query:Joi.object().keys({
        plan_id:Joi.string().required().custom(objectId)
    }),
    body:Joi.object().keys({
        plan_name: Joi.string(),
        plan_amount: Joi.number(),
        plan_description: Joi.array().items(Joi.string()),
        number_of_leads: Joi.number(),
        is_best_deal: Joi.boolean().default(false),
    })
}

export const delete_plan={
    query:Joi.object().keys({
        plan_id:Joi.string().required().custom(objectId)
    })
}
