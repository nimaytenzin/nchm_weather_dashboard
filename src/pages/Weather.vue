<template>
  <div class="w-full flex justify-center">
    <div class="w-11/12 flex p-6 gap-6 h-screen overflow-y-scroll">
      <div class="flex flex-col items-center">
        <h1 class="text-lg font-semibold text-primary-heading1">
          Weather Forecasts
        </h1>
        <p class="text-gray-500">
          Add and edit weather forecast for specific dates
        </p>
        <hr class="w-full my-2" />
        <v-date-picker
          v-model="date"
          color="teal"
          @dayclick="fetchWeatherData"
          class="my-2"
        />
        <p>Click on a Date to Fetch Weather Data</p>

        <button
          @click="updateDailyWeatherForecast()"
          class="bg-primary flex gap-2 my-2 px-3 py-1 rounded text-white"
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          Update Weather Data
        </button>

        <button
          @click="openAddAdvisoryModal"
          class="bg-primary flex gap-2 my-2 px-3 py-1 rounded text-white"
        >
          Add Advisory
        </button>
      </div>
      <div
        class="w-10/12 overflow-x-scroll overflow-y-scroll scrollbar-hide h-full"
      >
        <table class="min-w-max w-full">
          <thead>
            <tr class="bg-primary text-white uppercase text-sm leading-normal">
              <th class="p-3 text-left">Station</th>
              <th class="p-3 text-left">Min Temp</th>
              <th class="p-3 text-center">Max Temp</th>
              <th class="p-3 text-center">Outlook</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="station in stationsWithForecast"
              :key="station"
              class="border-b border-gray-200 hover:bg-gray-100"
            >
              <td class="p-3 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">
                    {{ station.name }}
                  </span>
                </div>
                <div
                  v-if="station.weather?.intervalForecast?.length"
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
              <td class="p-3 text-left">
                <input
                  v-model="station.weather.minTemp"
                  type="number"
                  class="border border-gray-200 rounded p-1"
                />
              </td>
              <td class="p-3 text-center">
                <input
                  v-model="station.weather.maxTemp"
                  type="number"
                  class="border border-gray-200 rounded p-1"
                />
              </td>
              <td class="p-3 text-center">
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
            <th class="p-3 text-left">Forecast Interval</th>
            <th class="p-3 text-left">Min Temp</th>
            <th class="p-3 text-center">Max Temp</th>
            <th class="p-3 text-center">Outlook</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="interval in intervalForecastData"
            :key="interval"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="p-3 text-left whitespace-nowrap">
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
            <td class="p-3 text-left">
              <input
                v-model="interval.minTemp"
                type="number"
                class="border border-gray-200 rounded p-1"
              />
            </td>
            <td class="p-3 text-center">
              <input
                v-model="interval.maxTemp"
                type="number"
                class="border border-gray-200 rounded p-1"
              />
            </td>
            <td class="p-3 text-center">
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

  <vue-final-modal
    v-model="loadingModal"
    classes="w-full h-full bg-white bg-opacity-0 flex justify-center items-center"
    content-class="bg-white p-6 rounded"
  >
    <div style="min-width: 20vw">
      <p>Loading Data...</p>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="addAdvisoryModal"
    classes="w-full h-full bg-white bg-opacity-0 flex justify-center items-center"
    content-class="bg-white p-6 rounded"
  >
    <div style="min-width: 20vw">
      <div class="flex flex-col items-center">
        <p class="my-2">Advisory in English</p>
        <textarea
          class="p-2 w-full border rounded"
          name=""
          id=""
          v-model="newAdvisory.message"
          cols="40"
          rows="5"
        ></textarea>
        <p class="my-2">Advisory in Dzongkha</p>
        <textarea
          class="p-2 w-full border rounded"
          name=""
          id=""
          v-model="newAdvisory.messageDzo"
          cols="50"
          rows="5"
        ></textarea>
        <div class="flex gap-2">
          <button
            @click="updateAdvisory()"
            class="bg-primary flex gap-2 my-2 px-3 py-1 rounded text-white"
          >
            Add Advisory
          </button>
          <button
            @click="deleteAdvisory()"
            class="bg-critical flex gap-2 my-2 px-3 py-1 rounded text-white"
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            Delete
          </button>
        </div>
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
import {
  CreateNewWeatherAdvisory,
  GetWeatherAdvisoryByDate,
  UpdateWeatherAdvisory,
} from "../dataservice/weather-advisory.service";

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
    addAdvisoryModal: false,
    loadingModal: false,
    newAdvisory: {},
    advisoryExists: false,
  }),
  created() {
    this.fetchAllStations();
    this.fetchAllOutlooks();
    this.fetchAllForecastIntervals();
    this.fetchWeatherData();
    this.fetchAdvisory();
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

    openAddAdvisoryModal() {
      this.addAdvisoryModal = true;
    },
    fetchAdvisory() {
      GetWeatherAdvisoryByDate(this.date).then((res) => {
        if (res.data) {
          this.advisoryExists = true;
          this.newAdvisory = res.data;
        }
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

    updateAdvisory() {
      console.log(this.newAdvisory);
      if (this.advisoryExists) {
        UpdateWeatherAdvisory(this.newAdvisory.id, this.newAdvisory).then(
          (res) => {
            if (res.status === 200) {
              console.log("UDPATED", res.data);
            }
          }
        );
      } else {
        this.newAdvisory.date = new Date();
        CreateNewWeatherAdvisory(this.newAdvisory).then((res) => {
          console.log(res);
        });
      }
    },

    openUpdateIntervalModal(station) {
      this.selectedStation = station;
      this.intervalForecastData = [];
      if (
        this.selectedStation.weather.intervalForecast &&
        this.selectedStation.weather.intervalForecast.length
      ) {
        console.log("IntervalForecastExists");
        this.intervalForecastData =
          this.selectedStation.weather.intervalForecast;
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
      this.intervalForecastData.forEach((element) => {
        CreateNewIntervalForecast(element).then((res) => {
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
      this.loadingModal = true;
      this.fetchAdvisory();
      GetDailyForecastForAllStationsByDate(this.formatDate(this.date)).then(
        (res) => {
          setTimeout(() => {
            this.loadingModal = false;
          }, 500);
          this.stationsWithForecast = res.data;
        }
      );
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
