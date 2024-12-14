# VideoTranslationClient Library

A Node.js client library for interacting with a simulated video translation server. It polls the server to get the status of a video translation job with **exponential backoff** and a configurable **timeout**.

---

## Features
- **Automatic Polling with Exponential Backoff**: Gradually increases the delay between retries to reduce server load.
- **Configurable Timeout**: Stops polling after a set duration.
- **Max Retry Attempts**: Limits the number of retries.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/HeyGen_Test_Will.git
   cd HeyGen_Test_Will
   ```
   
2. Install dependencies:
   ```bash
    cd server
    npm install
    cd ../client
    npm install
   ```
## Running the Server
   ```bash
    cd server
    node app.js
   ```
The server runs at http://localhost:3000 and provides the /status endpoint.