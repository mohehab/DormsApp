<template>
  <div class="category-type">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h2 class="text-center">قائمة الوجبات</h2>
      <div
        class="category-type boxedFormAllSteps"
        v-for="(meal, index) in meals"
        :key="index"
      >
        <b-button class="coll-ing-btn" v-b-toggle="'collapse-' + index"
          >{{ meal.name_ar }}
          <font-awesome-icon icon="sort-down" />
        </b-button>
        <b-icon-trash v-b-modal="'deleteMainCategory' + meal.id"></b-icon-trash>
          <AlertBox
            :name="'deleteMainCategory' + meal.id" 
            question="هل تريد حذف تصنيف الوجبة ؟"
            api="/mealtype/"
            :ids="meal.id"
            :reload="reloadMealCategoryResults"
          />
        <b-collapse visible :id="'collapse-' + index">
          <b-card>
            <ul class="categories" v-if="mealsSubCategories.length > 0">
              <li
                v-for="(mealsSubCategory, index) in mealsSubCategories"
                :key="index"
              > 
                <b-button
                  class="item-btn coll-ing-btn"
                  v-b-toggle="'collapse-inner-' + index"
                  size="sm"
                  v-if="meal.id == mealsSubCategory.meal_type_id.id"
                  >{{ mealsSubCategory.name_ar}}<font-awesome-icon icon="sort-down" /><font-awesome-icon
                    icon="sort-up"
                  />
                  <b-icon-trash
                    v-b-modal="'deleteSubCategory' + mealsSubCategory.id"
                  ></b-icon-trash>
                    <AlertBox
                      :name="'deleteSubCategory' + mealsSubCategory.id" 
                      question="هل تريد حذف التصنيف الفرعى للوجبة ؟"
                      api="/mealSubcategory/"
                      :ids="mealsSubCategory.id"
                      :reload="reloadMealSubcategoryResults"
                    />
                </b-button>
                <b-collapse :id="'collapse-inner-' + index" class="mt-2">
                  <ul>
                    <slot v-for="(mealPart, index) in mealParts">
                      <li
                        :key="index"
                        v-if="
                          meal.id == mealsSubCategory.meal_type_id.id &&
                            mealsSubCategory.id ==
                              mealPart.meal_subcategory_id.id
                        "
                      >
                        <input type="checkbox" v-model="SelectedMeals" :value="mealPart.id" />
                        <span :id="mealPart.id + 'tooltip'">{{ mealPart.name_ar }}</span>
                        <slot v-for="ingredient in mealIngrediants">
                          <b-tooltip :target="mealPart.id + 'tooltip'" triggers="hover" v-if="mealPart.id == ingredient.id">
                            {{ingredient.quantity}} {{ingredient.measuring_unit.name_ar}} {{ingredient.food_item.name_ar}}
                          </b-tooltip>
                        </slot>
                      </li>
                    </slot>
                  </ul>
                </b-collapse>
              </li>
            </ul>
            <ul class="categories" v-else>
              <p>لا توجد مكونات</p>
            </ul>
          </b-card>
        </b-collapse>
      </div>



<!-- test -->
  <div class="dishesTable">
    <div class="rightSide">
      <div class="main">
        <div v-for="(meal, index) in meals"
          :key="index" v-b-toggle="'collapse-' + index" >{{ meal.name_ar }}
          <font-awesome-icon icon="sort-down" />
          <b-icon-trash v-b-modal="'deleteMainCategory' + meal.id"></b-icon-trash>
          <AlertBox
            :name="'deleteMainCategory' + meal.id" 
            question="هل تريد حذف تصنيف الوجبة ؟"
            api="/mealtype/"
            :ids="meal.id"
            :reload="reloadMealCategoryResults"
          />
        </div>
      </div>
      <b-collapse class="sides" :id="'collapse-' + index">
        <P>لحوم</P>
      </b-collapse>
    </div>
    <div class="leftSide">
      <b-collapse class="parts" id="collapse-300">
          <div class="partsContainer">
            <input type="checkbox">
            <h5>فراخ مشويه</h5>
            <p>300 جرام فراخ - 20 مل زيت - 10 جرام زبده - الخ</p>
          </div>
      </b-collapse>
    </div>
  </div>







      <div class="save-btn">
        <div class="add-new-subject">
          <div class="add-container">
            <AddCategory
              addCategoryApi="/mealtype"
              :reloadMealCategoryResults="reloadMealCategoryResults"
            />
            <SubCategory
              addSubCategoryApi="/mealSubcategory"
              addCategoryApi="/mealtype"
              :reloadMealSubcategoryResults="reloadMealSubcategoryResults"
              :reloadMealCategoryResults="reloadMealCategoryResults"
            />
            <span class="goldBg">
              <router-link :to="{ name: 'AddMeal' }">
                اضافة وجبه جديده
              </router-link>
            </span>
          </div>
        </div>
        <div class="float-left">
          <span class="blueBg"
            ><router-link :to="'/feeding/createRequest'"
              >تقديم طلب</router-link
            ></span
          >
          <span class="redBg" v-b-modal="'deleteMeal'">{{$t('Delete')}}</span>
          <AlertBox
            :name="'deleteMeal'"
            question="هل تريد حذف الوجبة ؟"
            api="/meal/"
            :ids="SelectedMeals"
            :reload="reloadMealsResults"
          />
        </div>
      </div>
    </div>


  


  </div>
</template>
<script>
import AlertBox from "../../Global/Alert";
import store from "@/store/index.js";
import axios from "axios";
import AddCategory from "../Ingredients/AddCategory";
import SubCategory from "../Ingredients/SubCategory";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faSortDown,
  faSortUp
} from "@fortawesome/free-solid-svg-icons";
library.add(faEdit, faSortDown, faSortUp);
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "Meals",
  components: {
    AddCategory,
    SubCategory,
    AlertBox
  },
  data() {
    return {
      meals: [],
      mealsSubCategories: [],
      mealParts: [],
      SelectedMeals: [],
      mealIngrediants: []
    };
  },
  mounted() {
    this.reloadMealCategoryResults();
    this.reloadMealSubcategoryResults();
    this.reloadMealsResults();
    axios
        .get(store.state.domain + "/mealIngredient", config)
        .then(res => (this.mealIngrediants = res.data.data));    
  },
  methods: {
    getIngrediants(id) {
      axios
        .get(store.state.domain + "/mealIngredient/" + id, config)
        .then(res => (this.mealIngrediants = res.data.data));
    },
   reloadMealCategoryResults() {
      axios
        .get(store.state.domain + "/mealtype", config)
        .then(res => (this.meals = res.data.data));
    },
    reloadMealSubcategoryResults() {
      axios
        .get(store.state.domain + "/mealSubcategory", config)
        .then(res => (this.mealsSubCategories = res.data.data));
    },
    reloadMealsResults() {
      axios
        .get(store.state.domain + "/meal", config)
        .then(res => (this.mealParts = res.data.data));
    }
  }
};
</script>

<style lang="scss" scoped>
.dishesTable {
  border: 1px solid #7070708e;
  width: 90%;
  // height: 200px;
  margin: 30px auto;
  display: flex;
  .rightSide {
    width: 39%;
    display: flex;
    .main {
      width: 50%;
      border-left: 1px solid #7070708e;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      > div {
        
        width: 100%;
        text-align: center;
        padding: 24px 22px;
        font-size: 30px;
        color: #495469;
        font-weight: 700;
        background-color: #FFF;
        border: 0;
        border-bottom: 1px solid #7070708e !important;
        outline: none;
      }
      > div:last-child {
        border-bottom: 0;
      }
    }
    .sides{
      width: 50%;
      P{
          border: 1px solid #7070708e;
          border-radius: 9px;
          text-align: center;
          padding: 20px 10px;
          width: 80%;
          background-color: #FFF;
          margin: 20px auto;
          cursor: pointer;
          color: #495469 !important;
          outline: none;
      }
      p:hover{
        background-color: #DDD;
      }
    }
  }
  .leftSide {
    width: 60%;
    border-right: 1px solid #7070708e;
    .partsContainer{
      display: flex;
      align-items: center;
      padding: 20px 40px;
      margin-bottom: 20px;
      h5{
        color: #495469;
        font-size: 18px;
        font-weight: 600;
        margin:0 10px 0 60px;
      }
      p {
        color: #495469;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}


</style>