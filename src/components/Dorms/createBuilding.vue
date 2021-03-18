<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <Dormstabs tab="buildings" />
    <form>
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label
            >{{ $t("choose") + " " + $t("dorm")
            }}<span class="required">*</span></label
          >
          <b-form-select
            @input="GroupRelatedToDorm"
            :class="building.dorm != null ? 'is-valid' : ''"
            v-model="building.dorm"
            disabled-field="notEnabled"
            required
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("dorm")
            }}</b-form-select-option>
            <b-form-select-option
              v-for="dorm in dorms"
              :key="dorm.id"
              :value="dorm.id"
              >{{ dorm.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="5" class="data-item">
          <label
            >{{ $t("choose") + " " + $t("group")
            }}<span class="required">*</span></label
          >
          <b-form-select
            :class="building.group != null ? 'is-valid' : ''"
            v-model="building.group"
            disabled-field="notEnabled"
            required
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("group")
            }}</b-form-select-option>
            <b-form-select-option
              v-for="group in groups"
              :key="group.id"
              :value="group.id"
              >{{ group.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label
            >{{ $t("buildingName") + " " + $t("Byar")
            }}<span class="required">*</span></label
          >
          <b-form-input
            type="text"
            v-model="building.buildingNameAr"
            :state="BuildingArState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ $t("Enter") + " " + $t("buildingName") + " " + $t("Byar") }}
          </b-form-invalid-feedback>
        </b-col>
        <b-col cols="5" class="data-item">
          <label
            >{{ $t("buildingName") + " " + $t("Byen")
            }}<span class="required">*</span></label
          >
          <b-form-input
            type="text"
            v-model="building.buildingNameEn"
            :state="BuildingEnState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ $t("Enter") + " " + $t("buildingName") + " " + $t("Byen") }}
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>{{ $t("buildingAddress") + " " + $t("Byar") }}</label>
          <b-form-input
            type="text"
            v-model="building.locationAr"
            :state="LocationArState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ $t("Enter") + " " + $t("buildingAddress") + " " + $t("Byar") }}
          </b-form-invalid-feedback>
        </b-col>
        <b-col cols="5" class="data-item">
          <label>{{ $t("buildingAddress") + " " + $t("Byen") }}</label>
          <b-form-input
            type="text"
            v-model="building.locationEn"
            :state="LocationEnState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ $t("Enter") + " " + $t("buildingAddress") + " " + $t("Byen") }}
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>نوع المقيمين <span class="required">*</span></label>
          <b-form-select
            v-model="building.gender"
            disabled-field="notEnabled"
            :class="building.gender != null ? 'is-valid' : ''"
          >
            <b-form-select-option :value="null" disabled required
              >نوع المقيمين</b-form-select-option
            >
            <b-form-select-option
              v-for="gender in genders"
              :key="gender.id"
              :value="gender.id"
              >{{ gender.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="5">
          <label>{{ $t("Status") }}<span class="required">*</span></label>
          <b-form-select
            :class="building.status != null ? 'is-valid' : ''"
            v-model="building.status"
            :options="options"
            value-field="value"
            text-field="text"
            disabled-field="notEnabled"
            required
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("Status")
            }}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row v-if="err.length != 0">
        <p>البيانات غير مكتملة أو غير صحيحة، من فضلك أكمل الآتي:</p>
        <slot v-for="(errors, x) in err">
          <ul class="form--error" :key="x">
            <li v-for="(error, i) in errors" :key="i">
              {{ error }}
            </li>
          </ul>
        </slot>
      </b-row>
      <div class="save-btn">
        <slot v-if="recordForUpdate == null">
          <button
            type="submit"
            @click.prevent="onSubmit(undefined, 'POST')"
            class="blueBg"
            v-if="
              this.BuildingArState == true &&
                this.BuildingEnState == true &&
                this.building.dorm !== null &&
                this.building.status !== null &&
                this.building.gender !== null
            "
          >
            {{ $t("save") }}
          </button>
          <button
            type="submit"
            @click.prevent="onSubmit('/dorms/createFloor', 'POST')"
            class="blueBg"
            v-if="
              this.BuildingArState == true &&
                this.BuildingEnState == true &&
                this.building.dorm !== null &&
                this.building.status !== null &&
                this.building.gender !== null
            "
          >
            {{ $t("next") }} 
          </button>
        </slot>
        <button
          type="submit"
          class="blueBg"
          @click.prevent="onSubmit(undefined, 'PUT', '/' + recordForUpdate)"
          v-if="
            recordForUpdate != null &&
              this.BuildingArState == true &&
              this.BuildingEnState == true &&
              this.building.dorm !== null &&
              this.building.status !== null &&
              this.building.gender !== null
          "
        >
          {{ $t("Edit") }}
        </button>
        <span class="redBg" @click="resetData">{{ $t("cancel") }}</span>
      </div>
    </form>
    <div class="show-data table-style">
      <table class="grey-style">
        <tr>
          <th>
            <input
              type="checkbox"
              @click="select_all_via_check_box"
              v-model="all_select"
            />
          </th>
          <th class="text-center">{{ $t("buildingName") }}</th>
          <th class="text-center">العنوان</th>
          <th class="text-center">الأدوار المفعلة</th>
          <th class="text-center">الغرف المفعلة</th>
          <th class="text-center">{{ $t("Status") }}</th>
          <th class="text-center">نوع المقيم</th>
          <th class="text-center">{{ $t("Edit") }}</th>
        </tr>
        <tr v-for="building in buildings" :key="building.id">
          <td>
            <input type="checkbox" v-model="updateItems" :value="building.id" />
          </td>
          <td>{{ building.name_ar }}</td>
          <td class="text-center">
            {{ building.location_ar != null ? building.location_ar : "-" }}
          </td>
          <td class="text-center">{{ building.floors_number }}</td>
          <td class="text-center">
            {{ building.total_active_partitions_count }}
          </td>
          <td v-if="building.status == 'Active'" class="greenFont text-center">
            {{ $t("active") }}
          </td>
          <td v-else class="redFont text-center">{{ $t("off") }}</td>
          <td v-if="building.gender.id == 1" class="text-center">
            <font-awesome-icon icon="male" />
          </td>
          <td v-else class="text-center">
            <font-awesome-icon icon="female" />
          </td>
          <td class="text-center">
            <span class="blueBg actions" @click="returnBuilding(building.id)"
              ><b-icon-pencil-fill></b-icon-pencil-fill
            ></span>
          </td>
        </tr>
        <tr v-if="buildings.length < 1">
          <td colspan="8"><h4 class="text-center">لا توجد مباني مسجلة</h4></td>
        </tr>
      </table>

      <div class="table-btns-container save-btn" v-if="buildings.length >= 1">
        <span class="redBg" @click.prevent="changeStatus('off')">{{
          $t("deactivite")
        }}</span>
        <span class="greenBg" @click.prevent="changeStatus('active')">{{
          $t("activite")
        }}</span>
        <span class="redBg" v-b-modal="'deleteBuilding'">{{
          $t("Delete")
        }}</span>
        <AlertBox
          :name="'deleteBuilding'"
          question="هل تريد حذف المبنى ؟"
          api="/dormBuilding/"
          :ids="this.updateItems"
          :reload="getTableResults"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertBox from "../Global/Alert";
import store from "@/store/index.js";
import axios from "axios";
import Dormstabs from "./DormsTabs";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "createBuilding",
  components: {
    Dormstabs,
    AlertBox
  },
  data() {
    return {
      err: [],
      recordForUpdate: null,
      all_select: false,
      updateItems: [],
      dorms: [],
      genders: "",
      checked: false,
      groups: [],
      buildings: [],
      building: {
        buildingNameAr: "",
        buildingNameEn: "",
        gender: null,
        group: null,
        dorm: null,
        status: null,
        locationAr: "",
        locationEn: ""
      },
      options: [
        { value: "active", text: "مفعل" },
        { value: "off", text: "مغلق" }
      ]
    };
  },
  mounted() {
    this.getTableResults();
    axios
      .get(store.state.domain + "/dorm", config)
      .then(res => (this.dorms = res.data.data));
    axios
      .get(store.state.domain + "/buildingGroup", config)
      .then(res => (this.groups = res.data.data));
    axios
      .get(store.state.domain + "/generalServices/listGenders", config)
      .then(res => (this.genders = res.data.data));
  },
  computed: {
    BuildingArState() {
      if (this.building.buildingNameAr.length == 0) {
        return null;
      } else if (
        this.building.buildingNameAr.match(/^[ء-ي\s]*$/) &&
        this.building.buildingNameAr.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    BuildingEnState() {
      if (this.building.buildingNameEn.length == 0) {
        return null;
      } else if (
        this.building.buildingNameEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.building.buildingNameEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    LocationArState() {
      if (this.building.locationAr == 0) {
        return null;
      } else if (
        this.building.locationAr.match(/^[ء-ي\s]*$/) &&
        this.building.locationAr.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    LocationEnState() {
      if (this.building.locationEn.length == 0) {
        return null;
      } else if (
        this.building.locationEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.building.locationEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getTableResults() {
      axios
        .get(store.state.domain + "/dormBuilding", config)
        .then(res => (this.buildings = res.data.data));
    },
    GroupRelatedToDorm() {
      if (this.building.dorm == null) {
        return this.building.group == null;
      } else if (this.building.dorm > 0) {
        axios
          .get(
            store.state.domain + "/buildingGroup?dorm_id=" + this.building.dorm,
            config
          )
          .then(res => (this.groups = res.data.data))
          .catch(error => {
            this.err = error.response.data.errors;
          });
      }
    },
    resetData() {
      (this.building.buildingNameAr = ""),
        (this.building.buildingNameEn = ""),
        (this.building.locationAr = ""),
        (this.building.locationEn = ""),
        (this.building.gender = null),
        (this.building.group = null),
        (this.building.dorm = null),
        (this.building.status = null),
        (this.recordForUpdate = null),
        (this.err = []);
    },
    returnBuilding(id) {
      this.recordForUpdate = id;
      axios
        .get(store.state.domain + "/dormBuilding/" + id, config)
        .then(res => {
          (this.building.buildingNameAr = res.data.data.name_ar),
            (this.building.buildingNameEn = res.data.data.name_en),
            (this.building.status =
              res.data.data.status.charAt(0).toLowerCase() +
              res.data.data.status.slice(1)),
            (this.building.gender = res.data.data.gender.id),
            (this.building.dorm = res.data.data.dorm),
            (this.building.group = res.data.data.group.id),
            (this.building.locationAr = res.data.data.location_ar),
            (this.building.locationEn = res.data.data.location_en),
            (this.err = []);
        });
    },
    changeStatus(status) {
      const $this = this;
      this.updateItems.forEach(function(id) {
        axios({
          method: "PUT",
          url: store.state.domain + "/dormBuilding/" + id,
          headers: {
            localization: store.state.localization
          },
          data: {
            status: status
          }
        }).then(res => {
          if (res.status == 200 || res.status == 201) {
            $this.getTableResults();
          }
        });
      });
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.buildings.forEach(building => {
          this.updateItems.push(building.id);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
    onSubmit(next, method, id) {
      if (id == undefined) {
        id = ''
      }
      axios({
        method: method,
        url: store.state.domain + "/dormBuilding" + id,
        headers: {
          localization: store.state.localization
        },
        data: {
          name_ar: this.building.buildingNameAr,
          name_en: this.building.buildingNameEn,
          status: this.building.status,
          dorm_id: this.building.dorm,
          building_group_id: this.building.group,
          gender_id: this.building.gender,
          location_ar: this.building.locationAr,
          location_en: this.building.locationEn
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.getTableResults();
            this.resetData();
            if (next !== undefined) {
              this.$router.push(next);
            }
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    }
  }
};
</script>
