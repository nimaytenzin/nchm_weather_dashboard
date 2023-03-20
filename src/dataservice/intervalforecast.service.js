import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function CreateNewIntervalForecast(data) {
  return await axios.post(`${BackendApi}/interval-forecast`, data, {
    headers: authHeader(),
  });
}

export async function FindExistingIntervalForecasts(dailyforecastId,intervalId) {
  return await axios.get(`${BackendApi}/interval-forecast/did/${dailyforecastId}/int/${intervalId}`);
}

export async function updateExistingIntervalForecasts(intervalForecastsId,data) {
  return await axios.patch(`${BackendApi}/interval-forecast/${intervalForecastsId}`,data,{
    headers:authHeader(),
  });
}

export async function GetIntervalForecastByDailyForecastId(id) {
  return await axios.get(
    `${BackendApi}/interval-forecast/dailyforecast/${id}`,
    {
      headers: authHeader(),
    }
  );
}
