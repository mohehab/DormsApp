<template>
  <b-modal hide-footer id="createPenalty">
    <b-row class="mt-3">
      <b-col>
        <label>اختر نوع العقوبة</label>
        <b-form-select v-model="penaltyType">
          <b-form-select-option :value="null" disabled
            >اختر نوع العقوبة</b-form-select-option
          >
          <b-form-select-option
            v-for="(type, index) in types"
            :key="index"
            :value="type.id"
            >{{ type.penalty_category.name_ar }}</b-form-select-option
          >
        </b-form-select>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <label>اسم العقوبة باللغة العربية</label>
        <b-form-input
          type="text"
          v-model="penaltyAr"
          :state="penaltyArState"
        ></b-form-input>
        <b-form-invalid-feedback>
          أدخل اسم العقوبة باللغة العربية
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <label>اسم العقوبة باللغة الإنجليزية</label>
        <b-form-input
          type="text"
          v-model="penaltyEn"
          :state="penaltyEnState"
        ></b-form-input>
        <b-form-invalid-feedback>
          أدخل اسم العقوبة باللغة الإنجليزية
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <label>القيمة</label>
        <b-form-input
          type="number"
          min="1"
          v-model.number="value"
          :state="penaltyValue"
        ></b-form-input>
        <b-form-invalid-feedback>
          أدخل قيمة العقوبة
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <div class="save-btn mt-3">
      <span class="greenBg" @click="onSubmit">اضافة العقوبة</span>
    </div>
  </b-modal>
</template>
<script>
import store from "@/store/index.js";
import axios from "axios";
const config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "createPenalty",
  mounted() {
    axios
      .get(store.state.domain + "/additionalPenalties/index", config)
      .then(res => (this.types = res.data.data));
  },
  data() {
    return {
      types: [],
      penaltyType: null,
      penaltyAr: "",
      penaltyEn: "",
      value: ""
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "POST",
        url: store.state.domain + "/penalties/store",
        headers: {
          localization: store.state.localization
        },
        data: {
          additional_penalty_id: this.penaltyType,
          name_ar: this.penaltyAr,
          description_ar: this.penaltyAr,
          name_en: this.penaltyEn,
          description_en: this.penaltyEn,
          option_values: [
            {
              id: this.types[this.penaltyType - 1].data_types[0].option[0].id,
              data_type_option_value: this.value
            }
          ]
        }
      });
    }
  },
  computed: {
    penaltyArState() {
      if (this.penaltyAr.length == 0) {
        return null;
      } else if (!this.penaltyAr.match(/[\u0600-\u06FF\u0750-\u077F]/)) {
        return false;
      } else if (this.penaltyAr.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    penaltyEnState() {
      if (this.penaltyEn.length == 0) {
        return null;
      } else if (!this.penaltyEn.match(/^[a-zA-Z\s]*$/)) {
        return false;
      } else if (this.penaltyEn.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    penaltyValue() {
      if (this.value.length == 0) {
        return null;
      } else if (this.penaltyEn.length > 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
