<template>
  <div class="feeding-request category-type">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h3 class="text-center">
        قائمة الطلبات
      </h3>
      <b-row>
        <b-col xl="3">
          <div class="top-charts">
            <div v-b-modal.modal-4 class="chart">
              <AdminstrationCitiesChart />
            </div>
          </div>
        </b-col>
        <b-col xl="9">
          <div class="show-data table-style">
            <table class="grey-style">
              <tr>
                <th>قائمة الانتظار</th>
                <th>تحت الانشاء</th>
                <th>تم التنفيذ</th>
              </tr>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </table>
          </div>
        </b-col>
      </b-row>
      <div class="show-data table-style mt-5">
        <table class="grey-style mb-5">
          <tr>
            <th>الكود</th>
            <th>الاسم</th>
            <th>نوع العميل</th>
            <th>التاريخ</th>
            <th>المكان</th>
            <th>الحاله</th>
            <th>ملاحظات</th>
          </tr>
          <tr v-for="(mealrequest, index) in mealrequests" :key="index">
            <td>{{ mealrequest.id }}</td>
            <td>{{ mealrequest.name }}</td>
            <td>{{ mealrequest.user.full_name_ar }}</td>
            <td>{{ mealrequest.delivery_date }}</td>
            <td>
              {{
                mealrequest.location == "inside dorms"
                  ? "داخل المدينه"
                  : "خارج المدينه"
              }}
            </td>
            <td v-if="mealrequest.status == 0">لم يبدأ</td>
            <td v-else-if="mealrequest.status == 1">قيد التنفيذ</td>
            <td v-else-if="mealrequest.status == 2">تم التنفيذ</td>
            <td v-else>مرفوض</td>
            <td>{{ mealrequest.notes }}</td>
          </tr>
        </table>
      </div>

      <div class="save-btn">
        <router-link :to="'/feeding/newReservation'" class="blueBg link-to">
          انشاء طلب جديد
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import AdminstrationCitiesChart from "../../Charts/AdminstrationCitiesChart";
import store from "@/store/index.js";
import axios from "axios";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "reservations",
  components: {
    AdminstrationCitiesChart
  },
  data() {
    return {
      mealrequests: []
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/mealRequest", config)
      .then(res => (this.mealrequests = res.data.data));
  }
};
</script>

<style lang="scss" scoped>
.top-charts {
  padding-top: 0 !important;
}
</style>
