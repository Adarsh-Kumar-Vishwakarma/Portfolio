// Global error handler and async error handler for Express

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Higher-order function to wrap async route handlers
const asyncErrorHandler = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
};

// Error response for development
const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error,
    });
};

// Error response for production
const prodErrors = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.',
        });
    }
};

// Specific error handlers
const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map((val) => val.message);
    const errormessage = errors.join('. ');
    const msg = `Invalid input data: ${errormessage}`;
    return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (err) => {
    const name = err.keyValue && err.keyValue.name;
    const msg = `There is already a record with name ${name}. Please use another name!`;
    return new CustomError(msg, 400);
};

const handleExpiredJWT = () => new CustomError('JWT Token has expired. Please login again!', 401);
const handleJWTError = () => new CustomError('Invalid Token, Please login again!', 401);
const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}!`;
    return new CustomError(msg, 400);
};

// Main error handling middleware
const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    const env = process.env.NODE_ENV || 'development';
    if (env === 'development') {
        devErrors(res, error);
    } else if (env === 'production') {
        if (error.name === 'CastError') error = castErrorHandler(error);
        if (error.code === 11000) error = duplicateKeyErrorHandler(error);
        if (error.name === 'ValidationError') error = validationErrorHandler(error);
        if (error.name === 'TokenExpiredError') error = handleExpiredJWT(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
        prodErrors(res, error);
    }
};

export { asyncErrorHandler, CustomError, globalErrorHandler }; 