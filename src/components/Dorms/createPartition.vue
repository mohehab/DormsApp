<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <Dormstabs tab="rooms" />
    <form class="label-size">
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label
            >{{ $t("choose") + " " + $t("dorm") }}
            <span class="required">*</span></label
          >
          <b-form-select
            :class="partitionInfo.dorm != null ? 'is-valid' : ''"
            v-model="partitionInfo.dorm"
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
            :class="partitionInfo.group != null ? 'is-valid' : ''"
            disabled-field="notEnabled"
            v-model="partitionInfo.group"
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
            :class="partitionInfo.building != null ? 'is-valid' : ''"
            v-model="partitionInfo.building"
            disabled-field="notEnabled"
            @input="PartitionFloorInfo"
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
        <b-col cols="5" class="data-item">
          <label
            >{{ $t("choose") + " " + $t("floor") }}
            <span class="required">*</span></label
          >
          <b-form-select
            :class="partitionInfo.floorNo != null ? 'is-valid' : ''"
            v-model="partitionInfo.floorNo"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("floor")
            }}</b-form-select-option>
            <b-form-select-option
              v-for="floor in floors"
              :key="floor.id"
              :value="floor.id"
              >{{ floor.floor_number }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>رقم الغرفة <span class="required">*</span></label>
          <b-form-input
            type="text"
            v-model="partitionInfo.room"
            :state="roomState"
            required
          ></b-form-input>
        </b-col>
        <b-col lg="5" class="data-item">
          <label>سعة الغرفة <span class="required">*</span></label>
          <b-form-input
            type="text"
            v-model="partitionInfo.capacity"
            :state="capacityState"
            required
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>نوع الغرفة <span class="required">*</span></label>
          <b-form-select
            :class="partitionInfo.partitionType != null ? 'is-valid' : ''"
            v-model="partitionInfo.partitionType"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled
              >نوع الغرفة</b-form-select-option
            >
            <b-form-select-option
              v-for="partition in partitionType"
              :key="partition.id"
              :value="partition.id"
              >{{ partition.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="5">
          <label>{{ $t("Status") }} <span class="required">*</span></label>
          <b-form-select
            :class="partitionInfo.status != null ? 'is-valid' : ''"
            v-model="partitionInfo.status"
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
          <label>{{ $t("faculty") }}</label>
          <b-form-select
            :class="partitionInfo.faculty != null ? 'is-valid' : ''"
            v-model="partitionInfo.faculty"
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
            :class="partitionInfo.nationality != null ? 'is-valid' : ''"
            v-model="partitionInfo.nationality"
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
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>محتويات الغرفة</label>
          <b-dropdown text="محتويات الغرفة" ref="dropdown">
            <b-form-checkbox
              v-model="selected"
              :value="asset"
              v-for="(asset, i) in assetsData"
              :key="i"
              >{{ asset.name_ar }}</b-form-checkbox
            >
          </b-dropdown>
        </b-col>
      </b-row>
      <b-row>
        <div class="show-data table-style" v-if="selected.length > 0">
          <table class="grey-style">
            <tr>
              <th>الأصول</th>
              <th>الكمية</th>
              <th>{{ $t("Delete") }}</th>
            </tr>
            <tr v-for="(select, index) in selected" :key="index">
              <td>{{ selected[index].name_ar }}</td>
              <td>
                *
                <b-form-input
                  type="number"
                  required
                  v-model.number="selected[index].quantity"
                ></b-form-input>
              </td>
              <td>
                <span class="redBg actions" @click="deleteitem(index)">
                  <b-icon-trash></b-icon-trash
                ></span>
              </td>
            </tr>
          </table>
        </div>
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
            class="blueBg"
            @click.prevent="onSubmit('POST')"
            v-if="
              partitionInfo.dorm !== null &&
                partitionInfo.building !== null &&
                partitionInfo.floor !== null &&
                partitionInfo.group !== null &&
                partitionInfo.status !== null &&
                partitionInfo.partitionType !== null &&
                partitionInfo.partitionType !== null &&
                partitionInfo.capacity !== '' &&
                partitionInfo.room !== ''
            "
          >
            {{ $t("save") }}
          </button>
        </slot>
        <button
          type="submit"
          class="blueBg"
           @click.prevent="onSubmit('PUT', recordForUpdate)"
          v-if="
            recordForUpdate !== null &&
              partitionInfo.dorm !== null &&
              partitionInfo.building !== null &&
              partitionInfo.floor !== null &&
              partitionInfo.group !== null &&
              partitionInfo.status !== null &&
              partitionInfo.partitionType !== null &&
              partitionInfo.partitionType !== null &&
              partitionInfo.capacity !== '' &&
              partitionInfo.room !== ''
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
          <th class="text-center">
            <input
              type="checkbox"
              @click="select_all_via_check_box"
              v-model="all_select"
            />
          </th>
          <th class="text-center">الغرفة</th>
          <th class="text-center">{{ $t("Status") }}</th>
          <th class="text-center">{{ $t("Edit") }}</th>
        </tr>
        <tr v-for="partition in partitions" :key="partition.id">
          <td class="text-center">
            <input
              type="checkbox"
              v-model="updateItems"
              :value="partition.id"
            />
          </td>
          <td class="text-center">{{ partition.partition_number }}</td>
          <td v-if="partition.status == 'Active'" class="greenFont text-center">
            {{ $t("active") }}
          </td>
          <td v-if="partition.status == 'Off'" class="redFont text-center">
            {{ $t("off") }}
          </td>
          <td class="text-center">
            <span
              class="blueBg actions"
              @click.prevent="returnPartition(partition.id)"
              ><b-icon-pencil-fill></b-icon-pencil-fill
            ></span>
          </td>
        </tr>
        <tr v-if="partitions.length < 1">
          <td colspan="5"><h4 class="text-center">لا توجد غرف مسجلة</h4></td>
        </tr>
      </table>

      <div class="table-btns-container save-btn" v-if="partitions.length >= 1">
        <span class="redBg" @click.prevent="changeStatus('active')">{{
          $t("deactivite")
        }}</span>
        <span class="greenBg" @click.prevent="changeStatus('off')">{{
          $t("activite")
        }}</span>
        <span class="redBg" v-b-modal="'deletePartition'">{{
          $t("Delete")
        }}</span>
        <AlertBox
          :name="'deletePartition'"
          question="هل تريد حذف الغرفة ؟"
          api="/floorPartition/"
          :ids="updateItems"
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
const config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "createPartition",
  components: {
    Dormstabs,
    AlertBox
  },
  data() {
    return {
      recordForUpdate: null,
      selected: [],
      err: [],
      all_select: false,
      updateItems: [],
      dorms: "",
      genders: "",
      currentDorm: "",
      groups: "",
      buildings: "",
      floors: "",
      faculties: "",
      assetsData: [],
      assets: "",
      partitions: [],
      partitionInfo: {
        dorm: null,
        group: null,
        building: null,
        faculty: null,
        status: null,
        floorNo: null,
        room: "",
        capacity: "",
        nationality: null,
        partitionType: null
      },
      nationality: [
        { item: "active", name: "مصري" },
        { item: "off", name: "أجنبي" }
      ],
      options: [
        { item: "active", name: "مفعل" },
        { item: "off", name: "مغلق" }
      ],
      partitionType: ""
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
    axios
      .get(store.state.domain + "/partitionType", config)
      .then(res => (this.partitionType = res.data.data));
    axios
      .get(store.state.domain + "/assets", config)
      .then(res => (this.assetsData = res.data.data));
  },

  computed: {
    roomState() {
      if (this.partitionInfo.room.length == 0) {
        return null;
      } else {
        return true;
      }
    },
    capacityState() {
      if (this.partitionInfo.capacity.length == 0) {
        return null;
      } else {
        return true;
      }
    }
  },
  methods: {
    getTableResults() {
      axios
        .get(store.state.domain + "/floorPartition", config)
        .then(res => (this.partitions = res.data.data))
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    DetailsRelatedToDorm() {
      if (this.partitionInfo.dorm == null) {
        return (
          this.partitionInfo.group == null &&
          this.partitionInfo.building == null
        );
      } else if (this.partitionInfo.dorm > 0) {
        axios
          .get(
            store.state.domain +
              "/buildingGroup?dorm_id=" +
              this.partitionInfo.dorm,
            config
          )
          .then(res => (this.groups = res.data.data))
          .catch(error => {
            this.err = error.response.data.errors;
          });
        axios
          .get(
            store.state.domain +
              "/dormBuilding?dorm_id=" +
              this.partitionInfo.dorm,
            config
          )
          .then(res => (this.buildings = res.data.data))
          .catch(error => {
            this.err = error.response.data.errors;
          });
      }
    },
    PartitionFloorInfo() {
      if (this.partitionInfo.building == null) {
        return this.partitionInfo.floor == null;
      } else if (this.partitionInfo.building > 0) {
        axios
          .get(
            store.state.domain +
              "/buildingFloor?building_id=" +
              this.partitionInfo.building,
            config
          )
          .then(res => (this.floors = res.data.data))
          .catch(error => {
            this.err = error.response.data.errors;
          });
      }
    },
    onSubmit(method, id) {
      if (id == undefined) {
        id = ''
      }
      axios({
        method: method,
        url: store.state.domain + "/floorPartition" + id,
        headers: {
          localization: store.state.localization
        },
        data: {
          floor_id: this.partitionInfo.floorNo,
          status: this.partitionInfo.status,
          partition_number: this.partitionInfo.room,
          partition_type_id: this.partitionInfo.partitionType,
          partition_capacity: this.partitionInfo.capacity,
          ...(this.selected > 0 ? { assets: this.selected } : {})
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.getTableResults();
            this.resetData()
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    resetData() {
      (this.partitionInfo.building = null),
        (this.partitionInfo.floorNo = null),
        (this.partitionInfo.status = null),
        (this.partitionInfo.dorm = null),
        (this.partitionInfo.group = null),
        (this.partitionInfo.faculty = null),
        (this.partitionInfo.nationality = null),
        (this.partitionInfo.room = ""),
        (this.partitionInfo.capacity = ""),
        (this.partitionInfo.partitionType = null),
        (this.recordForUpdate = null),
        (this.selected = []),
        (this.err = []);
    },
    returnPartition(id) {
      this.recordForUpdate = id;
      axios
        .get(store.state.domain + "/floorPartition/" + id, config)
        .then(res => {
          (this.partitionInfo.dorm = res.data.data.dorm_id),
            (this.partitionInfo.status =
              res.data.data.status.charAt(0).toLowerCase() +
              res.data.data.status.slice(1)),
            this.DetailsRelatedToDorm,
            (this.partitionInfo.building = res.data.data.building_id),
            (this.partitionInfo.floorNo = res.data.data.floor_id),
            (this.partitionInfo.room = res.data.data.partition_number),
            (this.partitionInfo.capacity = res.data.data.capacity),
            (this.partitionInfo.partitionType = res.data.data.type.id),
            (this.err = []);
          axios
            .get(
              store.state.domain +
                "/dormBuilding?dorm_id=" +
                res.data.data.dorm_id,
              config
            )
            .then(
              res => (this.partitionInfo.group = res.data.data[0].group.id)
            );
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    changeStatus(status) {
      const $this = this;
      this.updateItems.forEach(function(id) {
        axios({
          method: "PUT",
          url: store.state.domain + "/floorPartition/" + id,
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
        this.partitions.forEach(partition => {
          this.updateItems.push(partition.id);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
    deleteitem(index) {
      let indexBefore = this.selected.indexOf(index);
      this.selected.splice(indexBefore, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown,
.dropdown-menu.show {
  width: 100%;
  label {
    text-align: right;
  }
}
</style>
