import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function CreateDailyForecasts(data) {
  return await axios.post(`${BackendApi}/station/addDailyForecast`, data, {
    headers: authHeader(),
  });
}

export async function UpdateailyForecastsByDate(data) {
  return await axios.patch(`${BackendApi}/daily-forecast/date`, data, {
    headers: authHeader(),
  });
}

export async function GetDailyForecastByDate(date) {
  return await axios.get(`${BackendApi}/daily-forecast/date/${date}`, {
    headers: authHeader(),
  });
}

export async function GetIntervalMapper() {
  return await axios.get(`${BackendApi}/interval`, {
    headers: authHeader(),
  });
}

export async function GetOutlookMapper() {
  return await axios.get(`${BackendApi}/outlook`, {
    headers: authHeader(),
  });
}

export async function GetDailyForecastForAllStationsToday() {
  return await axios.get(`${BackendApi}/station/allweather/today`, {
    headers: authHeader(),
  });
}

export async function GetDailyForecastForAllStationsByDate(date) {
  return await axios.get(`${BackendApi}/station/date/${date}`, {
    headers: authHeader(),
  });
}

export async function ConvertNumbersToDzongkha(number) {
  return await axios.get(`${BackendApi}/daily-forecast/transform/${number}`, {
    headers: authHeader(),
  });
}

export async function GetWeatherTodayForAll() {
  return await axios.get(`${BackendApi}/station/allweather`);
}

export async function UpdateWeatherOutlook(id, data) {
  return await axios.patch(`${BackendApi}/outlook/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
