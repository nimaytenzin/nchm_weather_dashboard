<template>
  <div class="w-full bg-slate-white flex justify-center h-full">
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
    <div
      class="w-11/12 h-full flex gap-12 flex-wrap justify-center items-center"
    >
      Weather Card

      <p>Outlook by time intervals</p>
      <p>Table showing next ten days forecast</p>
    </div>
  </div>
</template>

<script>
import { GetAllWeatherStations } from "../dataservice/weather-station.service";
import { Switch } from "@headlessui/vue";
import { toDzongkha } from "../dataservice/dzongkhalang.service";
import { GetDailyForecastForAllStationsByDate } from "../dataservice/daily-forecast.service";

export default {
  components: {
    Switch,
  },
  data: () => ({
    stations: [],
    dzongkhaMode: false,
    stationsWithForecast: [],
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
    fetchDailyForecasts() {
      GetDailyForecastForAllStationsByDate("2022-12-26").then((res) => {
        console.log("Stations with Forecast");
        console.log(res);
        this.stationsWithForecast = res.data;
      });
    },
  },
};
</script>
