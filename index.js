const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Function to check if a number is prime
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return sum === num && num !== 1;
};

const isArmstrong = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    return digits.reduce((sum, d) => sum + d ** power, 0) === num;
};

// Function to get the sum of digits
const getDigitSum = (num) => num.toString().split("").reduce((sum, d) => sum + parseInt(d), 0);

// API endpoint to classify a number
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;

    if (!number || isNaN(Number(number))) {
        return res.status(400).json({ error: true, message: "Invalid or missing number parameter" });
    }

    const num = parseInt(number);
    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    try {
        console.log(`Fetching fact for number: ${num}`); // Debugging

        const { data } = await axios.get(`http://numbersapi.com/${num}/math?json`);
        
        console.log("API Response:", data); // Debugging

        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: getDigitSum(num),
            fun_fact: data.text || "No fun fact available",
        });
    } catch (error) {
        console.error("Error fetching fact:", error.message || error);
        
        res.status(500).json({
            error: "Failed to fetch fact",
            details: error.response ? error.response.data : error.message,
        });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
