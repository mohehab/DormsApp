<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="loader" v-if="this.loader == true">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div class="boxContianer">
      <b-row class="admission-progress">
        <b-col xl="4">
          <h6>لم تبدأ بعد</h6>
          <p>{{phases_not_started.length + ' مراحل تقديم'}}</p>
          <b-progress>
            <b-progress-bar :value="`${((phases_not_started.length / phases.length) * 100).toFixed(2)}%`" class="greenBg"></b-progress-bar>
            <span style="color: #adca65">{{
              `${((phases_not_started.length / phases.length) * 100).toFixed(2)}%`
            }}</span>
          </b-progress>
        </b-col>
        <b-col xl="4">
          <h6>قيد التشغيل</h6>
          <p>{{phases_opened.length + ' مراحل تقديم'}}</p>
          <b-progress>
            <b-progress-bar :value="`${((phases_opened.length / phases.length) * 100).toFixed(2)}%`" class="whiteBlueBg"></b-progress-bar>
            <span style="color: #008eb9">{{
              `${((phases_opened.length / phases.length) * 100).toFixed(2)}%`
            }}</span>
          </b-progress>
        </b-col>
        <!-- <b-col xl="3">
          <h6>متوقفة مؤقتا</h6>
          <p>٤ مراحل تقديم</p>
          <b-progress :max="max">
            <b-progress-bar :value="value" class="goldBg"></b-progress-bar>
            <span style="color: #ddb300">{{
              `${((value / phases.length) * 100).toFixed(2)}%`
            }}</span>
          </b-progress>
        </b-col> -->
        <b-col xl="4">
          <h6>منتهية</h6>
          <p>{{phases_finished.length + ' مراحل تقديم'}}</p>
          <b-progress>
            <b-progress-bar :value="`${((phases_finished.length / phases.length) * 100).toFixed(2)}%`" variant="secondary"></b-progress-bar>
            <span>{{ `${((phases_finished.length / phases.length) * 100).toFixed(2)}%` }}</span>
          </b-progress>
        </b-col>
      </b-row>
    </div>
    <h3>مراحل التقديم</h3>
    <p class="babyBlue">{{phases.length}} مراحل تقديم</p>
    <b-row class="admissionTableControls">
      <b-col xl="3" offset-xl="2" class="mb-4">
        <b-form-select
          :class="filter != null ? 'is-valid' : ''"
          v-model="filter"
          :options="options"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        >
          <b-form-select-option :value="null" disabled>{{$t("sortBy")}}</b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col xl="7" lg="7" md="7">
        <div class="save-btn mb-4">
          <b-form-input
            v-model="search"
            :placeholder="$t('search')"
          ></b-form-input>
          <span class="blueBg addNewPhase">
            <router-link :to="'/AdmissionPhaseForm'">
              <div class="AdmissionPhaseFormBluse">+</div>اضافه مرحله تقديم جديدة 
            </router-link></span
          >
        </div>
      </b-col>
    </b-row>
    <div class="table-style">
      <table class="grey-style" id="paginated-table">
        <thead class="babyBlue">
          <td class="text-center"></td>
          <td>{{ $t("phaseName") }}</td>
          <td>{{ $t("gender") }}</td>
          <td>{{ $t("startDate") }}</td>
          <td>{{ $t("endDate") }}</td>
          <!-- <td></td> -->
        </thead>
        <tr v-for="phase in phases" :key="phase.id">
          <!-- <slot v-for="(interval,i) in phase.registration_interval"> -->
          <td class="text-center">
            <input type="radio" v-model="updateItems" :value="phase.id" />
          </td>
          <td>
            <h6>{{ phase.title_ar }}</h6>
            <slot v-for="(interval, i) in phase.registration_interval">
              <p :key="i">{{interval.title_ar}}</p>
            </slot>
          </td>
          <td>
            <h6>
              <slot v-for="(gender, index) in phase.gender">
                <template v-if="index > 0"> - </template>
                <slot v-if="gender.id == 1">طلبة</slot>
                <slot v-else>طالبات</slot>
              </slot>
            </h6>
            <slot v-for="interval in phase.registration_interval">
              <p :key="Math.random()">
              <slot v-for="(seniority, index) in interval.student_seniority">
                <template v-if="index > 0"> - </template>
                <slot v-if="seniority.id == 1">قدامى</slot>
                <slot v-else>مستجدين</slot>
            </slot>
              </p>
            </slot>
          </td>
          <td>
            <h6>{{ phase.start_time.slice(0, 10) }}</h6>
            <slot v-for="(interval, i) in phase.registration_interval">
              <p :key="i">{{interval.start_time.slice(0, 10)}}</p>
            </slot>
          </td>
          <td>
            <h6>{{ phase.end_time.slice(0, 10) }}</h6>
            <slot v-for="(interval, i) in phase.registration_interval">
              <p :key="i">{{interval.end_time.slice(0, 10)}}</p>
            </slot>
          </td>
        </tr>
        <tr>
          <td colspan="8" v-if="phases.length < 1">
            <h4 class="text-center">لا توجد مراحل مسجله</h4>
          </td>
        </tr>
      </table>

      <div class="table-btns-container save-btn" v-if="updateItems !== '' ">
        <router-link :to="{ name: 'editPhases', params: { id: updateItems } }"
          ><span class="bBlueBg"
            ><b-icon-pencil-fill></b-icon-pencil-fill>{{ $t("Edit") }}</span
          ></router-link
        >
        <span class="yellowBg"
          ><font-awesome-icon icon="pause" />ايقاف مؤقت</span
        >
        <span class="blackBg"><font-awesome-icon icon="ban" />انهاء</span>
        <span class="redBg" v-b-modal="'deletePhase' + updateItems"
          ><b-icon-trash></b-icon-trash>{{ $t("Delete") }}</span
        >
      </div>
      <AlertBox
        :name="'deletePhase' + updateItems"
        question="هل تريد حذف المرحلة؟"
        api="/admissionPhaseInterval/destroy/"
        :ids="updateItems"
        :reload="reloadPhases"
      />
    </div>
  </div>
</template>
<script>
import AlertBox from "../../Global/Alert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPause, faBan } from "@fortawesome/free-solid-svg-icons";
library.add(faPause, faBan);
import store from "@/store/index.js";
import axios from "axios";
export default {
  name: "newAdmissionPhase",
  components: {
    AlertBox
  },
  data() {
    return {
      search: "",
      perPage: 5,
      page: 1,
      phases: [],
      phases_not_started: [],
      phases_opened: [],
      phases_finished: [],
      updateItems: "",
      all_select: false,
      loader: true,
      value: 33.333333333,
      max: 50,
      options: [
        { item: "startDate", name: "تاريخ البداية" },
        { item: "endDate", name: "تاريخ الانتهاء" }
      ],
      filter: null
    };
  },
  mounted() {
    this.reloadPhases();
    this.loaderTimer();
  },
  computed: {
    rows() {
      return this.phases.length;
    }
  },
  methods: {
    reloadPhases() {
      axios({
        url: store.state.domain + "/admissionPhaseInterval/listAll",
        headers: {
          localization: store.state.localization
        }
      }).then(res => (this.phases = res.data.data))
      axios({
        url: store.state.domain + "/admissionPhaseInterval/listAll?status=not_started",
        headers: {
          localization: store.state.localization
        }
      }).then(res => (this.phases_not_started = res.data.data))
      axios({
        url: store.state.domain + "/admissionPhaseInterval/listAll?status=finished",
        headers: {
          localization: store.state.localization
        }
      }).then(res => (this.phases_finished = res.data.data))
      axios({
        url: store.state.domain + "/admissionPhaseInterval/listAll?status=opened",
        headers: {
          localization: store.state.localization
        }
      }).then(res => (this.phases_opened = res.data.data))
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.phases.forEach(phase => {
          this.updateItems.push(phase.id, phase.status);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
    handlePagination(value) {
      this.page = value;
    },
    loaderTimer() {
      setTimeout(() => {
        this.loader = false;
      }, 2000);
    }
  }
};
</script>
<style lang="scss" scoped>
.boxContianer{
  padding: 20px 40px;
  h6 {
    counter-reset: #747E87;
    font-size: 13px;
  }
  p {
    color: #747E87;
    font-size: 13px;
  }
}
.whiteBlueBg{
  background-color: #36A2EB;
}
.progress {
  border-radius: 30px;
  height: 11px;
  .progress-bar {
    height: 11px;
  }
}
.admissionTableControls select ,
.admissionTableControls input {
  background-color: #E6E7E8;
  border-radius: 3px;
  border: 0.5px solid #231F20;
  color: #89919F;
  width: 182px;
  height: 27px;
  font-size: 12px;
  padding: 2px 25px 2px 2px;
  margin-bottom: 10px;
}
.admissionTableControls input {
  width: 210px !important;
}
table{
  margin-bottom: 30px;
}
h3,
thead {
  font-weight: bold;
  color: #008EB9;
  td {
    padding: 20px 40px 20px 20px !important;
    background-color: #FFF;
  }
}
tr td {
  padding: 10px 40px 20px 20px !important;
  p{
    color: #4954699a;
    font-weight: 700;
    font-size: 18px;
  }
}
td {
  span {
    display: block;
    border-radius: 15px;
    margin-bottom: 10px;
  }
}
td:first-child {
  padding: 2px !important;
}
.WBBg {
  color: #000;
}
.boxContianer {
  margin: 20px 0 50px 0;
  .admission-progress {
    .col {
      p {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
.form-control {
  display: inline-block;
  width: 250px;
  margin-left: 20px;
  background: #e0e0e0;
  height: 31px;
}
.admissionTableControls {
  margin-top: 10px;
  .addNewPhase{
    font-size: 15px;
    color: #FFF;
    margin: 0;
    width: 265px;
    height: 27px;
    padding: 2px;
    border-radius: 3px !important;
    a{
      display: flex;
      justify-content: center;
      align-items: center;
      .AdmissionPhaseFormBluse {
        border: 1px solid #fff;
        border-radius: 50%;
        font-weight: bold;
        width: 17px;
        height: 17px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        margin-left: 25px;
      }
    }
  }
}

@media(max-width:1199px) {
  .save-btn {
    float: unset;
}
}
</style>
