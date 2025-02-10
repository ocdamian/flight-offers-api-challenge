# Introduction 
This microservice implements a flight search engine that retrieves and displays flight information using the Amadeus Self-Service API. The data is fetched and sorted according to the customer's preferences, ensuring an optimized and personalized experience. The API is designed following REST principles, ensuring a consistent structure in its JSON responses.

This service uses the following providers: 
1. Amadeus’ Self-Service API

# Getting Started

Add .env File to the Project Root

To manage sensitive configurations and prevent exposing credentials in your code, it's recommended to use a .env file in the root of your project.
Steps to Set Up the .env File
1. Create a file named .env in the root of your project (if it doesn't already exist).
2. Add the following environment variables to the file:

```env
# Server Configuration
PORT=3000

# Amadeus API Credentials
AMADEUS_API_KEY=YOUR_API_KEY
AMADEUS_API_SECRET=YOUR_API_SECRET
AMADEUS_BASE_PATH=https://test.api.amadeus.com/
```

Note: Make sure to replace YOUR_API_KEY and YOUR_API_SECRET with your actual Amadeus API credentials.


To run our project locally we must:
1.  Clone the repository
2.  run npm install
3.  Run npm run dev

------------


# Documentation Swagger -- enviroment DEV

http://localhost:3000/api/v1/docs/swagger

------------

# Contribute
Other users and developers can contribute to improve the project using the best practices in development.


 











