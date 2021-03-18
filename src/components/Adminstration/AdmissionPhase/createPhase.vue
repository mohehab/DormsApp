<template>
  <section>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <AdmissionPhaseTabs
        v-if="$route.name == 'AdmissionPhaseForm'"
        tab="main"
      />
      <h4 class="text-center" v-if="$route.params.id">
        {{ $t("Edit") + " " + $t("phase") }}
      </h4>
      <div
        class="boxedFormAllSteps register-data "
        v-if="
          $route.name == 'editHousingRatio' ||
            $route.name == 'AdmissionPhaseForm' ||
            $route.name == 'editAdmissionPhaseGender' ||
            $route.name == 'editAdmissionPhaseTitle'
        "
      >
        <b-row
          class="data-row"
          v-if="
            $route.name == 'AdmissionPhaseForm' ||
              $route.name == 'editAdmissionPhaseTitle'
          "
        >
          <b-col md="12" lg="6" class="data-item data-item">
            <label for=""> 
              {{ $t("phaseName") + " " + $t("Byar") }}
              <span class="required">*</span>
            </label>
            <b-form-input
              type="text"
              v-model="titleAr"
              required
              :state="TitleArState"
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ $t("enter") + " " + $t("phaseName") + " " + $t("Byar") }}
            </b-form-invalid-feedback>
          </b-col>

          <b-col md="12" lg="6" class="data-item">
            <label for=""
              >{{ $t("phaseName") + " " + $t("Byen") }}
              <span class="required">*</span></label
            >
            <b-form-input
              type="text"
              v-model="titleEn"
              required
              :state="TitleEnState"
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ $t("enter") + " " + $t("phaseName") + " " + $t("Byen") }}
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row class="row-m">
          <b-col lg=6 >
        
            <div
              class="head-page-main"
              v-if="
                $route.name == 'editHousingRatio' ||
                  $route.name == 'editAdmissionPhaseGender' ||
                  $route.name == 'AdmissionPhaseForm'
              "
              >
              <div class="phaseGenders label-size">
                <span class="active-status" v-if="!this.$route.params.id">
                  {{ $t("choose") + " " + $t("gender") }}
                  <span class="required">*</span>
                </span>
                <p
                  class="active-status"
                  v-if="$route.name == 'editAdmissionPhaseGender'"
                >
                  تعديل نوع المتقدمين
                </p>
                <div class="checkboxes">
                  <b-form-checkbox
                    v-for="gender in genders"
                    :key="gender.id"
                    v-model="gendersSelectedID"
                    :value="gender.id"
                    >{{ gender.name_ar }}</b-form-checkbox
                  >
                </div>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row class="row-m">
          <b-col lg="9" md="12">
            <div
              class="head-page-main mt-5"
              v-if="
                $route.name == 'AdmissionPhaseForm' ||
                  $route.name == 'editHousingRatio'
              "
              >
              <span
                class="active-status"
                v-if="!$route.params.id || $route.name == 'editHousingRatio'"
              >
                اختر نسبة المقبولين
              </span>
              <div class="seniors">
                <div v-for="(senior, i) in seniors" :key="senior.id">
                  <b-form-checkbox
                    v-model="seniorsSelectedID"
                    :value="senior.id"
                    @change="ifChecked(i, senior.id)"
                    >{{ senior.name_ar }}
                  </b-form-checkbox>
                  <b-form-input
                    type="number"
                    v-model.number="acceptedPer[i]"
                    :class="PercentageValidation <= 100 && acceptedPer[i] ? 'is-valid' : (PercentageValidation > 100) ? 'is-invalid' : ''"
                    placeholder="%"
                    @change="ifChecked"
                    min="1"
                    :max="
                      acceptedPer && acceptedPer.length == 0
                        ? 100
                        : 100 - PercentageValidation
                    "
                    required
                    :disabled="!seniorsSelectedID.includes(senior.id)"
                  ></b-form-input>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <div>
        <div
          class="boxedFormAllSteps"
          v-if="
            $route.name == 'AdmissionPhaseForm' ||
              $route.name == 'editAdmissionPhaseTime'
          "
        >
          <b-row class="data-row date-container">
            <b-col md="12" lg="12" class="mt-md-3 data-item">
              <label for="" class="help-label">
                {{ $t("startDate") }}
                <span class="required">*</span>
              </label>
              <b-form-datepicker
                v-model="PhaseStartingDate"
                :state="StartingDateState"
                locale="ar"
                :min="currentDate"
                :initial-date="currentDate"
                v-bind="labels || {}"
                required
              ></b-form-datepicker>
              <b-form-timepicker
                locale="ar"
                v-model="PhaseStartingTime"
                :state="StartingTimeState"
                v-bind="labels || {}"
                required
              ></b-form-timepicker>
            </b-col>
            <b-col md="12" lg="12" class="mt-md-3 data-item">
              <label for="" class="help-label">
                {{ $t("endDate") }}
                <span class="required">*</span>
              </label>
              <b-form-datepicker
                v-model="PhaseEndingDate"
                locale="ar"
                :disabled="PhaseStartingDate == ''"
                :min="minDateForEndingDate"
                :state="EndingDateState"
                v-bind="labels || {}"
                required
              ></b-form-datepicker>
              <b-form-timepicker
                locale="ar"
                v-model="PhaseEndingTime"
                :state="EndingTimeState"
                v-bind="labels || {}"
                required
              ></b-form-timepicker>
            </b-col>
          </b-row>
        </div>
        <div
          class="boxedFormAllSteps"
          v-if="
            $route.name == 'AdmissionPhaseForm' ||
              $route.name == 'editAdmissionPhasePriorities'
          "
        >
          <div class="admissionPhasePriorities">
            <label for="" class="help-label">
              {{ $t("sortPriorities") }}
            </label>
            <div class="priorities-res">
              <div class="piorities-table">
                <table>
                  <tbody>
                    <tr
                      v-for="(priority, index) in prioritiesList"
                      :key="index"
                    >
                      <td>
                        <input
                          type="checkbox"
                          :value="priority.id"
                          v-model="prioritiesCheckedboxes"
                          :checked="!isChecked"
                          @change="updatePriority(index, priority.id)"
                        />
                        {{ priority.description_ar }}
                        <span>
                          <b-icon-chevron-up
                            @click="moveUp(index, priority.id)"
                          ></b-icon-chevron-up>
                          <b-icon-chevron-down
                            @click="moveDown(index, priority.id)"
                          ></b-icon-chevron-down>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
        <div class="save-btn pb-5">
          <span
            class="redBg"
            @click="resetData"
            v-if="$route.name !== 'AdmissionPhaseForm'"
            >{{ $t("cancel") }}</span
          >
          <span
            class="blueBg"
            @click="next()"
            v-if="
              TitleArState == true &&
                TitleEnState == true &&
                gendersSelectedID.length > 0 &&
                PhaseStartingDate !== '' &&
                PhaseEndingDate !== '' &&
                PhaseStartingTime !== '' &&
                PhaseEndingTime !== '' &&
                !$route.params.id
            "
            >{{ $t("next") }}</span
          >
          <slot v-if="$route.name !== 'AdmissionPhaseForm'">
            <span
              class="blueBg"
              v-if="
                (TitleArState == true && TitleEnState == true) ||
                  gendersSelectedID.length > 0 ||
                  (PhaseStartingDate !== '' &&
                    PhaseEndingDate !== '' &&
                    PhaseStartingTime !== '' &&
                    PhaseEndingTime !== '') ||
                  priorities.length > 0 ||
                  admission_housing_seniority_ratio.length > 0
              "
              @click="updatePhase"
              >{{ $t("Edit") }}</span
            >
          </slot>
        </div>
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
  name: "AdmissionPhaseForm",
  components: {
    AdmissionPhaseTabs
  },
  props: [
    "PhaseTitleAr",
    "PhaseTitleEn",
    "Gender",
    "startDate",
    "startTime",
    "endTime",
    "endDate",
    "ReturnPriorities",
    "ReturnPrioritiesCheckedboxes",
    "ratios",
    "admissionPhaseRatios",
    "SelectedSeniors"
  ],
  mounted() {
    if (this.$route.name == "AdmissionPhaseForm") {
      (this.titleAr = this.PhaseTitleAr),
        (this.titleEn = this.PhaseTitleEn),
        (this.gendersSelectedID = this.Gender),
        (this.PhaseStartingDate = this.startDate),
        (this.PhaseStartingTime = this.startTime),
        (this.PhaseEndingDate = this.endDate),
        (this.PhaseEndingTime = this.endTime),
        (this.priorities = this.ReturnPriorities),
        (this.prioritiesCheckedboxes = this.ReturnPrioritiesCheckedboxes),
        (this.acceptedPer = this.ratios),
        (this.admission_housing_seniority_ratio = this.admissionPhaseRatios),
        (this.seniorsSelectedID = this.SelectedSeniors);
      axios
        .get(
          store.state.domain + "/generalServices/listStudentSeniority",
          config
        )
        .then(res => (this.seniors = res.data.data));
      axios
        .get(store.state.domain + "/generalServices/listGenders", config)
        .then(res => (this.genders = res.data.data));
      axios
        .get(store.state.domain + "/housingPriorities/index", config)
        .then(res => (this.prioritiesList = res.data.data));
    } else if (this.$route.name == "editAdmissionPhaseTitle") {
      axios
        .get(
          store.state.domain +
            "/admissionPhaseInterval/showIntervalById/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          (this.titleAr = res.data.data.title_ar),
            (this.titleEn = res.data.data.title_en);
        });
    } else if (this.$route.name == "editHousingRatio") {
      axios
        .get(
          store.state.domain + "/generalServices/listStudentSeniority",
          config
        )
        .then(res => (this.seniors = res.data.data));
      axios
        .get(
          store.state.domain +
            "/admissionPhaseInterval/showIntervalById/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          const lengthArray = Object.keys(
            res.data.data.admission_housing_seniority_ratio
          ).length;
          const admissionRatio =
            res.data.data.admission_housing_seniority_ratio;
          for (let i = 0; i < lengthArray; i++) {
            this.acceptedPer.push(admissionRatio[i].ratio);
            this.seniorsSelectedID.push(admissionRatio[i].seniority.id);
            this.admission_housing_seniority_ratio.push({
              seniority_id: admissionRatio[i].seniority.id,
              ratio: admissionRatio[i].ratio
            });
          }
        });
    } else if (this.$route.name === "editAdmissionPhasePriorities") {
      axios
        .get(store.state.domain + "/housingPriorities/index", config)
        .then(res => (this.prioritiesList = res.data.data));
      axios
        .get(
          store.state.domain +
            "/admissionPhaseInterval/showIntervalById/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          const lengthArray = Object.keys(res.data.data.housing_priorities)
            .length;
          const checkboxesPrio = res.data.data.housing_priorities;
          console.log(checkboxesPrio);
          console.log(lengthArray);
          for (let i = 0; i < lengthArray; i++) {
            console.log(i);
            this.prioritiesCheckedboxes.push(checkboxesPrio[i].id);
            this.priorities.push({
              housing_priority_id: checkboxesPrio[i].id,
              order: i + 1
            });
          }
        });
    } else if (this.$route.name === "editAdmissionPhaseGender") {
      axios
        .get(store.state.domain + "/generalServices/listGenders", config)
        .then(res => (this.genders = res.data.data));
      axios
        .get(
          store.state.domain +
            "/admissionPhaseInterval/showIntervalById/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          const lengthArray = Object.keys(res.data.data.gender).length;
          const genders = res.data.data.gender;
          for (let i = 0; i < lengthArray; i++) {
            this.gendersSelectedID.push(genders[i].id);
          }
        });
    } else {
      axios
        .get(
          store.state.domain +
            "/admissionPhaseInterval/showIntervalById/" +
            this.$route.params.id,
          config
        )
        .then(res => {
          (this.PhaseStartingDate = res.data.data.start_time.slice(0, 10)),
            (this.PhaseEndingDate = res.data.data.end_time.slice(0, 10)),
            (this.PhaseEndingTime = res.data.data.end_time.slice(11, 19)),
            (this.PhaseStartingTime = res.data.data.start_time.slice(11, 19));
        });
    }
  },
  data() {
    return {
      err: [],
      genders: [],
      currentDate: new Date().toISOString().substring(0, 10),
      isActive: false,
      titleAr: "",
      titleEn: "",
      gendersSelectedID: [],
      PhaseStartingDate: "",
      PhaseStartingTime: "",
      PhaseEndingDate: "",
      PhaseEndingTime: "",
      prioritiesList: [],
      prioritiesCheckedboxes: [],
      priorities: [],
      admission_housing_seniority_ratio: [],
      start_date: "",
      end_date: "",
      seniors: "",
      seniorsSelectedID: [],
      acceptedPer: [],
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
      isChecked: false,
      required: true,
      selected: false
    };
  },
  methods: {
    updatePhase() {
      if (this.$route.name == "editAdmissionPhaseGender") {
        axios({
          method: "POST",
          headers: {
            localization: store.state.localization
          },
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateAdmissionGender/" +
            this.$route.params.id,
          data: {
            gender_id: this.gendersSelectedID
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.gendersSelectedID = [];
              this.$router.go(-1);
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else if (this.$route.name == "editAdmissionPhasePriorities") {
        axios({
          method: "POST",
          headers: {
            localization: store.state.localization
          },
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateAdmissionPriorities/" +
            this.$route.params.id,
          data: {
            priorities: this.priorities
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              (this.checkedboxes = []),
                (this.prioritiesReset = []),
                this.$router.go(-1);
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else if (this.$route.name == "editAdmissionPhaseTitle") {
        axios({
          method: "POST",
          headers: {
            localization: store.state.localization
          },
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateAdmissionTitle/" +
            this.$route.params.id,
          data: {
            title_ar: this.titleAr,
            title_en: this.titleEn
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.$router.go(-1);
              (this.titleAr = ""), (this.titleEn = "");
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else if (this.$route.name == "editHousingRatio") {
        axios({
          method: "POST",
          headers: {
            localization: store.state.localization
          },
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateAdmissionHousingSeniorityRatio/" +
            this.$route.params.id,
          data: {
            admission_housing_seniority_ratio: this
              .admission_housing_seniority_ratio
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.$router.go(-1);
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      } else {
        axios({
          method: "POST",
          headers: {
            localization: store.state.localization
          },
          url:
            store.state.domain +
            "/admissionPhaseInterval/updateAdmissionTime/" +
            this.$route.params.id,
          data: {
            ...(this.PhaseStartingDate + " " + this.PhaseStartingTime
              ? {
                  start_time:
                    this.PhaseStartingDate + " " + this.PhaseStartingTime
                }
              : ""),
            ...(this.PhaseEndingDate + " " + this.PhaseEndingTime
              ? {
                  end_time: this.PhaseEndingDate + " " + this.PhaseEndingTime
                }
              : "")
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              this.$router.go(-1);
              (this.PhaseStartingDate = ""),
                (this.PhaseEndingDate = ""),
                (this.PhaseStartingTime = ""),
                (this.PhaseEndingTime = "");
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      }
    },
    next() {
      this.step = 2;
      this.$emit("changeStep", this.step);
      this.$emit(
        "clicked",
        this.titleAr,
        this.titleEn,
        this.gendersSelectedID,
        this.PhaseStartingDate,
        this.PhaseStartingTime,
        this.PhaseEndingDate,
        this.PhaseEndingTime,
        this.priorities,
        this.prioritiesCheckedboxes,
        this.seniorsSelectedID,
        this.acceptedPer,
        this.admission_housing_seniority_ratio
      );
    },
    resetData() {
      if (this.$route.name !== "AdmissionPhaseForm") {
        this.$router.go(-1);
      }
      (this.$store.state.admissionPhase.phaseStartingTime = ""),
        (this.$store.state.admissionPhase.phaseEndingTime = ""),
        (this.$store.state.admissionPhase.phaseStartingDate = ""),
        (this.$store.state.admissionPhase.phaseEndingDate = ""),
        (this.$store.state.admissionPhase.genders = []),
        (this.$store.state.admissionPhase.titleAr = ""),
        (this.$store.state.admissionPhase.titleEn = ""),
        (this.$store.state.admissionPhase.priorities = []),
        (this.$store.state.admissionPhase.prioritiesCheckedboxes = []);
    },
    moveUp(rowIndex) {
      this.prioritiesList.splice(
        rowIndex - 1,
        0,
        this.prioritiesList.splice(rowIndex, 1)[0]
      );
    },
    moveDown(rowIndex) {
      this.prioritiesList.splice(
        rowIndex + 1,
        0,
        this.prioritiesList.splice(rowIndex, 1)[0]
      );
    },
    updatePriority(index, id) {
      if (!this.prioritiesCheckedboxes.includes(id)) {
        const indexCheckBox = this.prioritiesCheckedboxes.indexOf(id);
        this.priorities.splice(indexCheckBox);
      } else {
        const arraylength = this.priorities.length;
        this.priorities.splice(0, arraylength);
        const lengthArray = Object.keys(this.prioritiesCheckedboxes).length;
        for (let i = 0; i < lengthArray; i++) {
          this.priorities.push({
            housing_priority_id: this.prioritiesCheckedboxes[i],
            order: i + 1
          });
        }
      }
    },
    ifChecked(i) {
      const $this = this;
      const admissionRatio = $this.admission_housing_seniority_ratio;
      const adlength = admissionRatio.length;
      const seniorArray = Object.keys($this.seniorsSelectedID).length;
      const PercenArray = Object.keys($this.acceptedPer).length;
      if (seniorArray > PercenArray) {
        admissionRatio.splice(0, adlength);
        for (let i = 0; i < seniorArray; i++) {
          admissionRatio.push({
            seniority_id: $this.seniorsSelectedID[i],
            ...($this.acceptedPer[i]
              ? { ratio: $this.acceptedPer[i] }
              : { ratio: null })
          });
        }
      } else if (seniorArray < PercenArray) {
        admissionRatio.splice(0, adlength);
        $this.acceptedPer.splice(i, 1);
        for (let i = 0; i < PercenArray; i++) {
          admissionRatio.push({
            seniority_id: $this.seniorsSelectedID[i],
            ratio: $this.acceptedPer[i]
          });
        }
        admissionRatio.pop();
      } else {
        admissionRatio.splice(0, adlength);
        $this.acceptedPer.splice(i, 1);
        for (let i = 0; i < PercenArray; i++) {
          admissionRatio.push({
            seniority_id: $this.seniorsSelectedID[i],
            ratio: $this.acceptedPer[i]
          });
        }
      }
    }
  },
  computed: {
    TitleArState() {
      if (this.titleAr == "") {
        return null;
      } else if (this.titleAr.match(/^[ء-ي\s]*$/) && this.titleAr.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    TitleEnState() {
      if (this.titleEn == "") {
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
    StartingDateState() {
      if (this.PhaseStartingDate == "") {
        return null;
      } else if (this.PhaseStartingDate.length > 9) {
        return true;
      } else {
        return false;
      }
    },
    EndingDateState() {
      if (this.PhaseEndingDate == "") {
        return null;
      } else if (this.PhaseEndingDate.length > 9) {
        return true;
      } else {
        return false;
      }
    },
    EndingTimeState() {
      if (this.PhaseEndingTime == "") {
        return null;
      } else if (this.PhaseEndingTime.length > 5) {
        return true;
      } else {
        return false;
      }
    },
    StartingTimeState() {
      if (this.PhaseStartingTime == "") {
        return null;
      } else if (this.PhaseStartingTime.length > 5) {
        return true;
      } else {
        return false;
      }
    },
    PercentageValidation() {
      const array = this.acceptedPer;
      const sum = array.reduce(function(a, b) {
        return a + b;
      }, 0);
      return sum;
    },
    minDateForEndingDate() {
      var date = new Date(this.PhaseStartingDate);
      var newdate = new Date(date);
      newdate.setDate(newdate.getDate() + 1);
      var dd = newdate.getDate();
      var mm = newdate.getMonth() + 1;
      if (mm < 10) {
        var month = "0" + mm;
      } else {
        month = "" + mm;
      }
      var y = newdate.getFullYear();
      return y + "-" + month + "-" + dd;
    }
  }
};
</script>
<style lang="scss" scoped>
.active-status {
  vertical-align: top;
}
.seniors {
  width: 55%;
  > div {
    display: flex;
    align-items: center;
    > div {
      width: 30%;
    }
    input {
      width: 30%;
      height: 35px;
      margin-bottom: 10px;
    }
  }
}
.overflow {
  overflow: hidden;
}
.b-form-btn-label-control.form-control {
  display: inline-flex;
  width: 40%;
  margin-left: 15px;
  @media(max-width: 576px) {
    width: 100%;
    margin-bottom: 15px
  }
}
.b-form-btn-label-control.form-control > .dropdown-menu {
  margin-top: 130px !important;
}
.row-m{
  margin: 20px 0 !important;
}
.head-page-main {
  display: flex;
  margin-bottom: 15px;
  .phaseGenders {
    display: flex;
    width: 100%;
    @media(max-width:768px){
      flex-direction: column;
    }
    span{
      font-size: 12px;
      width: 38%;
      color: #6aa3e3;
      @media(max-width:576px) {
        width: 100%;
      }
    }
    label{
      color: #495469;
    }
  }
 
  
  .right {
    label {
      font-weight: bold;
      color: #495469;
      margin-right: 10px;
      position: relative;
    }
  }
  .phaseGenders .checkboxes {
    display: inline-block;
  }
  .status {
    display: inline-block;
  }
}
 .head-page-main {
    span {
      font-size: 12px;
      width: 25%;
      color: #6aa3e3; 
      @media(max-width:576px) {
        width: 100%;
      }
    }
    .seniors{
      width: 70%;
      @media(max-width:991px) {
        width: 100%;
      }
      > div {
        // flex-direction: column;
        align-items: flex-start;
        @media(max-width:576px) {
          flex-direction: column;
        }
      }
      
      input{
        width: 100%;
      }
    }
    .form-control{
      background-color: #FFF;
      height: 31px;
    }
  }
.data-row {
  justify-content: space-around;
  margin: 20px 0;
  .data-item {
    text-align: right;
    .help-label {
      padding-right: 5px;
      width: 15%;
      @media(max-width: 576px) {
        width: 100%;
      }
      &:after {
        content: "?";
        position: absolute;
        top: 12px;
        right: 0;
        width: 15px;
        height: 15px;
        border: 1px solid #00bbf3;
        border-radius: 50%;
        font-size: 10px;
        font-weight: bold;
        text-align: center;
        color: #00bbf3;
        cursor: help;
      @media(max-width: 576px) {
        top: 5px;
      }
      }
    }
    .timming {
      margin-left: 20px;
    }
  }
}
.save-term {
  margin-top: 60px;
  span {
    background: #008eb9;
    padding: 4px 25px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
  }
}
.admissionPhasePriorities {
  label {
    color: #6AA3E3;
  }
  table {
    margin: auto;
    width: 100%;
    border-collapse: separate;
    border-spacing: 6px;
    div {
      width: 90%;
      overflow: hidden;
      margin: 0;
      text-align: right;
      display: inline-block;
    }
    thead {
      background: #ececec;
    }
    td,
    th {
      padding: 15px 20px;
      border: 1px solid #495469;
      opacity: 0.5;
      font-weight: bold;
      position: relative;
      @media(max-width:768px) {
        font-size: 12px;
      }
      .bi-hdd-stack {
        position: absolute;
        left: 20px;
        top: 17px;
        font-size: 20px;
      }
      input {
        vertical-align: middle;
        margin-left: 10px;
      }
    }
  }
}
.active {
  background: #00bbf3;
  color: #fff;
}
.ghost {
  background: #008eb9;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.8);
  color: #fff;
}
.piorities-table {
  span {
    float: left;
  }
}
.data-row{
  align-items: flex-start;
}
.register-data .data-item{
  flex-wrap: wrap;
  justify-content: space-between;
  label {
    width: 38% ;
    margin: 0 0 0 10px;
    @media(max-width:991px) {
      width: 100% !important;
    }
  }
  input {
    width: 59% !important;
    @media(max-width:991px){
      width: 100% !important;
    }
  }
}
.date-container .data-item{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media(max-width:1199px) {
    flex-direction: column;
  }
  > div{
    @media(max-width:1199px) {
      width: 100%;
    } 
  }

  label{
    color: #6AA3E3;
    font-size: 16px;
    margin: 0;
    @media(max-width:1199px) {
      width: 100% !important;
    }
  }
  
}
@media(max-width:991px) {
  .head-page-main[data-v-637fc76e] {
    flex-direction: column;
    span{
      margin-bottom: 15px;
    }
  }
}
</style>
