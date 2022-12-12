<template>
  <div class="content-wrapper">
    <div class="content-section">
      <div class="content-section--title">Daily Forecast</div>
      <v-calendar />

      <div class="stations-container">
        <div class="stations-form">
          <p>Add new station</p>
          <div class="input-container">
            <label> Station Name </label>
            <input type="text" v-model="newStation.name" />
          </div>
          <div class="input-container w-1/2">
            <label> Latitude (Decimal Degrees)</label>
            <input type="number" v-model="newStation.latitude" />
          </div>
          <div class="input-container w-1/2">
            <label> Longitude (Decimal Degrees)</label>
            <input type="number" v-model="newStation.longitude" />
          </div>

          <div class="btn-container">
            <button @click="createNewStation" class="btn btn--interactive">
              Add New Station
            </button>
          </div>
        </div>
        <div class="station-cards">
          <div class="station-cards__title">Stations</div>
          <div class="station-cards__subtitle">Double click to edit</div>

          <div
            class="station-card"
            v-for="station in stations"
            :key="station"
            @dblclick="openEditStationModal(station)"
          >
            <div class="station-card--name">
              {{ station.name }}
            </div>

            <div
              class="station-actions"
              @click="openDeleteStationModal(station)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                style="height: 20px; width: 20px; color: white"
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
    v-model="deleteStationModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <h1 class="modal-content__title">Delete Station?</h1>
    <hr class="modal-content__hr" />
    <div class="modal-content__subtitle">
      Station Name:{{ selectedStation.name }}
    </div>

    <div class="modal-content__actions">
      <button class="btn btn--critical" @click="deleteStation">Delete?</button>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="editStationModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <h1 class="modal-content__title">Edit Station?</h1>
    <hr class="modal-content__hr" />
    <div class="modal-content__subtitle">
      Station Name:{{ selectedStation.name }}
    </div>
    <hr class="modal-content__hr" />

    <div class="modal-form">
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">Station Name</p>
        <input
          class="modal-form__input-field"
          type="text"
          v-model="selectedStation.name"
        />
      </div>
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">Latitude</p>
        <input
          class="modal-form__input-field"
          type="number"
          v-model="selectedStation.latitude"
        />
      </div>
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">Longitude</p>
        <input
          class="modal-form__input-field"
          type="number"
          v-model="selectedStation.longitude"
        />
      </div>

      <div class="modal-content__actions">
        <button @click="updateStation" class="btn btn--success">Update</button>
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
    openStationsTab() {
      this.stationsTabSelected = true;
      this.stationsMapTabSelected = false;
    },
    openStationsMapTab() {
      this.stationsTabSelected = false;
      this.stationsMapTabSelected = true;
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
