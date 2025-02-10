import { Router } from 'express';
import { getAirports } from '../controllers/airports.controller';

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        error:
 *          type: boolean
 *          description: Indicates if there was an error
 *        type:
 *          type: string
 *          description: The type of error, if available
 *        messages:
 *          type: string
 *          description: The error messages, if available
 *    FlightInfo:
 *      type: object
 *      properties:
 *        origin:
 *          type: string
 *          description: The origin airport IATA code
 *        destination:
 *          type: string
 *          description: The destination airport IATA code
 *        airline:
 *          type: string
 *          description: The airline code
 *        flight_number:
 *          type: string
 *          description: The flight number
 *    AirportInfo:
 *      type: object
 *      properties:
 *        airport_id:
 *          type: string
 *          description: The unique ID of the airport
 *        name:
 *          type: string
 *          description: The name of the airport
 *        city:
 *          type: string
 *          description: The city where the airport is located
 *        country:
 *          type: string
 *          description: The country where the airport is located
 *        iata:
 *          type: string
 *          description: The IATA code of the airport
 *        latitude:
 *          type: number
 *          description: The latitude of the airport
 *        longitude:
 *          type: number
 *          description: The longitude of the airport
 *        timezone:
 *          type: string
 *          description: The timezone of the airport
 *        type:
 *          type: string
 *          description: The type of location (e.g., "AIRPORT")
 */


/**
 * @swagger
 * tags:
 *  name: airports
 *  description: airports endpoint
 */

/**
 * @swagger
 * /api/v1/airports-cities:
 *  get:
 *    summary: Get a list of airports and cities
 *    tags: [airports]
 *    parameters:
 *      - in: query
 *        name: subType
 *        required: true
 *        schema:
 *          type: string
 *          description: Type of location (e.g., "AIRPORT")
 *      - in: query
 *        name: keyword
 *        required: true
 *        schema:
 *          type: string
 *          description: Keyword to search (e.g., city or airport name)
 *    responses:
 *      200:
 *        description: List of airports retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  airport_id:
 *                    type: string
 *                    description: The ID of the airport
 *                  name:
 *                    type: string
 *                    description: The name of the airport
 *                  city:
 *                    type: string
 *                    description: The city where the airport is located
 *                  country:
 *                    type: string
 *                    description: The country where the airport is located
 *                  iata:
 *                    type: string
 *                    description: The IATA code of the airport
 *                  latitude:
 *                    type: number
 *                    description: The latitude of the airport
 *                  longitude:
 *                    type: number
 *                    description: The longitude of the airport
 *                  timezone:
 *                    type: string
 *                    description: The timezone of the airport
 *      400:
 *        description: Bad request (invalid parameters)
 *      401:
 *        description: Unauthorized access (invalid or missing token)
 *      500:
 *        description: Internal server error
 */
router.get('/airports-cities', getAirports);


export default router;