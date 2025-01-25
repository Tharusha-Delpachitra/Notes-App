const express = require("express");
const cors = require("cors");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(
    cors({
        origin: "*", // Allows all origins (use specific origin(s) for better security)
    })
);

// Route for the root URL
app.get("/", (req, res) => {
    res.send("Hello");
});

// Start the server on port 8000
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;
