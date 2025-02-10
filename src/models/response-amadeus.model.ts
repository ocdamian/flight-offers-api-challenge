export interface ResponseAmadeus {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
}

export interface Itinerary {
    duration: string;
    segments: Segment[];
}

export interface Segment {
    departure: Departure;
    arrival: Arrival;
    carrierCode: string;
    number: string;
    aircraft: Aircraft;
    operating: Operating;
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
}

export interface Departure {
    iataCode: string;
    at: string;
}

export interface Arrival { 
    iataCode: string;
    at: string;
}

export interface Aircraft {
    code: string;
}   

export interface Operating {
    carrierCode: string;
}
