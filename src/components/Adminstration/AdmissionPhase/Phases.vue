<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="loader" v-if="this.loader == true">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <h3 class="text-center">{{ $t("admissionPhases") }}</h3>
    <div class="save-btn">
      <router-link
        class="blueBg link-to mr-2"
        :to="{ name: 'AdmissionPhaseForm' }"
      >
        {{ $t("add") + " " + $t("phase") }}
      </router-link>
    </div>
    <div class="boxContianer">
      <div class="admition-phase">
        <h3 class="admition-phase-headline mb-5">
          {{ phase.title_ar }}
          <router-link
            :to="{
              name: 'editAdmissionPhaseTitle',
              params: { id: this.$route.params.id }
            }"
          >
            <b-icon-pencil-fill></b-icon-pencil-fill>
          </router-link>
          <b-button v-b-modal="'deletePhase' + phase.id"
            ><b-icon-trash></b-icon-trash
          ></b-button>
          <AlertBox
            :name="'deletePhase' + phase.id"
            question="هل تريد حذف المرحلة؟"
            api="/admissionPhaseInterval/destroy/"
            :ids="phase.id"
            :reload="reloadPhases"
          />
        </h3>
        <b-row>
          <b-col>
            <h4>
              <span class="blueBg actions">
                <router-link
                  :to="{
                    name: 'editAdmissionPhaseGender',
                    params: { id: this.$route.params.id }
                  }"
                >
                  <b-icon-pencil-fill></b-icon-pencil-fill>
                </router-link>
              </span>
              نوع المتقدمين للمرحلة:
              <slot v-for="(gender, index) in phase.gender"
                ><template v-if="index > 0"> - </template>
                <slot v-if="gender.id == 1"
                  ><font-awesome-icon icon="male" :key="index"
                /></slot>
                <slot v-else><font-awesome-icon icon="female"/></slot>
              </slot>
            </h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" lg="6" class="mt-md-3">
            <h4>
              <span class="blueBg actions">
                <router-link
                  :to="{
                    name: 'editAdmissionPhaseTime',
                    params: { id: this.$route.params.id }
                  }"
                >
                  <b-icon-pencil-fill></b-icon-pencil-fill>
                </router-link>
              </span>
              تاريخ بدايه المرحله : <span>{{ phase.start_time }}</span>
            </h4>
          </b-col>
          <b-col md="12" lg="6" class="mt-md-3">
            <h4>
              تاريخ نهايه المرحله : <span>{{ phase.end_time }}</span>
            </h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" lg="12" class="mt-md-3">
            <h4>
              <span class="blueBg actions">
                <router-link
                  :to="{
                    name: 'editHousingRatio',
                    params: { id: this.$route.params.id }
                  }"
                >
                  <b-icon-pencil-fill></b-icon-pencil-fill>
                </router-link>
              </span>
              نسبة الفئات المقبولة
            </h4>
          </b-col>
          <b-col>
            <ul>
              <li
                v-for="(ratio,
                index) in phase.admission_housing_seniority_ratio"
                :key="index"
              >
                {{ ratio.seniority.name_ar }}: {{ ratio.ratio + "%" }}
              </li>
            </ul>
          </b-col>
        </b-row>
        <div class="housing-priorities mt-4">
          <h4 class="blueColor">
            <span class="blueBg actions">
              <router-link
                :to="{
                  name: 'editAdmissionPhasePriorities',
                  params: { id: this.$route.params.id }
                }"
              >
                <b-icon-pencil-fill></b-icon-pencil-fill>
              </router-link>
            </span>
            {{ $t("priorities") }} :
          </h4>
          <ol
            v-if="
              phase.housing_priorities && phase.housing_priorities.length > 0
            "
          >
            <li
              v-for="housingPriorities in phase.housing_priorities"
              :key="housingPriorities.id"
            >
              {{ housingPriorities.description_ar }}
            </li>
          </ol>
          <p v-else>لم يتم وضع أولويات</p>
        </div>

        <div class="boxContianer">
          <h3 class="text-center">الفترات المفتوحة للقبول</h3>
          <div
            class="interval"
            v-for="(registration_interval,
            index) in phase.registration_interval"
            :key="registration_interval.id"
          >
            <h4
              class="blueColor text-center"
              v-b-toggle="'collapse-' + index"
              variant="primary"
            >
              {{ registration_interval.title_ar }}
              <span class="blueBg actions">
                <router-link
                  :to="{
                    name: 'editRegistrationIntervalTitle',
                    params: { id: registration_interval.id }
                  }"
                >
                  <b-icon-pencil-fill></b-icon-pencil-fill>
                </router-link>
              </span>
            </h4>
            <b-collapse :id="'collapse-' + index" class="mt-2">
              <b-row>
                <b-col md="12" lg="12" class="mt-md-3">
                  <span class="blueBg actions">
                    <router-link
                      :to="{
                        name: 'editRegistrationIntervalSeniority',
                        params: { id: registration_interval.id }
                      }"
                    >
                      <b-icon-pencil-fill></b-icon-pencil-fill>
                    </router-link>
                  </span>
                  <span
                    v-if="registration_interval.student_seniority.length == 0"
                    >لم يتم تحديد فئة للقبول</span
                  >
                  فئة المقبولين:
                  <slot
                    v-for="(student_seniority,
                    i) in registration_interval.student_seniority"
                  >
                    <template v-if="i > 0"> - </template
                    ><span :key="student_seniority.id">{{
                      student_seniority.name_ar == "القدماء"
                        ? "الطلبة القدامى"
                        : "الطلبة المستجدين"
                    }}</span></slot
                  >
                </b-col>
                <b-col md="12" lg="6" class="mt-md-3">
                  <h4>
                    <span class="blueBg actions">
                      <router-link
                        :to="{
                          name: 'editRegistrationIntervalTime',
                          params: { id: registration_interval.id }
                        }"
                      >
                        <b-icon-pencil-fill></b-icon-pencil-fill>
                      </router-link>
                    </span>
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
                <span class="blueBg actions">
                  <router-link
                    :to="{
                      name: 'editRegistrationIntervalConditions',
                      params: { id: registration_interval.id }
                    }"
                  >
                    <b-icon-pencil-fill></b-icon-pencil-fill>
                  </router-link>
                </span>
                شروط القبول :
              </h4>
              <ol>
                <li
                  v-for="regulation_condition in registration_interval.regulation_conditions"
                  :key="regulation_condition.id"
                  class="mt-md-3 mt-lg-0"
                >
                  {{ regulation_condition.condition.description_ar }}
                  {{
                    regulation_condition.pre_applying == 1
                      ? "(شرط مسبق)"
                      : "(شرط لاحق)"
                  }}
                </li>
              </ol>
              <div class="save-btn text-center">
                <span
                  class="redBg"
                  v-b-modal="'deleteInterval' + registration_interval.id"
                  >{{ $t("Delete") + " " + $t("Interval") }}</span
                >
                <AlertBox
                  :name="'deleteInterval' + registration_interval.id"
                  question="هل تريد حذف فترة القبول؟"
                  api="/registrationInterval/destroy/"
                  :ids="registration_interval.id"
                  :reload="reloadPhases"
                />
              </div>
            </b-collapse>
          </div>
          <div class="save-btn text-center mt-3">
            <span class="blueBg"
              ><router-link
                :to="{
                  name: 'addRegistrationInterval',
                  params: { id: this.$route.params.id }
                }"
                >إضافة فترة قبول جديدة</router-link
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "@/store/index.js";
import AlertBox from "../../Global/Alert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons";
library.add(faMale, faFemale);
export default {
  name: "Phases",
  components: {
    AlertBox
  },
  data() {
    return {
      phase: [],
      startYears: [],
      filters: {
        startyear: null
      },
      loader: true
    };
  },
  mounted() {
    this.reloadPhases();
    this.loaderTimer();
    this.phaseIDtoEditDate = this.$route.params.id;
  },
  computed: {
    phaseIDtoEditDate: {
      get() {
        return this.$store.state.admissionPhase.phaseID;
      },
      set(value) {
        this.$store.commit("setPhaseID", value);
      }
    }
  },
  methods: {
    reloadPhases() {
      axios({
        url:
          store.state.domain +
          "/admissionPhaseInterval/showIntervalById/" +
          this.$route.params.id,
        headers: {
          localization: store.state.localization
        }
      }).then(res => (this.phase = res.data.data));
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
.not-collapsed {
  background-color: #fff;
}
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
    @media (max-width: 320px) {
      font-size: 14px;
    }
  }
  span {
    font-size: 16px;
    font-weight: 400;
    display: inline-block
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
