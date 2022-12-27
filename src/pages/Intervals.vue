<template>
  <div class="p-6">
    <div class="my-6 flex justify-between">
      <h1 class="text-lg font-semibold text-primary-heading1">
        Forecast Intervals
      </h1>
      <button
        class="bg-primary flex gap-2 px-3 py-1 rounded text-primary-textOnPrimary"
        @click="openAddIntervalModal"
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

        New Weather Forecast Interval
      </button>
    </div>
    <hr class="w-full my-2" />
    <div class="te">
      <h1 class="font-semibold text-primary-heading1">Forecast Intervals</h1>
      <div class="text-sm text-gray-400">Double click to edit</div>

      <div class="flex gap-2 flex-wrap">
        <div
          class="p-6 relative rounded border-2 border-white shadow-md cursor-pointer ease-in-out duration-300"
          v-for="interval in intervals"
          :key="interval"
          @dblclick="openEditIntervalModal(interval)"
        >
          <div class="flex flex-col items-center">
            <p class="font-semibold text-primary-hovered">
              {{ parseTime(interval.startTime) }}
            </p>
            -
            <p class="font-semibold text-primary-hovered">
              {{ parseTime(interval.endTime) }}
            </p>
          </div>

          <hr class="my-2" />

          <div
            @click="openDeleteIntervalModal(interval)"
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

  <vue-final-modal
    v-model="addIntervalModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white  py-6 px-12 rounded"
  >
    <div class="my-4" style="min-width: 20vw">
      <h1 class="text-primary-heading1 font-semibold">
        Add New Forecast Interval
      </h1>
      <div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Start Time
          </label>
          <select
            v-model="newInterval.startTime"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
          >
            <option v-for="time in timeOptions" :key="time" :value="time.value">
              {{ time.name }}
            </option>
          </select>
        </div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            End Time
          </label>
          <select
            v-model="newInterval.endTime"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
          >
            <option v-for="time in timeOptions" :key="time" :value="time.value">
              {{ time.name }}
            </option>
          </select>
        </div>

        <button
          @click="createNewInterval"
          class="text-primary-textOnPrimary bg-primary hover:bg-primary-hovered px-5 py-2 rounded w-full text-center"
        >
          Add
        </button>
      </div>
    </div>
  </vue-final-modal>

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
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white  py-6 px-12 rounded"
  >
    <div class="my-4" style="min-width: 20vw">
      <h1 class="text-primary-heading1 font-semibold">
        Edit Forecast Interval
      </h1>
      <div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            Start Time
          </label>
          <select
            v-model="selectedInterval.startTime"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
          >
            <option v-for="time in timeOptions" :key="time" :value="time.value">
              {{ time.name }}
            </option>
          </select>
        </div>
        <div class="my-4">
          <label
            class="block mb-2 text-sm text-primary-label dark:text-gray-300"
          >
            End Time
          </label>
          <select
            v-model="selectedInterval.endTime"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
            required
          >
            <option v-for="time in timeOptions" :key="time" :value="time.value">
              {{ time.name }}
            </option>
          </select>
        </div>

        <button
          @click="createNewInterval"
          class="text-primary-textOnPrimary bg-primary hover:bg-primary-hovered px-5 py-2 rounded w-full text-center"
        >
          Add
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

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
    timeOptions: TimeRange,

    addIntervalModal: false,
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

    openAddIntervalModal() {
      this.addIntervalModal = true;
    },

    parseTime(value) {
      let ok;
      for (let i = 0; i < this.timeOptions.length; i++) {
        if (this.timeOptions[i].value === value) {
          ok = this.timeOptions[i].name;
        }
      }

      return ok;
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
            this.addIntervalModal = false;
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
