<template>
  <div class="left-sidebar">
    <div class="left-sidebar--wrapper">
      <div class="left-sidebar--wrapper-title">Main</div>
      <div class="left-sidebar--menu">
        <router-link class="left-sidebar--menu-routerlink" to="/admin/">
          <svg viewBox="0 0 512 512">
            <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path
                d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                data-original="#bfc9d1"
              />
            </g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M192 192h128v128H192zm0 0"
              fill="currentColor"
              data-original="#82b1ff"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
              fill="currentColor"
              data-original="#bfc9d1"
            />
          </svg>
          Dashboard
        </router-link>
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/advisories/"
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
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>

          Advisories
        </router-link>
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/stations/"
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
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>

          Stations
        </router-link>
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/intervals/"
          ><svg
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
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          Intervals
        </router-link>
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/stations/"
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
              d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
            />
          </svg>

          Outlooks
        </router-link>
      </div>
    </div>
    <div class="left-sidebar--wrapper">
      <div class="left-sidebar--wrapper-title">Weather Forecast</div>
      <div class="left-sidebar--menu">
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/dailyforecasts"
        >
          <svg viewBox="0 0 512 512">
            <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path
                d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                data-original="#bfc9d1"
              />
            </g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M192 192h128v128H192zm0 0"
              fill="currentColor"
              data-original="#82b1ff"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
              fill="currentColor"
              data-original="#bfc9d1"
            />
          </svg>
          Daily Forecast
        </router-link>
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/advisories/"
        >
          <svg viewBox="0 0 488.932 488.932" fill="currentColor">
            <path
              d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z"
            />
          </svg>
          Interval Forecast
        </router-link>
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/advisories/"
        >
          <svg viewBox="0 0 488.932 488.932" fill="currentColor">
            <path
              d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z"
            />
          </svg>
          Map
        </router-link>
        <router-link
          class="left-sidebar--menu-routerlink"
          to="/admin/advisories/"
        >
          <svg viewBox="0 0 488.932 488.932" fill="currentColor">
            <path
              d="M243.158 61.361v-57.6c0-3.2 4-4.9 6.7-2.9l118.4 87c2 1.5 2 4.4 0 5.9l-118.4 87c-2.7 2-6.7.2-6.7-2.9v-57.5c-87.8 1.4-158.1 76-152.1 165.4 5.1 76.8 67.7 139.1 144.5 144 81.4 5.2 150.6-53 163-129.9 2.3-14.3 14.7-24.7 29.2-24.7 17.9 0 31.8 15.9 29 33.5-17.4 109.7-118.5 192-235.7 178.9-98-11-176.7-89.4-187.8-187.4-14.7-128.2 84.9-237.4 209.9-238.8z"
            />
          </svg>
          All Weather
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftSideBar",
};
</script>

<style></style>
