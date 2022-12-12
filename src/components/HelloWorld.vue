<template>
  <button @click="login">Login</button>
</template>

<script>
import { Login } from "../dataservice/auth.service";
export default {
  methods: {
    login() {
      Login({ username: "admin", password: "overlord123" })
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
