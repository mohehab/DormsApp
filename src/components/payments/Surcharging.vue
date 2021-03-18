<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="boxContianer">
      <b-row v-for="(subcharge, index) in subChargesList" :key="index">
        <slot v-for="sub in subcharges">
        <b-col xl="6" class="data-item">
          <b-form-checkbox v-model="sub.id" :value="subcharge.id">{{subcharge.name}}</b-form-checkbox>
        </b-col>
        <b-col xl="6">
          <label>نسبة {{subcharge.name}} ٪</label>
          <b-form-input
            type="number"
            :max="100"
            :min="0"
            :disabled="assurance == false"
            :required="assurance == true"
            v-model.number="sub.recovered_when_checkout"
          ></b-form-input>
        </b-col>
        <b-col xl="12">
          <b-form-checkbox>يسترد مرة أخرى عند الدفع</b-form-checkbox>
        </b-col>
        </slot>
      </b-row>
      <div class="boxContianer">
        <b-row>
          <b-col xl="6">
            <label>اسم بند الرسوم الإضافية باللغة العربية</label>
            <b-form-input type="text" v-model="titleAr" :state="newRateAr"></b-form-input>
            <b-form-invalid-feedback>
               أدخل اسم بند الرسوم باللغة العربية
            </b-form-invalid-feedback>
          </b-col>
          <b-col xl="6">
            <label>اسم بند الرسوم الإضافية باللغة الإنجليزية</label>
            <b-form-input type="text" v-model="titleEn" :state="newRateEn"></b-form-input>
            <b-form-invalid-feedback>
               أدخل اسم بند الرسوم باللغة الإنجليزية
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <div class="save-btn mt-3">
          <button type="submit" class="blueBg" @click="addnewSubSubcharge" v-if="newRateAr == true && newRateEn == true" >
            اضافة رسوم
          </button>
          <span class="redBg" @click="ResetSubCharge">
            الغاء
          </span>
        </div>
      </div>
      <div class="save-btn">
        <button type="submit" class="blueBg">
          حفظ
        </button>
        <span class="redBg">
          الغاء
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
  name: "Surcharging",
  mounted() {
    this.reloadSubchargesList()
  },
  data() {
    return {
      assurance: false,
      surchargeRate: "",
      subChargesList: [],
      subcharges: [{
          id: '',
          recovered_when_checkout: false,
          amount: ''
      }],
      titleAr: "",
      titleEn: "",
      recovered_when_checkout: false,
      amount: ""
    };
  },
  methods: {
    reloadSubchargesList() {
        axios
        .get(store.state.domain + "/subcharge", config)
        .then(res => (this.subChargesList = res.data.data));
    },
    addnewSubSubcharge() {
      axios({
        method: "POST",
        url: store.state.domain + "/subcharge",
        headers: {
          localization: store.state.localization
        },
        data: {
          translations: [
            {
              name: this.titleAr,
              locale: "ar"
            },
            {
              name: this.titleEn,
              locale: "en"
            }
          ]
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.reloadSubchargesList();
            this.ResetSubCharge()
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    deleteSubcharge(index) {
      this.subcharges.splice(index, 1);
    },
    ResetSubCharge() {
        this.titleAr = '',
        this.titleEn = ''
    }
  },
  computed: {
      newRateAr() {
            if (this.titleAr.length == 0) {
            return null;
        } else if (
            this.titleAr.match(/^[ء-ي\s]*$/) &&
            this.titleAr.length > 0
        ) {
            return true;
        } else {
            return false;
        }
      },
        newRateEn() {
        if (this.titleEn.length == 0) {
        return null;
      } else if (
        this.titleEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.titleEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
      },
  }
};
</script>
