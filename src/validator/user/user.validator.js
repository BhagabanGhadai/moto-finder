import Joi from 'joi';
import { objectId } from '../custom.validation.js'

export const register = {
    body: Joi.object().keys(
        {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+}{":;\'?/><,./\\-]{3,30}$')).required(),
            role: Joi.string().valid('user', 'admin', 'member').default('user'),
            phone: Joi.string().pattern(new RegExp('^[0-9]{10}$'))
        }
    ),
};

export const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

export const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
        accessToken: Joi.string().required(),
    }),
};

export const verify_email = {
    query: Joi.object().keys({
        user_id: Joi.string().required().custom(objectId),
    }),
};

export const resend_email_verification = {
    query: Joi.object().keys({
        user_id: Joi.string().required().custom(objectId),
    }),
};

export const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

export const verifyEmailFogotPasswordOTP = {
    query: Joi.object().keys({
        user_id: Joi.string().required().custom(objectId)
    }),
    body: Joi.object().keys({
        otp: Joi.number().required()
    })
};

export const change_password = {
    query: Joi.object().keys({
        user_id: Joi.string().required().custom(objectId),
    }),
    body: Joi.object().keys({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+}{":;\'?/><,./\\-]{3,30}$')).required(),
    }),
};

export const getUsers = {
    query: Joi.object().keys({
        role: Joi.string(),
        page: Joi.number().integer(),
        page_size: Joi.number().integer(),
        search:Joi.string()
    }),
};

export const getSingleUser = {
    query: Joi.object().keys({
        user_id: Joi.string().required().custom(objectId),
    }),
};

export const updateUser = {
    query: Joi.object().keys({
        user_id: Joi.string().required().custom(objectId),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+}{":;\'?/><,./\\-]{3,30}$')),
        phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
        avatar:Joi.string(),
        is_active: Joi.boolean(),
        role:Joi.string(),
        avatar:Joi.string()
        })
        .min(1),
};

export const deleteUser = {
    query: Joi.object().keys({
        user_id: Joi.string().required().custom(objectId),
    }),
};

export const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

export const createMember = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+}{":;\'?/><,./\\-]{3,30}$')).required(),
        role: Joi.string().valid('user', 'admin', 'member'),
        isEmailVerified:Joi.boolean()
    }),
};
