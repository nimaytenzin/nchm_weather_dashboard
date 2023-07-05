import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function GetWeatherAdvisoryByDate(date) {
  return await axios.get(`${BackendApi}/advisory/date/${date}`);
}

export async function GetAdvisoriesToday() {
  return await axios.get(`http://localhost:3000/advisory/today/valid`);
}

export async function CreateNewWeatherAdvisory(data) {
  return await axios.post(`http://localhost:3000/advisory`, data, {
    headers: authHeader(),
  });
}

export async function DeleteWeatherAdvisory(id) {
  return await axios.delete(`http://localhost:3000/advisory/${id}`, {
    headers: authHeader(),
  });
}

export async function UpdateWeatherAdvisory(id, data) {
  return await axios.patch(`http://localhost:3000/advisory/${id}`, data, {
    headers: authHeader(),
  });
}
