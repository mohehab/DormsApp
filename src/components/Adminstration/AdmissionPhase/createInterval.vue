<template>
  <section class="terms-and-conditions">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <AdmissionPhaseTabs v-if="!$route.params.id" tab="terms" />
      <h4
        class="text-center"
        v-if="$route.name == 'editRegistrationIntervalConditions'"
      >
        تعديل شروط القبول
      </h4>
      <h4
        class="text-center"
        v-if="$route.name == 'addRegistrationInterval'"
      >
        إضافة فترة قبول
      </h4>
      <div
        v-for="(interval, index) in intervals"
        :key="index"
        class="admissionIntervals"
      >
        <h3 class="text-center" v-if="!$route.params.id">
          الفترة رقم {{ index + 1 }}
        </h3>
        <div class="text-center" v-if="!index == 0">
          <span class="redBg" @click="deleteInterval(index)">حذف</span>
        </div>
        <div
          class="boxedFormAllSteps"
          v-if="
            $route.name == 'AdmissionPhaseForm' ||
              $route.name == 'editRegistrationIntervalSeniority' ||
              $route.name == 'addRegistrationInterval' || $route.name == 'editRegistrationIntervalTitle'
          "
        >
          <b-row
            class="data-row"
            v-if="$route.name == 'AdmissionPhaseForm'  || $route.name == 'addRegistrationInterval' || $route.name == 'editRegistrationIntervalTitle'"
          >
            <b-col md="12" lg="6" class="mt-md-3 data-item">
              <label for="">
                {{ $t("intervalName") + ' ' + $t("Byar") }}
                <span class="required">*</span>
              </label>
              <b-form-input
                type="text"
                v-model="interval.title_ar"
                :state="TitleArState"
                required
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ $t('add') + ' ' + $t('intervalName') + ' ' + $t('Byar')}}
              </b-form-invalid-feedback>
            </b-col>
            <b-col md="12" lg="6" class="mt-md-3  data-item">
              <label for=""
                >{{ $t("intervalName") + ' ' + $t("Byen") }}
                <span class="required">*</span></label
              >
              <b-form-input
                type="text"
                v-model="interval.title_en"
                :state="TitleEnState"
                required
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ $t('add') + ' ' + $t('intervalName') + ' ' + $t('Byen')}}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
          <b-row
            class="data-row check-accepted mt-4"
            v-if="
              !$route.params.id ||
                $route.name == 'editRegistrationIntervalSeniority' ||
                $route.name == 'addRegistrationInterval'
            "
          >
            <b-col class="data-item">
              <p class="active-status">
                اختر فئة المقبولين <span class="required">*</span>
              </p>
              <b-form-checkbox
                v-for="senior in seniors"
                :key="senior.id"
                v-model="interval.student_seniority_id"
                :value="senior.id"
                >{{
                  senior.id == 1 ? $t('oldStudents') : $t('newStudents') 
                }}</b-form-checkbox
              >
            </b-col>
          </b-row>
        </div>
        <div
          class="boxedFormAllSteps"
          v-if="
            !$route.params.id ||
              $route.name == 'editRegistrationIntervalTime' ||
              $route.name == 'addRegistrationInterval'
          "
        >
          <b-row class="data-row">
            <b-col md="12" lg="12" class="data-item">
              <label for="" class="help-label"
                >{{ $t('startDate')}} <span class="required">*</span></label
              >
              <b-form-datepicker
                :class="intervalStartingDate[index] ? 'is-valid' : ''"
                @input="addStartingDate(index)"
                v-model="intervalStartingDate[index]"
                locale="ar"
                :min="startDate || currentDate"
                :max="endDate"
                :initial-date="currentDate"
                v-bind="labels || {}"
                aria-required="true"
                :required="required"
              ></b-form-datepicker>
              <b-form-timepicker
                :class="intervalStartingTime[index] ? 'is-valid' : ''"
                @input="addStartingDate(index)"
                v-model="intervalStartingTime[index]"
                locale="ar"
                v-bind="labels || {}"
                aria-required="true"
                :required="required"
              ></b-form-timepicker>
            </b-col>
            <b-col md="12" lg="12" class="data-item">
              <label for="" class="help-label"
                >{{ $t('endDate')}} <span class="required">*</span></label
              >
              <b-form-datepicker
                :class="intervalEndingDate[index] ? 'is-valid' : ''"
                @input="addEndingDate(index)"
                v-model="intervalEndingDate[index]"
                locale="ar"
                :min="minDateForEndingDate || currentDate"
                :max="endDate"
                :disabled="!intervalStartingDate[index]"
                v-bind="labels || {}"
                aria-required="true"
                :required="required"
              ></b-form-datepicker>
              <b-form-timepicker
                :class="intervalEndingTime[index] ? 'is-valid' : ''"
                @input="addEndingDate(index)"
                v-model="intervalEndingTime[index]"
                locale="ar"
                v-bind="labels || {}"
                aria-required="true"
                :required="required"
              ></b-form-timepicker>
            </b-col>
          </b-row>
        </div>
        <div
          class="boxedFormAllSteps termsChosen"
          v-if="
            !$route.params.id ||
              $route.name == 'addRegistrationInterval' ||
              $route.name == 'editRegistrationIntervalConditions'
          "
        >
          <label>اختر شروط الفترة</label>
          <div class="tabel-container">
            <table>
              <tr v-for="(condition, i) in conditions" :key="condition.id">
                <td>
                  <input
                    type="checkbox"
                    :value="condition.id"
                    v-model="conIDs[index].conIDs"
                    @change="ifChecked(condition.id, index)"
                  />
                  <span>{{ condition.description_ar }}</span><br />
                  <router-link to="" :id="condition.id + 'tooltip'" class="readMore">{{$t('condition explanation')}}</router-link>
                  <b-tooltip :target="condition.id + 'tooltip'" triggers="hover">
                    {{ condition.description_ar }}
                  </b-tooltip>
                  <div v-if="condition.id == 9 && conIDs[index].conIDs.includes(9)">
                    <b-form-checkbox
                      v-model="
                        interval.applying_conditions.accepted_governorates_id
                      "
                      :value="govern.id"
                      v-for="govern in governs"
                      :key="govern.id"
                      >{{ govern.Governorate_ar }}</b-form-checkbox
                    >
                  </div>
                  <div v-if="condition.id == 10 && conIDs[index].conIDs.includes(10)">
                    <b-form-checkbox
                      v-for="grade in grades"
                      v-model="interval.applying_conditions.accepted_grades_id"
                      :key="grade.id"
                      :value="grade.id"
                      >{{ grade.grade_name_ar }}
                    </b-form-checkbox>
                  </div>
                  <div v-if="condition.id == 11 && conIDs[index].conIDs.includes(11)">
                    <b-form-checkbox
                      v-for="faculty in faculties"
                      v-model="interval.applying_conditions.accepted_faculties_id"
                      :key="faculty.id"
                      :value="faculty.id"
                      >{{ faculty.faculty_name_ar }}</b-form-checkbox
                    >
                  </div>
                </td>
                <td class="radio-btn-style">
                  <b-form-radio-group
                    v-model.number="preConditions[index].preConditions[i]"
                    :disabled="!conIDs[index].conIDs.includes(condition.id)"
                    buttons
                  >
                    <b-form-radio
                      value="1"
                      @change="ifChecked(condition.id, index)"
                      >{{ $t('precondition') }}</b-form-radio
                    >
                    <b-form-radio
                      value="0"
                      @change="ifChecked(condition.id, index)"
                      >{{ $t('postcondition') }}</b-form-radio
                    >
                  </b-form-radio-group>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div
        class="caption-terms"
        v-if="
          !$route.params.id ||
            $route.name == 'editRegistrationIntervalConditions' ||
            $route.name == 'addRegistrationInterval'
        "
      >
        <h3>ملحوظه</h3>
        <p class="cap-item">
          -تعنى الشروط المسبقه ان هذا الشرط سيتم تطبيقه فى تاريخ البدء
        </p>
        <p class="cap-item">
          -تعنى الشروط اللاحقه ان هذا الشرط سيتم تطبيقه عند استلام طلب الطالب
        </p>
      </div>
      <b-row v-if="err.length != 0">
        <ol class="form--error">
          <p>البيانات غير مكتملة أو غير صحيحة</p>
          <ol>
            <slot v-for="loopError in err">
              <li v-for="(error, index) in loopError" :key="index">
                {{ error }}
              </li>
            </slot>
          </ol>
        </ol>
      </b-row>
      <div class="save-btn">
        <slot
          v-if="
            PhaseTitleAr &&
              PhaseTitleEn &&
              Gender.length > 0 &&
              startDate &&
              endDate &&
              startTime &&
              endTime &&
              this.intervalStartingDate.length > 0 &&
              this.intervalStartingTime.length > 0 &&
              this.intervalEndingDate.length > 0 &&
              this.intervalEndingTime.length > 0
          "
        >
          <span @click.prevent="OnSubmit" class="greenBg">
            {{ $t('save') }}
          </span>
        </slot>
        <slot v-if="!$route.params.id">
          <span @click="prev" class="blueBg">السابق</span>
          <span class="blueBg" @click="addNewInterval">إضافة فترة جديدة</span>
        </slot>
        <span
          v-if="$route.name == 'AdmissionPhaseForm'"
          class="redBg"
          @click="$router.push('/newAdmissionPhase')"
          >{{ $t('cancel') }}</span
        >
        <slot v-if="$route.name !== 'AdmissionPhaseForm'">
          <span class="blueBg" @click.prevent="updateInterval">{{ $t("Edit") }}</span>
        </slot>
      </div>
    </div>
  </section>
</template>
<script>
import AdmissionPhaseTabs from "./AdmissionPhaseTabs";
import store from "@/store/index.js";
import axios from "axios";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  components: {
    AdmissionPhaseTabs
  },
  name: "AdmissionPhaseInterval",
  props: [
    "PhaseTitleAr",
    "PhaseTitleEn",
    "Gender",
    "startDate",
    "startTime",
    "endTime",
    "endDate",
    "priorities",
    "prioritiesCheckedboxes",
    "intervalSDate",
    "intervalSTime",
    "intervalEDate",
    "intervalETime",
    "intervalsList",
    "preApplying",
    "SelectedConditions",
    "SelectedSeniors",
    "ratios",
    "admissionPhaseRatios"
  ],
  mounted() {
    axios
      .get(store.state.domain + "/dormsRegulationCondition/list", config)
      .then(res => {
        this.conditions = res.data;
        const conditionsArray = Object.keys(res.data.data).length;
        this.conditions = res.data.data;
        for (let i = 0; i < conditionsArray; i++) {
          this.conditions[i];
        }
      });
    axios
      .get(store.state.domain + "/generalServices/listGovernorates", config)
      .then(res => (this.governs = res.data.data));
    axios
      .get(store.state.domain + "/faculties/listAll", config)
      .then(res => (this.faculties = res.data.data));
    axios
      .get(store.state.domain + "/generalServices/listStudentSeniority", config)
      .then(res => (this.seniors = res.data.data));
    axios
      .get(store.state.domain + "/equivalentRate/index", config)
      .then(res => (this.grades = res.data.data));
    if (this.$route.name == "editRegistrationIntervalSeniority") {
      axios
        .get(
          store.state.domain +
            "/registrationInterval/show/" +
            store.state.admissionPhase.phaseID,
          config
        )
        .then(res => {
          const $this = this;
          const lengthArray = Object.keys(res.data.data.student_seniority)
            .length;
          const senior = res.data.data.student_seniority;
          for (let i = 0; i < lengthArray; i++) {
            $this.intervals[0].student_seniority_id.push(senior[i].id);
          }
        });
    } else if (this.$route.name == "editRegistrationIntervalConditions") {
      axios
        .get(
          store.state.domain +
            "/registrationInterval/show/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          const $this = this;
          const lengthArray = Object.keys(res.data.data.regulation_conditions)
            .length;
          const conditionsArray = Object.keys(this.conditions).length;
          const regCon = res.data.data.regulation_conditions;
          console.log(regCon)
          for (let x = 0; x < lengthArray; x ++) {
            $this.conIDs[0].conIDs.push(regCon[x].condition.id);
            $this.intervals[0].applying_conditions.regulation_conditions.push({
              dorms_regulation_condition_id: $this.conIDs[0].conIDs,
              pre_applying: $this.preConditions[0].preConditions[x]
            });
          }
          for (let i = 0; i < conditionsArray; i++) {
              if(this.conditions[i].id.includes(regCon[i].condition.id)) {
                $this.preConditions[0].preConditions.push(undefined);
              } else {
                $this.preConditions[0].preConditions.push(regCon[i].pre_applying);
              }
            }
        });
    } else if (this.$route.name == "editRegistrationIntervalTime") {
      axios
        .get(
          store.state.domain +
            "/admissionPhaseInterval/showIntervalById/" +
            store.state.admissionPhase.phaseID,
          config
        )
        .then(res => {
          (this.startDate = res.data.data.start_time),
            (this.endDate = res.data.data.end_time);
        });
      axios
        .get(
          store.state.domain +
            "/registrationInterval/show/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          this.intervalStartingDate.push(res.data.data.start_time.slice(0, 10)),
            this.intervalEndingDate.push(res.data.data.end_time.slice(0, 10)),
            this.intervalEndingTime.push(res.data.data.end_time.slice(11, 19)),
            this.intervalStartingTime.push(
              res.data.data.start_time.slice(11, 19)
            );
        });
    } else if (this.$route.name == "addRegistrationInterval") {
      axios
        .get(
          store.state.domain +
            "/admissionPhaseInterval/showIntervalById/" +
            store.state.admissionPhase.phaseID,
          config
        )
        .then(res => {
          (this.startDate = res.data.data.start_time),
            (this.endDate = res.data.data.end_time);
        });
    } else if (this.$route.name == "editRegistrationIntervalTitle") {
      axios
        .get(
          store.state.domain +
            "/registrationInterval/show/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          (this.intervals[0].title_ar = res.data.data.title_ar),
            (this.intervals[0].title_en = res.data.data.title_en);
        });
    } else {
      this.intervals = this.intervalsList;
      this.intervalStartingDate = this.intervalSDate;
      this.intervalStartingTime = this.intervalSTime;
      this.intervalEndingDate = this.intervalEDate;
      this.intervalEndingTime = this.intervalETime;
      this.conIDs = this.SelectedConditions;
      this.preConditions = this.preApplying,
      (this.acceptedPer = this.ratios),
        (this.admission_housing_seniority_ratio = this.admissionPhaseRatios),
        (this.seniorsSelectedID = this.SelectedSeniors);
    }
  },
  data() {
    return {
      err: [],
      seniors: "",
      governs: "",
      grades: "",
      faculties: "",
      preConditions: [{
        preConditions: []
      }],
      conIDs: [{
        conIDs: []
      }],
      intervalEndingDate: [],
      intervalStartingDate: [],
      intervalEndingTime: [],
      intervalStartingTime: [],
      isChecked: [],
      conditonid: null,
      conditions: null,
      RegulationConditions: [],
      currentDate: new Date().toISOString().substring(0, 10),
      intervals: [
        {
          start_time: "",
          end_time: "",
          student_seniority_id: [],
          title_ar: "",
          title_en: "",
          applying_conditions: {
            accepted_governorates_id: [],
            accepted_faculties_id: [],
            accepted_grades_id: [],
            regulation_conditions: []
          }
        }
      ],
      labels: {
        labelNoDateSelected: "لم يتم اختيار التاريخ",
        labelNoTimeSelected: "لم يتم اختيار الوقت",
        labelMinutes: "الدقائق",
        labelHours: "ساعات",
        labelSeconds: "ثواني",
        labelAmpm: "صباحا مساء",
        labelAm: "ص",
        labelPm: "م",
        labelCloseButton: "اختر"
      },
      required: true,
      selected: false,
      indeterminate: false
    };
  },
  computed: {
    TitleArState() {
      if (this.intervals[0].title_ar == "") {
        return null;
      } else if (
        this.intervals[0].title_ar.match(/^[ء-ي\s]*$/) &&
        this.intervals[0].title_ar.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    TitleEnState() {
      if (this.intervals[0].title_en == "") {
        return null;
      } else if (
        this.intervals[0].title_en.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.intervals[0].title_en.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    minDateForEndingDate() {
      var date = new Date(this.intervalStartingDate[0]);
      var newdate = new Date (date)
      newdate.setDate(newdate.getDate() + 1);
      var dd = newdate.getDate();
      var mm = newdate.getMonth() + 1;
      if (mm < 10) {
        var month = '0' + mm 
      } else {
         month = '' + mm
      }
      var y = newdate.getFullYear();
      return y + '-' + month + "-" + dd
    }
  },
  methods: {
    addStartingDate(index) {
      this.intervals[index].start_time =
        this.intervalStartingDate[index] +
        " " +
        this.intervalStartingTime[index];
    },
    addEndingDate(index) {
      this.intervals[index].end_time =
        this.intervalEndingDate[index] + " " + this.intervalEndingTime[index];
    },
    ifChecked(id, index) {
      const $this = this;
      const regulationsCon =
        $this.intervals[index].applying_conditions.regulation_conditions;
      const reglength = regulationsCon.length;
      const ConArray = Object.keys($this.conIDs[index].conIDs).length;
      const filteredPreConditions = $this.preConditions[index].preConditions.filter(function(x) {
        return x !== undefined;
      });
      const lengthFilteredArray = Object.keys(filteredPreConditions).length;
      if (ConArray > lengthFilteredArray) {
        regulationsCon.splice(0, reglength);
        for (let i = 0; i < ConArray; i++) {
          regulationsCon.push({
            dorms_regulation_condition_id: $this.conIDs[index].conIDs[i],
            ...(filteredPreConditions[i]
              ? { pre_applying: filteredPreConditions[i] }
              : { pre_applying: null })
          });
        }
      } else if (ConArray < lengthFilteredArray) {
        $this.preConditions[index].preConditions.pop();
        filteredPreConditions.pop();
        regulationsCon.splice(0, reglength);
        for (let i = 0; i < lengthFilteredArray; i++) {
          regulationsCon.push({
            dorms_regulation_condition_id: $this.conIDs[index].conIDs[i],
            pre_applying: filteredPreConditions[i]
          });
        }
        regulationsCon.pop();
      } else {
        regulationsCon.splice(0, reglength);
        for (let i = 0; i < lengthFilteredArray; i++) {
          regulationsCon.push({
            dorms_regulation_condition_id: $this.conIDs[index].conIDs[i],
            pre_applying: filteredPreConditions[i]
          });
        }
      }
    },
    updateInterval() {
      if (this.$route.name == "editRegistrationIntervalTime") {
        axios({
          method: "POST",
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateRegistrationIntervalTime/" +
            this.$route.params.id,
          headers: {
            localization: store.state.localization
          },
          data: {
            start_time:
              this.intervalStartingDate[0] + " " + this.intervalStartingTime[0],
            end_time:
              this.intervalEndingDate[0] + " " + this.intervalEndingTime[0]
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              (this.intervalStartingDate = []),
                (this.intervalEndingDate = []),
                (this.intervalEndingTime = []),
                (this.intervalStartingTime = []),
                this.$router.go(-1);
              if (this.step > 1) {
                this.prev();
              }
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else if (this.$route.name == "editRegistrationIntervalSeniority") {
        axios({
          method: "POST",
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateRegistrationIntervalSeniority/" +
            this.$route.params.id,
          headers: {
            localization: store.state.localization
          },
          data: {
            student_seniority_id: this.intervals[0].student_seniority_id
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.resetData();
              this.$router.go(-1);
              if (this.step > 1) {
                this.prev();
              }
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else if (this.$route.name == "addRegistrationInterval") {
        axios({
          method: "POST",
          url:
            store.state.domain +
            "/admissionPhaseInterval/addRegistrationInterval/" +
            this.$route.params.id,
          headers: {
            localization: store.state.localization
          },
          data: {
            start_time:
              this.intervalStartingDate[0] + " " + this.intervalStartingTime[0],
            end_time:
              this.intervalEndingDate[0] + " " + this.intervalEndingTime[0],
            student_seniority_id: this.intervals[0].student_seniority_id,
            applying_conditions: this.intervals[0].applying_conditions,
            title_ar: this.intervals[0].title_ar,
            title_en: this.intervals[0].title_en,
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.$router.go(-1);
              if (this.step > 1) {
                this.prev();
              }
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else if (this.$route.name == "editRegistrationIntervalConditions") {
        axios({
          method: "POST",
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateRegistrationIntervalConditions/" +
            this.$route.params.id,
          headers: {
            localization: store.state.localization
          },
          data: {
            applying_conditions: this.intervals[0].applying_conditions
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.$router.go(-1);
              if (this.step > 1) {
                this.prev();
              }
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else if (this.$route.name == "editRegistrationIntervalTitle") {
        axios({
          method: "POST",
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateRegistrationIntervalTitle/" +
            this.$route.params.id,
          headers: {
            localization: store.state.localization
          },
          data: {
            title_ar: this.intervals[0].title_ar,
            title_en: this.intervals[0].title_en
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.$router.go(-1);
              if (this.step > 1) {
                this.prev();
              }
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else {
        axios({
          method: "POST",
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateRegistrationIntervalTime/" +
            this.$route.params.id,
          headers: {
            localization: store.state.localization
          },
          data: {
            start_time:
              this.intervalStartingDate[0] + " " + this.intervalStartingTime[0],
            end_time:
              this.intervalEndingDate[0] + " " + this.intervalEndingTime[0]
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
             this.$router.go(-1);
              if (this.step > 1) {
                this.prev();
              }
              (this.intervalStartingDate = []),
                (this.intervalEndingDate = []),
                (this.intervalEndingTime = []),
                (this.intervalStartingTime = []);
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      }
    },
    addNewInterval() {
      this.intervals.push({
        start_time: "",
        end_time: "",
        student_seniority_id: [],
        applying_conditions: {
          regulation_conditions: [],
          accepted_governorates_id: [],
          accepted_grades_id: [],
          accepted_faculties_id: []
        }
      });
      this.conIDs.push({
        conIDs: []
      });
      this.preConditions.push({
        preConditions: []
      });
    },
    deleteInterval(index) {
      this.intervals.splice(index, 1);
    },
    OnSubmit() {
        axios({
          method: "POST",
          url: store.state.domain + "/admissionPhaseInterval/create",
          headers: {
            localization: store.state.localization
          },
          data: {
            start_time: this.startDate + " " + this.startTime,
            end_time: this.endDate + " " + this.endTime,
            priorities: this.priorities,
            admission_housing_seniority_ratio: this.admissionPhaseRatios,
            gender_id: this.Gender,
            title_ar: this.PhaseTitleAr,
            title_en: this.PhaseTitleEn,
            registration_interval: this.intervals
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.$router.push("/newAdmissionPhase");
              if (this.step > 1) {
                this.prev();
              }
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
    },
    prev() {
      (this.step = 1), this.$emit("changeStep", this.step);
      this.$emit(
        "clicked",
        this.PhaseTitleAr,
        this.PhaseTitleEn,
        this.Gender,
        this.startDate,
        this.startTime,
        this.endDate,
        this.endTime,
        this.priorities,
        this.prioritiesCheckedboxes,
        this.SelectedSeniors,
        this.ratios,
        this.admissionPhaseRatios
      );
      this.$emit(
        "PhaseIntervalData",
        this.intervalStartingDate,
        this.intervalStartingTime,
        this.intervalEndingDate,
        this.intervalEndingTime,
        this.intervals,
        this.conIDs,
        this.preConditions
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.redBg {
  font-size: 14px;
  padding: 6px;
}
.check-accepted {
  p{
    font-size: 12px;
    color: #6aa3e3;
    margin-left: 70px;
  }
  .data-item {
    justify-content: unset !important;
  }
}
.terms-and-conditions {
  .save-btn {
    float: unset !important;
    text-align: left;
  }
  .admissionIntervals {
    margin-top: 20px;
    h3 {
      font-size: 25px;
    }
    .active-status {
      @media(max-width: 1024px) {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
  .data-item {
    margin: 5px auto;
    .help-label {
      padding-right: 5px;
      width: 15%;
      @media(max-width: 1024px) {
        width: 20%
      }
      @media(max-width: 992px) {
        width: 100%
      }
    }
    .b-form-btn-label-control.form-control {
      display: inline-flex;
      width: 40%;
      margin-left: 15px;
      @media(max-width: 1024px) {
        width: 38%;
        margin-left: 7px;
      }
      @media(max-width: 992px) {
        width: 100%;
        margin-left: 0px;
        margin-bottom: 7px
      }
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
    tr {
      background: #fff;
      width: 75%;
    }
    td:first-child {
      width: 71%;
    }
    td,
    th {
      border: 1px solid #c4c4c4;
      padding: 8px 15px 8px 15px;
      font-weight: bold;
      color: #5c5c5c;
      input {
        vertical-align: inherit;
        margin-left: 10px;
      }
    }
    .active {
      // to active the term as before or after condition
      background: #00bbf3;
      color: #fff;
    }
  }
  .caption-terms {
    padding-top: 25px;
    h3 {
      font-size: 16px;
      font-weight: bold;
      color: #5c5c5c;
    }
    p {
      font-size: 14px;
      color: #5c5c5c;
    }
  }
  .save-term {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    span {
      background: #008eb9;
      padding: 4px 25px;
      border-radius: 10px;
      color: #fff;
      cursor: pointer;
    }
  }

  .radio-btn-style {
    padding: 0;
    
    div {
      width: 100%;
      position: relative;
      label {
        border-radius: 0;
        padding: 36px 0;
        background-color: #FFF;
        font-weight: 600;
        color: #000;
      }
      label:last-child {
        border-right: 1px solid #c4c4c4;
      }
    }
  }
}
.readMore{
  color: #495469;
  font-size: 16px;
  font-weight: 400;
  transition: .3s ease-in-out;
}
.readMore:hover{
  color: #00BBF3;
}
.termsChosen{
  > label {
    color: #6AA3E3;
    font-size: 20px;
  }
}
.btn-secondary:hover,
.btn-secondary:not(:disabled):not(.disabled).active {
  background-color: #00BBF3 !important;
  color: #FFF !important;
}
.btn-group > .btn:not(:first-child), .btn-group > .btn-group:not(:first-child) {
    margin-left: unset !important;
}
.tabel-container{
  @media(max-width:576px) {
    width: 100%;
    overflow-x: scroll;
    table{
      width: 700px;
    }
  }
}
.done {
  background: transparent !important;
}
</style>
