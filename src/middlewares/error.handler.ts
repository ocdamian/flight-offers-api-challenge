import { Response } from 'express'
import { BusinessError, DataValidationError, SecurityError } from '../exceptions/manager.exceptions';
import { ErrorType } from '../models/error.model';
import { ErrorModel } from '../models/error.model';

class ErrorHandler {
    private _res: Response;
    constructor(res: Response) {
        this._res = res;
    }

    sendError(err: any) {
        let error: ErrorModel = { };
        if (err instanceof DataValidationError) {
            error.type = ErrorType.DATA_VALIDATION;
            error.messages = err.message;
            return this._res.status(400).json(error);

        } else if (err instanceof BusinessError) {
            error.type = ErrorType.BUSINESS_RULE;
            error.messages = err.message;
            return this._res.status(400).json(error);

        } else if (err instanceof SecurityError) {
            error.type = ErrorType.BUSINESS_RULE;
            error.messages = err.message;
            return this._res.status(400).json(error);

        } else {

            return this._res
                .status(500)
                .send({ error: true, type: "ERROR", messages: err });
        }

    }
}

export const ErrorHandlerJSON = (res: Response) => {
    return new ErrorHandler(res);
};

