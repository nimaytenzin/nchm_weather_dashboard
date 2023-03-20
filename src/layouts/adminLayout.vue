<template>
  <div class="w-full flex bg-primary-surfaceLight">
    <div class="space-y-6 bg-white h-screen shadow">
      <h1 class="font-bold text-xl text-primary-heading1 text-center p-6">
        NC
        <span class="text-primary">HM</span>
      </h1>
      <div>
        <p class="text-xs text-gray-500 text-center">Administrator</p>
      </div>

      <div id="menu" class="flex flex-col space-y-2">
        <router-link
          to="/admin"
          class="flex items-end gap-2 text-sm text-gray-700 py-2 px-10 transition duration-150 ease-in-out"
          @click="selectTab('dashboard')"
          :class="
            selectedTab === 'dashboard'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <svg
            class="w-5 h-5 fill-current inline-block"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <p class>Dashboard</p>
        </router-link>
        <router-link
          v-if="isAdmin"
          to="/admin/parameters/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('parameters')"
          :class="
            selectedTab === 'parameters'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <svg
            class="w-5 h-5 fill-current inline-block"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            />
          </svg>
          <span class>Parameters</span>
        </router-link>
        <router-link
          v-if="isAdmin"
          to="/admin/api/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('api')"
          :class="
            selectedTab === 'api'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 120.65 122.88"
            style="enable-background: new 0 0 120.65 122.88"
            xml:space="preserve"
            class="h-6 w-6 fill-current"
          >
            <g>
              <path
                d="M83.24,27.18c-0.69,0.34-1.37,0.7-2.05,1.1c-2.05,1.2-4.06,2.66-6.12,4.34l-4.39-5.03c1.51-1.41,3.16-2.69,4.91-3.82 c1.39-0.91,2.85-1.71,4.34-2.41c0.6-0.3,1.2-0.58,1.81-0.84c-2.9-5.13-7.07-8.81-11.79-11.08C65.24,7.18,59.95,6.31,54.81,6.8 c-5.11,0.49-10.08,2.35-14.18,5.54c-4.74,3.68-8.36,9.18-9.74,16.47l-0.43,2.28l-2.27,0.4c-2.22,0.39-4.21,0.92-5.95,1.6 c-1.69,0.66-3.19,1.46-4.51,2.41c-1.05,0.76-1.96,1.62-2.73,2.54c-2.39,2.86-3.5,6.45-3.47,10.08c0.03,3.69,1.23,7.41,3.44,10.47 c0.82,1.14,1.78,2.18,2.87,3.09c1.1,0.92,2.35,1.68,3.75,2.25c1.39,0.57,2.92,0.98,4.63,1.22h65.87c3.21-0.77,6.04-1.82,8.44-3.16 c2.39-1.34,4.34-2.96,5.8-4.91c2.27-3.02,3.39-7.3,3.43-11.68c0.05-4.6-1.07-9.22-3.26-12.59c-0.63-0.97-1.31-1.84-2.04-2.63 c-3.28-3.53-7.44-5.07-11.76-5.1C89.55,25.06,86.32,25.82,83.24,27.18L83.24,27.18L83.24,27.18z M113.31,84.26 c2.03,0,3.86,0.82,5.19,2.15c1.33,1.33,2.15,3.17,2.15,5.19c0,2.03-0.82,3.86-2.15,5.19c-1.33,1.33-3.17,2.15-5.19,2.15 c-2.03,0-3.86-0.82-5.19-2.15c-0.69-0.69-1.25-1.52-1.62-2.45H88.23c-1.44,0-2.61-1.17-2.61-2.61v-19.9H71.83v36.83 c0.98,0.37,1.86,0.95,2.58,1.67c1.33,1.33,2.15,3.17,2.15,5.19c0,2.03-0.82,3.86-2.15,5.19c-1.33,1.33-3.17,2.15-5.19,2.15 c-2.03,0-3.86-0.82-5.19-2.15c-1.33-1.33-2.15-3.17-2.15-5.19c0-2.03,0.82-3.86,2.15-5.19c0.73-0.73,1.6-1.3,2.58-1.67V71.84H51.02 v43.27c0,1.44-1.17,2.61-2.61,2.61H19.37c-0.36,1.15-0.99,2.18-1.82,3.01c-1.33,1.33-3.17,2.15-5.19,2.15 c-2.03,0-3.86-0.82-5.19-2.15c-1.33-1.33-2.15-3.17-2.15-5.19c0-2.03,0.82-3.86,2.15-5.19c1.33-1.33,3.17-2.15,5.19-2.15 c2.03,0,3.86,0.82,5.19,2.15c0.62,0.62,1.13,1.35,1.5,2.16H45.8V71.84H32.66v13.44c0,1.44-1.17,2.61-2.61,2.61H14.19 c-0.37,0.95-0.94,1.8-1.65,2.51c-1.33,1.33-3.17,2.15-5.19,2.15s-3.86-0.82-5.19-2.15C0.82,89.08,0,87.24,0,85.21 c0-2.03,0.82-3.86,2.15-5.19c1.33-1.33,3.17-2.15,5.19-2.15s3.86,0.82,5.19,2.15c0.74,0.74,1.33,1.65,1.7,2.65h13.2V71.84h-1.37 l-0.42-0.04c-2.42-0.31-4.63-0.88-6.62-1.7c-2.06-0.85-3.89-1.95-5.5-3.3c-1.52-1.27-2.86-2.72-4-4.29 c-3.03-4.18-4.66-9.29-4.7-14.37C4.81,43.01,6.41,37.9,9.86,33.76c1.12-1.34,2.43-2.57,3.94-3.66c1.75-1.27,3.76-2.35,6.02-3.23 c1.56-0.61,3.23-1.12,5-1.52c2-7.93,6.26-14.04,11.73-18.29c5.12-3.97,11.29-6.28,17.63-6.89C60.49-0.44,67,0.63,72.83,3.43 c6.38,3.06,11.93,8.15,15.54,15.32h0c1.45-0.23,2.9-0.34,4.35-0.33c6.1,0.04,11.98,2.22,16.62,7.22c0.97,1.05,1.89,2.22,2.75,3.54 c2.91,4.47,4.39,10.43,4.33,16.27c-0.06,5.73-1.61,11.43-4.77,15.63c-2.06,2.74-4.7,4.97-7.87,6.74c-3.05,1.71-6.61,3.01-10.6,3.93 l-0.74,0.09h-1.58v17.29h15.55c0.37-1.03,0.96-1.96,1.72-2.72C109.44,85.08,111.28,84.26,113.31,84.26L113.31,84.26z"
              />
            </g>
          </svg>

          <span class>API</span>
        </router-link>
        <!-- <router-link
          to="/admin/outlooks/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('outlooks')"
          :class="
            selectedTab === 'outlooks'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <svg
            class="w-5 h-5 fill-current inline-block"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
            ></path>
          </svg>
          <span class="">Outlooks</span>
        </router-link>-->

        <router-link
          to="/admin/weather/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('weather')"
          :class="
            selectedTab === 'weather'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
            />
          </svg>

          <span class>Weather Forecast</span>
        </router-link>
        <router-link
          to="/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('logout')"
          :class="
            selectedTab === 'logout'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <span class>Logout</span>
        </router-link>
        <!-- <router-link
          to="/admin/map/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('map')"
          :class="
            selectedTab === 'map'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>

          <span class="">Weather Map</span>
        </router-link>-->
        <!-- 
        <router-link
          to="/admin/forecast/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('forecast')"
          :class="
            selectedTab === 'forecast'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>

          <span class="">Forecast </span>
        </router-link>-->

        <!-- <router-link
          to="/admin/about/"
          class="flex gap-2 items-end px-10 text-sm py-2 transition duration-150 ease-in-out"
          @click="selectTab('about')"
          :class="
            selectedTab === 'about'
              ? 'bg-primary text-primary-textOnPrimary '
              : 'text-primary-heading1'
          "
        >
          <img src="/logotrans.png" class="w-6 h-6" alt="" />

          <span class="">About NCHM </span>
        </router-link>-->
      </div>
    </div>
    <div class="flex-1 h-screen overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  data: () => ({
    selectedTab: "dashboard",
    isAdmin: false
  }),
  created() {
    if (sessionStorage.getItem("token") !== "") {
      var decoded = VueJwtDecode.decode(sessionStorage.getItem("token"));
      if (decoded["role"] == "ADMIN") {
        this.isAdmin = true;
      }
    }
  },
  methods: {
    selectTab(tabName) {
      console.log(tabName, "Selected");
      this.selectedTab = tabName;
    }
  }
};
</script>
