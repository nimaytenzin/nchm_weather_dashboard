<template>
  <div class="w-full flex justify-center h-full">
    <div class="w-11/12 h-full">
      <div class="w-full">
        <div class="w-full bg-white p-6 rounded shadow-lg">
          <div class="my-6">
            <h1 class="text-lg font-semibold text-primary-heading1">
              Weather Forecasts
            </h1>
            <p class="text-gray-500">
              Add and edit weather forecast for specific dates
            </p>
          </div>
          <hr class="w-full my-2" />

          <div class="flex items-center gap-4">
            <div class="p-2">Showing Forecast for</div>
            <v-date-picker class="inline-block h-full" v-model="date">
              <template v-slot="{ inputValue, togglePopover }">
                <div class="flex items-center" @click="togglePopover()">
                  <button
                    class="p-2 bg-blue-100 hover:bg-blue-200 text-primary rounded-l focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="w-4 h-4 fill-current"
                    >
                      <path
                        d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                      ></path>
                    </svg>
                  </button>
                  <p
                    class="bg-primary bg-opacity-20 rounded-r text-gray-600 w-full py-1 px-2 appearance-none"
                  >
                    {{ new Date(inputValue).toDateString() }}
                  </p>
                </div>
              </template>
            </v-date-picker>
            <div @click="fetchWeatherData">Load Forecast</div>
          </div>
        </div>

        <div class="p-6">
          <table class="table auto w-full">
            <tr>
              <td>Station</td>
              <td>Date</td>
            </tr>
            <tr v-for="station in stationsWithForecast" :key="station">
              <td>
                {{ station.name }}
              </td>
              <td>
                <div class="my-1 flex items-center bg-gray-50 text-gray-700">
                  <input
                    v-model="station.forecast.minTemp"
                    type="text"
                    class="bg-gray-50 border border-gray-200 rounded-l p-1"
                    required
                    rows="6"
                  />
                  <p class="rounded-r border border-gray-200 p-1">°C</p>
                </div>
                <div class="my-1 flex items-center bg-gray-50 text-gray-700">
                  <input
                    v-model="station.forecast.maxTemp"
                    type="text"
                    class="bg-gray-50 border border-gray-200 rounded-l p-1"
                    required
                    rows="6"
                  />
                  <p class="rounded-r border border-gray-200 p-1">°C</p>
                </div>
                <div class="my-1 flex items-center bg-gray-50 text-gray-700">
                  <select
                    v-model="station.forecast.outlookId"
                    class="bg-gray-50 border border-gray-200 rounded-l p-1"
                    required
                    rows="6"
                  >
                    <option
                      v-for="outlook in outlooks"
                      :key="outlook"
                      :value="outlook.id"
                    >
                      {{ outlook.name }}
                    </option>
                  </select>
                </div>
              </td>
              <td></td>

              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="editOutlookModal"
    classes="modal-container"
    content-class="modal-content"
  >
  </vue-final-modal>
</template>

<script>
import { GetAllWeatherOutlooks } from "../dataservice/outlooks.service.js";
import { GetAllWeatherStations } from "../dataservice/weather-station.service.js";
import DailyForecastComponent from "./Forecast/DailyForecast.vue";
import {
  CreateDailyForecasts,
  GetDailyForecastForAllStationsByDate,
} from "../dataservice/daily-forecast.service";

import { BackendApi } from "../constants.js";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

export default {
  components: {
    DailyForecastComponent,
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  },
  data: () => ({
    weatherStations: [],
    stationsWithForecast: [],
    outlooks: [],
    forecasts: [],
    forecastExists: false,
    date: new Date(),
    tempDzo: 0,
    dates: [],
  }),
  created() {
    this.fetchAllStations();
    this.fetchAllOutlooks();
    // this.fetchDailyForecasts();
  },
  methods: {
    fetchAllStations() {
      GetAllWeatherStations().then((res) => {
        this.weatherStations = res.data;
        // this.composeForecastPostObject(this.weatherStations);
      });
    },
    fetchAllOutlooks() {
      GetAllWeatherOutlooks().then((res) => {
        this.outlooks = res.data;
      });
    },

    logValue(selected, id) {
      console.log(selected, id);
    },
    getIconUrl(uri) {
      return `${BackendApi}/icons/${uri}`;
    },

    fetchWeatherData() {
      GetDailyForecastForAllStationsByDate(this.formatDate(this.date)).then(
        (res) => {
          console.log("Stations with Forecast");
          console.log(res);
          this.stationsWithForecast = res.data;

          if (res.data.length !== 0 && res.data) {
            this.forecastExists = true;
            this.forecasts = res.data;
            console.log(this.forecasts);
          } else {
            this.forecastExists = false;
            this.composeForecastPostObject(this.weatherStations);
          }
        }
      );
    },

    fetchDailyForecasts(date) {
      GetDailyForecastForAllStationsByDate(date).then((res) => {
        console.log("Stations with Forecast");
        console.log(res);
        this.stationsWithForecast = res.data;

        if (res.data.length !== 0 && res.data) {
          this.forecastExists = true;
          this.forecasts = res.data;
          console.log(this.forecasts);
        } else {
          this.forecastExists = false;
          this.composeForecastPostObject(this.weatherStations);
        }
      });
    },

    updateDailyWeatherForecast() {
      let data = {
        date: this.formatDate(this.date),
        stations: this.stationsWithForecast,
      };
      CreateDailyForecasts(data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

      // const data = {
      //   date: this.date,
      //   forecasts: this.forecasts,
      // };
      // console.log(this.forecasts);
      // if (this.forecastExists) {
      //   UpdateailyForecastsByDate(data)
      //     .then((res) => {
      //       console.log(res);
      //       this.$toast.show("Updated!", {
      //         position: "top",
      //         type: "success",
      //       });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // } else {
      //   CreateDailyForecastsByDate(data)
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    },

    onDayClick(event) {
      this.forecasts = [];
      this.forecastExists = false;
      this.composeForecastPostObject(this.weatherStations);
      // this.fetchDailyForecasts(event.id);
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>

<style></style>
