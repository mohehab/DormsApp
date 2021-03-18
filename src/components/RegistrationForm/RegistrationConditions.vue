<template>
  <div class="policies boxedFormAllSteps">
    <div class="policies-container">
      <div class="policies-header">
        <h1><b-icon-text-left></b-icon-text-left>السياسات والشروط</h1>
      </div>
      <div class="policies-main-content">
        <div class="policies-terms">
          <div
            class="policies-terms-term"
            v-for="(condition, index) in conditions"
            :key="index"
          >
            <span class="policies-terms-term-item">{{
              condition.description_ar
            }}</span>
            <p class="policies-terms-term-discription">
              الوصف: يجب ان لا يكون الطالب من سكان مدينة الاسماعليه
            </p>
          </div>
        </div>
      </div>
      <!--  <div class="check-all" @click="checked = !checked">
        <input class="check-all-input" type="checkbox" :checked="checked" v-model="studentDormsCondition" />
        <label class="polcies-label">اوافق على جميع السياسات و الشروط</label>
      </div> -->
      <div class="slideRegisterSteps">
        <div class="text-right prevLinkRegisterFrom" @click.prevent="prev">
          <b-icon-chevron-right></b-icon-chevron-right>
          السابق
        </div>
        <div class="text-left nextLinkRegisterFrom" @click.prevent="next">
          <!-- Next Function by checkbox 
          v-if="!this.$store.state.studentFormStore.acceptDormsTerms == false"
        -->
          التالي
          <b-icon-chevron-left></b-icon-chevron-left>
        </div>
      </div>
    </div>
  </div>
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
  name: "RegistrationConditions",
  data() {
    return {
      checked: false,
      conditions: null
    };
  },
  methods: {
    next() {
      store.state.RegisterStep++;
    },
    prev() {
      store.state.RegisterStep--;
    }
  },
  mounted() {
    var $this = this;
    axios
      .get(store.state.domain + "/dormsRegulationCondition/list", config)
      .then(res => {
        const lengthArray = Object.keys(res.data.data).length;
        $this.conditions = res.data.data;
        for (let i = 0; i < lengthArray; i++) {
          $this.conditions[i];
        }
      });
  },
  computed: {
    studentDormsCondition: {
      get() {
        return this.$store.state.studentFormStore.acceptDormsTerms;
      },
      set(value) {
        this.$store.commit("setStudentDormsTermsCondition", value);
      }
    }
  }
};
</script>
<style lang="scss">
.policies {
  padding: 0 0 30px 0 !important;
  .policies-container {
    border-radius: 7px;
    .check-all {
      float: right;
      margin-right: 140px;
      margin-bottom: 10px;
      color: #008eb9;
      .check-all-input {
        margin-left: 20px;
      }
    }
    .policies-header {
      width: 100%;
      background: #008eb9;
      box-shadow: 0px 0px 10px #d8dcdf;
      border-radius: 7px;
      height: 90px;
      h1 {
        color: #fff;
        text-align: center;
        line-height: 90px;
        @media screen and (max-width: 425px) {
          font-size: 27px;
        }
        .bi-text-left {
          margin-left: 10px;
        }
      }
    }
    .policies-main-content {
      width: 83%;
      margin: 25px auto 25px auto;
      @media screen and (max-width: 425px) {
        width: 100%;
        margin: 0px auto 25px auto;
      }
    }
    .policies-terms {
      width: 100%;
      background: #f3f4f5;
      text-align: right;
      padding: 25px 50px;
      color: #626f80;
      height: 390px;
      overflow-y: scroll;
      @media screen and (max-width: 425px) {
        padding: 25px;
      }
      .policies-terms-term {
        margin-bottom: 25px;
        .policies-terms-term-item {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
