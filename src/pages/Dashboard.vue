<template>
  <div class="w-full bg-gray-100 flex h-screen flex-col items-center">
    <div class="w-8/12 bg-white overflow-y-scroll scrollbar-hide">
      <!-- <div class="flex justify-between my-6">
        <div class="flex gap-2 text-gray-500">
          <Switch
            v-model="dzongkhaMode"
            :class="dzongkhaMode ? 'bg-primary' : 'bg-gray-200'"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
          >
            <span class="sr-only">Enable notifications</span>
            <span
              :class="dzongkhaMode ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition ease-in-out duration-500"
            />
          </Switch>
          <p>
            {{ dzongkhaMode ? "རྫོང་ཁ" : "English" }}
          </p>
        </div>
        <div
          class="px-2 py-1 rounded bg-primary text-white rouned cursor-pointer"
        >
          Download as Image
        </div>
        <button @click="exportToPDF">Export to PDF</button>
      </div>-->
      <div id="element-to-convert" class="p-12">
        <div id="header" class="flex px-2 justify-between">
          <img src="/rgob.jpeg" class="h-20 w-auto" alt />
          <div class="text-center">
            <p class="text-lg font-bold">National center for Hydrology and Meteorology</p>
            <p class="text-lg font-bold">རྒྱལ་ཡོངས་ཆུ་དཔྱད་དང་གནམ་གཤིས་རིག་པའི་ལྟེ་བ།</p>
            <p class="font-xs mt-2">
              Center for excellence in Hydrology,Meteorology and Cryosphere
              Science and Services
            </p>
          </div>
          <img src="/logo.jpeg" class="h-20 w-auto" alt />
        </div>
        <div id="forecastOverview" class="my-6">
          <div class="text-xl text-center font-semibold">
            <p>Weatherforecast for {{ new Date(date).toDateString() }}</p>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-5">
          <div
            v-for="station in stationsWithForecast"
            :key="station"
            @click="openViewDetailWeather(station)"
            class="flex w-full cursor-pointer justify-center shadow bg-primary p-4 shadow-gray-200 border text-white border-gray-50 bg-opacity-60"
          >
            <div v-if="station.weather" class>
              <div class="flex items-center justify-center">
                <!-- <img class="h-20 w-auto" :src="getIconUrl(station.weather.outlook?.dayIconUri)" alt /> -->
                <img class="h-20 w-auto" :src="getIconUrl(outlookHash[station.weather[0].outlookId].dayIconUri)" alt />
              </div>
              <div class="text-center text-lg font-semibold">
                <p>{{ station.name }}</p>
              </div>
              <div id="temps">
                <p class="text-center text-xl">
                  <span>{{ station.weather[0].minTemp }}ºC /</span>
                  <span>{{ station.weather[0].maxTemp }} ºC</span>
                </p>
              </div>
              <div id="outlooks" class="text-md mt-1 text-center">
                <p>{{ outlookHash[station.weather[0].outlookId].name }}</p>
              </div>
            </div>
            <div v-else>
              <p class="text-critical my-6">Weather Data Not Added</p>
            </div>
          </div>
        </div>
        <div id="footer" class="my-6">
          <p class="text-center mt-6">
            Tel: +975 02 33 5578/339673/+975 7745632, Website: www.nchm.gov.bt,
            Toll free:1030
          </p>
        </div>
      </div>
    </div>
    <vue-final-modal
      v-model="viewDetailedWeatherModal"
      classes="w-full h-full bg-black flex  justify-center items-center bg-opacity-20"
      content-class="bg-white  py-6 px-12  text-white bg-primary rounded"
    >
      <h1 class="text-2xl">{{ selectedStation.name }}</h1>
      <div class="flex items-center justify-center">
        <img
          class="h-20 w-auto"
          :src="getIconUrl(outlookHash[selectedStation.weather ?  selectedStation.weather[0].outlookId : 1 ]?.dayIconUri)"
          alt
        />
      </div>
      <p>{{ outlookHash[selectedStation.weather ?  selectedStation.weather[0].outlookId : 1]?.name }}</p>
      <div
        id="intervalForecasts"
        class="flex gap-4 text-white px-2"
        v-if="selectedStation.intervalForecast?.length"
      >
        <div
          v-for="forecast in selectedStation.intervalForecast"
          :key="forecast"
          class="py-6 text-center"
        >
          <div class="flex justify-center">
            <img :src="getIconUrl(outlookHash[forecast.outlookId].dayIconUri)" class="w-auto h-16" />
          </div>

          <div>
            <p class="text-center font-semibold text-xl">{{ forecast.minTemp }}ºC</p>
          </div>
          <p class="text-xs">
            {{ intervalHash[forecast.intervalId].name }}
            <!-- {{ intervalHash[forecast.intervalId].name }}
            {{ parseIntervalTime(forecast.interval?.endTime) }} -->
          </p>
        </div>
      </div>
      <div v-else>Interval Data not Added!</div>
    </vue-final-modal>
  </div>
</template>

<style scoped>
.clear {
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #70a5df,
    #a2d5ee
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #70a5df,
    #a2d5ee
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.rain {
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #bec7c9,
    #6f8394
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #bec7c9,
    #6f8394
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.snow {
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #949a9e,
    #c8d1d4
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #949a9e,
    #c8d1d4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

<script>
import { GetAllWeatherStations } from "../dataservice/weather-station.service";
import { Switch } from "@headlessui/vue";
import { toDzongkha } from "../dataservice/dzongkhalang.service";
import {
  GetOutlookMapper,
  GetIntervalMapper,
  GetDailyForecastForAllStationsToday
} from "../dataservice/daily-forecast.service";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { BackendApi, TimeRange } from "../constants";
import html2pdf from "html2pdf.js";

export default {
  components: {
    Switch,
    VueJsonPretty
  },
  data: () => ({
    stations: [],
    dzongkhaMode: false,
    stationsWithForecast: [],
    date: new Date(),
    outlookHash: {},
    intervalHash: {},

    selectedStation: {},
    viewDetailedWeatherModal: false
  }),

  created() {
    this.getOutlookMapper();
    this.getIntervalMapper();
    GetAllWeatherStations().then(res => {
      this.stations = res.data;
    });

    this.fetchDailyForecasts();
  },
  methods: {
    convertToDzongkha(number) {
      return toDzongkha(number);
    },
    getIconUrl(uri) {
      return `${BackendApi}/icons/${uri}`;
    },

    openViewDetailWeather(station) {
      this.selectedStation = station;
      this.viewDetailedWeatherModal = true;
    },

    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 12,
        filename: "weatherReport.pdf",
        html2canvas: { scale: 2 }
      });
    },

    parseIntervalTime(value) {
      let ok;
      for (let i = 0; i < TimeRange.length; i++) {
        if (TimeRange[i].value === value) {
          ok = TimeRange[i].name;
        }
      }

      return ok;
    },

    getWeatherGradient(outlook) {
      if (outlook.name === "Mostly Cloudy") {
        return "rain";
      }
      if (outlook.name === "Sunny") {
        return "clear";
      }
      if (outlook.name === "Heavy Snow") {
        return "snow";
      }
      return "clear";
    },
    getOutlookMapper() {
      GetOutlookMapper().then(res => {
        let data = res.data;
        for (var i = 0; i < data.length; i++) {
          this.outlookHash[data[i].id] = data[i];
        }
      });
    },
    getIntervalMapper() {
      GetIntervalMapper().then(res => {
        let data = res.data;
        for (var i = 0; i < data.length; i++) {
          this.intervalHash[data[i].id] = data[i];
        }
      });
    },
    showDetailedWeather(stationName) {
      this.$router.push("/admin/detailedWeather/" + stationName);
    },
    fetchDailyForecasts() {
      GetDailyForecastForAllStationsToday().then(res => {
        let forecast = res.data;
        for (var i = 0; i < forecast.length; i++) {
          if (forecast[i].intervalForecast.length > 0) {
            if (forecast[i].intervalForecast[0].intervalId == 5) {
              forecast[i].weather[0].outlookId = forecast[ i ].intervalForecast[0].outlookId;
              forecast[i].weather[0].minTemp = forecast[ i ].intervalForecast[0].minTemp;
              forecast[i].weather[0].maxTemp = forecast[ i ].intervalForecast[0].maxTemp;
            }
          }
        }
        this.stationsWithForecast = forecast;
      });
    }
  }
};
</script>
