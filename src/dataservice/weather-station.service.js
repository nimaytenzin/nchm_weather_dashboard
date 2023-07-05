import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function GetAllWeatherStations() {
  return await axios.get(`${BackendApi}/station`);
}

export async function CreateNewWeatherStation(data) {
  return await axios.post(`${BackendApi}/station`, data, {
    headers: authHeader(),
  });
}

export async function DeleteWeatherStation(id) {
  return await axios.delete(`${BackendApi}/station/${id}`, {
    headers: authHeader(),
  });
}

export async function UpdateWeatherStation(id, data) {
  return await axios.patch(`${BackendApi}/station/${id}`, data, {
    headers: authHeader(),
  });
}

export async function GetWeatherNowByStation(stationName) {
  return await axios.get(
    `${BackendApi}/interval-forecast/station/${stationName}`
  );
}

//bhutanweatherapp.nchm.gov.bt/api/medium-range-forecast/station/

export async function GetMediumRangeForecastByStation(stationName) {
  return await axios.get(
    `${BackendApi}medium-range-forecast/station/${stationName}`
  );
}
