import { NextFunction, Request, Response } from 'express';
import * as amadeusService from '../services/amadeus.service';
import { ErrorHandlerJSON } from '../middlewares/error.handler';
import { DataValidationError } from '../exceptions/manager.exceptions';


export const getAirports = async (req: Request, res: Response, _next: NextFunction) => {
    try {

        const subType: string = req.query.subType as string;
        const keyword: string = req.query.keyword as string;

        if(!subType || !keyword) {
            throw new DataValidationError(`subType and keyword are required`);
        }
        const auth = await amadeusService.getToken();
        const getAirports = await amadeusService.getAirports(subType, keyword, auth.access_token);

        return res.json(getAirports);

    } catch (err) {
        return ErrorHandlerJSON(res).sendError(err);
    }
}