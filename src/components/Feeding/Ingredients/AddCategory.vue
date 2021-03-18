<template>
  <div>
    <span v-b-modal.modal-1 v-on:click="isHidden = false" class="goldBg"
      >{{$t('add') + ' ' + $t('newCategory')}}</span
    >
    <b-modal
      hide-footer
      id="modal-1"
      title="اضافة فئه"
      v-if="isHidden == false"
    >
      <div class="add-category">
        <div class="add-category-pop-up">
          <div class="mid-header">
            <h2>{{$t('add') + ' ' + $t('subcategory')}}</h2>
            <b-row>
              <b-col md="12" xl="12">
                <label>ادخل الفئه باللغه العربيه</label>
                <b-form-input
                  type="text"
                  v-model="category.categoryNameAr"
                  :state="categoryArState"
                ></b-form-input>
                <b-form-invalid-feedback>
                  ادخل اسم التصنيف باللغة العربية
                </b-form-invalid-feedback>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" xl="12">
                <label>ادخل الفئه باللغه الانجليزيه</label>
                <b-form-input
                  type="text"
                  v-model="category.categoryNameEn"
                  :state="categoryEnState"
                ></b-form-input>
                <b-form-invalid-feedback>
                  ادخل اسم التصنيف باللغة الانجليزية
                </b-form-invalid-feedback>
              </b-col>
            </b-row>
           <b-row v-if="err.length != 0">
          <slot class="form--error">
            <p>البيانات غير مكتملة أو غير صحيحة</p>
            <ol>
              <slot v-for="loopError in err">
                <li v-for="(error, index) in loopError" :key="index">
                  {{ error }}
                </li>
              </slot>
            </ol>
          </slot>
        </b-row>
            <div class="save-btn mt-3">
              <button type="submit" class="blueBg" @click.prevent="OnSubmit" v-if="categoryArState == true && categoryEnState == true">
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
import store from "@/store/index.js";
import axios from "axios";
export default {
  props: [
    "addCategoryApi",
    "reloadMealCategoryResults",
    "reloadIngredientCategoryResults",
    "reloadToolsCategoryResults"
  ],
  name: "addCategory",
  data() {
    return {
      err: [],
      category: {
        categoryNameAr: "",
        categoryNameEn: ""
      },
      isHidden: false
    };
  },
  computed: {
    categoryArState() {
      if (this.category.categoryNameAr.length == 0) {
        return null;
      } else if (
        !this.category.categoryNameAr.match(/[\u0600-\u06FF\u0750-\u077F]/)
      ) {
        return false;
      } else if (this.category.categoryNameAr.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    categoryEnState() {
      if (this.category.categoryNameEn.length == 0) {
        return null;
      } else if (!this.category.categoryNameEn.match(/^[a-zA-Z\s]*$/)) {
        return false;
      } else if (this.category.categoryNameEn.length > 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: { 
    OnSubmit: function() {
      axios({
        method: "POST",
        url: store.state.domain + this.addCategoryApi,
        headers: {
          localization: store.state.localization
        },
        data: {
          name_ar: this.category.categoryNameAr,
          name_en: this.category.categoryNameEn
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            (this.isHidden = true),
              (this.category.categoryNameAr = ""),
              (this.category.categoryNameEn = "");
            if (this.addCategoryApi == "/kitchenCategory") {
              this.reloadToolsCategoryResults();
            } else if (this.addCategoryApi == "/mealtype") {
              this.reloadMealCategoryResults();
            } else {
              this.reloadIngredientCategoryResults();
            }
          } else {
            this.isHidden = false;
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    }
  }
};
</script>
<style lang="scss">
.add-category-pop-up {
  @media (max-width: 1199px) {
    top: 160px;
    bottom: 21px;
  }
  @media (max-width: 992px) {
    right: 302px;
    left: 50px;
  }
  @media (max-width: 768px) {
    right: 50px;
  }
  @media (max-width: 450px) {
    right: 10px;
    left: 10px;
  }
  label {
    margin-top: 20px;
    @media (max-width: 450px) {
      margin-top: 5px;
    }
  }
  .add-new-sub-category {
    border: none;
    display: flex;
    align-items: center;
    background-color: transparent;
    margin-top: 20px;
    color: #03a9f3;
    div {
      margin-right: 10px;
      border: 1px solid #000;
      border-radius: 50%;
      padding: 0px 7px;
      color: #000;
      font-weight: 700;
    }
  }
}
</style>
