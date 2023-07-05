<template>
  <div class="w-full flex justify-between">
    <div class="w-1/4 bg-gray-100 flex flex-col gap-12 p-12">
      <div class="text-sm">
        <p>Get interval forecast by station</p>
        <p>Source: SMARTMET</p>
        <p>intervals: 10:00 AM , 4:00PM, 10:00 PM, 4:00 AM</p>
        <p>Method: GET</p>
        <p class="break-words">
          URL:
          {{ apiEndpoint }}interval-forecast/station/{{ selectedStation.name }}
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
        <p>Get Medium Range Forecast by station</p>
        <p>Source: NCHM Medium range Forecast Dataa</p>
        <p>Method: GET</p>
        <p class="break-words">
          URL:
          {{ apiEndpoint }}medium-range-forecast/station/{{
            selectedStation.name
          }}
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
          @click="fetchMediumRangeForecast"
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
  GetMediumRangeForecastByStation,
  GetWeatherNowByStation,
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

        GetWeatherNowByStation(this.selectedStation.name).then((res) => {
          this.data = res.data;
        });
      } else {
        this.$toast.show("Please select a station first", {
          position: "top",
          type: "error",
        });
      }
    },

    fetchMediumRangeForecast() {
      this.requestTitle = "Getting  Medium range forecast by station";
      GetMediumRangeForecastByStation(this.selectedStation.name).then((res) => {
        this.data = res.data;
      });
    },
  },
};
</script>
