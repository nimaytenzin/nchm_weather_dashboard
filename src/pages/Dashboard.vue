<template>
  <div class="w-full bg-white flex h-screen flex-col items-center">
    <div class="w-8/12 overflow-y-scroll scrollbar-hide">
      <div class="flex justify-between my-6">
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
      </div>
      <div>
        <div id="header" class="flex justify-between">
          <img src="/rgob.jpeg" class="h-32 w-auto" alt="" />
          <div class="text-3xl font-bold text-center">
            <p>National center for Hydrology and Meteorology</p>
            <p>རྒྱལ་ཡོངས་ཆུ་དཔྱད་དང་གནམ་གཤིས་རིག་པའི་ལྟེ་བ།</p>
            <p class="text-sm font-normal mt-2">
              Center for excellence in Hydrology,Meteorology and Cryosphere
              Science and Services
            </p>
          </div>
          <img src="/logo.jpeg" class="h-32 w-auto" alt="" />
        </div>
        <div id="forecastOverview" class="my-6">
          <div class="text-xl font-semibold">
            <p v-if="dzongkhaMode">གནམ་གཤིས་ ༡༥/༡༠/༢༠༢༢</p>
            <p v-else>
              Weatherforecast for {{ new Date(date).toDateString() }}
            </p>
          </div>
          <p>
            Mostly Cloudy with Light rain over eastern & Central Parts of the
            country during the next 24 hours.
          </p>
        </div>

        <div class="mt-6 grid grid-cols-4 gap-2 py-4 overflow-y-scroll">
          <div
            v-for="station in stationsWithForecast"
            :key="station"
            @click="showDetailedWeather(station.name)"
            class="flex w-full justify-center shadow bg-gray-700 p-4 shadow-gray-200 border text-white border-gray-50 rounded-md bg-opacity-30"
          >
            <div v-if="station.weather" class="">
              <div class="flex items-center justify-center">
                <img
                  class="h-32 w-auto"
                  :src="getIconUrl(station.weather.outlook?.dayIconUri)"
                  alt=""
                />
              </div>
              <div class="text-center text-xl font-semibold">
                <p v-if="dzongkhaMode">
                  {{ station.nameDzo ? station.nameDzo : station.name }}
                </p>
                <p v-else>
                  {{ station.name }}
                </p>

                <p class="text-xs font-normal">
                  {{ new Date().toDateString() }}
                </p>
              </div>
              <div id="temps">
                <div
                  class="flex items-center gap-1 justify-center text-5xl"
                  v-if="dzongkhaMode"
                >
                  {{ convertToDzongkha(station.weather?.maxTemp?.toString()) }}
                  <p class="text-2xl font-normal">ºC</p>
                </div>
                <p class="text-center my-4 text-2xl" v-else>
                  <span> {{ station.weather?.minTemp }}ºC / </span>
                  <span> {{ station.weather?.maxTemp }} ºC </span>
                </p>
              </div>
              <div id="outlooks" class="text-sm mt-1 text-center">
                <p v-if="dzongkhaMode">
                  {{ station.weather.outlook?.nameDzo }}
                </p>
                <p v-else>
                  {{ station.weather.outlook?.name }}
                </p>
              </div>
            </div>
            <div v-else>
              <div class="z-20">
                <p
                  class="text-3xl font-semibold text-primary"
                  v-if="dzongkhaMode"
                >
                  {{ station.nameDzo ? station.nameDzo : station.name }}
                </p>
                <p class="text-3xl font-semibold text-primary" v-else>
                  {{ station.name }}
                </p>

                <p class="text-xs">
                  {{ new Date().toDateString() }}
                </p>
              </div>
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
import { GetDailyForecastForAllStationsByDate } from "../dataservice/daily-forecast.service";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { BackendApi } from "../constants";
export default {
  components: {
    Switch,
    VueJsonPretty,
  },
  data: () => ({
    stations: [],
    dzongkhaMode: false,
    stationsWithForecast: [],
    date: new Date(),
  }),

  created() {
    GetAllWeatherStations().then((res) => {
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

    showDetailedWeather(stationName) {
      this.$router.push("/admin/detailedWeather/" + stationName);
    },
    fetchDailyForecasts() {
      GetDailyForecastForAllStationsByDate("2022-12-27").then((res) => {
        console.log("Stations with Forecast");
        console.log(res);
        this.stationsWithForecast = res.data;
      });
    },
  },
};
</script>
