<template>
  <div id="dailyForecast">
    <p class="px-6">Weather Summary</p>
    <div>
      <textarea
        class="w-1/2 p-6 outline-none appearance-none bg-gray-100 resize-none rounded"
        placeholder="Weather Summary"
        name=""
        id=""
        cols="30"
        rows="5"
      ></textarea>
      <textarea
        class="w-1/2 p-6 outline-none appearance-none bg-gray-100 resize-none rounded"
        placeholder="Weather Summary in Dzongkha"
        name=""
        id=""
        cols="30"
        rows="5"
      ></textarea>
    </div>
    <table class="w-full text-sm">
      <tr class="bg-primary text-primary-light font-semibold">
        <td class="px-3 py-2">Station Name</td>
        <td class="px-3 py-2">Daily Forecast</td>
      </tr>
      <tr
        v-for="station in weatherStations"
        :key="station"
        class="border-b border-gray-200"
      >
        <td class="px-4 py-4">{{ station.name }}</td>
        <td class="px-4 py-3">
          <Listbox
            v-model="station.forecast[0].outlookId"
            @update:modelValue="forecast.outlookId = forecast.outlook.id"
          >
            <div class="relative mt-1">
              <ListboxButton
                class="relative px-4 w-full flex text-gray-700 items-center cursor-default rounded-lg bg-slate-100 text-left sm:text-sm"
              >
                <div
                  v-if="station.forecast[0].outlook"
                  class="flex h-12 items-center"
                >
                  <img
                    v-if="forecast.outlook?.dayIconUri"
                    :src="getIconUrl(forecast.outlook?.dayIconUri)"
                    class="w-10"
                    alt=""
                  />
                  <span class="block truncate">{{
                    forecast.outlook?.name
                  }}</span>
                </div>
                <div v-else class="h-12 flex items-center">
                  Select a Weather Outlook
                </div>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 z-50 bg-slate-100 max-h-82 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="outlook in outlooks"
                    :key="outlook"
                    :value="outlook"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-indigo-500 text-gray-100'
                          : 'text-gray-700 ',
                        'relative flex cursor-default select-none py-2 ',
                      ]"
                    >
                      <img
                        :src="getIconUrl(outlook.dayIconUri)"
                        class="w-10"
                        alt=""
                      />
                      <p
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                      >
                        {{ outlook.name }}
                      </p>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </td>
        <td class="px-4 py-4 text-blue-600 font-semibold font-mono">
          <div class="relative mt-1">
            <input
              class="bg-slate-100 py-1 h-10 rounded-md px-4"
              type="number"
              v-model="forecast.minTemp"
            />
          </div>
        </td>
        <td class="px-4 py-4 text-red-500 font-semibold font-mono">
          <div class="relative mt-1">
            <input
              class="bg-slate-100 py-1 h-10 rounded-md px-4"
              type="number"
              v-model="forecast.maxTemp"
            />
          </div>
        </td>
      </tr>
    </table>

    <hr class="my-2 w-full" />
    <button
      class="bg-primary px-4 py-1 rounded text-primary-textOnPrimary"
      @click="updateDailyWeatherForecast"
    >
      Update Forecast
    </button>
  </div>
</template>

<script>
import { GetAllWeatherStations } from "../../dataservice/weather-station.service.js";
export default {
  data: () => ({
    weatherStations: [],
    date: new Date(),
  }),
  created() {
    this.fetchAllStations();
  },
  methods: {
    fetchAllStations() {
      GetAllWeatherStations().then((res) => {
        this.weatherStations = res.data;
        // this.composeForecastPostObject(this.weatherStations);
      });
    },
  },
};
</script>

<style></style>
