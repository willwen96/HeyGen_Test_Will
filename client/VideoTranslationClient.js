const axios = require("axios");

class VideoTranslationClient {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.maxAttempts = options.maxAttempts || 10;
        this.initialDelay = options.initialDelay || 500; // Initial delay in ms
        this.timeout = options.timeout || null; // Total timeout in ms
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
        let attempt = 0;
        let delay = this.initialDelay;
        const startTime = Date.now();

        while (attempt < this.maxAttempts) {
            // Check for timeout
            if (this.timeout && Date.now() - startTime > this.timeout) {
                throw new Error(`Polling timed out after ${this.timeout} ms`);
            }

            const status = await this.getStatus();

            if (status === 'completed' || status === 'error') {
                return { status, attempts: attempt + 1 };
            }

            console.log(`Attempt ${attempt + 1}: Status is ${status}, retrying in ${delay}ms`);
            await new Promise((resolve) => setTimeout(resolve, delay));

            delay *= 2; // Exponential backoff
            attempt++;
        }

        throw new Error('Max attempts reached. Status is still pending.');
    }
}

module.exports = VideoTranslationClient;
