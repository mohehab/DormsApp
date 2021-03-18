<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="boxContianer">
      <b-row>
        <b-col xl="6" class="data-item">
          <label>اسم بند المدفوعات</label>
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col xl="6" class="data-item">
          <label>فئه المقيمين</label>
          <b-form-select disabled-field="notEnabled" v-model="role">
            <b-form-select-option :value="null" disabled
              >اختار الفئة</b-form-select-option
            >
            <b-form-select-option
              v-for="(role, i) in roles"
              :key="i"
              :value="role.id"
              >{{ role.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col xl="6" class="data-item">
          <label>المدينة</label>
          <b-form-select disabled-field="notEnabled" v-model="selectedDorm">
            <b-form-select-option :value="null" disabled
              >اختر المدينة</b-form-select-option
            >
            <b-form-select-option
              v-for="dorm in dorms"
              :key="dorm.id"
              :value="dorm.id"
            >
              {{ dorm.name_ar }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col xl="6" class="data-item">
          <label>الجنسيه</label>
          <b-form-select disabled-field="notEnabled" v-model="nationality">
            <b-form-select-option :value="null" disabled
              >اختر الجنسية</b-form-select-option
            >
            <b-form-select-option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name_ar }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col xl="6" class="data-item">
          <label>العمله</label>
          <b-form-select disabled-field="notEnabled" v-model="currency">
            <b-form-select-option :value="null" disabled
              >اختر العملة</b-form-select-option
            >
            <b-form-select-option
              v-for="curr in currencies"
              :key="curr.id"
              :value="curr.id"
              >{{ curr.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <div class="save-btn">
          <button type="submit" class="blueBg">
            التالي
          </button>
          <span class="redBg">
            الغاء
          </span>
        </div>
      </b-row>
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
  name: "Basic",
  mounted() {
    axios
      .get(store.state.domain + "/roles", config)
      .then(res => (this.roles = res.data.data));
    axios
      .get(store.state.domain + "/dorm", config)
      .then(res => (this.dorms = res.data.data));
    axios
      .get(store.state.domain + "/currencies", config)
      .then(res => (this.currencies = res.data.data));
    axios
      .get(store.state.domain + "/countries", config)
      .then(res => (this.countries = res.data.data));
  },
  data() {
    return {
      roles: [],
      role: null,
      dorms: [],
      countries: [],
      selectedDorm: null,
      currencies: [],
      currency: null,
      nationality: null
    };
  }
};
</script>
