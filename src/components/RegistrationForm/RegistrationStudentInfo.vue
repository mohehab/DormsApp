<template>
  <div class="RegisterDormStep">
    <StepsTabs tab="StudentInfo" />
    <div class="students-data">
      <div class="register-data">
        <div class="boxedFormAllSteps">
          <b-row>
        <div class="student-img">
          <img src="@/assets/images/image.png" alt="" />
        </div>
        </b-row>
          <b-row align-h="between" class="data-row">
            <b-col lg="4" sm="12" class="data-item">
              <label for="">الاسم الكامل</label>
              <input
                type="text"
                :value="info.info.full_name_ar"
                readonly
                disabled
              />
            </b-col>
          </b-row>
            <b-row align-h="between" class="data-row">
            <b-col lg="4" sm="12" class="data-item">
              <label for="">النوع</label>
              <input
                type="text"
                :value="info.info.gender.name_ar"
                readonly
                disabled
              />
            </b-col>
          </b-row>
          <b-row align-h="between" class="data-row">
            <b-col lg="4" sm="12" class="data-item">
              <label for="">الكليه</label>
              <input
                type="text"
                :value="info.faculty.name_ar"
                readonly
                disabled
              />
            </b-col>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">الفرقه</label>
              <input type="text" v-model="studentEduYear" readonly disabled />
            </b-col>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">التقدير</label>
              <input type="tel" v-model="studentGpa" readonly disabled />
            </b-col>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">المدرسه</label>
              <input type="text" v-model="studentSchool" readonly disabled />
            </b-col>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">الشهاده</label>
              <input type="text" v-model="studentCertificate" readonly disabled />
            </b-col>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">النسبه المئويه</label>
              <input type="tel" v-model="studentPerc" readonly disabled />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4" sm="12" class="data-item item-width">
              <label for="">تاريخ الميلاد</label>
              <input type="date" v-model="studentBirth" readonly disabled />
            </b-col>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">الرقم القومى</label>
              <input type="tel" v-model="studentID" readonly disabled />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">محل الاقامه</label>
              <input type="text" v-model="info.info.city.name_ar" readonly disabled />
            </b-col>
            <b-col lg="4" sm="12" class="data-item item-width">
              <label for="">المحافظه</label>
              <input
                type="text"
                :value="info.info.governorate.name_ar"
                readonly
                disabled
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4" sm="12" class="data-item ">
              <label for="">رقم الهاتف الارضى</label>
              <input type="tel" v-model="studentPhone" readonly disabled />
            </b-col>
            <b-col lg="4" sm="12" class="data-item">
              <label for="">رقم الموبايل</label>
              <input type="tel" v-model="studentMobile" readonly disabled />
            </b-col>
          </b-row>
        </div>
        <div class="boxedFormAllSteps">
        <div class="studentAgentdetails">
          <h4>بيانات ولى الأمر</h4>
        </div>
        <StudentAgentDetails />
      
      <div class="registration-student-affairs">
        <p>
          جميع البيانات اعلاه تم التعرف عليها من ملف الطالب فى شئون الطالب
        </p>
      </div>
       </div>

        <div class="container">
          <div class="slideRegisterSteps">
            <div class="text-right prevLinkRegisterFrom" @click.prevent="prev">
              <b-icon-chevron-right></b-icon-chevron-right>
              السابق
            </div>
            <div
              class="text-left nextLinkRegisterFrom"
              @click.prevent="next"
              v-if="
                this.$store.state.studentAgentform.studentAgentName &&
                  this.$store.state.studentAgentform.studentAgentNationalID &&
                  this.$store.state.studentAgentform.studentAgentJob &&
                  this.$store.state.studentAgentform.studentAgentPhone &&
                  this.$store.state.studentAgentform.studentAgentMedical
              "
            >
              التالي
              <b-icon-chevron-left></b-icon-chevron-left>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BRow } from "bootstrap-vue";
import store from "@/store/index.js";
import StudentAgentDetails from "./Registration-Sections/StudentAgentDetails";
import StepsTabs from "./Registration-Sections/StepsTabs";
const config = {
          headers: {
            localization: store.state.localization
        }
};
export default {
  name: "StepTwo",
  components: {
    BRow,
    StepsTabs,
    StudentAgentDetails
  },
  data() {
    return {
      info: ""
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
    axios
      .get(store.state.studentsDomain + "/student/" +
          store.state.studentFormStore.studentID, config
      )
      .then(res => (this.info = res.data.data));
  },

  computed: {
    studentFirstName: {
      get() {
        return this.$store.state.studentFormStore.studentFirstName;
      },
      set(value) {
        this.$store.commit("setStudentFirstName", value);
      }
    },
    studentMiddleName: {
      get() {
        return this.$store.state.studentFormStore.studentMiddleName;
      },
      set(value) {
        this.$store.commit("setStudentMiddleName", value);
      }
    },
    studentLastName: {
      get() {
        return this.$store.state.studentFormStore.studentLastName;
      },
      set(value) {
        this.$store.commit("setStudentLastName", value);
      }
    },
    studentGender: {
      get() {
        return this.$store.state.studentFormStore.studentGender;
      },
      set(value) {
        this.$store.commit("setStudentGender", value);
      }
    },
    studentFaculty: {
      get() {
        return this.$store.state.studentFormStore.studentFaculty;
      },
      set(value) {
        this.$store.commit("setStudentFaculty", value);
      }
    },
    studentEduYear: {
      get() {
        return this.$store.state.studentFormStore.studentEduYear;
      },
      set(value) {
        this.$store.commit("setStudentEduYear", value);
      }
    },
    studentGpa: {
      get() {
        return this.$store.state.studentFormStore.studentGpa;
      },
      set(value) {
        this.$store.commit("setStudentGpa", value);
      }
    },
    studentSchool: {
      get() {
        return this.$store.state.studentFormStore.studentSchool;
      },
      set(value) {
        this.$store.commit("setStudentSchool", value);
      }
    },
    studentCertificate: {
      get() {
        return this.$store.state.studentFormStore.studentCertificate;
      },
      set(value) {
        this.$store.commit("setStudentCertificate", value);
      }
    },
    studentPerc: {
      get() {
        return this.$store.state.studentFormStore.studentPerc;
      },
      set(value) {
        this.$store.commit("setStudentPerc", value);
      }
    },
    studentBirth: {
      get() {
        return this.$store.state.studentFormStore.studentBirth;
      },
      set(value) {
        this.$store.commit("setStudentBirth", value);
      }
    },
    studentID: {
      get() {
        return this.$store.state.studentFormStore.studentID;
      },
      set(value) {
        this.$store.commit("setStudentID", value);
      }
    },
    studentAddress: {
      get() {
        return this.$store.state.studentFormStore.studentAddress;
      },
      set(value) {
        this.$store.commit("setStudentAddress", value);
      }
    },
    studentGovern: {
      get() {
        return this.$store.state.studentFormStore.studentGovern;
      },
      set(value) {
        this.$store.commit("setStudentGovern", value);
      }
    },
    studentPhone: {
      get() {
        return this.$store.state.studentFormStore.studentPhone;
      },
      set(value) {
        this.$store.commit("setStudentPhone", value);
      }
    },
    studentMobile: {
      get() {
        return this.$store.state.studentFormStore.studentMobile;
      },
      set(value) {
        this.$store.commit("setStudentMobile", value);
      }
    }
  }
};
</script>
<style lang="scss">
.registration-student-affairs {
  margin-top: 0px;
  margin-bottom: 15px;
  p {
    color: #6aa3e3;
    text-align: center;
    font-size: 12px;
  }
}
.register-data {
  .studentAgentdetails {
    overflow: hidden;
    h4 {
      font-size: 17px;
      font-weight: 800;
      color: #5C5C5C;
    }
  }
  .data-item {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    margin-bottom: 10px;
    input {
      width: 180px;
      height: 24px;
      font-size: 11px;
      padding: 4px 10px;
      background: #fff;
      border: 1px solid #707070;
    }
    label {
    font-size: 12px;
    width: 100px;
    color: #6aa3e3;
    }
  }
}
.student-img {
  height: 85px;
  img {
    width: 125px;
    border-radius: 50%;
    margin-bottom: 15px;
    position: absolute;
    top: -25px;
    @media screen and (max-width: 768px) {width: 95px}
    @media screen and (max-width: 425px) {top:0}
  }
}
</style>
