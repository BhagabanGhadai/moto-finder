import dotenv from 'dotenv'
import { ApiError } from '../../utils/ApiError.js';
process.env.NODE_ENV == "prod" ? dotenv.config({ path: "./.env" }) : dotenv.config({ path: "./.env" })
import Joi from 'joi'

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid('prod', 'dev').required(),
    PORT: Joi.number().default(8080),
    DB_NAME: Joi.string().required().description('Mongo DB url'),
    REFRESH_TOKEN_SECRET: Joi.string().required().description('JWT secret key'),
    ACCESS_TOKEN_SECRET: Joi.string().required().description('JWT secret key'),
    ACCESS_TOKEN_EXPIRY: Joi.string().default('1day').description('minutes after which access tokens expire'),
    REFRESH_TOKEN_EXPIRY: Joi.string().default('10day').description('days after which refresh tokens expire'),
    NODE_MAILER_EMAIL: Joi.string().required().description('username for email server'),
    NODE_MAILER_PASSWORD: Joi.string().required().description('password for email server'),
    SALT_ROUND:Joi.number().default(10).description('password hassing level'),
    PASSWORD_EXPIRATION_MINUTES: Joi.number().default(2).description('minutes after which OTP expires'),
    cloudinary_cloud_name: Joi.string().required().description('for storing image in cloudinary cloud name'),
    cloudinary_api_key: Joi.string().required().description('for storing image in cloudinary cloud api key'),
    cloudinary_api_secret: Joi.string().required().description('for storing image in cloudinary cloud key secret')
  })
  .unknown();

const { value: envVars, error:error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new ApiError(404,'setup .env file first',error.message)
}

const config = {
    DB_NAME: envVars.DB_NAME,
    PORT: envVars.PORT,
    ACCESS_TOKEN_SECRET: envVars.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: envVars.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: envVars.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: envVars.REFRESH_TOKEN_EXPIRY,
    PASSWORD_EXPIRATION_MINUTES:envVars.PASSWORD_EXPIRATION_MINUTES,
    NODE_ENV: envVars.NODE_ENV,
    EMAIL: envVars.NODE_MAILER_EMAIL,
    PASSWORD: envVars.NODE_MAILER_PASSWORD,
    cloudinary_cloud_name: envVars.cloudinary_cloud_name,
    cloudinary_api_key: envVars.cloudinary_api_key,
    cloudinary_api_secret: envVars.cloudinary_api_secret,
    SALT_ROUND: envVars.SALT_ROUND,
    Private_API_Key: envVars.Private_API_Key,
    Private_Auth_Token: envVars.Private_Auth_Token,
    Private_Salt: envVars.Private_Salt
}

export default config