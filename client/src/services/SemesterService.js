import axios from "axios";
import authHeader from "./AuthHeader";
let url;
if (process.env.PRODUCTION) {
  url = "https://studyplan.herokuapp.com";
} else {
  url = "http://localhost:3000";
}

const server = axios.create({
  baseURL: url,
});

export default {
  fetchSemesters() {
    return server.get("semesters", { headers: authHeader() });
  },
};