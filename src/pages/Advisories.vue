<template>
  <div class="w-full flex justify-center">
    <div class="w-11/12 flex p-6 gap-6 h-screen overflow-y-scroll">
      <div class="flex flex-col items-center">
        <h1 class="text-lg font-semibold text-primary-heading1">
          Weather Advisories
        </h1>
        <p class="text-gray-500">Add and edit weather advisories</p>
        <hr class="w-full my-2" />
        <v-date-picker v-model="date" color="teal" class="my-2" />
        <p class="text-sm">
          Click on a Date to Fetch Weather Advisories for that date
        </p>

        <button
          @click="openAddAdvisoryModal"
          class="bg-primary flex gap-2 my-2 px-3 py-1 rounded text-white"
        >
          Add Advisory | {{ new Date(date).toDateString() }}
        </button>
      </div>
      <div
        class="w-11/12 overflow-x-scroll overflow-y-scroll scrollbar-hide h-full"
      >
        <div class="flex gap-2 w-full">
          <div
            v-for="(item, index) in advisories"
            :key="index"
            class="w-1/3 p-4 shadow-md rounded bg-gray-100"
          >
            <div class="flex justify-end">
              <button
                @click="deleteAdvisory(item.id)"
                class="bg-critical flex gap-2 rounded-full p-1 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <p class="font-bold">
              {{ formatDate(item.dateFrom) }} - {{ formatDate(item.dateTo) }}
            </p>
            <p>Status:Valid</p>
            <p class="my-3">
              <span class="text-sm">Summary(eng)</span> <br />
              {{ item.summaryEng }}
            </p>
            <p class="my-3">
              <span class="text-sm">Summary(dzo)</span> <br />
              {{ item.summaryDzo }}
            </p>

            <iframe
              :src="parseUri(item.fileUri)"
              width="100%"
              height="500px"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="addAdvisoryModal"
    classes="w-full h-full bg-white bg-opacity-0 flex justify-center items-center"
    content-class="bg-white p-6 rounded"
  >
    <div style="min-width: 20vw">
      <div class="flex flex-col items-center">
        <p class="my-2">
          Date from
          <input
            class="border-2 px-2"
            type="date"
            v-model="newAdvisory.dateFrom"
          />
        </p>
        <p class="my-2">
          Date to
          <input
            class="border-2 px-2"
            type="date"
            v-model="newAdvisory.dateTo"
          />
        </p>
        <p class="my-2">Advisory in English</p>
        <textarea
          class="p-2 w-full border rounded"
          name
          id
          v-model="newAdvisory.summaryEng"
          cols="40"
          rows="5"
        ></textarea>
        <p class="my-2">Advisory in Dzongkha</p>
        <textarea
          class="p-2 w-full border rounded"
          name
          id
          v-model="newAdvisory.summaryDzo"
          cols="50"
          rows="5"
        ></textarea>

        <label for="avatar">Upload Advisory in PDF</label>
        <input
          type="file"
          @change="handleFileChange"
          accept="application/pdf"
        />
        <div class="flex gap-2">
          <button
            @click="updateAdvisory()"
            class="bg-primary flex gap-2 my-2 px-3 py-1 rounded text-white"
          >
            Add Advisory
          </button>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { GetAllWeatherStations } from "../dataservice/weather-station.service.js";
import {
  GetOutlookMapper,
  GetIntervalMapper,
  GetDailyForecastForAllStationsToday,
} from "../dataservice/daily-forecast.service";

import { BackendApi, TimeRange } from "../constants.js";
import {
  CreateNewWeatherAdvisory,
  GetAdvisoriesToday,
  UpdateWeatherAdvisory,
  DeleteWeatherAdvisory,
} from "../dataservice/weather-advisory.service";

export default {
  data: () => ({
    date: new Date(),
    addAdvisoryModal: false,
    loadingModal: false,
    newAdvisory: {},
    advisoryExists: false,
    advisories: [],
  }),
  created() {
    this.fetchAdvisory();
  },
  methods: {
    openAddAdvisoryModal() {
      this.addAdvisoryModal = true;
    },
    fetchAdvisory() {
      GetAdvisoriesToday().then((res) => {
        console.log("Advisory Today");
        console.log(res);
        if (res.data) {
          this.advisoryExists = true;
          this.advisories = res.data;

          console.log(this.advisories);
        }
      });
    },

    deleteAdvisory(id) {
      var result = confirm("Are you sure you want to delete?");
      if (result) {
        DeleteWeatherAdvisory(id).then((res) => {
          this.fetchAdvisory();
        });
      }
    },

    parseUri(url) {
      return "http://localhost:3000/" + url;
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      this.newAdvisory.file = file;
      // You can perform additional logic with the selected file if needed
    },

    updateAdvisory() {
      console.log(this.newAdvisory);

      const formData = new FormData();
      formData.append("dateFrom", this.newAdvisory.dateFrom);
      formData.append("dateTo", this.newAdvisory.dateTo);
      formData.append("summaryEng", this.newAdvisory.summaryEng);
      formData.append("summaryDzo", this.newAdvisory.summaryDzo);
      formData.append("file", this.newAdvisory.file);

      CreateNewWeatherAdvisory(formData)
        .then((res) => {
          console.log("new advisory");
          this.fetchAdvisory();
          this.addAdvisoryModal = false;
        })
        .catch((error) => {
          // Handle error
        });
    },

    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("");
    },
  },
};
</script>

<style></style>
