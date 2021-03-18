<template>
  <div class="category-type">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h3 class="text-center">قائمة العقوبات</h3>
      <div
        class="category-type boxedFormAllSteps"
        v-for="(penaltyCat, index) in penaltiesCat"
        :key="penaltyCat.name_ar"
      >
        <b-button class="coll-ing-btn" v-b-toggle="'collapse-' + index">{{
          penaltyCat.name_ar
        }}</b-button>
        <b-collapse visible :id="'collapse-' + index">
          <div>
            <slot class v-for="penalty in penalties">
              <slot v-for="value in penalty.option_values">
                <slot
                  v-if="
                    penalty.option_values.length > 0 &&
                      penaltyCat.id == penalty.penalty_category.id
                  "
                >
                  <input
                    type="checkbox"
                    v-model="penaltiesIDs"
                    :key="Math.random()"
                    v-if="value.student_fill == 1"
                    :value="penalty.id"
                  />
                  <span :key="Math.random()">{{
                    value.student_fill == 1
                      ? value.data_typeOption_value + " "
                      : value.attribute_name_ar
                  }}</span>
                </slot>
              </slot>
            </slot>
          </div>
        </b-collapse>
      </div>
      <div class="save-btn">
        <div class="float-left">
          <span class="blueBg" v-b-modal="'createPenalty'"
            >اضافة عقوبة جديدة</span
          >
          <createPenalty />
          <span class="redBg" v-b-modal="'deletePenalties'">{{ $t("Delete") }}</span>
          <AlertBox
            :name="'deletePenalties'"
            question="هل تريد حذف العقوبات ؟"
            api="/penalties/destroyById/"
            :ids="penaltiesIDs"
            :reload="getResults"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import createPenalty from "./createPenalty";
import AlertBox from "../Global/Alert";
import axios from "axios";
const config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "PenaltiesList",
  components: {
    createPenalty,
    AlertBox
  },
  mounted() {
    axios
      .get(store.state.domain + "/penalties/listCategories", config)
      .then(res => (this.penaltiesCat = res.data.data));
    this.getResults();
  },
  data() {
    return {
      penaltiesCat: [],
      penalties: [],
      penaltiesIDs: [],
    };
  },
  methods: {
    getResults() {
      axios
        .get(store.state.domain + "/penalties/index", config)
        .then(res => (this.penalties = res.data.data));
    },
    deleteData() {
      const $this = this;
      this.penaltiesIDs.forEach(function(id) {
        axios
          .delete(store.state.domain + "/penalties/destroyById/" + id, { id: id }, config)
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              $this.getResults();
            }
          });
      });
    },
  }
};
</script>
<style lang="scss" scoped>
input[type="checkbox"] {
  margin-left: 5px;
  margin-right: 21px;
  vertical-align: middle;
}
</style>
