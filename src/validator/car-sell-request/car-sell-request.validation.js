import Joi from "joi";
import { objectId } from '../custom.validation.js'

export const create_sell_request = {
    body: Joi.object().keys({
        user_id: Joi.string().custom(objectId),
        car_brand: Joi.string().required(),
        rto_location: Joi.string().required(),
        year: Joi.string().required(),
        car_model: Joi.string().required(),
        owner_serial_no: Joi.number().required(),
        kms_driven: Joi.number().required(),
        transmission: Joi.string().valid('Automatic', 'Manual').required(),
        when_want_to_sell: Joi.string().valid('immediately', 'in a month', 'after a month', 'just checking price').required(),
        status: Joi.string().valid('initiated', 'paid', 'cancelled', 'approved').default('initiated'),
        expected_price: Joi.number(),
        schedule_date: Joi.string(),
        is_dealer_verification: Joi.boolean().default(false),
        contact_details: Joi.object({
            full_name: Joi.string(),
            email: Joi.string(),
            phone_number: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
            state: Joi.string(),
            city: Joi.string(),
            pincode: Joi.number(),
            address: Joi.string(),
        }),
    })
}

export const update_sell_request = {
    query:Joi.object().keys({
        sell_request_id:Joi.string().required().custom(objectId)
    }),
    body: Joi.object().keys({
        user_id: Joi.string(),
        car_brand: Joi.string(),
        rto_location: Joi.string(),
        year: Joi.string(),
        car_model: Joi.string(),
        owner_serial_no: Joi.number(),
        kms_driven: Joi.number(),
        transmission: Joi.string().valid('Automatic', 'Manual'),
        when_want_to_sell: Joi.string().valid('immediately', 'in a month', 'after a month', 'just checking price'),
        status: Joi.string().valid('initiated', 'paid', 'cancelled', 'approved'),
        expected_price: Joi.number(),
        schedule_date: Joi.string(),
        is_dealer_verification: Joi.boolean(),
        contact_details: Joi.object({
            full_name: Joi.string(),
            email: Joi.string(),
            phone_number: Joi.number(),
            state: Joi.string(),
            city: Joi.string(),
            pincode: Joi.number(),
            address: Joi.string(),
        }),
    })
}

export const delete_sell_request={
    query:Joi.object().keys({
        sell_request_id:Joi.string().required().custom(objectId)
    })
}

export const get_single_sell_request={
    query:Joi.object().keys({
        sell_request_id:Joi.string().required().custom(objectId)
    })
}

export const get_sell_request={
    query:Joi.object().keys({
        page:Joi.number(),
        page_size:Joi.number(),
        user_id:Joi.string().custom(objectId),
        status:Joi.string(),
        dealer_verification:Joi.string()
    })
}