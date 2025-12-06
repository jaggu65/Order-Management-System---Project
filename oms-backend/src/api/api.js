// src/api/api.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080", // ✅ Make sure this matches your backend port
});
