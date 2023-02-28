<template>
  <div class="w-full flex justify-between">
    <div class="w-1/4 bg-gray-100 flex flex-col gap-12 p-12">
      <div class="text-sm">
        <p>Get Weather By station</p>
        <p>Method: GET</p>
        <p>Parameter: stationName</p>
        <p class="break-words">
          URL:
          {{ apiEndpoint }}station/weather/$stationName
        </p>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Select a Weather Station
          </label>
          <select
            type="number"
            v-model="selectedStation"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
          >
            <option v-for="station in stations" :key="station" :value="station">
              {{ station.name }}
            </option>
          </select>
        </div>

        <button
          @click="fetchWeatherBySelectedStation"
          class="bg-primary flex gap-2 px-3 py-1 my-2 rounded text-primary-textOnPrimary"
        >
          Send Request
        </button>
      </div>

      <div class="text-sm">
        <p>Get All Weather</p>
        <p>Method: GET</p>
        <p class="break-words">
          URL:
          {{ apiEndpoint }}station/allweather
        </p>
        <button
          @click="fetchAllWeather"
          class="bg-primary flex gap-2 my-2 px-3 py-1 rounded text-primary-textOnPrimary"
        >
          Send Request
        </button>
      </div>
    </div>
    <div
      class="p-12 mx-12 flex flex-col flex-1 h-screen overflow-y-scroll scrollbar-hide"
    >
      <p class="font-semibold my-2">
        {{ requestTitle }}
      </p>
      <div v-if="data">
        <vue-json-pretty :data="data" />
      </div>
      <div class="flex justify-center" v-else>
        <p>Select and send a request to view the API Response Data.</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetAllWeatherStations,
  GetWeatherTodayByStation,
} from "../dataservice/weather-station.service";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { GetWeatherTodayForAll } from "../dataservice/daily-forecast.service";

export default {
  components: {
    VueJsonPretty,
  },
  data: () => ({
    stationWithForecast: [],
    allWeatherData: [],
    stations: [],
    data: null,
    selectedStation: {},
    apiEndpoint: import.meta.env.VITE_API_ENDPOINT,
    requestTitle: "",
  }),

  created() {
    this.fetchAllStations();
  },
  methods: {
    fetchAllStations() {
      GetAllWeatherStations().then((res) => {
        this.stations = res.data;
      });
    },

    fetchWeatherBySelectedStation() {
      if (this.selectedStation.name) {
        this.requestTitle = "Getting Weather for " + this.selectedStation.name;

        GetWeatherTodayByStation(this.selectedStation.name).then((res) => {
          this.data = res.data;
        });
      } else {
        this.$toast.show("Please select a station first", {
          position: "top",
          type: "error",
        });
      }
    },

    fetchAllWeather() {
      this.requestTitle = "Getting  Weather Data for all Station";
      GetWeatherTodayForAll().then((res) => {
        this.data = res.data;
      });
    },
  },
};
</script>
