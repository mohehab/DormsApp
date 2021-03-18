<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <form>
      <h2 class="text-center">إضافة وجبة</h2>
      <b-row>
        <b-col xl="6" lg="8">
          <div class="headForm">
            <label
              >اسم الوجبة باللغة العربية <span class="required">*</span></label
            >
            <b-form-input
              type="text"
              required
              v-model="meal.name_ar"
              :state="mealArState"
            ></b-form-input>
            <b-form-invalid-feedback>
              أدخل اسم الوجبة باللغة العربية
            </b-form-invalid-feedback>
          </div>
        </b-col>
        <b-col xl="6" lg="8">
          <label
            >اسم الوجبة باللغة الانجليزية <span class="required">*</span></label
          >
          <b-form-input
            type="text"
            required
            v-model="meal.name_en"
            :state="mealEnState"
          ></b-form-input>
          <b-form-invalid-feedback>
            أدخل اسم الوجبة باللغة الانجليزية
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="data-row">
        <b-col xl="6" lg="8" class="data-item">
          <label>تصنيف الوجبة <span class="required">*</span></label>
          <b-form-select
            disabled-field="notEnabled"
            v-model="meal.category"
            @change="mealSubcategory"
          >
            <b-form-select-option :value="null" disabled
              >اختار تصنيف الوجبة</b-form-select-option
            >
            <b-form-select-option
              v-for="(category, index) in mealCategories"
              :key="index"
              :value="category.id"
              >{{ category.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col xl="6" lg="8" class="data-item">
          <label>التصنيف الفرعي للوجبة <span class="required">*</span></label>
          <b-form-select disabled-field="notEnabled" v-model="meal.sub">
            <b-form-select-option :value="null" disabled
              >اختار التصنيف الفرعي</b-form-select-option
            >
            <b-form-select-option
              v-for="(sub, index) in mealSubCategories"
              :key="index"
              :value="sub.id"
              >{{ sub.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="data-row">
        <b-col xl="6" lg="8" class="data-item">
          <label>إضافة مكونات <span class="required">*</span></label>
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
              v-for="(result, index) in results"
              :key="index"
              class="autocomplete-result"
            >
              <b-form-checkbox
                @change="setResult(result, result.id, index)"
                v-model="selected"
                :value="result"
                >{{ result.name_ar }}</b-form-checkbox
              >
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-row>
        <div class="show-data table-style" v-if="selected.length > 0">
          <table class="grey-style">
            <tr>
              <th>المكونات</th>
              <th>الكمية</th>
              <th>الوحدة</th>
              <th>حذف</th>
            </tr>
            <tr v-for="(ingredient, index) in ingredients" :key="index">
              <td>{{ selected[index].name_ar }}</td>
              <td>
                *
                <b-form-input
                  type="number"
                  required
                  v-model="ingredient.quantity"
                ></b-form-input>
              </td>
              <td>
                <b-form-select
                  disabled-field="notEnabled"
                  v-model="ingredient.measuring_unit_id"
                >
                  <b-form-select-option :value="null" disabled
                    >اختار الوحدة</b-form-select-option
                  >
                  <b-form-select-option
                    v-for="(unit, index) in units"
                    :key="index"
                    :value="unit.id"
                    >{{ unit.name_ar }}</b-form-select-option
                  >
                </b-form-select>
              </td>
              <td><span class="redBg" @click="deleteitem(index)">حذف</span></td>
            </tr>
          </table>
        </div>
      </b-row>
      <div class="save-btn">
        <button type="submit" class="blueBg" @click.prevent="OnSubmit" v-if="mealArState == true && mealEnState == true && meal.sub !== null && meal.category !== null & ingredients.length > 0">
          {{$t('save')}}
        </button>
        <span class="redBg">{{$t('cancel')}}</span>
      </div>
    </form>
  </div>
</template>
<script>
import store from "@/store/index.js";
import axios from "axios";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "AddMeal",
  data() {
    return {
      err: [],
      isOpen: false,
      search: "",
      submitStatus: "",
      isLoading: false,
      all_select: false,
      updateItems: [],
      tags: [],
      mealCategories: [],
      mealSubCategories: [],
      ingredientType: [],
      arrowCounter: 0,
      results: [],
      selected: [],
      units: [],
      unit: "",
      allIngredients: [],
      meal: {
        category: null,
        sub: null,
        units: [],
        name_ar: "",
        name_en: "",
        ingredients: [],
        quantity: [],
        ingredient_id: ""
      },
      ingredients: []
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/mealtype", config)
      .then(res => (this.mealCategories = res.data.data));
    axios
      .get(store.state.domain + "/measuringUnit", config)
      .then(res => (this.units = res.data.data));
    axios
      .get(store.state.domain + "/subcategory", config)
      .then(res => (this.ingredientType = res.data.data));
    axios
      .get(store.state.domain + "/ingredient", config)
      .then(res => (this.allIngredients = res.data.data));
  },
  computed: {
    mealArState() {
      if (this.meal.name_ar.length == 0) {
        return null;
      } else if (!this.meal.name_ar.match(/[\u0600-\u06FF\u0750-\u077F]/)) {
        return false;
      } else if (this.meal.name_ar.length > 2) {
        return true;
      } else {
        return false;
      }
    },
    mealEnState() {
      if (this.meal.name_en.length == 0) {
        return null;
      } else if (!this.meal.name_en.match(/^[a-zA-Z\s]*$/)) {
        return false;
      } else if (this.meal.name_en.length > 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    mealSubcategory() {
      if (this.meal.category == null) {
        return this.meal.sub == null;
      } else {
        axios({
          method: "GET",
          url: store.state.domain + "/subcategoryRegardingMealType",
          headers: {
            localization: store.state.localization
          },
          params: {
            meal_type_id: this.meal.category
          }
        }).then(res => (this.mealSubCategories = res.data.data));
      }
    },
    OnSubmit() {
      axios({
        method: "POST",
        url: store.state.domain + "/meal",
        headers: {
          localization: store.state.localization
        },
        data: {
          name_ar: this.meal.name_ar,
          name_en: this.meal.name_en,
          meal_type_id: this.meal.category,
          meal_subcategory_id: this.meal.sub,
          ingredients: this.ingredients
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push("/feeding/Meals");
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
    setResult(result, id, index) {
      this.selected.push(result);
      this.isOpen = false;
      this.pushIngredient(index, id);
    },
    pushIngredient(index, id) {
      this.ingredients.push({
        ingredient_id: id,
        measuring_unit_id: "",
        quantity: ""
      });
    },
    deleteitem(index) {
      let indexBefore = this.ingredients.indexOf(index);
      this.ingredients.splice(indexBefore, 1);
    },
    filterResults() {
      this.results = this.allIngredients.filter(ingredient => {
        return ingredient.name_ar.indexOf(this.search) > -1;
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
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  }
};
</script>
<style lang="scss">
.autocomplete {
  position: relative;
  width: 130px;
}
.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  overflow: auto;
  width: 100%;
  background: #fff;
  .autocomplete-result {
    margin-top: 2px;
    list-style: none;
    padding: 10px 15px;
    cursor: pointer;
  }
}
.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #008eb9;
  color: white;
}
</style>
