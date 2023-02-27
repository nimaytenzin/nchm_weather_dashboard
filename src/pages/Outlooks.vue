<template>
  <div class="w-full flex justify-center items-center h-full">
    <div class="bg-white p-6">
      <div class="my-6 flex justify-between">
        <h1 class="text-lg font-semibold text-primary-heading1">
          Weather Outlooks
        </h1>
        <button
          class="bg-primary flex gap-2 px-3 py-1 rounded text-primary-textOnPrimary"
          @click="openAddOutlookModal"
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

          New Weather Outlook
        </button>
      </div>
      <hr class="w-full my-2" />
      <div class="flex flex-wrap gap-4 w-full">
        <div
          v-for="outlook in outlooks"
          :key="outlook"
          @dblclick="openEditOutlookModal(outlook)"
          class="flex relative flex-col items-center bg-slate-500 p-4 rounded text-primary-light"
        >
          <div class="outlook-card__icon--day">
            <img
              :src="getIconUrl(outlook.dayIconUri)"
              class="w-16 h-auto"
              alt=""
            />
          </div>
          <!-- <div class="outlook-card__icon--night">
              <img :src="getIconUrl(outlook.nightIconUri)" alt="" />
            </div> -->
          <div class="outlook-card__name">
            {{ outlook.name }}
          </div>
          <div class="outlook-card__name">
            {{ outlook.nameDzo }}
          </div>

          <div
            class="absolute top-0 right-0 m-1 bg-white p-1 rounded-full cursor-pointer hover:scale-105 transition-all text-critical"
            @click="openDeleteOutlookModal(outlook)"
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
          </div>
        </div>
      </div>
    </div>
  </div>

  <vue-final-modal
    v-model="addOutlookModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white  py-6 px-12 rounded"
  >
    <h1 class="modal-content__title">Add Outlook?</h1>
    <hr class="modal-content__hr" />
    <div class="outlooks-form">
      <p>Add new Outlook</p>
      <div class="my-4">
        <label class="block mb-2 text-sm text-primary-label dark:text-gray-300">
          Outlook Name
        </label>
        <input
          type="text"
          v-model="newOutlook.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
          required
          rows="6"
        />
      </div>
      <div class="my-4">
        <label class="block mb-2 text-sm text-primary-label dark:text-gray-300">
          Outlook Name in Dzongkha
        </label>
        <input
          type="text"
          v-model="newOutlook.nameDzo"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
          required
          rows="6"
        />
      </div>

      <div class="input-container w-full">
        <FileSelector
          accept-extensions=".jpg,.svg,.png"
          :multiple="false"
          :max-file-size="5 * 1024 * 1024"
          @validated="handleFilesValidated"
          @changed="handleDayIconSelect"
        >
          <div
            class="flex w-full bg-interactive gap-2 p-2 bg-gray-200 text-gray-600 cursor-pointer"
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
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
            <p>Select Icon Image</p>
          </div>
        </FileSelector>

        <div class="outlooks-form__preview-container">
          <img
            class="outlooks-form__preview-container__icon-preview"
            v-if="dayIconUrl"
            :src="dayIconUrl"
          />
        </div>
      </div>

      <div class="btn-container">
        <button @click="createNewOutlook" class="btn btn--interactive">
          Add New Outlook
        </button>
      </div>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="deleteOutlookModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white  py-6 px-12 rounded"
  >
    <h1 class="modal-content__title">Delete Outlook?</h1>
    <hr class="modal-content__hr" />
    <div class="modal-content__subtitle">Name:{{ selectedOutlook.name }}</div>

    <div class="modal-content__actions">
      <button class="btn btn--critical" @click="deleteOutlook">Delete?</button>
    </div>
  </vue-final-modal>

  <vue-final-modal
    v-model="editOutlookModal"
    classes="w-full h-full bg-black flex justify-center items-center bg-opacity-20"
    content-class="bg-white  py-6 px-12 rounded"
  >
    <h1 class="modal-content__title">Edit Outlook?</h1>
    <hr class="modal-content__hr" />
    <div class="modal-content__subtitle">Name:{{ selectedOutlook.name }}</div>
    <hr class="modal-content__hr" />

    <div class="modal-form">
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">Outlook Name</p>
        <input
          class="modal-form__input-field"
          type="text"
          v-model="selectedOutlook.name"
        />
      </div>
      <div class="modal-form__input-container">
        <p class="modal-form__input-label">Icon</p>
        <div class="modal-form__icon_container">
          <img
            v-if="updateDayIconUrl"
            :src="updateDayIconUrl"
            alt=""
            style="width: 150px"
          />
          <img
            v-else
            :src="getIconUrl(selectedOutlook.dayIconUri)"
            alt=""
            style="width: 150px"
          />
        </div>
        <FileSelector
          accept-extensions=".jpg,.svg,.png"
          :multiple="false"
          :max-file-size="5 * 1024 * 1024"
          @validated="handleFilesValidated"
          @changed="handleDayIconUpdateSelect"
        >
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 10px;
            "
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="grey"
                style="height: 40px"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
            </div>

            <div>Replace Icon</div>
          </div>
        </FileSelector>
      </div>

      <div class="modal-content__actions">
        <button @click="updateOutlook" class="btn btn--success">Update</button>
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
  CreateNewWeatherOutlook,
  DeleteWeatherOutlook,
  GetAllWeatherOutlooks,
  UpdateWeatherOutlook,
} from "../dataservice/outlooks.service";

import CustomDropdown from "../components/custom-dropdown.vue";
import { BackendApi } from "../constants";
export default {
  components: { CustomDropdown },
  data: () => ({
    outlooks: [],
    newOutlook: {},
    selectedOutlook: {},
    dayIcon: {},
    dayIconUrl: "",
    updateDayIcon: {},
    updateDayIconUrl: "",
    // nightIcon: {},
    // nightIconUrl: "",

    addOutlookModal: false,
    deleteOutlookModal: false,
    editOutlookModal: false,
  }),
  created() {
    this.fetchAllOutlooks();
  },

  methods: {
    handleFilesValidated(result, files) {
      console.log(result, files);
      if (result !== true) {
        this.$toast.show(`${result}`, {
          position: "top",
          type: "error",
        });
      }
    },

    handleNightIconSelect(files) {
      this.nightIcon = files[0];
      this.nightIconUrl = URL.createObjectURL(this.nightIcon);
    },
    handleDayIconSelect(files) {
      this.dayIcon = files[0];
      this.dayIconUrl = URL.createObjectURL(this.dayIcon);
    },
    handleDayIconUpdateSelect(files) {
      this.updateDayIcon = files[0];
      this.updateDayIconUrl = URL.createObjectURL(this.updateDayIcon);
    },
    fetchAllOutlooks() {
      GetAllWeatherOutlooks().then((res) => {
        this.outlooks = res.data;
      });
    },
    openDeleteOutlookModal(outlook) {
      this.selectedOutlook = outlook;
      this.deleteOutlookModal = true;
    },
    openAddOutlookModal() {
      this.addOutlookModal = true;
    },

    getIconUrl(uri) {
      return `${BackendApi}/icons/${uri}`;
    },

    createNewOutlook() {
      let formData = new FormData();
      formData.append("dayIcon", this.dayIcon);
      // formData.append("nightIcon", this.nightIcon);
      formData.append("name", this.newOutlook.name);
      formData.append("nameDzo", this.newOutlook.nameDzo);
      console.log(this.newOutlook);
      CreateNewWeatherOutlook(formData)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.show(`New Outlook: ${this.newOutlook.name} Added`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllOutlooks();
            this.newOutlook = {};
            this.dayIconUrl = null;
            this.nightIconUrl = null;
          }
        })
        .catch((error) => {
          this.$toast.show(
            `Failed to add Outllok: ${this.newOutlook.name}, Error:${error.message}`,
            {
              position: "top",
              useDefaultCss: true,
              type: "error",
            }
          );
        });
    },

    openEditOutlookModal(outlook) {
      this.selectedOutlook = outlook;
      this.editOutlookModal = true;
      this.updateDayIconUrl = null;
    },
    updateOutlook() {
      let formData = new FormData();
      if (this.updateDayIconUrl) {
        formData.append("dayIcon", this.updateDayIconUrl);
      }
      // formData.append("nightIcon", this.nightIcon);
      formData.append("name", this.selectedOutlook.name);

      console.log(this.selectedOutlook);
      UpdateWeatherOutlook(this.selectedOutlook.id, this.selectedOutlook)
        .then((res) => {
          if (res.status === 200) {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteOutlook() {
      DeleteWeatherOutlook(this.selectedOutlook.id)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.show(`Deleted!`, {
              position: "top",
              useDefaultCss: true,
              type: "success",
            });
            this.fetchAllOutlooks();
            this.deleteOutlookModal = false;
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
