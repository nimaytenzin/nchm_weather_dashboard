<template>
  <div
    class="w-full bg-slate-white flex flex-col items-center justify-center h-full"
  >
    <div class="flex flex-col gap-2 text-gray-500">
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

    <div class="w-11/12 h-full flex justify-center">
      <div class="weatherCard">
        <div
          id="weatherToday"
          class="flex w-full justify-center shadow rounded bg-primary bg-opacity-30 text-white"
        >
          <div v-if="stationWeather.weather" class="p-4">
            <div class="flex items-center justify-center">
              <img
                :src="getIconUrl(stationWeather.weather.outlook?.dayIconUri)"
                alt=""
                class="h-32 w-auto"
              />
            </div>
            <div class="text-center text-xl font-semibold text-primary">
              <p v-if="dzongkhaMode">
                {{
                  stationWeather.nameDzo
                    ? stationWeather.nameDzo
                    : stationWeather.name
                }}
              </p>
              <p v-else>
                {{ stationWeather.name }}
              </p>
              <p class="text-xs text-gray-500 font-normal">
                {{ new Date().toDateString() }}
              </p>
            </div>
            <div id="temps">
              <div
                class="flex items-center gap-1 justify-center text-5xl"
                v-if="dzongkhaMode"
              >
                {{
                  convertToDzongkha(stationWeather.weather?.maxTemp?.toString())
                }}
                <p class="text-2xl font-normal">ºC</p>
              </div>
              <p class="text-center font-bold text-2xl" v-else>
                <span class="">
                  {{ stationWeather.weather?.minTemp }}ºC /
                </span>
                <span class=""> {{ stationWeather.weather?.maxTemp }} ºC </span>
              </p>
            </div>
            <div id="outlooks" class="text-sm text-gray-500 text-center">
              <p v-if="dzongkhaMode">
                {{ stationWeather.weather.outlook?.nameDzo }}
              </p>
              <p v-else>
                {{ stationWeather.weather.outlook?.name }}
              </p>
            </div>
          </div>
          <div v-else>
            <div class="z-20">
              <p
                class="text-3xl font-semibold text-primary"
                v-if="dzongkhaMode"
              >
                {{
                  stationWeather.nameDzo
                    ? stationWeather.nameDzo
                    : stationWeather.name
                }}
              </p>
              <p class="text-3xl font-semibold text-primary" v-else>
                {{ stationWeather.name }}
              </p>

              <p class="text-xs">
                {{ new Date().toDateString() }}
              </p>
            </div>
            <p class="text-critical my-6">Weather Data Not Added</p>
          </div>
        </div>
        <div
          id="intervalForecasts"
          class="flex gap-4 text-white bg-opacity-60 bg-primary px-2"
          v-if="stationWeather.weather?.intervalForecast.length"
        >
          <div
            v-for="forecast in stationWeather.weather?.intervalForecast"
            :key="forecast"
            class="py-6 text-center"
          >
            <div class="flex justify-center">
              <img
                :src="getIconUrl(forecast.outlook?.dayIconUri)"
                class="w-auto h-16"
              />
            </div>

            <div>
              <p class="text-center font-semibold text-xl">
                {{ forecast?.minTemp }}ºC
              </p>
            </div>
            <p class="text-xs">
              {{ parseIntervalTime(forecast.interval?.startTime) }} -
              {{ parseIntervalTime(forecast.interval?.endTime) }}
            </p>
          </div>
        </div>
        <div
          id="intervalForecasts"
          class="flex text-white bg-opacity-60 justify-center items-center flex-col bg-primary p-6"
          v-else
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
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>

          <div v-if="dzongkhaMode">གསལ་བསྒྲགས་འབད་ནུག།</div>
          <div v-else>Interval Forecast not Added</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weatherCard {
  width: 300px;
}
</style>

<script>
import { Switch } from "@headlessui/vue";
import { toDzongkha } from "../dataservice/dzongkhalang.service";
import { GetDailyForecastForAllStationsByDate } from "../dataservice/daily-forecast.service";
import { GetWeatherTodayByStation } from "../dataservice/weather-station.service";
import { BackendApi, TimeRange } from "../constants";

export default {
  components: {
    Switch,
  },
  data: () => ({
    stations: [],
    stationName: "",
    stationWeather: {},
    dzongkhaMode: false,
    stationsWithForecast: [],
  }),

  created() {
    this.stationName = this.$route.params.stationName;
    this.fetchDailyForecasts();
  },
  methods: {
    convertToDzongkha(number) {
      return toDzongkha(number);
    },
    fetchDailyForecasts() {
      GetWeatherTodayByStation(this.stationName).then((res) => {
        this.stationWeather = res.data;
      });
    },
    getIconUrl(uri) {
      return `${BackendApi}/icons/${uri}`;
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
  },
};
</script>
