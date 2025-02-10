import { getOffers } from '../controllers/flights.controller';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: flight-offers
 *  description: Flight offers endpoint
 */

/**
 * @swagger
 * /api/v1/offers:
 *  post:
 *    summary: Get flight offers based on the given criteria
 *    tags: [flight-offers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              currencyCode:
 *                type: string
 *                description: The currency code (e.g., "MXN")
 *              originDestinations:
 *                type: array
 *                description: List of origin-destination details for flight offers
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: The unique ID for the origin-destination pair
 *                    originLocationCode:
 *                      type: string
 *                      description: The IATA code of the origin airport
 *                    destinationLocationCode:
 *                      type: string
 *                      description: The IATA code of the destination airport
 *                    departureDateTimeRange:
 *                      type: object
 *                      properties:
 *                        date:
 *                          type: string
 *                          format: date
 *                          description: The departure date of the flight
 *              travelers:
 *                type: array
 *                description: List of travelers
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: The ID of the traveler
 *                    travelerType:
 *                      type: string
 *                      description: The type of traveler (e.g., "ADULT")
 *              sources:
 *                type: array
 *                description: List of sources for the flight offers
 *                items:
 *                  type: string
 *                  description: The source of the flight offer (e.g., "GDS")
 *    responses:
 *      200:
 *        description: List of flight offers retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  origin:
 *                    type: string
 *                    description: The IATA code of the origin airport
 *                  destination:
 *                    type: string
 *                    description: The IATA code of the destination airport
 *                  airline:
 *                    type: string
 *                    description: The airline code
 *                  flight_number:
 *                    type: string
 *                    description: The flight number
 *      400:
 *        description: Bad request (invalid parameters)
 *      500:
 *        description: Internal server error
 */

router.post('/offers', getOffers);

export default router;