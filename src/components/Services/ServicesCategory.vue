<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <form>
      <h3 class="text-center">إضافة تصنيف جديد للخدمات</h3>
      <h3 class="text-center" v-if="this.$route.params.id">تعديل الخدمة</h3>
      <div
        class="boxContianer"
        v-if="
          this.$route.name == 'AddService' ||
            this.$route.name == 'editServiceCategory'
        "
      >
        <b-row>
          <b-col lg="5" class="data-item" offset-lg="1">
            <label>اسم التصنيف باللغة العربية</label>
            <b-form-input
              type="text"
              v-model="serviceCatAr"
              :state="serviceCatArState"
            ></b-form-input>
            <b-form-invalid-feedback>
              ادخل اسم التصنيف باللغة العربية
            </b-form-invalid-feedback>
          </b-col>
          <b-col lg="5" class="data-item">
            <label>اسم التصنيف باللغة الانجليزية</label>
            <b-form-input
              type="text"
              v-model="serviceCatEn"
              :state="serviceCatEnState"
            ></b-form-input>
            <b-form-invalid-feedback>
              ادخل اسم التصنيف باللغة الإنجليزية
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <div class="save-btn">
          <span
            class="blueBg"
            @click="OnSubmitCat"
            v-if="
              this.serviceCatArState == true && this.serviceCatEnState == true
            "
            >حفظ</span
          >
          <span class="redBg" @click="resetCategory">الغاء</span>
        </div>
      </div>
    </form>
    <form>
      <h3 class="text-center">إضافة خدمة</h3>
      <div class="boxContianer">
        <b-row>
          <b-col xl="6">
            <label>اسم التصنيف</label>
            <b-form-select
              disabled-field="notEnabled"
              v-model="servicesCategory"
              :class="servicesCategory != null ? 'is-valid' : ''"
            >
              <b-form-select-option :value="null" disabled
                >اختار تصنيف الخدمة</b-form-select-option
              >
              <b-form-select-option
                v-for="(category, i) in servicesCategories"
                :key="i"
                :value="category.id"
              >
                {{ category.name }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col>
            <label>نوع الخدمة</label>
            <b-form-select
              disabled-field="notEnabled"
              v-model="servtype"
              :class="servtype != null ? 'is-valid' : ''"
            >
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
        </b-row>
        <b-row>
          <b-col>
            <label>اسم الخدمة باللغة العربية</label>
            <b-form-input
              type="text"
              v-model="servAr"
              :state="serviceArState"
            ></b-form-input>
            <b-form-invalid-feedback>
              ادخل اسم الخدمة باللغة العربية
            </b-form-invalid-feedback>
          </b-col>
          <b-col>
            <label>اسم الخدمة باللغة الانجليزية</label>
            <b-form-input
              type="text"
              v-model="servEn"
              :state="serviceEnState"
            ></b-form-input>
            <b-form-invalid-feedback>
              ادخل اسم الخدمة باللغة الإنجليزية
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row> </b-row>
        <div class="save-btn">
          <span
            class="blueBg"
            @click="OnSubmitService"
            v-if="
              this.serviceEnState == true &&
                this.serviceArState == true &&
                this.servtype !== null &&
                this.servicesCategory !== null
            "
          >
            حفظ
          </span>
          <span class="redBg" @click="resetService">
            الغاء
          </span>
        </div>
      </div>
    </form>
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
  name: "ServicesCategory",
  data() {
    return {
      servicesCategories: "",
      serviceCatAr: "",
      serviceCatEn: "",
      servicesCategory: null,
      servtype: null,
      serviceTypes: [],
      servAr: "",
      servEn: ""
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/paymentFee", config)
      .then(res => (this.servicesCategories = res.data.data));
    axios
      .get(store.state.domain + "/serviceTypes", config)
      .then(res => (this.serviceTypes = res.data.data));
  },
  computed: {
    serviceCatArState() {
      if (this.serviceCatAr.length == 0) {
        return null;
      } else if (
        this.serviceCatAr.match(/[\u0600-\u06FF\u0750-\u077F]/) &&
        this.serviceCatAr.length > 0 &&
        !this.serviceCatAr.match(/^[a-zA-Z0-9,.!? ]*$/)
      ) {
        return true;
      } else {
        return false;
      }
    },
    serviceCatEnState() {
      if (this.serviceCatEn.length == 0) {
        return null;
      } else if (
        this.serviceCatEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.serviceCatEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    serviceArState() {
      if (this.servAr.length == 0) {
        return null;
      } else if (
        this.servAr.match(/[\u0600-\u06FF\u0750-\u077F]/) &&
        this.servAr.length > 0 &&
        !this.servAr.match(/^[a-zA-Z0-9,.!? ]*$/)
      ) {
        return true;
      } else {
        return false;
      }
    },
    serviceEnState() {
      if (this.servEn.length == 0) {
        return null;
      } else if (
        this.servEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.servEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    OnSubmitCat() {
      axios({
        method: "POST",
        url: store.state.domain + "/paymentFee",
        headers: {
          localization: store.state.localization
        },
        data: {
          translations: [
            {
              name: this.serviceCatAr,
              description: this.serviceCatAr,
              locale: "ar"
            },
            {
              name: this.serviceCatEn,
              description: this.serviceCatEn,
              locale: "en"
            }
          ]
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push("/services");
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    resetCategory() {
      (this.serviceCatAr = ""), (this.serviceCatEn = "");
    },
    resetService() {
      (this.servicesCategory = null),
        (this.servtype = null),
        (this.servAr = ""),
        (this.servEn = "");
    },
    OnSubmitService() {
      axios({
        method: "POST",
        url: store.state.domain + "/paymentFeeDetails",
        headers: {
          localization: store.state.localization
        },
        data: {
          payment_fee_id: this.servicesCategory,
          service_type_id: this.servtype,
          translations: [
            {
              name: this.servAr,
              description: this.servAr,
              locale: "ar"
            },
            {
              name: this.servEn,
              description: this.servEn,
              locale: "en"
            }
          ]
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push("/services");
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    }
  }
};
</script>
