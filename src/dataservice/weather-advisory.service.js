import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function GetWeatherAdvisoryByDate(date) {
  return await axios.get(`${BackendApi}advisory/date/${date}`);
}

export async function GetAdvisoriesToday() {
  return await axios.get(`${BackendApi}advisory/today/valid`);
}

export async function CreateNewWeatherAdvisory(data) {
  return await axios.post(`${BackendApi}advisory`, data, {
    headers: authHeader(),
  });
}

export async function DeleteWeatherAdvisory(id) {
  return await axios.delete(`${BackendApi}advisory/${id}`, {
    headers: authHeader(),
  });
}

export async function UpdateWeatherAdvisory(id, data) {
  return await axios.patch(`${BackendApi}advisory/${id}`, data, {
    headers: authHeader(),
  });
}
