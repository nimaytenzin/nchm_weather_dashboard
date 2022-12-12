<template>
  <div class="app">
    <div class="header">
      <div class="header--menu-circle"></div>

      <div class="header--profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
          />
        </svg>

        <img
          class="header--profile-img"
          src="/src/assets/logo_notext.png"
          alt=""
        />
      </div>
    </div>
    <div class="wrapper">
      <LeftSideBar />
      <div class="wrapper--main-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSideBar from "./left-sidebar.vue";

export default {
  components: { LeftSideBar },
};
</script>
