<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="boxContianer">
      <b-row>
        <b-col xl="6">
          <label>نوع الخدمه</label>
          <b-form-select disabled-field="notEnabled" v-model="servtype">
            <b-form-select-option :value="null" disabled
              >اختر نوع الخدمة</b-form-select-option
            >
            <b-form-select-option
              v-for="(type, i) in serviceTypes"
              :key="i"
              :value="type.id"
              >{{
                type.name == "Basic" ? "أساسي" : "إضافي"
              }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col xl="6">
          <label>اسم الخدمه</label>
          <b-form-select disabled-field="notEnabled">
            <b-form-select-option :value="null" disabled></b-form-select-option>
            <b-form-select-option>
              -
            </b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col xl="6">
          <label>من تستهدف الخدمة ؟</label>
          <b-form-select disabled-field="notEnabled" v-model="SelectedStatus">
            <b-form-select-option :value="null" disabled
              >اختر الفئة المستهدفة</b-form-select-option
            >
            <b-form-select-option
              v-for="status in enrollmentStatus"
              :key="status.id"
              :value="status.id"
              >{{ status.name_ar }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col xl="2">
          <label>سعر الوحدة</label>
        </b-col>
        <b-col xl="4">
          <b-form-input type="number" v-model.number="price"></b-form-input>
        </b-col>
        <b-col xl="6">
          <b-form-select disabled-field="notEnabled">
            <b-form-select-option :value="null" disabled
              >اختر الوحدة</b-form-select-option
            >
            <b-form-select-option>-</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col xl="4">
          <b-form-checkbox v-model="taxes">يوجد ضرائب</b-form-checkbox>
        </b-col>
        <b-col xl="2">
          <label>نسبه الضرائب</label>
        </b-col>
        <b-col xl="6">
          <b-form-input
            :disabled="taxes == false"
            :required="taxes == true"
            type="number"
            max="100"
            min="0"
            v-model="taxPer"
          ></b-form-input>
        </b-col>
      </b-row>
      <div class="save-btn">
        <button type="submit" class="blueBg">
          حفظ
        </button>
        <span class="redBg">
          اللغاء
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import axios from "axios";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "Services",
  mounted() {
    axios
      .get(store.state.domain + "/serviceTypes", config)
      .then(res => (this.serviceTypes = res.data.data));
    axios
      .get(store.state.domain + "/enrollmentStatus", config)
      .then(res => (this.enrollmentStatus = res.data.data));
  },
  data() {
    return {
      serviceTypes: [],
      servtype: null,
      enrollmentStatus: [],
      SelectedStatus: null,
      price: "",
      taxes: false,
      taxPer: ""
    };
  }
};
</script>
