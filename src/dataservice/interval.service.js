import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function GetAllIntervals() {
  return await axios.get(`${BackendApi}/interval`, {
    headers: authHeader(),
  });
}

export async function CreateNewInterval(data) {
  return await axios.post(`${BackendApi}/interval`, data, {
    headers: authHeader(),
  });
}

export async function Deleteinterval(id) {
  return await axios.delete(`${BackendApi}/interval/${id}`, {
    headers: authHeader(),
  });
}

export async function Updateinterval(id, data) {
  return await axios.patch(`${BackendApi}/interval/${id}`, data, {
    headers: authHeader(),
  });
}
