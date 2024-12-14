const TranslationClient = require('./VideoTranslationClient');

(async () => {
    const client = new TranslationClient('http://localhost:3000', {
        initialDelay: 500,
        timeout: 8000, // 8 seconds timeout
    });

    try {
        const result = await client.pollStatus();
        console.log(`Final Result: ${result.status} after ${result.attempts} attempts`);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
