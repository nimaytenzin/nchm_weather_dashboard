import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function GetAllWeatherOutlooks() {
  return await axios.get(`${BackendApi}/outlook`);
}

export async function CreateNewWeatherOutlook(data) {
  return await axios.post(`${BackendApi}/outlook`, data, {
    headers: authHeader(),
  });
}

export async function DeleteWeatherOutlook(id) {
  return await axios.delete(`${BackendApi}/outlook/${id}`, {
    headers: authHeader(),
  });
}

export async function UpdateWeatherOutlook(id, data) {
  return await axios.patch(`${BackendApi}/outlook/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
