<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <form>
      <h2 class="text-center">الاصول و المرافق</h2>
      <h3>المرافق</h3>
      <b-row>
        <b-col
          cols="5"
          class="data-item"
          offset-lg="1"
          @change="PartitionBuildingInfo"
        >
          <label>اختار المدينة</label>
          <b-form-select
            v-model="assetDetails.dorm"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled
              >اختار المدينة</b-form-select-option
            >
            <b-form-select-option
              v-for="dorm in dorms"
              :key="dorm.id"
              :value="dorm.id"
              >{{ dorm.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="5" class="data-item">
          <label>اختار المجموعة</label>
          <b-form-select
            disabled-field="notEnabled"
            v-model="assetDetails.group"
          >
            <b-form-select-option :value="null" disabled
              >اختار المجموعة</b-form-select-option
            >
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
          <label>اختار المبنى</label>
          <b-form-select
            v-model="assetDetails.building"
            disabled-field="notEnabled"
            @change="PartitionFloorInfo"
          >
            <b-form-select-option :value="null" disabled
              >اختار المبنى</b-form-select-option
            >
            <b-form-select-option
              v-for="building in buildings"
              :key="building.id"
              :value="building.id"
              >{{ building.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col cols="5" class="data-item">
          <label>اختار الدور</label>
          <b-form-select
            v-model="assetDetails.floorNo"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled
              >اختار الدور</b-form-select-option
            >
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
        <b-col>
          <button class="add-facility-branch" @click.prevent="addNew">
            اضافه مرفق جديد
            <div>+</div>
          </button>
        </b-col>
      </b-row>

      <div id="facilities" v-for="(facility, index) in facilities" :key="index">
        <b-row>
          <b-col lg="6">
            <label>الفئه</label>
            <input type="text" v-model="facility.category" />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <label>اسم المرفق</label>
            <input type="text" v-model="facility.facilityNameAr" />
          </b-col>

          <b-col>
            <label>Facility Name</label>
            <input type="text" v-model="facility.facilityNameEn" />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <label>كود المرفق</label>
            <input type="text" v-model="facility.facilityId" />
          </b-col>
        </b-row>

        <b-row v-if="err.length != 0">
          <p>البيانات غير مكتملة أو غير صحيحة، من فضلك أكمل الآتي:</p>
          <!-- <ul class="form--error">
                <li v-if="this.err.name_ar == 'The name ar field is required.'">  ادخل اسم المرفق باللغه العربيه</li>
            </ul> -->

          <!-- <li v-if="this.err.name_en == 'The name en field is required.'">ادخل اسم المرفق باللغه الانجليزيه</li> -->
        </b-row>
      </div>
      <div class="save-btn">
        <button class="greenBg" @click.prevent="OnSubmit">حفظ</button>
        <span class="redBg">الغاء</span>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
export default {
  name: "createAssets",
  data() {
    return {
      err: [],
      currentDorm: "",
      groups: "",
      buildings: "",
      floors: "",
      dorms: "",
      assetDetails: {
        dorm: "",
        group: "",
        building: "",
        floorNo: ""
      },
      facilities: [
        {
          category: "",
          facilityNameAr: "",
          facilityNameEn: "",
          facilityId: ""
        }
      ]
    };
  },
  methods: {
    addNew() {
      this.facilities.push({
        category: "",
        facilityNameAr: "",
        facilityNameEn: "",
        facilityId: ""
      });
    },
    OnSubmit() {
      this.facilities.forEach(facility => {
        return axios({
          method: "POST",
          headers: {
            localization: store.state.localization
          },
          url: store.state.domain + "/assets",
          data: {
            name_ar: facility.facilityNameAr,
            name_en: facility.facilityNameEn
          }
        }).catch(error => {
          this.err = error.response.data.errors;
        });
      });
    }
  }
};
</script>
<style lang="scss">
#facilities {
  margin-top: 60px;
}
.add-facility-branch {
  border: none;
  background-color: #ddd;
  color: #000;
  font-weight: 600;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 30px;
}
.add-facility-branch > div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-facility-branch:hover {
  background-color: rgba(221, 221, 221, 0.568);
}
</style>
