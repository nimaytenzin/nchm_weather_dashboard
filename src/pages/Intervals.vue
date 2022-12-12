<template>
  <div class="content-wrapper">
    <div class="content-section">
      <div class="content-section--title">Forecast Intervals</div>
      <div class="stations-container">
        <div class="stations-form">
          <p>Add new Interval</p>
          <div class="input-container">
            <label> Interval Name </label>
            <input type="text" v-model="newInterval.name" />
          </div>
          <div class="input-container w-1/2">
            <label> Start Time</label>
            <select v-model="newInterval.startTime">
              <option v-for="time in timeRange" :key="time" :value="time.value">
                {{ time.name }}
              </option>
            </select>
          </div>
          <div class="input-container w-1/2">
            <label> End Time</label>
            <select v-model="newInterval.endTime">
              <option v-for="time in timeRange" :key="time" :value="time.value">
                {{ time.name }}
              </option>
            </select>
          </div>

          <div class="btn-container">
            <button @click="createNewInterval" class="btn btn--interactive">
              Add New Interval
            </button>
          </div>
        </div>
        <div class="station-cards">
          <div class="station-cards__title">Intervals</div>
          <div class="station-cards__subtitle">Double click to edit</div>

          <div
            class="station-card"
            v-for="interval in intervals"
            :key="interval"
            @dblclick="openEditIntervalModal(interval)"
          >
            <div class="station-card--name">
              {{ interval.name }}
            </div>

            <div
              class="station-actions"
              @click="openDeleteIntervalModal(interval)"
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
    v-model="deleteIntervalModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <h1 class="modal-content__title">Delete Interval?</h1>
    <hr class="modal-content__hr" />
    <div class="modal-content__subtitle">
      Interval Name:{{ selectedInterval.name }}
    </div>

    <div class="modal-content__actions">
      <button class="btn btn--critical" @click="deleteInterval">Delete?</button>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="editIntervalModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <h1 class="modal-content__title">Edit Interval?</h1>
    <hr class="modal-content__hr" />
    <div class="modal-content__subtitle">
      Station Name:{{ selectedInterval.name }}
    </div>
    <hr class="modal-content__hr" />

    <div class="modal-form">
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">Interval Name</p>
        <input
          class="modal-form__input-field"
          type="text"
          v-model="selectedInterval.name"
        />
      </div>
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">Start Time</p>
        <select
          class="modal-form__input-field"
          v-model="selectedInterval.startTime"
        >
          <option v-for="time in timeRange" :key="time" :value="time.value">
            {{ time.name }}
          </option>
        </select>
      </div>
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">End Time</p>
        <select
          class="modal-form__input-field"
          v-model="selectedInterval.endTime"
        >
          <option v-for="time in timeRange" :key="time" :value="time.value">
            {{ time.name }}
          </option>
        </select>
      </div>

      <div class="modal-content__actions">
        <button @click="updateInterval" class="btn btn--success">Update</button>
      </div>
    </div>
  </vue-final-modal>
</template>

<style lang="scss" scoped>
.my-dropdown-toggle {
  border-radius: 5px;

  ::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 25px;
    font-weight: 800;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: #c4c4c4;
  }
}
</style>
<script>
import {
  CreateNewInterval,
  GetAllIntervals,
  Deleteinterval,
  Updateinterval,
} from "../dataservice/interval.service.js";

import CustomDropdown from "../components/custom-dropdown.vue";
import { TimeRange } from "../constants";
export default {
  components: { CustomDropdown },
  data: () => ({
    intervals: [],
    newInterval: {},
    timeRange: TimeRange,

    selectedInterval: {},
    options: [1, 23, 423, 2],

    deleteIntervalModal: false,
    editIntervalModal: false,
    selectedInterval: {},
    editIntervalModal: false,
    deleteIntervalModal: false,
  }),
  created() {
    this.fetchAllIntervals();
  },

  methods: {
    fetchAllIntervals() {
      GetAllIntervals().then((res) => {
        this.intervals = res.data;
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
    createNewInterval() {
      if (
        !this.newInterval.name &&
        !this.newInterval.startTime &&
        !this.newInterval.endTime
      ) {
        this.$toast.show("Please Enter All the required Details", {
          position: "top",
          type: "error",
        });
        return;
      }
      CreateNewInterval(this.newInterval)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.show(`New Station: ${this.newInterval.name} Added`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllIntervals();
            this.newInterval = {};
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
    updateInterval() {
      Updateinterval(this.selectedInterval.id, this.selectedInterval)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.show(`Updated Station Details`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllIntervals();
            this.editIntervalModal = false;
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

    openEditIntervalModal(interval) {
      this.selectedInterval = interval;
      this.editIntervalModal = true;
    },
    openDeleteIntervalModal(interval) {
      this.selectedInterval = interval;
      this.deleteIntervalModal = true;
    },
    deleteInterval() {
      Deleteinterval(this.selectedInterval.id)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.show(`Deleted!`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllIntervals();
            this.deleteIntervalModal = false;
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
