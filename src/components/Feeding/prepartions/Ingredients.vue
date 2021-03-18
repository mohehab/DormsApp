<template>
  <div class="category-type">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h2 class="text-center">مخزون المطبخ</h2>
      <div
        class="category-type boxedFormAllSteps"
        v-for="(category, index) in categories"
        :key="index"
      >
        <b-button class="coll-ing-btn" v-b-toggle="'collapse-' + index">{{
          category.name_ar
        }}</b-button>
        <b-icon-trash
          v-b-modal="'deleteMainCategory' + category.id"
        ></b-icon-trash>
        <AlertBox
          :name="'deleteMainCategory' + category.id"
          question="هل تريد حذف التصنيف ؟"
          api="/ingredientType/"
          :ids="category.id"
          :reload="reloadIngredientCategoryResults"
        />
        <b-collapse visible :id="'collapse-' + index">
          <b-card>
            <ul class="categories" v-if="subCategories.length >= 1">
              <li
                class
                v-for="(subCategory, index) in subCategories"
                :key="index"
              >
                <b-button
                  class="item-btn coll-ing-btn"
                  v-b-toggle="'collapse-inner-' + index"
                  size="sm"
                  v-if="category.id == subCategory.ingredient_type_id.id"
                  >{{ subCategory.name_ar
                  }}<font-awesome-icon icon="sort-down" /><font-awesome-icon
                    icon="sort-up"
                  />
                  <span
                    ><b-icon-trash
                      v-b-modal="'deleteSubCategory' + subCategory.id"
                    ></b-icon-trash
                  ></span>
                </b-button>
                <AlertBox
                  :name="'deleteSubCategory' + subCategory.id"
                  question="هل تريد حذف التصنيف الفرعى ؟"
                  api="/subcategory/"
                  :ids="subCategory.id"
                  :reload="reloadIngredientsSubcategoryResults"
                />
                <b-collapse :id="'collapse-inner-' + index" class="mt-2">
                  <ul>
                    <slot v-for="(ingredient, index) in allIngredients">
                      <li
                        :key="index"
                        v-if="
                          category.id == subCategory.ingredient_type_id.id &&
                            subCategory.id == ingredient.subcategory_id.id
                        "
                      >
                        <input
                          type="checkbox"
                          :value="ingredient.id"
                          v-model="ingredinetsIDS"
                        />
                        {{ ingredient.name_ar }}
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
      <div class="save-btn">
        <div class="add-new-subject">
          <div class="add-container">
            <AddCategory
              addCategoryApi="/ingredientType"
              :reloadIngredientCategoryResults="reloadIngredientCategoryResults"
            />
            <SubCategory
              addSubCategoryApi="/subcategory"
              addCategoryApi="/ingredientType"
              :reloadIngredientsSubcategoryResults="reloadIngredientsSubcategoryResults"
              :reloadIngredientCategoryResults="reloadIngredientCategoryResults"
            />
            <AddIngredient
              ingredientApi="/ingredient"
              addSubCategoryApi="/subcategory"
              :reloadIngredientsResults="reloadIngredientsResults"
            />
          </div>
        </div>
        <div class="float-left">
          <span class="blueBg"
            ><router-link :to="'/feeding/createRequest'"
              >تقديم طلب</router-link
            ></span
          >
          <span class="redBg" v-b-modal="'deleteIngredient'">{{$t('Delete')}}</span>
          <AlertBox
            :name="'deleteIngredient'"
            question="هل تريد حذف المكونات ؟"
            api="/ingredient/"
            :ids="ingredinetsIDS"
            :reload="reloadIngredientsResults"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AlertBox from "../../Global/Alert";
import AddCategory from "../Ingredients/AddCategory";
import AddIngredient from "../Ingredients/AddIngredient";
import SubCategory from "../Ingredients/SubCategory";
import store from "@/store/index.js";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBed, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
library.add(faBed, faSortDown, faSortUp);
const config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "Ingredients",
  components: {
    AddCategory,
    AddIngredient,
    SubCategory,
    AlertBox
  },
  data() {
    return {
      categories: [],
      subCategories: [],
      allIngredients: [],
      Ingredients: [],
      ingredinetsIDS: []
    };
  },
  mounted() {
    this.reloadIngredientCategoryResults();
    this.reloadIngredientsSubcategoryResults();
    this.reloadIngredientsResults();
  },
  methods: {
    reloadIngredientCategoryResults() {
      axios
        .get(store.state.domain + "/ingredientType", config)
        .then(res => (this.categories = res.data.data));
    },
    reloadIngredientsSubcategoryResults() {
      axios
        .get(store.state.domain + "/subcategory", config)
        .then(res => (this.subCategories = res.data.data));
    },
    reloadIngredientsResults() {
      axios
        .get(store.state.domain + "/ingredient", config)
        .then(res => (this.allIngredients = res.data.data));
    }
  }
};
</script>
<style lang="scss">
.modal-header .close {
  padding: 0;
  margin: 1px auto 1px 1px;
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  border-color: unset !important;
  box-shadow: unset;
}
.collapsed {
  .fa-sort-up {
    display: none;
  }
  .fa-sort-down {
    margin-right: 5px;
  }
}
.not-collapsed {
  border-color: #00bbf3 !important;
  color: #fff;
  background-color: #00bbf3;
  .fa-sort-up {
    vertical-align: text-bottom;
    margin-right: 5px;
  }
  .fa-sort-down {
    display: none;
  }
}
.category-type .card {
  border: 0;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 900px !important;
  }
}
.category-type {
  .side-admin-container {
    .add-new-subject {
      .add-container {
        div {
          display: inline-block;
        }
        span {
          display: inline-block;
          padding: 6px;
          border-radius: 15px;
          margin: 7px 10px;
          transition: all 0.2s ease-in-out;
          font-size: 13px;
          width: 140px;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
          &:hover {
            background: #03a9f3;
            color: #fff;
          }
        }
      }
    }
    .category-type {
      .coll-ing-btn {
        overflow-anchor: none;
        background: unset;
        color: #000;
        font-weight: bold;
        border: none;
        box-shadow: unset;
      }
      .item-btn {
        padding: 0;
      }
      .categories {
        display: flex;
        margin: 0;
        > li {
          .bi-trash {
            margin-right: 5px;
          }
          .coll-ing-btn {
            padding: 6px 27px;
            border: 1px solid #000;
          }
          ul {
            li {
              font-size: 14px;
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              input {
                margin-left: 5px;
              }
            }
          }
        }
        button {
          margin-left: 70px;
        }
      }
    }
  }
  .save-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
