<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h3 class="text-center">قائمة الخدمات</h3>
    <div class="boxContianer">
      <!-- <h3 v-if="emptyData">لا يوجد خدمات مضافة</h3> -->
      <b-row 
        v-for="(category, i) in servicesCategory"
        :key="i"
        class="serviceCategory"
      >
        <b-col xl="12">
          <h3>
            {{ category.name }}<b-icon-trash v-b-modal="'deleteCategory' + category.id"></b-icon-trash>
            <router-link
                  :to="{ name: 'editServiceCategory', params: { id: category.id } }"
                    ><b-icon-pencil-fill></b-icon-pencil-fill></router-link
                >
            <AlertBox
              :name="'deleteCategory' + category.id"
              question="هل تريد حذف التصنيف ؟"
              api="/paymentFee/"
              :ids="category.id"
              :reload="reloadResults"
            />
          </h3>
        </b-col>
        <slot
          class="subCategoryServ"
          v-for="(service, index) in category.details"
        >
          <b-col xl="4" class="subCategoryServ" :key="index">
            <label>{{ service.name }}</label
            ><b-icon-trash v-b-modal="'deleteService'"></b-icon-trash>
            <AlertBox
              :name="'deleteService'"
              question="هل تريد حذف الخدمة ؟"
              api="/paymentFeeDetails/"
              :ids="service.id"
              :reload="reloadResults"
            />
          </b-col>
        </slot>
      </b-row>
    </div>
  </div>
</template>
<script>
import AlertBox from "../Global/Alert";
import store from "@/store/index.js";
import axios from "axios";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "services",
  components: {
    AlertBox
  },
  data() {
    return {
      servicesCategory: []
    };
  },
  mounted() {
    this.reloadResults();
  },
  methods: {
    reloadResults() {
      axios
        .get(store.state.domain + "/paymentFee", config)
        .then(res => (this.servicesCategory = res.data.data));
    },
    emptyData() {
      return this.servicesCategory.length < 1;
    },
  }
};
</script>
<style lang="scss" scoped>
.serviceCategory {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 30px;
  margin-bottom: 30px;
  h3 {
    font-size: 25px;
    font-weight: bold;
    padding-bottom: 15px;
    input {
      margin-left: 15px;
    }
  }
  .subCategoryServ {
    padding-right: 35px;
    input {
      margin-left: 15px;
    }
  }
}
</style>
