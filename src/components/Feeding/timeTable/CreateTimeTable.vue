<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h2 class="text-center">إضافة جدول مواعيد</h2>
    <form>
      <b-row>
        <b-col xl="6">
          <label>الاسم باللغة العربية <span class="required">*</span></label>
          <b-form-input
            type="text"
            required
            v-model="tableAr"
            :state="tableArState"
          ></b-form-input>
        </b-col>
        <b-col xl="6">
          <label>الاسم باللغة الانجليزية <span class="required">*</span></label>
          <b-form-input
            type="text"
            required
            v-model="tableEn"
            :state="tableEnState"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>تاريخ البدء <span class="required">*</span></label>
          <b-form-datepicker
            v-model="startDate"
            locale="ar"
            :min="currentDate"
            :initial-date="currentDate"
            v-bind="labels || {}"
            required
            :state="StartingDateState"
          ></b-form-datepicker>
        </b-col>
        <b-col>
          <label>تاريخ الانتهاء <span class="required">*</span></label>
          <b-form-datepicker
            v-model="endDate"
            locale="ar"
            :min="startDate"
            v-bind="labels || {}"
            required
            :state="EndingDateState"
            :disabled="startDate == ''"
          ></b-form-datepicker>
        </b-col>
      </b-row>
      <label>تفاصيل الجدول <span class="required">*</span></label>
      <b-row>
        <b-col class="mb-3" v-for="(day, index) in days" :key="index">
          <b-form-checkbox
            v-model="SelectedDays"
            :value="day.dayNameEn"
            @change="addNewDay(day.dayNameEn, index)"
            >{{ day.dayName }}</b-form-checkbox
          >
        </b-col>
      </b-row>
      <b-row v-for="(detail, index) in details" :key="index">
        <b-row>
          <label>{{ detail.day }}</label>
          <b-col v-for="(meal, i) in meals" :key="meal.id">
            <b-form-checkbox
              v-model="SelectedCat[index].cat"
              name="check-button"
              @change="addNewCategory(index, meal.id)"
              :value="meal.id"
              >{{ meal.name_ar }}</b-form-checkbox
            >
            <b-dropdown
              text="اختر الوجبات"
              variant="primary"
              class="m-2"
              v-if="SelectedCat[index].cat.includes(meal.id)"
            >
              <slot v-for="ingredient in ingredients">
                <slot v-if="$route.name == 'editTimeTable'">
                  <b-form-checkbox
                    :key="ingredient.id"
                    :disabled="!SelectedCat[index].cat.includes(meal.id)"
                    :value="ingredient.id"
                    @change="addmeal(i, index, ingredient.id)"
                    v-if="
                      meal.id == ingredient.meal_subcategory_id.meal_type_id.id
                    "
                    v-model="details[index].category[i].meal_id"
                    class="mb-3"
                    >{{ ingredient.name_ar }}</b-form-checkbox
                  >
                </slot>
                <slot v-else>
                  <b-form-checkbox
                    :key="ingredient.id"
                    :disabled="!SelectedCat[index].cat.includes(meal.id)"
                    :value="ingredient.id"
                    @change="addmeal(i, index, ingredient.id)"
                    v-if="
                      meal.id == ingredient.meal_subcategory_id.meal_type_id.id
                    "
                    class="mb-3"
                    >{{ ingredient.name_ar }}</b-form-checkbox
                  >
                </slot>
              </slot>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-row>
    </form>
    <b-row v-if="err.length != 0">
      <p>البيانات غير مكتملة أو غير صحيحة، من فضلك أكمل الآتي:</p>
      <slot v-for="(errors, x) in err">
        <ul class="form--error" :key="x">
          <li v-for="(error, i) in errors" :key="i">
            {{ error }}
          </li>
        </ul>
      </slot>
    </b-row>
    <div class="save-btn">
      <span
        class="blueBg"
        v-if="$route.name == 'editTimeTable'"
        @click="updateTable"
        >تعديل</span
      >
      <button type="submit" class="blueBg" @click="OnSubmit" v-else>
        {{ $t("save") }}
      </button>
      <span class="redBg">{{ $t("cancel") }}</span>
    </div>
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
  name: "createTimeTable",
  data() {
    return {
      err: [],
      tableAr: "",
      tableEn: "",
      startDate: "",
      endDate: "",
      selected: "",
      meals: [],
      dishes: [],
      details: [],
      SelectedCat: [],
      SelectedDays: [],
      Selectedtags: [],
      ingredients: [],
      information: [],
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
      days: [
        { id: 1, dayName: "السبت", dayNameEn: "Saturday" },
        { id: 2, dayName: "الأحد", dayNameEn: "Sunday" },
        { id: 3, dayName: "الأثنين", dayNameEn: "Monday" },
        { id: 4, dayName: "الثلاثاء", dayNameEn: "Tuesday" },
        { id: 5, dayName: "الاربعاء", dayNameEn: "Wenesday" },
        { id: 6, dayName: "الخميس", dayNameEn: "Thursday" },
        { id: 7, dayName: "الجمعة", dayNameEn: "Friday" }
      ]
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/mealtype", config)
      .then(res => (this.meals = res.data.data));
    axios
      .get(store.state.domain + "/meal", config)
      .then(res => (this.ingredients = res.data.data));
    axios
      .get(store.state.domain + "/mealIngredient", config)
      .then(res => (this.dishes = res.data.data));
    if (this.$route.params.id) {
      axios
        .get(store.state.domain + "/mealTime/" + this.$route.params.id, config)
        .then(res => {
          (this.tableAr = res.data.data.name_ar),
            (this.tableEn = res.data.data.name_en),
            (this.startDate = res.data.data.start_date),
            (this.endDate = res.data.data.end_date);
          this.information = res.data.data.information;
          const infoIndex = Object.keys(res.data.data.information).length;
          for (let i = 0; i < infoIndex; i++) {
            this.SelectedDays.push(res.data.data.information[i].day);
            this.addNewDay(res.data.data.information[i].day, i);
            const mealSchedule = Object.keys(
              res.data.data.information[i].mealSchedule
            ).length;
            for (let x = 0; x < mealSchedule; x++) {
              this.SelectedCat[i].cat.push(
                res.data.data.information[i].mealSchedule[x].meal_id
                  .meal_subcategory_id.meal_type_id.id
              );
              this.addNewCategory(
                i,
                res.data.data.information[i].mealSchedule[x].meal_id
                  .meal_subcategory_id.meal_type_id.id
              );
              this.addmeal(
                x,
                i,
                res.data.data.information[i].mealSchedule[x].meal_id.id
              );
            }
          }
        });
    }
  },
  computed: {
    StartingDateState() {
      if (this.startDate.length == 0) {
        return null;
      } else if (this.startDate.length > 9) {
        return true;
      } else {
        return false;
      }
    },
    EndingDateState() {
      if (this.endDate.length == 0) {
        return null;
      } else if (this.endDate.length > 9) {
        return true;
      } else {
        return false;
      }
    },
    tableArState() {
      if (this.tableAr.length == 0) {
        return null;
      } else if (!this.tableAr.match(/[\u0600-\u06FF\u0750-\u077F]/)) {
        return false;
      } else if (this.tableAr.length > 3) {
        return true;
      } else {
        return false;
      }
    },
    tableEnState() {
      if (this.tableEn.length == 0) {
        return null;
      } else if (!this.tableEn.match(/^[a-zA-Z\s]*$/)) {
        return false;
      } else if (this.tableEn.length > 3) {
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
        url: store.state.domain + "/mealTime",
        headers: {
          localization: store.state.localization
        },
        data: {
          name_ar: this.tableAr,
          name_en: this.tableEn,
          start_date: this.startDate,
          end_date: this.endDate,
          details: this.details
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push("/feeding/timeTable");
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    updateTable() {
      axios({
        method: "PUT",
        url: store.state.domain + "/mealTime/" + this.$route.params.id,
        headers: {
          localization: store.state.localization
        },
        data: {
          name_ar: this.tableAr,
          name_en: this.tableEn,
          start_date: this.startDate,
          end_date: this.endDate,
          details: this.details
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push("/feeding/timeTable");
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    addNewDay(day, index) {
      let indexDay = this.SelectedDays.indexOf(day);
      if (this.SelectedDays.includes(day)) {
        this.details.push({
          day: day,
          category: []
        });
        this.SelectedCat.push({
          cat: []
        });
      } else {
        this.details.splice(indexDay, 1);
        this.SelectedCat.splice(index, 1);
      }
    },
    addNewCategory(index, id) {
      let indexCat = this.SelectedCat[index].cat.indexOf(id);
      if (this.SelectedCat[index].cat.includes(id)) {
        this.details[index].category.push({
          category_id: id,
          meal_id: []
        });
      } else {
        this.details[index].category.splice(indexCat, 1);
      }
    },
    addmeal(i, index, id) {
      this.details[index].category[i].meal_id.push(id);
    }
  }
};
</script>
