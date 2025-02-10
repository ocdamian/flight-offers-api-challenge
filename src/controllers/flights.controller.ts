import { NextFunction, Request, Response } from 'express';
import * as amadeusService from '../services/amadeus.service';
import { RequestAmadeus } from '../models/request-amadeus.model';
import { ErrorHandlerJSON } from '../middlewares/error.handler';


export const getOffers = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const requestData: RequestAmadeus = req.body;
        const auth = await amadeusService.getToken();
        const flights = await amadeusService.getflights(requestData, auth.access_token);
    
        return res.json(flights);

    } catch (err) {
        return ErrorHandlerJSON(res).sendError(err);
    }
}