export interface RequestAmadeus {
    currencyCode: string;
    originDestinations: OriginDestination[];
    travelers: Traveler[];
    sources: string[];
}

export interface OriginDestination {
    id: string;
    originLocationCode: string;
    destinationLocationCode: string;
    departureDateTimeRange: DepartureDateTimeRange;
}

export interface DepartureDateTimeRange { 
    date: string;
 }

export interface Traveler {
    id: string;
    travelerType: string;   
}