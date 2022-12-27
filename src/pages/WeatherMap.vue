<template>
  <div class="w-full flex justify-center h-full">
    <div class="w-11/12 h-full">
      <div class="w-full">
        <div class="w-full bg-white p-6 rounded shadow-lg">
          <div class="my-6">
            <h1 class="text-lg font-semibold text-primary-heading1">
              Weather Map
            </h1>
            <p class="text-gray-500">
              Add and edit weather forecast for specific dates
            </p>
          </div>
          <hr class="w-full my-2" />

          <div class="flex items-start justify-center w-full gap-4 py-6">
            <div class="flex flex-col items-center">
              <v-date-picker
                v-model="date"
                @dayclick="fetchWeatherData"
                class="my-2"
              />
              <p>Click on a Date to Fetch Weather Data</p>

              <button
                @click="updateDailyWeatherForecast()"
                class="bg-primary my-2 px-3 py-1 rounded text-white"
              >
                Update Weather Data
              </button>
            </div>
            <div class="md:w-8/12 overflow-x-scroll">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr
                    class="bg-primary text-white uppercase text-sm leading-normal"
                  >
                    <th class="py-3 px-6 text-left">Station</th>
                    <th class="py-3 px-6 text-left">Min Temp</th>
                    <th class="py-3 px-6 text-center">Max Temp</th>
                    <th class="py-3 px-6 text-center">Outlook</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                  <tr
                    v-for="station in stationsWithForecast"
                    :key="station"
                    class="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td class="py-3 px-6 text-left whitespace-nowrap">
                      <div class="flex items-center">
                        <span class="font-medium">
                          {{ station.name }}
                        </span>
                      </div>
                      <div
                        v-if="station.weather.IntervalForecasts.length"
                        class="flex text-green-600 text-sm items-center cursor-pointer hover:underline"
                        @click="openUpdateIntervalModal(station)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        IntervalForecast
                      </div>
                      <div
                        v-else
                        class="flex text-red-600 text-sm items-center cursor-pointer hover:underline"
                        @click="openUpdateIntervalModal(station)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        IntervalForecast
                      </div>
                    </td>
                    <td class="py-3 px-6 text-left">
                      <input
                        v-model="station.weather.minTemp"
                        type="number"
                        class="border border-gray-200 rounded p-1"
                      />
                    </td>
                    <td class="py-3 px-6 text-center">
                      <input
                        v-model="station.weather.maxTemp"
                        type="number"
                        class="border border-gray-200 rounded p-1"
                      />
                    </td>
                    <td class="py-3 px-6 text-center">
                      <select
                        v-model="station.weather.outlookId"
                        class="border border-gray-200 rounded p-1"
                      >
                        <option
                          v-for="outlook in outlooks"
                          :key="outlook"
                          :value="outlook.id"
                        >
                          {{ outlook.name }}
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="updateIntervalForecastModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white p-6 rounded"
  >
    <div style="min-width: 20vw">
      <p class="my-4 text-gray-600">
        Hourly/Interval Forecast for {{ selectedStation.name }} |
        {{ selectedStation.nameDzo }} on {{ new Date(date).toDateString() }}
      </p>

      <table class="min-w-max w-full table-auto">
        <thead>
          <tr class="bg-primary text-white uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Forecast Interval</th>
            <th class="py-3 px-6 text-left">Min Temp</th>
            <th class="py-3 px-6 text-center">Max Temp</th>
            <th class="py-3 px-6 text-center">Outlook</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="interval in intervalForecastData"
            :key="interval"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <div class="flex items-center">
                <span class="font-medium">
                  {{
                    parseTime(
                      interval.startTime
                        ? interval.startTime
                        : interval.interval.startTime
                    )
                  }}
                  -
                  {{
                    parseTime(
                      interval.endTime
                        ? interval.endTime
                        : interval.interval.endTime
                    )
                  }}
                </span>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <input
                v-model="interval.minTemp"
                type="number"
                class="border border-gray-200 rounded p-1"
              />
            </td>
            <td class="py-3 px-6 text-center">
              <input
                v-model="interval.maxTemp"
                type="number"
                class="border border-gray-200 rounded p-1"
              />
            </td>
            <td class="py-3 px-6 text-center">
              <select
                v-model="interval.outlookId"
                class="border border-gray-200 rounded p-1"
              >
                <option
                  v-for="outlook in outlooks"
                  :key="outlook"
                  :value="outlook.id"
                >
                  {{ outlook.name }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex gap-2 my-6">
        <button
          @click="updateIntervalForecasts"
          class="text-destructive-textonDestructive bg-primary px-5 py-2 rounded w-full text-center"
        >
          Update
        </button>

        <button
          @click="updateIntervalForecastModal = false"
          class="bg-gray-100 border text-gray-800 px-5 py-2 rounded w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
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

import {
  CreateNewIntervalForecast,
  GetIntervalForecastByDailyForecastId,
} from "../dataservice/intervalforecast.service";

import { BackendApi, TimeRange } from "../constants.js";
import { GetAllIntervals } from "../dataservice/interval.service.js";

export default {
  components: {
    DailyForecastComponent,
  },
  data: () => ({
    weatherStations: [],
    selectedStation: {},
    stationsWithForecast: [],
    outlooks: [],
    intervals: [],
    intervalForecastData: [],

    forecastExists: false,
    date: new Date(),
    tempDzo: 0,
    updateIntervalForecastModal: false,
  }),
  created() {
    this.fetchAllStations();
    this.fetchAllOutlooks();
    this.fetchAllForecastIntervals();
    this.fetchWeatherData();
  },
  methods: {
    fetchAllStations() {
      GetAllWeatherStations().then((res) => {
        this.weatherStations = res.data;
        // this.composeForecastPostObject(this.weatherStations);
      });
    },
    fetchAllForecastIntervals() {
      GetAllIntervals().then((res) => {
        console.log(res);
        this.intervals = res.data;
      });
    },
    fetchAllOutlooks() {
      GetAllWeatherOutlooks().then((res) => {
        this.outlooks = res.data;
      });
    },

    getIconUrl(uri) {
      return `${BackendApi}/icons/${uri}`;
    },

    parseTime(value) {
      let ok;
      for (let i = 0; i < TimeRange.length; i++) {
        if (TimeRange[i].value === value) {
          ok = TimeRange[i].name;
        }
      }

      return ok;
    },

    openUpdateIntervalModal(station) {
      this.selectedStation = station;
      this.intervalForecastData = [];
      // if(this.selectedStation.)
      // console.log(this.selectedStation.weather.Inte)
      if (
        this.selectedStation.weather.IntervalForecasts &&
        this.selectedStation.weather.IntervalForecasts.length
      ) {
        console.log("IntervalForecastExists");
        this.intervalForecastData =
          this.selectedStation.weather.IntervalForecasts;
        console.log(this.intervalForecastData);
      } else {
        console.log("IntervalFOrecast DOesnot exist");
        this.intervals.forEach((interval) => {
          let data = {
            startTime: interval.startTime,
            endTime: interval.endTime,
            intervalId: interval.id,
            dailyForecastId: this.selectedStation.weather.id,
          };
          this.intervalForecastData.push(data);
        });
      }
      this.updateIntervalForecastModal = true;
    },
    updateIntervalForecasts() {
      console.log(this.intervalForecastData);
      this.intervalForecastData.forEach((element) => {
        CreateNewIntervalForecast(element).then((res) => {
          console.log(res);
          if (res.status === 201) {
            this.$toast.show("Updated", {
              position: "top",
              type: "success",
            });
          }
        });
      });
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
    updateIntervalForecast(interval, forecast) {
      console.log(interval, forecast);
      CreateIntervalForecast({
        dailyForecastId: forecast.id,
        outlookId: 1,
        minTemp: 12,
        maxTemp: 33,
        intervalId: interval.id,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style></style>
