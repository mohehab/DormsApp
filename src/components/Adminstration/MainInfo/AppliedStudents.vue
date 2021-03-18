<template>
  <section class="datatables-admin-pages">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <div class="top-charts">
        <div v-b-modal.modal-1 class="chart">
          <BarGovernatesChart />
        </div>
        <div v-b-modal.modal-2 class="chart">
          <AdminstrationApplicantChart />
        </div>
        <div v-b-modal.modal-3 class="chart">
          <AdminstrationApplicantChart />
        </div>
        <div v-b-modal.modal-4 class="chart">
          <AdminstrationCitiesChart />
        </div>
      </div>
      <b-row class="mt-5">
        <b-col lg="3" class="data-item" offset-lg="1">
          <label>اختار الحالة</label>
          <b-form-select
            v-model="studentFilter.status"
            :options="status"
            value-field="state"
            text-field="name"
            disabled-field="notEnabled"
            @change="getTableResults"
          >
            <b-form-select-option :value="null">الكل</b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col lg="3" class="data-item" offset-lg="1">
          <label>اختار المحافظة</label>
          <b-form-select
            v-model="studentFilter.govern"
            @change="getTableResults"
          >
            <b-form-select-option :value="null">الكل</b-form-select-option>
            <b-form-select-option
              v-for="govern in governs"
              :key="govern.id"
              :value="govern.id"
              >{{ govern.Governorate_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="3" class="data-item" offset-lg="1">
          <label>اختار الكلية</label>
          <b-form-select
            v-model="studentFilter.faculty"
            disabled-field="notEnabled"
            @change="getTableResults"
          >
            <b-form-select-option :value="null"
              >الكل</b-form-select-option
            >
            <b-form-select-option
              v-for="faculty in faculties"
              :key="faculty.id"
              :value="faculty.id"
              >{{ faculty.faculty_name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="3" class="data-item mt-2" offset-lg="1">
          <label>اختار الجنس</label>
          <b-form-select
            v-model="studentFilter.gender"
            disabled-field="notEnabled"
            @change="getTableResults"
          >
            <b-form-select-option :value="null"
              >الكل</b-form-select-option
            >
            <b-form-select-option
              v-for="gender in genders"
              :key="gender.id"
              :value="gender.id"
              >{{ gender.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="3" class="data-item mt-2" offset-lg="1">
          <label>اختار الجنسية</label>
          <b-form-select
            v-model="studentFilter.country"
            disabled-field="notEnabled"
            @change="getTableResults"
          >
            <b-form-select-option :value="null"
              >الكل</b-form-select-option
            >
            <b-form-select-option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
              >{{ country.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      <div class="mid-header mt-5">
        <h2>الطلاب المتقدمين</h2>
      </div>
      <div class="temporarly-students-table">
          <div class="admission-table">
            <table class="grey-style">
              <tr>
                <th><input type="checkbox"                   
                  @click="select_all_via_check_box"
                  v-model="all_select"  /></th>
                <th><font-awesome-icon icon="sort-amount-down" />اسم الطالب</th>
                <th><font-awesome-icon icon="sort-amount-down" />الحالة</th>
                <th><font-awesome-icon icon="sort-amount-down" />الكليه</th>
                <th><font-awesome-icon icon="sort-amount-down" />الفرقه</th>
                <th><font-awesome-icon icon="sort-amount-down" />المحافظه</th>
                <th><font-awesome-icon icon="sort-amount-down" />الجنسية</th>
              </tr>
              <tr v-for="(student, i) in students" :key="i">
                <td><input type="checkbox" v-model="updateItems" :value="student.id" /></td>
                <td>{{student.student_first_name_ar + " " + student.student_second_name_ar}} </td>
                <td v-if="student.status == 'pending'">تم الدفع وفي انتظار الرد</td>
                <td v-else>لم يتم الدفع ولكن موافي للشروط</td>
                <td>{{student.student_faculty.faculty_name_ar}}</td>
                <td> - </td>
                <td>{{student.governorate.Governorate_ar}}</td>
                <td>{{student.country.name_ar}}</td>
              </tr>
              <tr v-if="emptyData()">
              <td colspan="7">
                <h4 class="text-center">لا توجد استمارات</h4>
              </td>
            </tr>
            </table>
          </div>
          <div class="tabel-btns-container save-btn" v-if="fullData()">
            <span class="blueBg">طباعة</span>
            <span class="redBg" @click="disableStatus">رفض</span>
            <span class="greenBg" @click="activeStatus">قبول</span>
          </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import store from "@/store/index.js";
import AdminstrationCitiesChart from "../../Charts/AdminstrationCitiesChart";
import BarGovernatesChart from "../../Charts/BarGovernatesChart";
import AdminstrationApplicantChart from "../../Charts/AdminstrationApplicantChart";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "AppliedStudents",
  components: {
    BarGovernatesChart,
    AdminstrationCitiesChart,
    AdminstrationApplicantChart
  },
  mounted() {
    this.getTableResults();
    axios
      .get(store.state.domain + "/generalServices/listGovernorates", config)
      .then(res => (this.governs = res.data.data));
    axios
      .get(store.state.domain + "/faculties/listAll", config)
      .then(res => (this.faculties = res.data.data));
    axios
      .get(store.state.domain + "/generalServices/listGenders", config)
      .then(res => (this.genders = res.data.data));
    axios
      .get(store.state.domain + "/countries", config)
      .then(res => (this.countries = res.data.data));
  },
  data() {
    return {
      students: "",
      all_select: false,
      updateItems: [],
      status: [
        { state: "pending", name: "تم الدفع وفي انتظار الرد" },
        { state: "hold", name: "لم يتم الدفع وفي انتظار الرد" }
      ],
      genders: [],
      governs: [],
      faculties: [],
      countries: [],
      studentFilter: {
        status: null,
        govern: null,
        faculty: null,
        gender: null,
        country: null
      }
    };
  },
  methods: {
    fullData() {
      return this.students.length >= 1;
    },
    emptyData() {
      return this.students.length < 1;
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.students.forEach(student => {
          this.updateItems.push(student.id, student.status);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
    getTableResults() {
      axios({
        url: store.state.domain + "/dormsApplication",
        headers: {
          localization: store.state.localization
        },
        params: {
          ...(this.studentFilter.status ? {status: this.studentFilter.status} : null),
          ...(this.studentFilter.govern ? {governorate_id: this.studentFilter.govern} : null),
          ...(this.studentFilter.gender ? {gender_id: this.studentFilter.gender} : null),
          ...(this.studentFilter.country ? {country_id: this.studentFilter.country} : null)
        }
      }).then(res => (this.students = res.data.data));
    }
  }
};
</script>
<style lang="scss" scoped>
select {
  background-color: #E6E7E8 !important;
  border: 0.5px solid #231F20 !important;
  border-radius: 3px !important;
  color: #89919F;
}
.top-charts {
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 35px;
  position: relative;
  .chart {
    width: 250px;
    margin: 0 20px;
    position: relative;
    box-shadow: 0px 0px 10px #d2d6d9;
    #pie-chart {
      width: 190px !important;
      margin: auto;
    }
  }
  .popUp {
    z-index: 1000;
    position: fixed;
    width: 80%;
    background: #fff;
  }
}

.temporarly-students-table {
  margin: 50px 0;
}
</style>
