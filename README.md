# VideoTranslationClient Library

An easy-to-use client library for interacting with a simulated video translation server powered by `express`. It polls the server to get the status of a video translation job with exponential backoff and a configurable timeout.

---

## Features
- **Automatic Polling with Exponential Backoff**: Gradually increases the delay between retries to reduce server load.
- **Configurable Timeout**: Stops polling after a set duration.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/willwen96/HeyGen_Test_Will.git
   cd HeyGen_Test_Will
   ```
   
2. Install dependencies:
   ```bash
    npm install
   ```
## Running the Server
   ```bash
    cd server
    node app.js
   ```
The server runs at http://localhost:3000 and provides the `/status` endpoint.

## Using the Client Library
The `VideoTranslationClient` polls the `/status` endpoint until the status is either `completed` or `error`, or until it times out.

### Example Usage
1. Create a client application in `app.js`:
   ```javascript
   const VideoTranslationClient = require('./VideoTranslationClient');
   
   (async () => {
       const client = new VideoTranslationClient('http://localhost:3000', {
           initialDelay: 500, // Initial retry delay in ms
           timeout: 8000     // Total timeout in ms
       });
   
       try {
           const result = await client.pollStatus();
           console.log(`Final Result: ${result.status} after ${result.attempts} attempts`);
       } catch (error) {
           console.error('Error:', error.message);
       }
   })();
   ```

2. Run the client:
   ```bash
    cd client
    node app.js
   ```

## Configuration Options

The `VideoTranslationClient` constructor accepts the following options:

| Option           | Type     | Default | Description                                   |
|------------------|----------|---------|-----------------------------------------------|
| `baseUrl`        | String   | None    | URL of the video translation server.          |
| `initialDelay`   | Number   | 500     | Initial delay between retries in milliseconds.|
| `timeout`        | Number   | null    | Total timeout for polling in milliseconds.    |
