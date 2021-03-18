<template>
<div>
  <span v-b-modal.modal-2 v-on:click="isHidden = false" class="goldBg">إضافة فئة فرعية</span>
  <b-modal hide-footer id="modal-2" title="اضافة فئه فرعيه" v-if="isHidden == false" @change="loadCategories">
  <div class="add-category">
    <div class="add-category-pop-up">
      <div class="mid-header">
        <h2>اضافة تصنيف فرعي</h2>
        <b-row>
          <b-col xl="12" md="12">
            <b-form-select v-model="subCategory.subCategoryId">
              <b-form-select-option :value="null" disabled
                >اختار التصنيف
              </b-form-select-option>
              <b-form-select-option
                v-for="(sub, index) in category"
                :key="index"
                :value="sub.id"
                >{{ sub.name_ar }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" xl="12">
            <label> {{this.addSubCategoryApi == "/kitchenItem" ? 'ادخل الادوات باللغه العربيه' : 'ادخل التصنيف الفرعي باللغه العربيه'}} </label>
            <b-form-input
              type="text"
              v-model="subCategory.subAr"
              :state="subArState"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" xl="12">
            <label> {{this.addSubCategoryApi == "/kitchenItem" ? 'ادخل الادوات  باللغه الانجليزيه' : 'ادخل التصنيف الفرعي باللغه الانجليزيه'}}</label>
            <b-form-input
              type="text"
              v-model="subCategory.subEn"
              :state="subEnState"
            ></b-form-input>
          </b-col>
        </b-row>
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
        <div class="save-btn mt-3">
          <button type="submit" class="blueBg" @click.prevent="OnSubmit" v-if="subCategory.subCategoryId !== null && subArState == true &&  subEnState == true">
            {{$t('save')}}
          </button>
        </div>
      </div>
    </div>
  </div>
  </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "addSubCategory",
  props: ['addSubCategoryApi', 'addCategoryApi', "reloadMealSubcategoryResults",
    "reloadIngredientsSubcategoryResults",
    "reloadMealCategoryResults",
    "reloadIngredientCategoryResults",
    "reloadToolsResults"
  ],
  data() {
    return {
      err: [],
      category: [],
      subCategory: {
        subCategoryId: null,
        subAr: "",
        subEn: ""
      },
      isHidden: false
    };
  },
  computed: {
    subArState() {
      if (this.subCategory.subAr.length == 0) {
        return null;
      } else if (
        !this.subCategory.subAr.match(/[\u0600-\u06FF\u0750-\u077F]/)
      ) {
        return false;
      } else if (this.subCategory.subAr.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    subEnState() {
      if (this.subCategory.subEn.length == 0) {
        return null;
      } else if (!this.subCategory.subEn.match(/^[a-zA-Z\s]*$/)) {
        return false;
      } else if (this.subCategory.subEn.length > 1) {
        return true;
      } else {
        return false; 
      }
    }
  },
  methods: {
    loadCategories() {
      axios
      .get(store.state.domain + this.addCategoryApi, config)
      .then(res => (this.category = res.data.data));
    },
    OnSubmit() {
      if(this.addSubCategoryApi == "/subcategory"){
        axios({
          method: "POST",
          url: store.state.domain + this.addSubCategoryApi,
          headers: {
            localization: store.state.localization
          },
          data: {
            name_ar: this.subCategory.subAr,
            name_en: this.subCategory.subEn,
            ingredient_type_id: this.subCategory.subCategoryId
          }
        }) 
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.isHidden= true,
            this.subCategory.subAr = '',
            this.subCategory.subEn = '',
            this.reloadIngredientsSubcategoryResults();
          } else{
            this.isHidden= false
          }
        } 
      ).catch(error => {
          this.err = error.response.data.errors;
      });
      } else if (this.addSubCategoryApi == "/kitchenItem") {
        axios({
          method: "POST",
          url: store.state.domain + this.addSubCategoryApi,
          headers: {
            localization: store.state.localization
          },
          data: {
            name_ar: this.subCategory.subAr,
            name_en: this.subCategory.subEn,
            kitchen_category_id: this.subCategory.subCategoryId
          }
        })
         .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.isHidden= true,
            this.subCategory.subAr = '',
            this.subCategory.subEn = '',
            this.reloadToolsResults();
          } else{
            this.isHidden= false
          }
        } 
      ).catch(error => {
          this.err = error.response.data.errors;
      });
      } else {
        axios({
          method: "POST",
          url: store.state.domain + this.addSubCategoryApi,
          headers: {
            localization: store.state.localization
          },
          data: {
            name_ar: this.subCategory.subAr,
            name_en: this.subCategory.subEn,
            meal_type_id: this.subCategory.subCategoryId
          }
        })
         .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.isHidden= true,
            this.subCategory.subAr = '',
            this.subCategory.subEn = '',
            this.reloadMealSubcategoryResults();
          } else{
            this.isHidden= false
          }
        }
      ).catch(error => {
          this.err = error.response.data.errors;
      });
      }
    }
  },
  watch: {
    category: function (newVal) {
      this.category = newVal
    }
  }
};
</script>
