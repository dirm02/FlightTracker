# Flight Path Tracker API

This microservice API helps to understand and track how a particular person’s flight path may be queried.

## API Endpoint

### POST /calculate

**Description:**
This endpoint accepts a list of flights defined by a source and destination airport code and returns the ordered flight path.

**Request Body:**
- `flights`: An array of arrays, where each inner array contains a source and destination airport code.
- Example:
  ```json
  {
    "flights": [
      ["SFO", "EWR"],
      ["ATL", "EWR"],
      ["SFO", "ATL"]
    ]
  }
  ```

  **Response:**
- Returns the source and destination of the ordered flight path.
- Example:
  ```json
  ["SFO", "EWR"]
  ```

  **Error Responses:**
- `flights`: An array of arrays, where each inner array contains a source and destination airport code.
- Example:
  ```json
  {
    "error": "Invalid input format. Expected a list of flights."
  }
  ```
- Example:
  ```json
  {
    "error": "Could not determine start or end of the flight path."
  }
  ```

## Setup and Run
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   node index.js
   ```
   or
   ```bash
   npm start
   ```

3. The API will be available at `http://localhost:8080`.
