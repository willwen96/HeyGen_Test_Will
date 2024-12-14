const axios = require("axios");

class VideoTranslationClient {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.initialDelay = options.initialDelay || 500; // Initial delay in ms
        this.timeout = options.timeout || 10000; // Total timeout in ms
    }

    async getStatus() {
        try {
            const response = await axios.get(`${this.baseUrl}/status`);
            return response.data.result;
        } catch (error) {
            throw new Error('Error fetching status');
        }
    }

    async pollStatus() {
        let delay = this.initialDelay;
        const startTime = Date.now();

        while (true) {
            // Check for timeout
            if (Date.now() - startTime > this.timeout) {
                throw new Error(`Polling timed out after ${this.timeout} ms`);
            }

            const status = await this.getStatus();

            if (status === 'completed' || status === 'error') {
                return { status, attempts: Math.ceil((Date.now() - startTime) / delay) };
            }

            console.log(`Status is ${status}, retrying in ${delay}ms`);
            await new Promise((resolve) => setTimeout(resolve, delay));

            delay *= 2; // Exponential backoff
        }
    }
}

module.exports = VideoTranslationClient;
