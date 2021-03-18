<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h2 class="text-center">طلبات التسكين</h2>
        <div class="top-charts">
          <div v-b-modal.modal-2 class="chart">
              <AdminstrationApplicantChart />
            </div>
          <div v-b-modal.modal-2 class="chart">
              <AdminstrationApplicantChart />
            </div>
          <div v-b-modal.modal-2 class="chart">
              <AdminstrationApplicantChart />
            </div>
        </div>
        <b-row>
            <b-col xl="6" class="mt-4">
                <b-form-input type="text" placeholder="Search" :state="mealEnState"></b-form-input>
            </b-col>
        </b-row>
      <RequestsTable />
      <div class="save-btn">
        <button
        type="submit"
        class="blueBg"
        >
        حفظ
        </button>
        <span class="redBg">الغاء</span>  
      </div>
  </div>
</template>


<script>
import RequestsTable from '../Requests/RequestsTable';
import AdminstrationApplicantChart from "../Charts/AdminstrationApplicantChart";
export default {
   name: "housingRequests",
     components: {
      RequestsTable,
      AdminstrationApplicantChart
    },
  data() {
    return {
   
   }
  }
}
</script>
<style lang="scss" scoped>
  .chart {
    width: 250px;
    margin: 0 20px;
    position: relative;
    box-shadow: 0px 0px 10px #d2d6d9;
  }
</style>
