<template>
  <div class="feeding-request">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h3 class="text-center">
        طلب مكونات جديدة للمطبخ
      </h3>
      <form>
        <b-row>
          <b-col md="6" sm="12" class="data-item">
            <label
              >الموضوع (باللغة العربية) <span class="required">*</span></label
            >
            <b-form-input
              type="text"
              v-model="request.subjectAr"
              :state="subjectArState"
            ></b-form-input>
            <b-form-invalid-feedback>
              هذا الحقل يقبل اللغة العربية
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6" sm="12" class="data-item">
            <label
              >الموضوع (باللغة الانجليزية)
              <span class="required">*</span></label
            >
            <b-form-input
              type="text"
              v-model="request.subjectEn"
              :state="subjectEnState"
            ></b-form-input>
            <b-form-invalid-feedback>
              هذا الحقل يقبل اللغة الانجليزية
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="6" md="12" class="data-item">
            <label class="mt-4"
              >ذات صله بموضوع <span class="required">*</span></label
            >
            <b-form-select
              disabled-field="notEnabled"
              :options="related"
              :class="request.related != null ? 'is-valid' : ''"
              value-field="value"
              text-field="text"
              v-model="request.related"
            >
              <b-form-select-option :value="null" disabled
                >حدد اختيار</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <b-col xl="6" md="12" class="data-item">
            <label class="mt-4">الاهميه <span class="required">*</span></label>
            <b-form-select
              disabled-field="notEnabled"
              :options="priority"
              value-field="value"
              text-field="text"
              :class="request.priority != null ? 'is-valid' : ''"
              v-model="request.priority"
            >
              <b-form-select-option :value="null" disabled
                >حدد اختيار</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <b-col xl="6" md="12" class="data-item">
            <label class="mt-4">التكرار <span class="required">*</span></label>
            <b-form-select
              disabled-field="notEnabled"
              :class="request.repeat != null ? 'is-valid' : ''"
              :options="repeated"
              value-field="value"
              text-field="text"
              v-model="request.repeat"
            >
              <b-form-select-option :value="null" disabled
                >حدد اختيار</b-form-select-option
              >
            </b-form-select>
          </b-col>
        </b-row>
        <label>اختار المكونات <span class="required">*</span></label>
        <b-col xl="6" lg="8" class="data-item">
          <div
            class="category-type"
            v-for="(category, index) in categories"
            :key="index"
          >
            <b-button class="coll-ing-btn" v-b-toggle="'collapse-' + index"
              >{{ category.name_ar }}<font-awesome-icon icon="sort-down"
            /></b-button>
            <b-collapse :id="'collapse-' + index">
              <b-card>
                <ul class="categories">
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
                      }}<font-awesome-icon icon="sort-down" />
                    </b-button>
                    <b-collapse :id="'collapse-inner-' + index" class="mt-2">
                      <ul>
                        <slot v-for="(ingredient, index) in allIngredients">
                          <li
                            :key="ingredient.id"
                            v-if="
                              category.id ==
                                subCategory.ingredient_type_id.id &&
                                subCategory.id == ingredient.subcategory_id.id
                            "
                          >
                            <b-form-checkbox
                              type="checkbox"
                              :value="request.ingredient_ids[index]"
                              @input="onChange(ingredient, ingredient.id)"
                            />
                            {{ ingredient.name_ar }}
                          </li>
                        </slot>
                      </ul>
                    </b-collapse>
                  </li>
                </ul>
              </b-card>
            </b-collapse>
          </div>
          <div
            class="category-type"
            v-for="(itemcat, index) in itemsCat"
            :key="itemcat.name_ar"
          >
            <b-button class="coll-ing-btn" v-b-toggle="'collapse-' + index"
              >{{ itemcat.name_ar }}<font-awesome-icon icon="sort-down"
            /></b-button>
            <b-collapse :id="'collapse-' + index">
              <b-card>
                <ul class="categories">
                  <li class v-for="(item, index) in items" :key="item.name_ar">
                    <b-button
                      class="item-btn coll-ing-btn"
                      v-b-toggle="'collapse-inner-' + index"
                      size="sm"
                      v-if="itemcat.id == item.kitchen_category_id.id"
                    >
                      {{ item.name_ar }}<font-awesome-icon icon="sort-down" />
                    </b-button>
                  </li>
                </ul>
              </b-card>
            </b-collapse>
          </div>
        </b-col>
        <div
          class="show-data table-style"
          v-if="request.ingredient_ids.length > 0"
        >
          <table class="grey-style">
            <tr>
              <th>المكونات</th>
              <th>الكمية</th>
              <th>الوحدة</th>
              <th class="text-center">حذف</th>
            </tr>
            <tr v-for="(ingredient, index) in ingredients" :key="index">
              <td>{{ request.ingredient_ids[index].name_ar }}</td>
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
                  v-model="ingredient.unit"
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
              <td class="text-center">
                <span class="redBg actions" @click.prevent="deleteitem(index)"
                  ><b-icon-trash></b-icon-trash
                ></span>
              </td>
            </tr>
          </table>
        </div>
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
        <div class="table-btns-container save-btn">
          <button
            type="submit"
            class="blueBg"
            @click.prevent="OnSubmit"
            v-if="
              subjectArState == true &&
                subjectEnState == true &&
                request.related !== null &&
                request.priority !== null &&
                request.repeat !== null &&
                ingredients.length !== 0
            "
          >
            حفظ
          </button>
          <span class="redBg">إلغاء</span>
        </div>
      </form>
    </div>
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
  name: "FeedingRequests",
  data() {
    return {
      selected: [],
      items: [],
      itemsCat: [],
      categories: [],
      subCategories: [],
      allIngredients: [],
      units: [],
      err: [],
      ingredients: [],
      ingredientID: null,
      text: "",
      related: [
        { value: "maintenance", text: "صيانة" },
        { value: "inventory", text: "مخزون" }
      ],
      priority: [
        { value: "low", text: "منخفض" },
        { value: "medium", text: "متوسط" },
        { value: "high", text: "عالي" },
        { value: "urgent", text: "طارئ" }
      ],
      repeated: [
        { value: 1, text: "يوم" },
        { value: 7, text: "أسبوع" },
        { value: this.monthsDaysNumbers(), text: "شهر" },
        { value: 365, text: "سنة" }
      ],
      request: {
        subjectAr: "",
        subjectEn: "",
        related: null,
        repeat: null,
        priority: null,
        quantity: [],
        units: [],
        ingredient_ids: [],
        ingredientIDs: []
      }
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/ingredientType", config)
      .then(res => (this.categories = res.data.data));
    axios
      .get(store.state.domain + "/subcategory", config)
      .then(res => (this.subCategories = res.data.data));
    axios
      .get(store.state.domain + "/measuringUnit", config)
      .then(res => (this.units = res.data.data));
    axios
      .get(store.state.domain + "/ingredient", config)
      .then(res => (this.allIngredients = res.data.data));
    axios
      .get(store.state.domain + "/kitchenCategory", config)
      .then(res => (this.itemsCat = res.data.data));
    axios
      .get(store.state.domain + "/kitchenItem", config)
      .then(res => (this.items = res.data.data));
    if (this.$route.params.id) {
      axios
        .get(
          store.state.domain + "/kitchenRequest/" + this.$route.params.id,
          config
        )
        .then(res => {
          (this.request.subjectAr = res.data.data.subject_ar),
            (this.request.subjectEn = res.data.data.subject_en),
            (this.request.related = res.data.data.related_to),
            (this.request.repeat = res.data.data.repeated),
            (this.request.priority = res.data.data.priority);
          const idsIngred = Object.keys(res.data.data.details).length;
          for (let i = 0; i < idsIngred; i++) {
            this.request.ingredient_ids.push(res.data.data.details[i].ingredient_id)
            this.request.units.push(res.data.data.details[i].unit);
            this.request.quantity.push(res.data.data.details[i].quantity);
            this.ingredients.push({
              ingredient_id: res.data.data.details[i].ingredient_id.id,
              quantity: res.data.data.details[i].ingredient_id.quantity,
              unit: res.data.data.details[i].ingredient_id.unit
            });
          }
        });
    }
  },
  methods: {
    monthsDaysNumbers() {
      axios.get(store.state.domain + "/monthDays", config).then(res => {
        this.repeated[2].value = res.data.data;
        this.request.repeat == res.data.data;
      });
    },
    onChange(result, id) {
      let indexAfter = this.request.ingredient_ids.indexOf(id);
      if (this.ingredients.length < 1) {
        this.request.ingredient_ids.push(result);
        this.pushIngredient(id);
      } else {
        this.request.ingredient_ids.splice(indexAfter, 1);
        this.ingredients.splice(indexAfter, 1);
      }
    },
    pushIngredient(id) {
      this.ingredients.push({
        ingredient_id: id,
        unit: "",
        quantity: ""
      });
    },
    deleteitem(index) {
      let indexBefore = this.ingredients.indexOf(index);
      this.request.ingredient_ids.splice(indexBefore, 1);
      this.ingredients.splice(indexBefore, 1);
    },
    OnSubmit() {
      axios({
        method: "POST",
        url: store.state.domain + "/kitchenRequest",
        headers: {
          localization: store.state.localization
        },
        data: {
          subject_ar: this.request.subjectAr,
          subject_en: this.request.subjectEn,
          related_to: this.request.related,
          repeated: this.request.repeat,
          priority: this.request.priority,
          ingredients: this.ingredients
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push("/feeding/requests");
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    UpdateRequest() {
      axios({
        method: "PUT",
        url: store.state.domain + "/kitchenRequest/" + this.$route.params.id,
        headers: {
          localization: store.state.localization
        },
        data: {
          subject_ar: this.request.subjectAr,
          subject_en: this.request.subjectEn,
          related_to: this.request.related,
          repeated: this.request.repeat,
          priority: this.request.priority,
          ingredient_id: this.request.ingredientIDs,
          quantity: this.request.quantity,
          unit: this.request.units
        }
      });
    }
  },
  computed: {
    subjectArState() {
      if (this.request.subjectAr.length == 0) {
        return null;
      } else if (
        !this.request.subjectAr.match(/[\u0600-\u06FF\u0750-\u077F]/)
      ) {
        return false;
      } else if (this.request.subjectAr.length > 2) {
        return true;
      } else {
        return false;
      }
    },
    subjectEnState() {
      if (this.request.subjectEn.length == 0) {
        return null;
      } else if (!this.request.subjectEn.match(/^[a-zA-Z\s]*$/)) {
        return false;
      } else if (this.request.subjectEn.length > 2) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
