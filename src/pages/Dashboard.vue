<template>
  <div class="w-full bg-white flex justify-center h-full mx-auto">
    <div class="w-9/12 p-12">
      <div class="flex justify-between">
        <img src="/rgob.jpeg" class="h-32 w-auto" alt="" />
        <div class="text-3xl font-bold text-center">
          <p>National center for Hydrology and Meteorology</p>
          <p>རྒྱལ་ཡོངས་ཆུ་དཔྱད་དང་གནམ་གཤིས་རིག་པའི་ལྟེ་བ།</p>
        </div>
        <img src="/logo.jpeg" class="h-32 w-auto" alt="" />
      </div>
      <div class="flex justify-between mt-8">
        <div>
          <p class="text-xl font-semibold" v-if="dzongkhaMode">
            གནམ་གཤིས་ ༡༥/༡༠/༢༠༢༢
          </p>
          <p v-else>Weatherforecast for {{ new Date(date).toDateString() }}</p>
        </div>
        <div class="flex gap-2 text-gray-500">
          <p>Language</p>
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
      </div>
      <div>
        <p>
          Weather Summary Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Autem, impedit.
        </p>
      </div>
      <hr class="w-full my-7 border border-primary" />
      <div class="mt-6 grid grid-cols-4 gap-6">
        <div
          v-for="station in stationsWithForecast"
          :key="station"
          @click="showDetailedWeather(station.stationId)"
          class="flex w-full justify-center shadow rounded bg-primary bg-opacity-30 text-white"
        >
          <div v-if="station.weather.id" class="p-4">
            <div class="flex flex-col w-full items-center">
              <div class="w-32 h-32 flex items-center justify-center">
                <img
                  :src="getIconUrl(station.weather.outlook?.dayIconUri)"
                  alt=""
                />
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-center text-xl font-semibold text-primary">
                <p v-if="dzongkhaMode">
                  {{ station.nameDzo ? station.nameDzo : station.name }}
                </p>
                <p v-else>
                  {{ station.name }}
                </p>

                <p class="text-xs text-gray-600 font-normal">
                  {{ new Date().toDateString() }}
                </p>
              </div>
            </div>
            <div>
              <div id="temps">
                <div
                  class="flex items-center gap-1 justify-center text-5xl"
                  v-if="dzongkhaMode"
                >
                  {{ convertToDzongkha(station.weather?.maxTemp?.toString()) }}
                  <p class="text-2xl font-normal">ºC</p>
                </div>
                <p class="text-center my-4 text-2xl" v-else>
                  <span class="text-sky-800">
                    {{ station.weather?.minTemp }}ºC /
                  </span>
                  <span class="text-rose-800">
                    {{ station.weather?.maxTemp }} ºC
                  </span>
                </p>
              </div>
              <div id="outlooks" class="text-sm text-gray-500 mt-1 text-center">
                <p v-if="dzongkhaMode">
                  {{ station.weather.outlook?.nameDzo }}
                </p>
                <p v-else>
                  {{ station.weather.outlook?.name }}
                </p>
              </div>
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
    </div>
  </div>
</template>

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

    showDetailedWeather(id) {
      console.log(id);
      this.$router.push("/admin/detailedWeather/" + id);
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
