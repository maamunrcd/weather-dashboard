// src/services/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001", // Change to OpenWeatherMap API URL in production
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
