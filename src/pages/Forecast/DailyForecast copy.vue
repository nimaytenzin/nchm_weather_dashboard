<template>
  <div id="dailyForecast">
    <textarea
      class="w-full border border-red-400"
      name=""
      id=""
      cols="30"
      rows="12"
    >
    </textarea>
    <table class="w-full text-sm">
      <tr class="bg-primary text-primary-light font-semibold">
        <td class="px-3 py-2">Station Name</td>
        <td class="px-3 py-2">Daily</td>
        <td class="px-3 py-2">Interval</td>
        <td class="px-3 py-2">Next Ten Days</td>
      </tr>
      <tr
        v-for="station in weatherStations"
        :key="station"
        class="border-b border-gray-200"
      >
        <td class="px-4 py-4">{{ station.name }}</td>
        <td>
          <div
            class="relative w-64 h-52 transition duration-500 ease-in-out transform bg-gradient-to-b from-linear-from to-linear-to bg-opacity-20 rounded-lg cursor-pointer flex justify-between text-right p-6"
          >
            <div class="flex flex-col justify-around">
              <div>
                <p class="text-3xl font-semibold text-primary">
                  {{ station.name }}
                </p>

                <p class="text-xs">
                  {{ new Date().toDateString() }}
                </p>
              </div>

              <div>
                <p class="text-white font-bold text-4xl">32ºC</p>
                <p>Partly Cloudy</p>
              </div>
            </div>

            <div
              class="text-md font-bold flex flex-col text-gray-900 w-10"
            ></div>

            <div
              class="w-40 h-40 flex items-center justify-center absolute -top-10 -right-10"
            >
              <img v-if="station.name === 'Thimphu'" src="/sunny.png" alt="" />
              <img v-else src="/partlycloudy.png" alt="" />
            </div>
          </div>
        </td>
        <!-- <td class="px-4 py-3">
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
              </td> -->

        <td>
          <tr>
            <td></td>
          </tr>
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
