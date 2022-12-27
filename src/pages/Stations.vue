<template>
  <div class="p-6">
    <div class="my-6 flex justify-between">
      <h1 class="text-lg font-semibold text-primary-heading1">
        Weather Stations
      </h1>
      <button
        class="bg-primary flex gap-2 px-3 py-1 rounded text-primary-textOnPrimary"
        @click="openAddStationsModal"
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
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        New Weather Station
      </button>
    </div>
    <hr class="w-full my-2" />
    <div class="stations-container">
      <div class="station-cards">
        <h1 class="font-semibold text-primary-heading1">Weather Stations</h1>
        <div class="text-sm text-gray-400">Double click to edit</div>

        <div class="flex py-2 gap-2 flex-wrap overflow-y-scroll">
          <div
            class="p-6 relative rounded border-2 border-white shadow-md cursor-pointer ease-in-out duration-300"
            v-for="station in stations"
            :key="station"
            @dblclick="openEditStationModal(station)"
          >
            <div>
              <p class="text-xl">
                {{ station.name }}
              </p>
              <p>
                {{ station.nameDzo }}
              </p>
            </div>
            <hr class="my-2" />
            <div class="text-xs">
              <p>Lat: {{ station.latitude }},</p>
              <p>Long: {{ station.longitude }}</p>
            </div>

            <div
              @click="openDeleteStationModal(station)"
              class="text-critical absolute bottom-0 right-0 hover:scale-105 transition-all duration-300 flex items-center justify-center m-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="addStationsModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white  py-6 px-12 rounded"
  >
    <div class="my-4" style="min-width: 20vw">
      <h1 class="text-primary-heading1 font-semibold">
        Add New Weather Station
      </h1>
      <div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Station Name
          </label>
          <input
            type="text"
            v-model="newStation.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>

        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Station Name in Dzongkha
          </label>
          <input
            type="text"
            v-model="newStation.nameDzo"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>

        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Latitude
          </label>
          <input
            type="number"
            v-model="newStation.latitude"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Longitude
          </label>
          <input
            type="number"
            v-model="newStation.longitude"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>

        <button
          @click="createNewStation"
          class="text-primary-textOnPrimary bg-primary hover:bg-primary-hovered px-5 py-2 rounded w-full text-center"
        >
          Add
        </button>
      </div>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="deleteStationModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white p-6 rounded"
  >
    <div style="min-width: 20vw">
      <h1 class="text-critical font-semibold">Delete Station?</h1>
      <div class="my-4">
        <label class="block mb-2 text-sm text-primary-label dark:text-gray-300">
          Name
        </label>

        <p
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
          rows="6"
        >
          {{ selectedStation.name }} | {{ selectedStation.nameDzo }}
        </p>
      </div>
      <div class="flex gap-2 my-6">
        <button
          @click="deleteStation"
          class="text-destructive-textonDestructive bg-critical px-5 py-2 rounded w-full text-center"
        >
          Delete
        </button>

        <button
          @click="deleteStationModal = false"
          class="bg-gray-100 border text-gray-800 px-5 py-2 rounded w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  </vue-final-modal>

  <!--  -->

  <vue-final-modal
    v-model="editStationModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white p-6 rounded"
  >
    <div class="my-4" style="min-width: 20vw">
      <h1 class="text-primary-heading1 font-semibold">
        Update Weather Station
      </h1>
      <div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Station Name
          </label>
          <input
            type="text"
            v-model="selectedStation.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>

        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Station Name in Dzongkha
          </label>
          <input
            type="text"
            v-model="selectedStation.nameDzo"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>

        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Latitude
          </label>
          <input
            type="number"
            v-model="selectedStation.latitude"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Longitude
          </label>
          <input
            type="number"
            v-model="selectedStation.longitude"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
            rows="6"
          />
        </div>

        <button
          @click="updateStation"
          class="text-primary-textOnPrimary bg-primary hover:bg-primary-hovered px-5 py-2 rounded w-full text-center"
        >
          Update
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import {
  CreateNewWeatherStation,
  GetAllWeatherStations,
  DeleteWeatherStation,
  UpdateWeatherStation,
} from "../dataservice/weather-station.service.js";
export default {
  data: () => ({
    stations: [],
    stationsTabSelected: true,
    stationsMapTabSelected: false,
    newStation: {},
    addStationsModal: false,
    selectedStation: {},
    editStationModal: false,
    deleteStationModal: false,
  }),
  created() {
    this.fetchAllStations();
  },
  methods: {
    fetchAllStations() {
      GetAllWeatherStations().then((res) => {
        this.stations = res.data;
      });
    },

    createNewStation() {
      if (
        !this.newStation.name &&
        !this.newStation.latitude &&
        !this.newStation.longitude
      ) {
        this.$toast.show("Please Enter All the required Details", {
          position: "top",
          type: "error",
        });
        return;
      }
      CreateNewWeatherStation(this.newStation)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.show(`New Station: ${this.newStation.name} Added`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllStations();
            this.addStationsModal = false;
            this.newStation = {};
          }
        })
        .catch((error) => {
          this.$toast.show(
            `Failed to add station: ${this.newStation.name}, Error:${error.message}`,
            {
              position: "top",
              useDefaultCss: true,
              type: "error",
            }
          );
        });
    },
    updateStation() {
      UpdateWeatherStation(this.selectedStation.id, this.selectedStation)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.show(`Updated Station Details`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllStations();
            this.editStationModal = false;
          }
        })
        .catch((error) => {
          this.$toast.show(`Opps! Error:${error.message}`, {
            position: "top",
            useDefaultCss: true,
            type: "error",
          });
        });
    },
    openAddStationsModal() {
      this.addStationsModal = true;
    },
    openEditStationModal(station) {
      this.selectedStation = station;
      this.editStationModal = true;
    },
    openDeleteStationModal(station) {
      this.deleteStationModal = true;
      this.selectedStation = station;
    },
    deleteStation() {
      DeleteWeatherStation(this.selectedStation.id)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.show(`Deleted!`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllStations();
            this.deleteStationModal = false;
          }
        })
        .catch((error) => {
          this.$toast.show(`Opps! Error:${error.message}`, {
            position: "top",
            useDefaultCss: true,
            type: "error",
          });
        });
    },
  },
};
</script>

<style></style>
