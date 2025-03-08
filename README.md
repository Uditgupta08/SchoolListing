# School Management API

This is a Node.js-based School Management API that allows users to add schools with their respective locations and retrieve a sorted list of schools based on proximity to a given user location.

## Features
- Add new schools with name, address, latitude, and longitude.
- Fetch a list of schools sorted by distance from a user's location.
- Uses Haversine formula to calculate the distance between locations.
- Error handling for invalid or missing data.
- Deployed on Render with MySQL database hosted on Aiven.

## Technologies Used
- Node.js
- Express.js
- MySQL (Hosted on Aiven)
- Render (For API Deployment)
- EJS (for views)
- dotenv (for environment configuration)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/school-management-api.git
   cd school-management-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file and add the following:
   ```env
   PORT=3000
   DB_HOST=your_aiven_db_host
   DB_USER=your_aiven_db_user
   DB_PASSWORD=your_aiven_db_password
   DB_NAME=your_aiven_db_name
   ```

4. Run the server:
   ```sh
   npm start
   ```

## API Endpoints
### 1. Add a School
**Endpoint:** `POST /school`

**Request Body:**
```json
{
  "name": "Test School",
  "address": "Test Address",
  "latitude": 0,
  "longitude": 0
}
```

**Response:**
```json
{
  "message": "School added successfully!",
  "schoolId": 1
}
```

### 2. List Schools Sorted by Distance
**Endpoint:** `GET /schools?latitude=0&longitude=0`

**Response:**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Test School",
      "address": "Test Address",
      "latitude": 0,
      "longitude": 0,
      "distance": 0
    }
  ]
}
```

## Project Structure
```
.
├── models/
│   ├── school.js (Database model & queries)
├── routes/
│   ├── schoolRoutes.js (API routes)
├── views/
│   ├── index.ejs (Frontend views if needed)
├── public/ (Static files)
├── index.js (Main server file)
├── .env (Environment variables)
├── package.json (Dependencies & scripts)
└── README.md (Documentation)
```

## Error Handling
- Returns `400 Bad Request` if required fields are missing or invalid.
- Returns `500 Internal Server Error` for database errors.

## Deployment
- **Backend:** Hosted on [Render](https://render.com/)
- **Database:** MySQL hosted on [Aiven](https://aiven.io/)
- **Live API:** [Deployed Link](https://schoollisting.onrender.com/)

## Author
Udit Gupta

