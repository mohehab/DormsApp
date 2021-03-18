<template>
  <div class="category-type">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h2 class="text-center">أدوات المطبخ</h2>
      <div
        class="category-type boxedFormAllSteps"
        v-for="(tool, index) in tools"
        :key="index"
      >
        <b-button class="coll-ing-btn" v-b-toggle="'collapse-' + index"
          >{{ tool.name_ar
          }}<font-awesome-icon icon="sort-down" /><font-awesome-icon
            icon="sort-up"
          /><b-icon-trash v-b-modal="'deleteMainCategory' + tool.id"></b-icon-trash>
          <AlertBox
            :name="'deleteMainCategory' + tool.id"
            question="هل تريد حذف تصنيف الأداة ؟"
            api="/kitchenCategory/"
            :ids="tool.id"
            :reload="reloadToolsCategoryResults"
          />
        </b-button>
        <b-collapse visible :id="'collapse-' + index">
          <b-card>
            <ul class="categories" v-if="kitchenItems.length >= 1">
              <slot v-for="(kitchenItem, index) in kitchenItems">
                <slot>
                  <li
                    :key="index"
                    v-if="tool.id == kitchenItem.kitchen_category_id.id"
                  >
                    {{ kitchenItem.name_ar }}
                    <b-icon-trash
                      v-b-modal="'deleteItems' + kitchenItem.id"
                    ></b-icon-trash>
                    <AlertBox
                      :name="'deleteItems' + kitchenItem.id"
                      question="هل تريد حذف الأداة ؟"
                      api="/kitchenItem/"
                      :ids="kitchenItem.id"
                      :reload="reloadToolsResults"
                    />
                  </li>
                </slot>
              </slot>
            </ul>
            <ul class="categories" v-else>
              <p>لا توجد أدوات</p>
            </ul>
          </b-card>
        </b-collapse>
      </div>
      <div class="add-new-subject">
        <div class="add-container">
          <AddCategory
            addCategoryApi="/kitchenCategory"
            :reloadToolsCategoryResults="reloadToolsCategoryResults"
          />
          <SubCategory
            addSubCategoryApi="/kitchenItem"
            addCategoryApi="/kitchenCategory"
            :reloadToolsResults="reloadToolsResults"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import axios from "axios";
import AlertBox from "../../Global/Alert";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBed, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import AddCategory from "../Ingredients/AddCategory";
import SubCategory from "../Ingredients/SubCategory";
library.add(faBed, faSortDown, faSortUp);
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "Tools",
  components: {
    AddCategory,
    SubCategory,
    AlertBox
  },
  data() {
    return {
      tools: [],
      kitchenItems: []
    };
  },
  mounted() {
    this.reloadToolsCategoryResults();
    this.reloadToolsResults();
  },
  methods: {
    reloadToolsCategoryResults() {
      axios
        .get(store.state.domain + "/kitchenCategory", config)
        .then(res => (this.tools = res.data.data));
    },
    reloadToolsResults() {
      axios
        .get(store.state.domain + "/kitchenItem", config)
        .then(res => (this.kitchenItems = res.data.data));
    }
  }
};
</script>
