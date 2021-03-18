<template>
  <div>
    <span v-b-modal.modal-3 v-on:click="isHidden = false" class="goldBg"
      >إضافة مكون</span
    >
    <b-modal
      hide-footer
      id="modal-3"
      title="اضافة مكونات"
      v-if="isHidden == false"
      @change="loadSubcategories"
    >
      <div class="add-category">
        <div class="add-category-pop-up">
          <div class="mid-header">
            <h2>اضافه المكونات</h2>
            <b-row>
              <b-col xl="12" md="12">
                <b-form-select
                  disabled-field="notEnabled"
                  v-model="ingredient.ingredientId"
                >
                  <b-form-select-option :value="null" disabled
                    >اختار التصنيف الفرعي</b-form-select-option
                  >
                  <b-form-select-option
                    v-for="(ingredient, index) in ingredientData"
                    :key="index"
                    :value="ingredient.id"
                  >
                    {{ ingredient.name_ar }}
                  </b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" xl="12">
                <label>ادخل المكونات باللغه العربيه</label>
                <b-form-input
                  type="text"
                  v-model="ingredient.ingredientNameAr"
                  :state="ingredientArState"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12" xl="12">
                <label>ادخل المكونات باللغه الانجليزيه</label>
                <b-form-input
                  type="text"
                  v-model="ingredient.ingredientNameEn"
                  :state="ingredientEnState"
                ></b-form-input>
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
              <button
                type="submit"
                class="blueBg"
                @click.prevent="OnSubmit"
                v-if="
                  ingredientEnState == true &&
                    ingredientArState == true &&
                    ingredient.ingredientId !== null
                "
              >
                {{ $t("save") }}
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
  props: ["ingredientApi", "addSubCategoryApi", "reloadIngredientsResults"],
  name: "addIngredient",
  data() {
    return {
      err: [],
      ingredientData: [],
      ingredient: {
        ingredientId: null,
        ingredientNameAr: "",
        ingredientNameEn: ""
      },
      isHidden: false
    };
  },
  mounted() {
    axios
      .get(store.state.domain + this.addSubCategoryApi, config)
      .then(res => (this.ingredientData = res.data.data));
  },
  computed: {
    ingredientArState() {
      if (this.ingredient.ingredientNameAr.length == 0) {
        return null;
      } else if (
        !this.ingredient.ingredientNameAr.match(/[\u0600-\u06FF\u0750-\u077F]/)
      ) {
        return false;
      } else if (this.ingredient.ingredientNameAr.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    ingredientEnState() {
      if (this.ingredient.ingredientNameEn.length == 0) {
        return null;
      } else if (!this.ingredient.ingredientNameEn.match(/^[a-zA-Z\s]*$/)) {
        return false;
      } else if (this.ingredient.ingredientNameEn.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    loadSubcategories() {
      axios
        .get(store.state.domain + this.addSubCategoryApi, config)
        .then(res => (this.ingredientData = res.data.data));
    },
    OnSubmit: function() {
      axios({
        method: "POST",
        url: store.state.domain + this.ingredientApi,
        headers: {
          localization: store.state.localization
        },
        data: {
          subcategory_id: this.ingredient.ingredientId,
          name_ar: this.ingredient.ingredientNameAr,
          name_en: this.ingredient.ingredientNameEn
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            (this.isHidden = true),
              (this.ingredient.ingredientNameAr = ""),
              (this.ingredient.ingredientNameEn = ""),
              this.reloadIngredientsResults();
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
.add-btn {
  background-color: #fff;
  border-radius: 3px;
  padding: 9px 28px;
  color: rgba(0, 0, 0, 0.445);
  font-weight: 600;
  margin: 0 20px;
}
</style>
