<template>
  <div class="video-bg">
    <button @click="login">LOGIN</button>
  </div>
</template>
<style scoped>
.wrapper {
  background: #07c url("../assets/bg.jpeg") center / cover no-repeat fixed;
  font: 1em/1.618 Nunito, sans-serif;
}
</style>
<script>
import { Login } from "../dataservice/auth.service";
export default {
  created() {
    //   console.log(COMPANYNAME);
    //   console.log("welcome to login");
    //  useToast().warning("Helo");
  },
  data() {
    return {
      loginPayload: {
        username: "admin",
        password: "overlord123",
      },
    };
  },
  computed: {},
  methods: {
    login() {
      Login(this.loginPayload).then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);
          this.$router.push("/admin");
        }
      });
    },
  },
};
</script>
