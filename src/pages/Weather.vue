<template>
  <div class="w-full flex justify-center">
    <div class="w-11/12 flex p-6 gap-6 h-screen overflow-y-scroll">
      <div class="flex flex-col items-center">
        <h1 class="text-lg font-semibold text-primary-heading1">Weather Forecasts</h1>
        <p class="text-gray-500">Add and edit weather forecast for specific dates</p>
        <hr class="w-full my-2" />
        <v-date-picker v-model="date" color="teal" @dayclick="fetchWeatherData" class="my-2" />
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
        >Add Advisory</button>
      </div>
      <div class="w-10/12 overflow-x-scroll overflow-y-scroll scrollbar-hide h-full">
        <p class="bg-primary text-white leading-normal uppercase px-2">Upload Excel File</p>
        <div class="my-2">
          <div class="flex">
            <input type="file" @change="onChange" class="border-2 p-2" />
            <button
              @click="uploadData"
              class="bg-primary flex gap-2 my-2 px-3 py-3 rounded text-white mx-2"
              v-if="selectedSheet"
            >Upload Data: {{selectedSheet}}</button>
            <button
              @click="resetExcel"
              class="flex bg-success gap-2 my-2 px-3 py-3 rounded text-white mx-2"
              v-if="selectedSheet"
            >FINISH</button>
            <div v-if="isUpdating" class="my-auto ml-3 text-primary">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-if="isUpdated" class="my-auto ml-3 text-primary">Updated</div>
          </div>
          <div class="border-2 my-2">
            <xlsx-read :file="file">
              <xlsx-sheets>
                <template #default="{sheets}">
                  <select v-model="selectedSheet">
                    <option v-for="sheet in sheets" :key="sheet" :value="sheet">{{ sheet }}</option>
                  </select>
                </template>
              </xlsx-sheets>
              <xlsx-table :sheet="selectedSheet" />
              <xlsx-json v-show="false" :sheet="selectedSheet" @parsed="onParsed">
                <template #default="{collection}">
                  <div>{{ collection }}</div>
                </template>
              </xlsx-json>
            </xlsx-read>
          </div>
        </div>
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
                  <span class="font-medium">{{ station.name }}</span>
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
                  >{{ outlook.name }}</option>
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
              <select v-model="interval.outlookId" class="border border-gray-200 rounded p-1">
                <option
                  v-for="outlook in outlooks"
                  :key="outlook"
                  :value="outlook.id"
                >{{ outlook.name }}</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex gap-2 my-6">
        <button
          @click="updateIntervalForecasts"
          class="text-destructive-textonDestructive bg-primary px-5 py-2 rounded w-full text-center"
        >Update</button>

        <button
          @click="updateIntervalForecastModal = false"
          class="bg-gray-100 border text-gray-800 px-5 py-2 rounded w-full text-center"
        >Cancel</button>
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
        <p class="my-2">Date from
        <input class ="border-2 px-2" type="date" v-model="newAdvisory.dateFrom">
        </p>
        <p class="my-2">Date to
        <input class="border-2 px-2" type="date" v-model="newAdvisory.dateTo">
        </p>
        <p class="my-2">Advisory in English</p>
        <textarea
          class="p-2 w-full border rounded"
          name
          id
          v-model="newAdvisory.message"
          cols="40"
          rows="5"
        ></textarea>
        <p class="my-2">Advisory in Dzongkha</p>
        <textarea
          class="p-2 w-full border rounded"
          name
          id
          v-model="newAdvisory.messageDzo"
          cols="50"
          rows="5"
        ></textarea>
        <div class="flex gap-2">
          <button
            @click="updateAdvisory()"
            class="bg-primary flex gap-2 my-2 px-3 py-1 rounded text-white"
          >Add Advisory</button>
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
  GetDailyForecastForAllStationsByDate
} from "../dataservice/daily-forecast.service";

import {
  CreateNewIntervalForecast,
  GetIntervalForecastByDailyForecastId
} from "../dataservice/intervalforecast.service";

import { BackendApi, TimeRange } from "../constants.js";
import { GetAllIntervals } from "../dataservice/interval.service.js";
import {
  CreateNewWeatherAdvisory,
  GetWeatherAdvisoryByDate,
  UpdateWeatherAdvisory
} from "../dataservice/weather-advisory.service";

import {
  XlsxRead,
  XlsxTable,
  XlsxSheets,
  XlsxJson,
  XlsxWorkbook,
  XlsxSheet
} from "vue3-xlsx";

import * as XLSX from "xlsx";

export default {
  components: {
    DailyForecastComponent,
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet
  },
  data: () => ({
    weatherStations: [],
    selectedStation: {},
    stationsWithForecast: [],
    outlooks: [],
    intervals: [],
    intervalForecastData: [],

    selectedDaySheet: null,
    file: null,
    selectedSheet: null,
    sheetName: null,
    sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
    collection: [{ a: 1, b: 2 }],
    isUpdated: false,
    isUpdating: false,

    forecastExists: false,
    date: new Date(),
    tempDzo: 0,
    updateIntervalForecastModal: false,
    addAdvisoryModal: false,
    loadingModal: false,
    newAdvisory: {},
    advisoryExists: false
  }),
  created() {
    this.fetchAllStations();
    this.fetchAllOutlooks();
    this.fetchAllForecastIntervals();
    this.fetchWeatherData();
    this.fetchAdvisory();
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    validateSheet() {
      const dateString = this.selectedDaySheet[1].Date;
      //TODO include validate for date
      return true;
    },
    resetExcel() {
      window.history.go();
    },
    async uploadData() {
      this.isUpdating = true;
      this.isUpdated = false;
      if (!this.validateSheet()) {
        this.isUPdating = false;
        console.log("invalid excel sheet");
        return;
      }
      let fetchData = await this.fetchDailyForecast(
        this.selectedDaySheet[1].Date
      );
      let stationsWithDailyForecasts = fetchData.data;
      console.log("stations with dail ", stationsWithDailyForecasts);

      let stationWeatherObject = {};
      for (var i = 0; i < stationsWithDailyForecasts.length; i++) {
        if (stationsWithDailyForecasts[i].id == undefined) {
          console.log(
            "No weather data for this station",
            stationsWithDailyForecasts[i].name
          );
        } else {
          stationWeatherObject[stationsWithDailyForecasts[i].stationId] =
            stationsWithDailyForecasts[i];
        }
      }
      for (var i = 1; i < this.selectedDaySheet.length; i++) {
        //TODO fetch date and fetch daily forecast id for date
        const stationData =
          stationWeatherObject[this.selectedDaySheet[i].StationID];
        if (stationData !== undefined) {
          console.log("Creating Interval forecasts for: ", stationData.name);
          let data_1 = {
            intervalId: 1,
            maxTemp: this.selectedDaySheet[i].Int_4am_10am,
            minTemp: this.selectedDaySheet[i].Int_4am_10am,
            outlookId: this.outlookMapper(this.selectedDaySheet[i].__EMPTY),
            dailyForecastId: stationData.id
          };
          let data_2 = {
            intervalId: 2,
            maxTemp: this.selectedDaySheet[i].Int_10am_4pm,
            minTemp: this.selectedDaySheet[i].Int_10am_4pm,
            outlookId: this.outlookMapper(this.selectedDaySheet[i].__EMPTY_1),
            dailyForecastId: stationData.id
          };
          let data_3 = {
            intervalId: 3,
            maxTemp: this.selectedDaySheet[i].Int_4pm_10pm,
            minTemp: this.selectedDaySheet[i].Int_4pm_10pm,
            outlookId: this.outlookMapper(this.selectedDaySheet[i].__EMPTY_2),
            dailyForecastId: stationData.id
          };
          let data_4 = {
            intervalId: 4,
            maxTemp: this.selectedDaySheet[i].Int_10pm_4am,
            minTemp: this.selectedDaySheet[i].Int_10pm_4am,
            outlookId: this.outlookMapper(this.selectedDaySheet[i].__EMPTY_3),
            dailyForecastId: stationData.id
          };
          await this.uploadIntervalForecastsExcel(data_1);
          await this.uploadIntervalForecastsExcel(data_2);
          await this.uploadIntervalForecastsExcel(data_3);
          await this.uploadIntervalForecastsExcel(data_4);
        } else {
          console.log(
            "Warning: NO daily forecast data for station: ",
            this.selectedDaySheet[i].Station
          );
        }
      }
      this.isUpdated = true;
      this.isUpdating = false;
    },
    outlookMapper(outlookString) {
      let obj = {
        Sunny: 1,
        "Partly Cloudy": 2,
        "Mostly Cloudy": 3,
        "Partly Cloudy with Light Rain": 4,
        "Mostly cloudy with light Rain": 5,
        "Cloudy with light rain": 6,
        "Partly cloudy with moderate rain": 7,
        "Mostly Cloudy with moderate rain": 8,
        "Cloudy with moderate rain": 9,
        "Cloudy with heavy rain": 10,
        "Partly cloudy with light rain/snow": 11,
        "Mostly cloudy with light rain/snow": 12,
        "Partly cloudy with light snow": 13,
        "Mostly cloudy with light snow": 14,
        "Cloudy with light snow": 15,
        "Partly cloudy with moderate snow": 16,
        "Mostly cloudy with moderate snow": 17,
        "Cloudy with snow": 18
      };
      return obj[outlookString];
    },
    uploadIntervalForecastsExcel(data) {
      return CreateNewIntervalForecast(data);
    },
    parseExcelDate(dateString) {
      let splitDate = dateString.split(".");
      let day = splitDate[0];
      let month = splitDate[1];
      let year = splitDate[2];

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    fetchDailyForecast(date) {
      return GetDailyForecastForAllStationsByDate(this.parseExcelDate(date));
    },
    onParsed(event) {
      console.log("Excel Parsed");
      console.log(event); //TODO remove this

      this.selectedDaySheet = event;
      console.log(event[1].Station);
      console.log(event[1].Date);
      console.log(event[2].Station);
      console.log(event[2].Date);
      console.log(event[1].Int_4am_10am);
      console.log(event[1].__EMPTY);
      console.log(event[1].__EMPTY_1);
      console.log(event[1].__EMPTY_2);
      console.log(event[1].__EMPTY_3);
      // console.log(event[1])
    },
    fetchAllStations() {
      GetAllWeatherStations().then(res => {
        this.weatherStations = res.data;
        // this.composeForecastPostObject(this.weatherStations);
      });
    },
    fetchAllForecastIntervals() {
      GetAllIntervals().then(res => {
        console.log(res);
        this.intervals = res.data;
      });
    },
    fetchAllOutlooks() {
      GetAllWeatherOutlooks().then(res => {
        this.outlooks = res.data;
      });
    },

    openAddAdvisoryModal() {
      this.addAdvisoryModal = true;
    },
    fetchAdvisory() {
      GetWeatherAdvisoryByDate(this.date).then(res => {
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
          res => {
            if (res.status === 200) {
              console.log("UDPATED", res.data);
              this.addAdvisoryModal = true;
            }
          }
        );
      } else {
        this.newAdvisory.date = new Date();
        CreateNewWeatherAdvisory(this.newAdvisory).then(res => {
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
        this.intervalForecastData = this.selectedStation.weather.intervalForecast;
        console.log(this.intervalForecastData);
      } else {
        console.log("IntervalFOrecast DOesnot exist");
        this.intervals.forEach(interval => {
          let data = {
            startTime: interval.startTime,
            endTime: interval.endTime,
            intervalId: interval.id,
            dailyForecastId: this.selectedStation.weather.id
          };
          this.intervalForecastData.push(data);
        });
      }
      this.updateIntervalForecastModal = true;
    },
    updateIntervalForecasts() {
      this.intervalForecastData.forEach(element => {
        CreateNewIntervalForecast(element).then(res => {
          if (res.status === 201) {
            this.$toast.show("Updated", {
              position: "top",
              type: "success"
            });
          }
        });
      });
    },

    fetchWeatherData() {
      this.loadingModal = true;
      this.fetchAdvisory();
      GetDailyForecastForAllStationsByDate(this.formatDate(this.date)).then(
        res => {
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
        stations: this.stationsWithForecast
      };
      CreateDailyForecasts(data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
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
    }
  }
};
</script>

<style></style>
