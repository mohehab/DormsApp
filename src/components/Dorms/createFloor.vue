<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <Dormstabs tab="floors" />
    <form>
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label
            >{{ $t("choose") + " " + $t("dorm") }}
            <span class="required">*</span></label
          >
          <b-form-select
            :class="floorInfo.dorm != null ? 'is-valid' : ''"
            v-model="floorInfo.dorm"
            disabled-field="notEnabled"
            @input="DetailsRelatedToDorm"
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
            >{{ $t("choose") + " " + $t("group") }}
            <span class="required">*</span></label
          >
          <b-form-select
            v-model="floorInfo.group"
            disabled-field="notEnabled"
            :class="floorInfo.group != null ? 'is-valid' : ''"
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
            >{{ $t("choose") + " " + $t("building") }}
            <span class="required">*</span></label
          >
          <b-form-select
            :class="floorInfo.building != null ? 'is-valid' : ''"
            v-model="floorInfo.building"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("building")
            }}</b-form-select-option>
            <b-form-select-option
              v-for="building in buildings"
              :key="building.id"
              :value="building.id"
              >{{ building.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="5">
          <label>{{ $t("Status") }} <span class="required">*</span></label>
          <b-form-select
            :class="floorInfo.status != null ? 'is-valid' : ''"
            v-model="floorInfo.status"
            :options="options"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("Status")
            }}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>رقم الدور <span class="required">*</span></label>
          <b-form-input
            type="text"
            v-model="floorInfo.floorNo"
            :state="floorNoState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            أدخل رقم الدور
          </b-form-invalid-feedback>
        </b-col>
        <b-col lg="5" class="data-item">
          <label>مشرف الدور</label>
          <b-form-input
            type="text"
            v-model="floorInfo.supervisor"
            :state="supervisorState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            أدخل اسم مشرف الدور
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>{{ $t("faculty") }}</label>
          <b-form-select
            :class="floorInfo.faculty != null ? 'is-valid' : ''"
            v-model="floorInfo.faculty"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled>{{
              $t("faculty")
            }}</b-form-select-option>
            <b-form-select-option
              v-for="faculty in faculties"
              :key="faculty.id"
              :value="faculty.id"
              >{{ faculty.faculty_name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="5">
          <label>{{ $t("nationality") }}</label>
          <b-form-select
            :class="floorInfo.nationality != null ? 'is-valid' : ''"
            v-model="floorInfo.nationality"
            :options="nationality"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("nationality")
            }}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row v-if="err.length != 0">
        <slot v-for="(errors, x) in err">
          <ul class="form--error" :key="x">
            <p>البيانات غير مكتملة أو غير صحيحة، من فضلك أكمل الآتي:</p>
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
              this.floorInfo.floorNo !== '' &&
                this.floorInfo.dorm !== null &&
                this.floorInfo.group !== null &&
                this.floorInfo.building !== null &&
                this.floorInfo.status !== null
            "
          >
            {{ $t("save") }}
          </button>
          <button
            type="submit"
            @click.prevent="onSubmit('/dorms/createPartition', 'POST')"
            class="blueBg"
            v-if="
              this.floorInfo.floorNo !== '' &&
                this.floorInfo.dorm !== null &&
                this.floorInfo.group !== null &&
                this.floorInfo.building !== null &&
                this.floorInfo.status !== null
            "
          >
            {{ $t("next") }}
          </button>
        </slot>
        <button
          type="submit"
          class="blueBg"
          @click.prevent="onSubmit(undefined, 'PUT', '/'+recordForUpdate)"
          v-if="recordForUpdate != null"
        >
          {{ $t("Edit") }}
        </button>
        <span class="redBg" @click="resetData">إلغاء</span>
      </div>
    </form>
    <div class="show-data table-style">
      <table class="grey-style">
        <tr>
          <th class="text-center">
            <input
              type="checkbox"
              @click="select_all_via_check_box"
              v-model="all_select"
            />
          </th>
          <th class="text-center">{{ $t("floor") }}</th>
          <th class="text-center">{{ $t("faculty") }}</th>
          <th class="text-center">الغرف</th>
          <th class="text-center">{{ $t("Status") }}</th>
          <th class="text-center">{{ $t("supervisor") }}</th>
          <th class="text-center">{{ $t("Edit") }}</th>
        </tr>
        <tr v-for="floor in floors" :key="floor.id">
          <td class="text-center">
            <input type="checkbox" v-model="updateItems" :value="floor.id" />
          </td>
          <td class="text-center">{{ floor.floor_number }}</td>
          <td class="text-center">-</td>
          <td class="text-center">
            {{ floor.building.total_partitions_count }}
          </td>
          <td v-if="floor.status == 'Active'" class="greenFont text-center">
            {{ $t("active") }}
          </td>
          <td v-if="floor.status != 'Active'" class="redFont text-center">
            {{ $t("off") }}
          </td>
          <td class="text-center">-</td>
          <td class="text-center">
            <span class="blueBg actions" @click.prevent="returnFloor(floor.id)"
              ><b-icon-pencil-fill></b-icon-pencil-fill
            ></span>
          </td>
        </tr>
        <tr v-if="floors.length < 1">
          <td colspan="7"><h4 class="text-center">لا توجد أدوار مسجلة</h4></td>
        </tr>
      </table>

      <div class="table-btns-container save-btn" v-if="floors.length >= 1">
        <span class="redBg" @click.prevent="changeStatus('active')">{{
          $t("deactivite")
        }}</span>
        <span class="greenBg" @click.prevent="changeStatus('off')">{{
          $t("activite")
        }}</span>
        <span class="redBg" v-b-modal="'deleteFloor'">حذف</span>
        <AlertBox
          :name="'deleteFloor'"
          question="هل تريد حذف الدور ؟"
          api="/buildingFloor/"
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
  name: "createFloor",
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
      dorms: "",
      genders: "",
      currentDorm: "",
      groups: [],
      buildings: "",
      floors: [],
      faculties: "",
      floorInfo: {
        dorm: null,
        building: null,
        group: null,
        faculty: null,
        status: null,
        floorNo: "",
        nationality: null,
        supervisor: ""
      },
      nationality: [
        { item: "active", name: "مصري" },
        { item: "off", name: "أجنبي" }
      ],
      options: [
        { item: "active", name: "مفعل" },
        { item: "off", name: "مغلق" }
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
      .get(store.state.domain + "/faculties/listAll", config)
      .then(res => (this.faculties = res.data.data));
  },
  computed: {
    floorNoState() {
      if (this.floorInfo.floorNo == "") {
        return null;
      } else {
        return true;
      }
    },
    supervisorState() {
      if (this.floorInfo.supervisor.length == 0) {
        return null;
      } else if (
        !this.floorInfo.supervisor.match(/[\u0600-\u06FF\u0750-\u077F]/)
      ) {
        return false;
      } else if (this.floorInfo.supervisor.length > 3) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getTableResults() {
      axios
        .get(store.state.domain + "/buildingFloor", config)
        .then(res => (this.floors = res.data.data));
    },
    DetailsRelatedToDorm() {
      if (this.floorInfo.dorm == null) {
        return this.floorInfo.group == null && this.floorInfo.building == null;
      } else if (this.floorInfo.dorm > 0) {
        axios
          .get(
            store.state.domain +
              "/buildingGroup?dorm_id=" +
              this.floorInfo.dorm,
            config
          )
          .then(res => (this.groups = res.data.data))
          .catch(error => {
            this.err = error.response.data.errors;
          });
        if (this.floorInfo.dorm !== null) {
          axios
            .get(
              store.state.domain +
                "/dormBuilding?dorm_id=" +
                this.floorInfo.dorm,
              config
            )
            .then(res => (this.buildings = res.data.data))
            .catch(error => {
              this.err = error.response.data.errors;
            });
        }
      }
    },
    onSubmit(next, method, id) {
      if (id == undefined) {
        id = ''
      }
      axios({
        method: method,
        url: store.state.domain + "/buildingFloor" + id,
        headers: {
          localization: store.state.localization
        },
        data: {
          building_id: this.floorInfo.building,
          floor_number: this.floorInfo.floorNo,
          status: this.floorInfo.status
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.getTableResults();
            this.resetData();
            if (next) {
              this.$router.push(next);
            }
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    resetData() {
      (this.floorInfo.building = null),
        (this.floorInfo.floorNo = ""),
        (this.floorInfo.status = null),
        (this.floorInfo.dorm = null),
        (this.floorInfo.group = null),
        (this.floorInfo.faculty = null),
        (this.floorInfo.nationality = null),
        (this.floorInfo.supervisor = ""),
        (this.recordForUpdate = null),
        (this.err = []);
    },
    returnFloor(FloorID) {
      this.recordForUpdate = FloorID;
      axios
        .get(store.state.domain + "/buildingFloor/" + FloorID, config)
        .then(res => {
          (this.floorInfo.dorm = res.data.data.building.dorm),
            (this.floorInfo.group = res.data.data.building.group.id),
            (this.floorInfo.building = res.data.data.building.id),
            (this.floorInfo.status =
              res.data.data.status.charAt(0).toLowerCase() +
              res.data.data.status.slice(1)),
            (this.floorInfo.floorNo = res.data.data.floor_number),
            (this.err = []);
          if (res.data.data.faculties.length == 0) {
            this.floorInfo.faculty = null;
          } else {
            this.floorInfo.faculty = res.data.data.faculties;
          }
        })
        .then(
          axios
            .get(
              store.state.domain +
                "/dormBuilding?dorm_id=" +
                this.floorInfo.dorm,
              config
            )
            .then(res => (this.buildings = res.data.data))
        )
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    changeStatus(status) {
      const $this = this;
      this.updateItems.forEach(function(id) {
        axios({
          method: "PUT",
          url: store.state.domain + "/buildingFloor/" + id,
          headers: {
            localization: store.state.localization
          },
          data: {
            status: status
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              $this.getTableResults();
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      });
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.floors.forEach(floor => {
          this.updateItems.push(floor.id);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    }
  }
};
</script>
