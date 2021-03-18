<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h2 class="text-center">جدول الوجبات</h2>
    <p v-if="timeTables.length == 0">لا يوجد جداول</p>
    <b-row v-for="(timeTable, index) in timeTables" :key="index">
      <b-col>
        <b-button class="coll-ing-btn" v-b-toggle="'collapse-' + index">
          <font-awesome-icon icon="sort-down" />
          <span>{{ timeTable.name_ar }}</span>
        </b-button>
        <b-collapse visible :id="'collapse-' + index">
          <div class="boxContianer">
            <div class="table-style">
              <div class="divTable">
                <div class="table-header">
                  <div class="table-th">اليوم</div>
                  <div
                    class="table-th"
                    v-for="(timeTableInfo, index) in timeTable.information"
                    :key="index"
                  >
                    {{ timeTableInfo.day }}
                  </div>
                </div>
                <div
                  class="table-header"
                  v-for="(mealtype, index) in mealtypes"
                  :key="index"
                >
                  <div class="table-th">{{ mealtype.name_ar }}</div>
                  <div
                    class="table-th"
                    v-for="(timeTableInfo, index) in timeTable.information"
                    :key="index"
                  >
                    <slot v-for="time in timeTableInfo.mealSchedule">
                      <slot v-for="meal in meals">
                        <span
                          v-if="
                            mealtype.id ==
                              time.meal_id.meal_subcategory_id.meal_type_id
                                .id && meal.id == time.meal_id.id
                          "
                          :key="meal.id + time.id"
                          >{{ time.meal_id.name_ar }}</span
                        >
                      </slot>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
            <div class="btns-header mt-4">
              <div class="save-btn">
                <router-link
                  :to="{
                    name: 'editTimeTable',
                    params: { id: timeTable.id }
                  }"
                >
                  <span class="blueBg">
                    {{ $t("Edit") }}
                  </span></router-link
                >
                <span class="redBg" v-b-modal="'deleteData' + timeTable.id">{{
                  $t("Delete")
                }}</span>
                <AlertBox
                  :name="'deleteData' + timeTable.id"
                  question="هل تريد حذف فترة القبول؟"
                  api="/mealTime/"
                  :ids="timeTable.id"
                  :reload="getResults"
                />
              </div>
            </div>
          </div>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="save-btn">
        <span class="blueBg"
          ><router-link :to="'/feeding/createTimeTable'"
            >اضافه جدول جديد
          </router-link></span
        >
      </b-col>
    </b-row>
  </div>
</template>
<script>
import store from "@/store/index.js";
import AlertBox from "../../Global/Alert";
import axios from "axios";
const config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "TimeTable",
  components: {
    AlertBox
  },
  data() {
    return {
      timeTables: [],
      meals: [],
      mealtypes: []
    };
  },
  mounted() {
    this.getResults();
    axios
      .get(store.state.domain + "/meal", config)
      .then(res => (this.meals = res.data.data));
    axios
      .get(store.state.domain + "/mealtype", config)
      .then(res => (this.mealtypes = res.data.data));
  },
  methods: {
    getResults() {
      axios
        .get(store.state.domain + "/mealTime", config)
        .then(res => (this.timeTables = res.data.data));
    }
  }
};
</script>
<style lang="scss" scoped>
.save-btn {
  margin-top: 0;
}
.btns-header {
  display: flex;
  align-items: center;
}
.divTable {
  display: flex;
  width: 100%;
  color: rgba(0, 0, 0, 0.822);
  .table-header {
    display: grid;
    width: 100%;
    background-color: #f9f9f9;
    .table-th {
      display: table-cell;
      border: 1px solid rgba(0, 0, 0, 0.315);
      padding: 11px 10px;
      font-size: 17px;
      height: 55px;
    }
    .table-th:first-child {
      color: #008eb9;
      font-weight: 600;
    }
  }
}
</style>
