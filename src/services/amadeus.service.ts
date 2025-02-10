import axios from "axios";
import {
  BusinessError,
  DataValidationError,
} from "../exceptions/manager.exceptions";
import { UserAmadeus } from "../models/user-amadeus.model";
import { ResponseAmadeus } from "../models/response-amadeus.model";
import { RequestAmadeus } from "../models/request-amadeus.model";
import { FlightInfo } from "../models/flight-info";
import offersResponse from "../responsesTest/offersResponse.json";
import { AirportInfo } from "models/airport-info";
import { match } from "ts-pattern";

export const getToken = async (): Promise<UserAmadeus> => {
  try {
    const pathAuth = `${process.env.AMADEUS_BASE_PATH}/v1/security/oauth2/token`;
    const apiKey = process.env.AMADEUS_API_KEY;
    const apiSecret = process.env.AMADEUS_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new DataValidationError("API Key or Secret are missing");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", apiKey);
    params.append("client_secret", apiSecret);

    const response = await axios.post(pathAuth, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (err) {
    throw new DataValidationError(`ERROR ${err}`);
  }
};

export const getflights = async (request: RequestAmadeus, token: string) => {
  try {
    const API_URL = `${process.env.AMADEUS_BASE_PATH}/v2/shopping/flight-offers`;
    
    const response = await axios.post(API_URL, request, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.data.length === 0) {
      throw new BusinessError(`ERROR: No flights were found.`);
    }

    // const response = offersResponse;

    let infoFlights = await getInfoFlights(response.data.data);

    return infoFlights;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const _error = error.response.data.errors[0];
        handleError(_error, status);
      }
    }
    throw new DataValidationError(
      "Unexpected error occurred while fetching airport data"
    );
  }
};

const getInfoFlights = async (response: ResponseAmadeus[]) => {
  const flights: FlightInfo[] = [];

  response.forEach((offer: any) => {
    offer.itineraries.forEach((itinerary: any) => {
      itinerary.segments.forEach((segment: any) => {
        flights.push({
          origin: segment.departure.iataCode,
          destination: segment.arrival.iataCode,
          airline: segment.carrierCode,
          flight_number: segment.number,
        });
      });
    });
  });

  return flights;
};

export const getAirports = async (
  subType: string,
  keyword: string,
  token: string
) => {
  try {
    const API_URL = `${process.env.AMADEUS_BASE_PATH}/v1/reference-data/locations`;
    
    const params = {
      subType: subType,
      keyword: keyword,
    };

    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const airports: AirportInfo[] = response.data.data.map((airport: any) => ({
      airport_id: airport.id,
      name: airport.name,
      city: airport.address.cityName,
      country: airport.address.countryName,
      iata: airport.iataCode,
      latitude: airport.geoCode.latitude,
      longitude: airport.geoCode.longitude,
      timezone: airport.timeZoneOffset,
      type: airport.subType,
    }));

    return airports;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const _error = error.response.data.errors[0];
        handleError(_error, status);
      }
    }
    throw new DataValidationError(
      "Unexpected error occurred while fetching airport data"
    );
  }
};

const handleError = (_error: any, status: number) => {
  return match(status)
    .with(400, () => {
      throw new BusinessError(
        `Bad Request: code ${_error.code} - message ${_error.title}`
      );
    })
    .with(401, () => {
      throw new DataValidationError(
        `Unauthorized Access: ${_error.code} - ${_error.title}`
      );
    })
    .with(500, () => {
      throw new BusinessError(
        `Api error: code ${_error.code} - message ${_error.title}`
      );
    })
    .otherwise(() => {
      throw new BusinessError(
        `Unexpected error: code ${_error.code} - message ${_error.title}`
      );
    });
};
