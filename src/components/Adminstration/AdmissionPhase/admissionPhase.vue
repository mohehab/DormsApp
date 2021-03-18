<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h3 class="text-center">مراحل التقديم</h3>
    <div class="save-btn">
      <router-link class="blueBg link-to mr-2" :to="{ name: 'AdmissionPhaseForm' }">
        إضافة مرحلة
      </router-link>
    </div>
    <div class="boxContianer" v-for="phase in phases" :key="phase.id">
      <div class="admition-phase">
        <h3 class="admition-phase-headline mb-5">
          {{ phase.title_ar
          }}<router-link
            :to="{
              name: 'editAdmissionPhaseTitle',
              params: { id: phase.id }
            }"
          >
            <b-icon-pencil-fill></b-icon-pencil-fill> </router-link
          ><b-icon-trash
            @click="deletePhase(phase.id)"
            class="delete mr-4"
          ></b-icon-trash>
        </h3>
        <b-row>
          <b-col>
            <h4>
              <router-link
                :to="{
                  name: 'editAdmissionPhaseGender',
                  params: { id: phase.id }
                }"
              >
                <b-icon-pencil-fill></b-icon-pencil-fill>
              </router-link>
              نوع المتقدمين للمرحلة:
              <slot v-for="(gender, index) in phase.gender"
                ><template v-if="index > 0"> - </template
                ><span :key="gender.id">{{
                  gender.name_ar == "ذكر" ? "ذكور" : "أناث"
                }}</span></slot
              >
            </h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" lg="6" class="mt-md-3">
            <h4>
              <router-link
                :to="{
                  name: 'editAdmissionPhaseTime',
                  params: { id: phase.id }
                }"
              >
                <b-icon-pencil-fill></b-icon-pencil-fill>
              </router-link>
              تاريخ بدايه المرحله : <span>{{ phase.start_time }}</span>
            </h4>
          </b-col>
          <b-col md="12" lg="6" class="mt-md-3">
            <h4>
              تاريخ نهايه المرحله : <span>{{ phase.end_time }}</span>
            </h4>
          </b-col>
        </b-row>

        <div class="housing-priorities mt-4">
          <h4 class="blueColor">
            <router-link
              :to="{
                name: 'editAdmissionPhasePriorities',
                params: { id: phase.id }
              }"
            >
              <b-icon-pencil-fill></b-icon-pencil-fill>
            </router-link>
            الاولويات :
          </h4>
          <ol>
            <li
              v-for="housingPriorities in phase.housing_priorities"
              :key="housingPriorities.id"
            >
              {{ housingPriorities.description_ar }}
            </li>
          </ol>
        </div>

        <div
          class="interval"
          v-for="registration_interval in phase.registration_interval"
          :key="registration_interval.id"
        >
          <h4 class="blueColor text-center">
            فتره قبول الطلبه : (
            <slot
              v-for="(student_seniority,
              i) in registration_interval.student_seniority"
              ><template v-if="i > 0"> - </template
              ><span :key="student_seniority.id">{{
                student_seniority.name_ar == "القدماء"
                  ? "الطلبة القدامى"
                  : "الطلبة المستجدين"
              }}</span></slot
            >
            )
            <router-link
              :to="{
                name: 'editRegistrationIntervalSeniority',
                params: { id: registration_interval.id }
              }"
            >
              <b-icon-pencil-fill></b-icon-pencil-fill>
            </router-link>
          </h4>

          <b-row>
            <b-col md="12" lg="6" class="mt-md-3">
              <h4>
                <router-link
                  :to="{
                    name: 'editRegistrationIntervalTime',
                    params: { id: registration_interval.id }
                  }"
                >
                  <b-icon-pencil-fill></b-icon-pencil-fill>
                </router-link>
                تاريخ بدايه فتره التسجيل :
                <span>{{ registration_interval.start_time }}</span>
              </h4>
            </b-col>
            <b-col md="12" lg="6" class="mt-md-3">
              <h4>
                تاريخ نهايه فتره التسجيل :
                <span>{{ registration_interval.end_time }}</span>
              </h4>
            </b-col>
          </b-row>
          <h4 class="mt-2 blueColor">
            <router-link
              :to="{
                name: 'editRegistrationIntervalConditions',
                params: { id: registration_interval.id }
              }"
            >
              <b-icon-pencil-fill></b-icon-pencil-fill>
            </router-link>
            شروط القبول :
          </h4>
          <ol>
            <li
              v-for="regulation_conditions in registration_interval.regulation_conditions"
              :key="regulation_conditions.id"
              class="mt-md-3 mt-lg-0"
            >
              {{ regulation_conditions.description_ar }}
            </li>
          </ol>
          <div class="save-btn text-center">
            <span
              @click="deleteInterval(registration_interval.id)"
              type="submit"
              class="redBg"
            >
              حذف فترة القبول
            </span>
          </div>
        </div>
      </div>
      <div class="save-btn">
        <span class="blueBg"
          ><router-link
            :to="{ name: 'addRegistrationInterval', params: { id: phase.id } }"
            >إضافة فترة قبول جديدة</router-link
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "admissionPhase",
  data() {
    return {
      phases: [],
      startYears: [],
      filters: {
        startyear: null
      }
    };
  },
  mounted() {
    this.reloadPhases();
  },
  methods: {
    reloadPhases() {
      axios({
        url: store.state.domain + "/admissionPhaseInterval/listAll",
        headers: {
          localization: store.state.localization
        }
      }).then(res => (this.phases = res.data.data));
    },
    emptyData() {
      return this.phases.length < 1;
    },
    deletePhase(id) {
      axios
        .delete(store.state.domain + "/admissionPhaseInterval/destroy/" + id, config)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.reloadPhases();
          }
        });
    },
    deleteInterval(id) {
      axios
        .delete(store.state.domain + "/registrationInterval/destroy/" + id, config)
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.reloadPhases();
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.admition-phase {
  .delete {
    cursor: pointer;
  }
  .admition-phase-headline {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
  }
  h4 {
    font-size: 18px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.747);
     @media(max-width: 320px) {
        font-size: 14px;
    }
  }
  span {
    font-size: 16px;
    font-weight: 400;
  }
  .interval {
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 40px;
    :last-child {
      border-bottom: none;
    }
  }
}
.blueColor {
  color: #008eb9 !important;
}
.save-btn {
  float: unset;
  .link-to {
    border-radius: 23px;
    display: block;
    width: 126px;
  }
}
</style>
