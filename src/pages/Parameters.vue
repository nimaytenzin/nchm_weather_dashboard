<template>
  <div
    class="flex h-full w-full overflow-y-scroll justify-center"
    style="height: 100vh"
  >
    <div class="w-11/12 flex flex-row md:flex-col p-6 gap-6">
      <div class="w-full md:w-full bg-white p-6 rounded shadow-lg">
        <weather-stations />
      </div>
      <div class="w-full md:w-full bg-white p-6 rounded shadow-lg">
        <outlooks />
      </div>
      <div class="w-full md:w-full bg-white p-6 rounded shadow-lg">
        <weather-intervals />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherStations from "./Stations.vue";
import WeatherIntervals from "./Intervals.vue";
import Outlooks from "./Outlooks.vue";
export default {
  components: {
    WeatherStations,
    WeatherIntervals,
    Outlooks,
  },
};
</script>
