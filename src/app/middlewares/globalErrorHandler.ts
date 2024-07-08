import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler : ErrorRequestHandler = (err , req, res, next) => {

  //setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
 
  let errorSources : TErrorSources = [{
    path: '',
    message: 'Something went wrong!'
  }]

  if(err instanceof ZodError){  
    const simlifiedZodError = handleZodError(err);
    statusCode = simlifiedZodError?.statusCode
    message = simlifiedZodError?.message
    errorSources = simlifiedZodError?.errorSources
  }else if(err?.name === 'ValidationError'){
    const simlifiedMongooseError = handleValidationError(err);
    statusCode = simlifiedMongooseError?.statusCode
    message = simlifiedMongooseError?.message
    errorSources = simlifiedMongooseError?.errorSources
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ?  err?.stack : null
  });
};

export default globalErrorHandler
