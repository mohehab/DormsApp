<template>
  <section>
    <div class="parent-data-container">
      <b-row align-h="between" class="data-row">
        <b-col lg="4" sm="12" class="data-item">
          <label for="">ولى الامر</label>
          <input
            type="text"
            v-model="studentAgentName"
            @input="valStudentAgentName($event.target.value)"
          />
        </b-col>
        <b-col lg="4" sm="12" class="data-item">
          <label for="">الرقم القومى</label>
          <input
            type="tel"
            v-model="studentAgentNationalID"
            @input="valstudentAgentNationalID($event.target.value)"
          />
        </b-col>
        <b-col lg="4" sm="12" class="data-item">
          <label for="">وظيفة ولى الامر</label>
          <input
            type="text"
            v-model="studentAgentJob"
            @input="valstudentAgentJob($event.target.value)"
          />
        </b-col>
        <div class="error-width">
          <div v-if="$v.studentAgentform.studentAgentName.$error">
            <p
              v-if="
                $v.studentAgentform.studentAgentName.required ||
                  $v.studentAgentform.studentAgentNationalID.required ||
                  $v.studentAgentform.studentAgentJob.required
              "
            >
              من فضلك اكتب الاسم
            </p>
            <p v-if="!$v.studentAgentform.studentAgentName.alpha">
              اسم ولي الامر: استخدم حروف فقط
            </p>
          </div>
          <div v-if="$v.studentAgentform.studentAgentJob.$error">
            <p v-if="$v.studentAgentform.studentAgentJob.required">
              من فضلك ادخل الوظيفة
            </p>
            <p v-if="!$v.studentAgentform.studentAgentJob.alpha">
              وظيفة ولي الامر تقبل حروف فقط لا تقبل ارقام
            </p>
          </div>
          <div v-if="$v.studentAgentform.studentAgentNationalID.$error">
            <p v-if="$v.studentAgentform.studentAgentNationalID.required">
              من فضلك ادخل الرقم القومي
            </p>
            <p
              v-if="
                $v.studentAgentform.studentAgentNationalID.minLength ||
                  $v.studentAgentform.studentAgentNationalID.maxLength
              "
            >
              الرقم الرقمي خطأ. الرقم القومي مكون من١٤ عشر رقم
            </p>
            <p v-if="!$v.studentAgentform.studentAgentNationalID.numeric">
              الرقم القومي مكون من ارقام فقط لا يمكن ادخال حروف ورموز
            </p>
          </div>
        </div>
      </b-row>
      <b-row>
        <b-col lg="4" sm="12" class="data-item">  
          <label for="">هاتف ولى الامر</label>
          <input
            type="tel"
            v-model="studentAgentPhone"
            @input="valstudentAgentPhone($event.target.value)"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" sm="12" class="data-item">
          <label for="">الحاله الصحيه</label>
          <input
            type="text"
            v-model="studentAgentMedical"
            @input="valstudentAgentMedical($event.target.value)"
          />
        </b-col>
        <div class="error-width">
          <div
            v-if="
              $v.studentAgentform.studentAgentPhone.$error ||
                $v.studentAgentform.studentAgentMedical.$error
            "
          >
            <p
              v-if="
                $v.studentAgentform.studentAgentPhone.required ||
                  $v.studentAgentform.studentAgentMedical.required
              "
            >
              من فضلك املئ البيانات كاملة
            </p>
            <p v-if="!$v.studentAgentform.studentAgentPhone.numeric">
              الهاتف مكون من ارقام، غير متاح ادخال رموز او حروف
            </p>
            <p v-if="!$v.studentAgentform.studentAgentName.alpha">
              الاسم مكون حروف، غير متاح ادخال ارقام او رموز
            </p>
            <p v-if="!$v.studentAgentform.studentAgentMedical.alpha">
              الحالة الصحية مكونة من حروف، غير متاح ادخال ارقام او رموز
            </p>
            <p
              v-if="
                $v.studentAgentform.studentAgentPhone.minLength ||
                  $v.studentAgentform.studentAgentPhone.maxLength
              "
            >
              الهاتف غير صحيح، ادخل الرقم كامل
            </p>
          </div>
        </div>
      </b-row>
    </div>
  </section>
</template>
<script>
import {
  required,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
import { BRow } from "bootstrap-vue";
import store from "@/store/index.js";
const alpha = helpers.regex("alpha", /[\u0600-\u06FF\u0750-\u077F]/);
const numeric = helpers.regex("numeric", /[\u0660-\u0669\0-9]/);
export default {
  name: "StudentAgentDetails",
  components: {
    BRow
  },
  data() {
    return {
      studentAgentform: {
        studentAgentName: "",
        studentAgentNationalID: "",
        studentAgentJob: "",
        studentAgentPhone: "",
        studentAgentMedical: ""
      }
    };
  },
  validations: {
    studentAgentform: {
      studentAgentName: {
        required,
        alpha,
        minLength: minLength(3)
      },
      studentAgentNationalID: {
        required,
        numeric,
        minLength: minLength(14),
        maxLength: maxLength(14)
      },
      studentAgentJob: {
        required,
        alpha,
        minLength: minLength(4)
      },
      studentAgentPhone: {
        required,
        numeric,
        minLength: minLength(9),
        maxLength: maxLength(11)
      },
      studentAgentMedical: { required, alpha }
    }
  },
  methods: {
    next() {
      store.state.RegisterStep++;
    },
    prev() {
      store.state.RegisterStep--;
    },
    valStudentAgentName(value) {
      this.studentAgentform.studentAgentName = value;
      this.$v.studentAgentform.studentAgentName.$touch();
    },
    valstudentAgentNationalID(value) {
      this.studentAgentform.studentAgentNationalID = value;
      this.$v.studentAgentform.studentAgentNationalID.$touch();
    },
    valstudentAgentJob(value) {
      this.studentAgentform.studentAgentJob = value;
      this.$v.studentAgentform.studentAgentJob.$touch();
    },
    valstudentAgentPhone(value) {
      this.studentAgentform.studentAgentPhone = value;
      this.$v.studentAgentform.studentAgentPhone.$touch();
    },
    valstudentAgentMedical(value) {
      this.studentAgentform.studentAgentMedical = value;
      this.$v.studentAgentform.studentAgentMedical.$touch();
    }
  },
  computed: {
    studentAgentName: {
      get() {
        return this.$store.state.studentAgentform.studentAgentName;
      },
      set(value) {
        this.$store.commit("setStudentAgentName", value);
      }
    },
    studentAgentNationalID: {
      get() {
        return this.$store.state.studentAgentform.studentAgentNationalID;
      },
      set(value) {
        this.$store.commit("setStudentAgentNationalID", value);
      }
    },
    studentAgentJob: {
      get() {
        return this.$store.state.studentAgentform.studentAgentJob;
      },
      set(value) {
        this.$store.commit("setStudentAgentJob", value);
      }
    },
    studentAgentPhone: {
      get() {
        return this.$store.state.studentAgentform.studentAgentPhone;
      },
      set(value) {
        this.$store.commit("setStudentAgentPhone", value);
      }
    },
    studentAgentMedical: {
      get() {
        return this.$store.state.studentAgentform.studentAgentMedical;
      },
      set(value) {
        this.$store.commit("setStudentAgentMedical", value);
      }
    }
  }
};
</script>
