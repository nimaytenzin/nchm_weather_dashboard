import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function CreateNewIntervalForecast(data) {
  return await axios.post(`${BackendApi}/interval-forecast`, data, {
    headers: authHeader(),
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
