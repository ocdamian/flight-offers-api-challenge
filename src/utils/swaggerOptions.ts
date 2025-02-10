export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Challenge Deal Engine",
            version: "1.0.1",
            description: "This microservice implements a flight search engine that retrieves and displays flight information using the Amadeus Self-Service API. The data is fetched and sorted according to the customer's preferences, ensuring an optimized and personalized experience. The API is designed following REST principles, ensuring a consistent structure in its JSON responses.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            }
        ],
    },
    apis: ["./src/routes/*.ts"],
};