<template>
  <div class="w-full flex justify-between">
    <div>
      <p>Apis</p>
      <div v-for="api in apis" :key="api">
        <p>
          {{ api.name }}
        </p>
        <div>Parameters</div>
      </div>
    </div>
    <div class="bg-gray-100 p-6">
      <p>Weather API</p>
      <p>EndPoint: nchm.gov.bt/weather/thimphu</p>
      <p>Description</p>
      <p>currentCity:Thimphu</p>
    </div>
    <div
      class="p-6 bg-slate-200 flex-1 h-screen overflow-y-scroll scrollbar-hide"
    >
      <vue-json-pretty :data="stationWithForecast" />
    </div>
  </div>
</template>

<script>
import { GetWeatherTodayByStation } from "../dataservice/weather-station.service";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
  components: {
    VueJsonPretty,
  },
  data: () => ({
    stationWithForecast: [],
    apis: [
      {
        name: "Get Weather By City-English",
      },
      {
        name: "Get Weather By City-Dzongkha",
      },
    ],
  }),

  created() {
    this.fetchDailyForecasts();
  },
  methods: {
    fetchDailyForecasts() {
      GetWeatherTodayByStation("Thimphu").then((res) => {
        this.stationWithForecast = res.data;
      });
    },
  },
};
</script>
