const { spawn } = require("child_process");
const VideoTranslationClient = require("./VideoTranslationClient");

(async () => {
    console.log("Starting the integration test...");

    // 1. Start the server
    const serverProcess = spawn("node", ["../server/app.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    // 2. Let server spin up
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay to ensure server starts

    // 3. Use the client library to poll the server
    const client = new VideoTranslationClient("http://localhost:3000", {
        initialDelay: 500, // 500ms initial delay
        timeout: 8000     // 8 seconds timeout
    });

    try {
        console.log("Polling the server for status...");
        const result = await client.pollStatus();
        console.log(`Final Result: Status is '${result.status}'`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        // 4. Terminate the server process
        console.log("Stopping the server...");
        serverProcess.kill("SIGTERM");
    }
})();
