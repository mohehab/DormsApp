<template>
  <section>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <div class="temporarly-students">
        <div class="top-charts">
          <div v-b-modal.modal-1 class="faculty-chart">
            <BarGovernatesChart />
          </div>
          <b-modal id="modal-1" v-bind:hide-footer="true">
            <div class="test">
              <BarGovernatesChart />
            </div>
          </b-modal>
          <div v-b-modal.modal-2 class="city-chart">
            <AdminstrationCitiesChart />
          </div>
          <b-modal id="modal-2" v-bind:hide-footer="true">
            <div class="test">
              <AdminstrationCitiesChart />
            </div>
          </b-modal>
        </div>
        <div class="mid-header">
          <h2>الطلبه قيد الانتظار</h2>
        </div>
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
import DataTable from "./DataTable";
export default {
  name: "waitingList",
  components: {
    BarGovernatesChart,
    AdminstrationCitiesChart,
    DataTable
  }
};
</script>

<style lang="scss">
.temporarly-students {
  position: relative;
  .top-charts {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 35px;
    position: relative;
    .faculty-chart {
      width: 250px;
      margin: 0 20px;
      position: relative;
      box-shadow: 0px 0px 10px #d2d6d9;
    }
    .city-chart {
      width: 250px;
      margin: 0 20px;
      height: 200px;
      position: relative;
      box-shadow: 0px 0px 10px #d2d6d9;
    }
    .popUp {
      z-index: 1000;
      position: fixed;
      width: 80%;
      background: #fff;
    }
  }
  .mid-header {
    h2 {
      color: #495469;
      text-align: right;
      margin-top: 20px;
    }
  }
  .temporarly-students-table {
    margin: 50px 0;
  }
}
</style>
