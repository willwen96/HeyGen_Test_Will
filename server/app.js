const express = require('express');
const {get} = require("axios");
const app = express();

let taskStatus = 'pending';
const CONFIGURABLE_DELAY = getRandomDelay(1000,9000);
let startTime = Date.now();

// Return a random delay in ms
function getRandomDelay(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// Simulate the status API
app.get('/status', (req, res) => {
    const elapsed = Date.now() - startTime;

    if (elapsed > CONFIGURABLE_DELAY && taskStatus === 'pending') {
        taskStatus = Math.random() > 0.25 ? 'completed' : 'error'; // 75% chance of completion
    }

    res.json({ result: taskStatus });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}\nDelay is ${CONFIGURABLE_DELAY} ms`);
});
