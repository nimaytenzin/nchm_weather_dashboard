<template>
  <div class="flex items-center justify-center h-screen">
    <!-- Login Container -->
    <div
      class="min-w-xl flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]"
      style="width: 20rem"
    >
      <div class="mb-8 flex justify-center">
        <img class="w-24" src="logo.jpeg" alt="" />
      </div>

      <div class="flex flex-col text-sm rounded-md">
        <input
          class="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
          type="text"
          v-model="loginPayload.username"
          placeholder="Username"
        />
        <input
          class="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
          type="password"
          v-model="loginPayload.password"
          placeholder="Password"
        />
      </div>
      <button
        class="mt-5 w-full border p-2 bg-gradient-to-r from-primary bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300"
        @click="login"
      >
        Log in
      </button>
    </div>
  </div>
</template>

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
