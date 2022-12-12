import axios from "axios";
import { BackendApi } from "../constants";
import authHeader from "./auth-HeaderServices";

export async function Login(data) {
  return await axios.post(`${BackendApi}/auth/login`, data);
}

export async function AddNewUser(data) {
  return await axios.post(`${BackendApi}/auth/signup`, data);
}

export async function VerfiyToken() {
  // let verified = false
  return await axios
    .get(`${BackendApi}/auth/verify`, { headers: authHeader() })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  // return verified;
}
