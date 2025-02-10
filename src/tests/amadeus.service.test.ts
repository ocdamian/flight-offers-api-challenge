import axios from "axios";
import * as amadeusService from "../services/amadeus.service";

jest.mock("axios");

describe("Servicio getAirports", () => {
  
  it("Debería transformar una lista de aeropuertos a nuestra lista esperada", async () => {
    const mockResponse = {
      data: {
        data: [
          {
            type: "location",
            subType: "AIRPORT",
            name: "BENITO JUAREZ INTL",
            detailedName: "MEXICO CITY/MX:BENITO JUAREZ I",
            id: "AMEX",
            self: {
              href: "https://test.api.amadeus.com/v1/reference-data/locations/AMEX",
              methods: ["GET"],
            },
            timeZoneOffset: "-06:00",
            iataCode: "MEX",
            geoCode: { latitude: 19.43639, longitude: -99.07222 },
            address: { cityName: "MEXICO CITY", countryName: "MEXICO" },
            analytics: { travelers: [] },
          },
          {
            type: "location",
            subType: "CITY",
            name: "MEXICO CITY",
            detailedName: "MEXICO CITY/MX",
            id: "CMEX",
            self: {
              href: "https://test.api.amadeus.com/v1/reference-data/locations/CMEX",
              methods: ["GET"],
            },
            timeZoneOffset: "-06:00",
            iataCode: "MEX",
            geoCode: { latitude: 19.43639, longitude: -99.07222 },
            address: { cityName: "MEXICO CITY", countryName: "MEXICO" },
            analytics: { travelers: [] },
          },
          {
            type: "location",
            subType: "AIRPORT",
            name: "TOLUCA-A.LOPEZ MATEOS",
            detailedName: "MEXICO CITY/MX:TOLUCA-A.LOPEZ",
            id: "ATLC",
            self: {
              href: "https://test.api.amadeus.com/v1/reference-data/locations/ATLC",
              methods: ["GET"],
            },
            timeZoneOffset: "-06:00",
            iataCode: "TLC",
            geoCode: { latitude: 19.33695, longitude: -99.56611 },
            address: { cityName: "MEXICO CITY", countryName: "MEXICO" },
            analytics: { travelers: [] },
          },
        ],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await amadeusService.getAirports(
      "AIRPORT,CITY,",
      "MEX",
      "Y8BI48a1CcmiH8axR1yMFTZ05hr1"
    );

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe("BENITO JUAREZ INTL");
  });

  it("Debería manejar un error si la API de Amadeus falla", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Error en API"));

    await expect(
      amadeusService.getAirports(
        "AIRPORT,CITY,",
        "MEX",
        "Y8BI48a1CcmiH8axR1yMFTZ05hr1"
      )
    ).rejects.toThrow("Unexpected error occurred while fetching airport data");
  });
});
