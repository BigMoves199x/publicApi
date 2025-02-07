# publicApi
# Number Classification API  

This is a simple REST API that classifies numbers based on mathematical properties and provides a fun fact about the number.  

---

## Features  
- Checks if a number is *prime* or *perfect*.  
- Identifies whether a number is an *Armstrong number*.  
- Determines if the number is *even* or *odd*.  
- Computes the *sum of digits* of the number.  
- Fetches a *fun fact* about the number from the [Numbers API](http://numbersapi.com/).  

---

## API Endpoint  

### 1. Classify a Number  
- *Method:* GET  
- *URL:*

- *Example Request:*

GET /api/classify-number?number=371

- *Success Response (200 OK):*  
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

Error Response (400 Bad Request):
{
    "number": "abc",
    "error": true
}

TEST THE API LOCALLY 

http://localhost:5000/api/classify-number?number=371

## API Endpoint  

node index.js

