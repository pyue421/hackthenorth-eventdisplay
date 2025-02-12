import axios from "axios";

const API_URL = "https://api.hackthenorth.com/v3/events";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Array of events
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
