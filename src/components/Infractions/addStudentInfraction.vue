<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h4 class="text-center">استمارة تطبيق مخالفة على الطالب</h4>
    <form>
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>اسم الطالب</label>
          <b-form-input type="text" required></b-form-input>
          <b-form-invalid-feedback>
            ادخل اسم الطالب
          </b-form-invalid-feedback>
        </b-col>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>{{$t('ID')}}</label>
          <b-form-input type="text" v-model.number="infraction.studentID" required></b-form-input>
          <b-form-invalid-feedback>
            {{$t('add') + ' ' + $t('ID')}}
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>نوع المخالفة</label>
          <b-form-select v-model="infraction.type" disabled-field="notEnabled" :class="infraction.type != null ? 'is-valid' : ''">
              <b-form-select-option :value="null" disabled
                >{{$t('choose') + ' ' + $t('infraction')}}</b-form-select-option
              >
              <b-form-select-option
                v-for="infraction in infractions"
                :key="infraction.id"
                :value="infraction.id"
                >{{ infraction.name_ar }}</b-form-select-option
              >
            </b-form-select>
        </b-col>
      </b-row> 
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>تاريخ تسجيل المخالفة</label>
          <b-form-datepicker
            v-model="infraction.date"
            locale="ar"
            :max="currentDate"
            :initial-date="currentDate"
            :class="infraction.date != '' ? 'is-valid' : ''"
            v-bind="labels || {}"
            required
          ></b-form-datepicker>
        </b-col>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>توقيت تسجيل المخالفة</label>
          <b-form-timepicker
            locale="ar"
            v-model="infraction.time"
            :class="infraction.time != '' ? 'is-valid' : ''"
            v-bind="labels || {}"
            required
          ></b-form-timepicker>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" class="data-item" offset-lg="1">
          <label>{{$t('notes')}}</label>
          <b-form-textarea rows="3" v-model="infraction.notes" :class="infraction.notes != '' ? 'is-valid' : ''"></b-form-textarea>
        </b-col>
      </b-row>
      <div class="save-btn">
        <span class="blueBg" @click.prevent="OnSubmit"
          v-if="
            this.infraction.type !== null &&
            this.infraction.date !== '' && this.infraction.time !== '' && this.infraction.notes !== ''
          "
        >
          {{$t('save')}}
        </span>
        <span class="redBg" @click="resetData">{{$t('cancel')}}</span>
      </div>
    </form>
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
  name: "createInfraction",
  data() {
    return {
      err: [],
      currentDate: new Date().toISOString().substring(0, 10),
      labels: {
        labelNoDateSelected: "لم يتم اختيار التاريخ",
        labelNoTimeSelected: "لم يتم اختيار الوقت",
        labelMinutes: "الدقائق",
        labelHours: "ساعات",
        labelSeconds: "ثواني",
        labelAmpm: "صباحا مساء",
        labelAm: "ص",
        labelPm: "م",
        labelCloseButton: "اختار"
      },
      infractions: [],
      penalities: [],
      infraction: {
        type: null,
        studentID: "",
        date: "",
        time: "", 
        notes: ""
      }
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/infractions", config)
      .then(res => (this.infractions = res.data.data));
  },
  methods: {
    OnSubmit: function() {
      axios({
        method: "POST",
        url: store.state.domain + "/studentInfractions/store",
        headers: {
          localization: store.state.localization
        },
        data: {
          student_id: this.infraction.studentID,
          infraction_id: this.infraction.type,
          infraction_date: this.infraction.date,
          infraction_time: this.infraction.time,
          note: this.infraction.notes
        }
      }).then(this.$router.push("/infractions/studentlist"))
         .catch(error => {
          this.err = error.response.data.errors;
      });
    },
    resetData() {
      this.infraction.type = null;
      this.infraction.date = "";
      this.infraction.studentID = "";
      this.infraction.time = "";
      this.infraction.notes = '';
    }
  }
};
</script>
