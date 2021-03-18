<template>
  <section class="datatables-admin-pages">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <div class="top-charts">
        <div v-b-modal.modal-1 class="chart">
          <BarGovernatesChart />
        </div>
        <div v-b-modal.modal-2 class="chart">
          <AdminstrationApplicantChart />
        </div>
        <div v-b-modal.modal-3 class="chart">
          <AdminstrationApplicantChart />
        </div>
        <div v-b-modal.modal-4 class="chart">
          <AdminstrationCitiesChart />
        </div>
      </div>
      <div class="mid-header">
        <h2>الطلبه المؤقتين</h2>
      </div>
     <div class="temporarly-students-table">
        <DataTable />
      </div>
    </div>
  </section>
</template>

<script>
import AdminstrationCitiesChart from "../../Charts/AdminstrationCitiesChart";
import BarGovernatesChart from "../../Charts/BarGovernatesChart";
import AdminstrationApplicantChart from "../../Charts/AdminstrationApplicantChart";
import DataTable from "./DataTable";
export default {
  name: "CurrentStudents",
  components: {
    BarGovernatesChart,
    AdminstrationCitiesChart,
    AdminstrationApplicantChart,
    DataTable
  }
};
</script>
<style lang="scss">
.top-charts {
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 35px;
  position: relative;
  .chart {
    width: 250px;
    margin: 0 20px;
    position: relative;
    box-shadow: 0px 0px 10px #d2d6d9;
    #pie-chart {
      width: 190px !important;
      margin: auto;
    }
  }
  .popUp {
    z-index: 1000;
    position: fixed;
    width: 80%;
    background: #fff;
  }
}

.temporarly-students-table {
  margin: 50px 0;
  

}
</style>
