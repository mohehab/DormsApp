<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h3 class="text-center">حجز الوجبة</h3>
    <form>
      <b-row class="data-row mb-4">
        <b-col xl="6" md="12" class="mb-4">
          <label>اختار وجبه <span class="required">*</span></label>
          <b-form-input
            v-model="search"
            @input="onChange"
            @keyup.down="onArrowDown"
            @keyup.up="onArrowUp"
            @keyup.enter="onEnter"
            type="text"
          ></b-form-input>
          <ul
            id="autocomplete-results"
            v-show="isOpen"
            class="autocomplete-results"
          >
            <li
              v-for="(result, i) in results"
              :key="i"
              @click="setResult(result)"
              class="autocomplete-result"
            >
              {{ result.name_ar }}
            </li>
          </ul>
        </b-col>
      </b-row>
      <div class="table-style mb-4" v-if="selected.length > 0">
        <table class="grey-style">
          <tr>
            <th>الوجبه المختاره</th>
            <th>الكميه</th>
            <th>حذف</th>
          </tr>
          <tr v-for="(select, index) in selected" :key="index">
            <td>{{ select.name_ar }}</td>
            <td>
              <b-form-input
                type="number"
                v-model.number="meals[index].quantity"
                @change="Addmeal(select.id, index)"
              ></b-form-input>
            </td>
            <td><span class="redBg" @click="deleteitem(index)">حذف</span></td>
          </tr>
        </table>
      </div>
      <b-row class="data-row media-row">
        <b-col xl="6" md="12" class="data-item">
          <label for="" class="help-label">التاريخ <span class="required">*</span></label>
          <b-form-datepicker
            v-model="date"
            locale="ar"
            :min="currentDate"
            :initial-date="currentDate"
            v-bind="labels || {}"
            required
            :state="reserveDate"
          ></b-form-datepicker>
        </b-col>
        <b-col xl="6" md="12" class="data-item">
          <label for="" class="help-label help-label">الوقت <span class="required">*</span></label>
          <b-form-timepicker
            locale="ar"
            v-model="time"
            v-bind="labels || {}"
            required
            :state="reserveTime"
          ></b-form-timepicker>
        </b-col>
      </b-row>
      <b-row align-h="between" class="data-row mb-4">
        <b-col xl="6" md="12">
          <label>الموقع <span class="required">*</span></label>
          <b-form-select
            disabled-field="notEnabled"
            v-model="location"
            :options="options"
            value-field="item"
            text-field="name"
          >
            <b-form-select-option :value="null" disabled
              >اختار الموقع</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col xl="6" md="12" v-if="this.location == 'outside dorms'">
          <label>المكان <span class="required">*</span></label>
          <b-form-input
            v-model="place"
            type="text"
            :state="validPlace"
          ></b-form-input>
          <b-form-invalid-feedback>
            أدخل اسم المكان باللغة العربية
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <div class="contact">
        <div>
          <h3>بيانات التواصل </h3>
          <b-row align-h="between" class="data-row mb-4">
            <b-col xl="6" md="12">
              <label>الاسم <span class="required">*</span></label>
              <b-form-input
                v-model="name"
                type="text"
                :state="validName"
              ></b-form-input>
              <b-form-invalid-feedback>
                أدخل الاسم باللغة العربية
              </b-form-invalid-feedback>
            </b-col>
            <b-col xl="6" md="12">
              <label>الهاتف <span class="required">*</span></label>
              <b-form-input
                v-model="phone"
                type="text"
                :state="validPhone"
              ></b-form-input>
              <b-form-invalid-feedback>
                رقم الهاتف مكون من ١١ رقم او ١٠ ارقام
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
          <b-form-textarea
            id="textarea"
            placeholder="اكتب الملاحظات ...."
            rows="3"
            max-rows="6"
            v-model="notes"
          ></b-form-textarea>
        </div>
      </div>
      <div class="save-btn">
        <button type="submit" class="blueBg" @click.prevent="OnSubmit">
          حفظ
        </button>
        <span class="redBg">الغاء</span>
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
  name: "NewReservation",
  data() {
    return {
      search: "",
      results: [],
      err: [],
      isOpen: false,
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
      location: null,
      place: "",
      date: "",
      time: "",
      quantity: [],
      selected: [],
      mealid: [],
      allmeals: [],
      meals: [],
      name: "",
      phone: "",
      notes: "",
      options: [
        { item: "inside dorms", name: "داخل المدينة" },
        { item: "outside dorms", name: "خارج المدينة" }
      ]
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/meal", config)
      .then(res => (this.allmeals = res.data.data));
  },
  computed: {
    reserveDate() {
      if (this.date.length == 0) {
        return null;
      } else if (this.date.length > 9) {
        return true;
      } else {
        return false;
      }
    },
    reserveTime() {
      if (this.time.length == 0) {
        return null;
      } else if (this.time.length > 5) {
        return true;
      } else {
        return false;
      }
    },
    validPlace() {
      if (this.place.length == 0) {
        return null;
      } else if (!this.place.match(/[\u0600-\u06FF\u0750-\u077F]/)) {
        return false;
      } else if (this.place.length > 2) {
        return true;
      } else {
        return false;
      }
    },
    validName() {
      if (this.name.length == 0) {
        return null;
      } else if (!this.name.match(/[\u0600-\u06FF\u0750-\u077F]/)) {
        return false;
      } else if (this.name.length > 2) {
        return true;
      } else {
        return false;
      }
    },
    validPhone() {
      if (this.phone.length == 0) {
        return null;
      } else if (this.phone.length == 11 || this.phone.length == 10) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    OnSubmit() {
      axios({
        method: "POST",
        url: store.state.domain + "/mealRequest",
        headers: {
          localization: store.state.localization
        },
        data: {
          meals: this.meals,
          delivery_date: this.date,
          delivery_time: this.time,
          location: this.location,
          place: this.place,
          name: this.name,
          phone: this.phone,
          notes: this.notes,
          user_id: 1
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push("/feeding/reservations");
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    onChange() {
      this.$emit("input", this.search);
      this.filterResults();
      this.isOpen = true;
    },
    filterResults() {
      this.results = this.allmeals.filter(allmeals => {
        return allmeals.name_ar.indexOf(this.search) > -1;
      });
    },
    Addmeal(id, index) {
      let indexAfter = this.meals.indexOf(id);
      if (indexAfter < 0) {
        this.meals[index].meal_id.push(id);
      }
    },
    setResult(result) {
      this.selected.push(result);
      this.isOpen = false;
      this.search = "";
      this.meals.push({
          meal_id: result.id,
          quantity: ""
      });
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    deleteitem(index) {
      let indexBefore = this.selected.indexOf(index);
      this.selected.splice(indexBefore, 1);
      let deleteMeal = this.mealid.indexOf(index);
      this.meals.splice(deleteMeal, 1);
    },
  }
};
</script>
<style lang="scss" scoped>
.timing {
  min-width: 300px;
}
@media (max-width: 992px) {
  .grey-style {
    width: 80% !important;
  }
}
</style>
