import mongoose from 'mongoose';
import env from '../../env.js'
import { ApiError } from '../utils/ApiError.js';
import {errorLogger} from '../utils/winston.js'

export const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }
  const response = {
    ...error,
    message: error.message,
    ...(env.NODE_ENV === "dev" ? { stack: error.stack } : {}),
  };
  if(env.NODE_ENV==="dev"){
    errorLogger.error(response);
  }
  return res.status(error.statusCode).send(response);
};

