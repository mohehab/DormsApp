<template>
  <section class="datatables-admin-pages">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <div class="boxContianer chartBoxContainer">
      <div class="top-charts">
        <div v-b-modal.modal-3 class="chart">
          <AdminstrationApplicantChart />
        </div>
        <div v-b-modal.modal-4 class="chart">
          <AdminstrationCitiesChart />
        </div>
      </div>
      </div>
      <!-- <div class="boxContianer">
        <div class="d-flex addDorm">
          <span
            ><router-link to="dorms/createDorm">{{
              $t("add") + " " + $t("dorm")
            }}</router-link></span
          >
          <span
            ><router-link to="dorms/createGroup">{{
              $t("add") + " " + $t("group")
            }}</router-link></span
          >
          <span
            ><router-link to="dorms/createBuilding">{{
              $t("add") + " " + $t("building")
            }}</router-link></span
          >
          <span
            ><router-link to="dorms/createFloor">{{
              $t("add") + " " + $t("floor")
            }}</router-link></span
          >
          <span
            ><router-link to="dorms/createPartition"
              >إضافة غرفة</router-link
            ></span
          >
        </div>
      </div> -->
      <div class="boxContianer">
        <h4 class="pb-3 sectionTitle">كل المدن</h4>
        <div class="table-style">
          <table class="grey-style">
            <tr>
              <th class="text-center">
                <input
                  type="checkbox"
                  @click="select_all_via_check_box"
                  v-model="all_select"
                />
              </th>
              <th class="text-center">{{ $t('dorm')  }}</th>
              <th class="text-center">{{ $t("address") }}</th> 
              <th class="text-center">المباني المفعلة</th>
              <th class="text-center">الغرف المفعلة</th>
              <th class="text-center">نسبة الاشغال</th>
              <th class="text-center">{{ $t("Status") }}</th>
              <th class="text-center">{{ $t("Edit") }}</th>
            </tr>
            <tr v-for="dorm in dorms" :key="dorm.id">
              <td class="text-center">
                <input type="checkbox" v-model="updateItems" :value="dorm.id" />
              </td>
              <td>{{ dorm.name_ar }}</td>
              <td>{{ dorm.address_ar }}</td>
              <td class="text-center" v-if="dorm.total_buildings_count > 0">
                {{ dorm.total_active_buildings_count }} /
                {{ dorm.total_buildings_count }}
              </td>
              <td class="text-center" v-else>لا توجد مباني</td>
              <td class="text-center" v-if="dorm.total_partitions_count > 0">
                {{ dorm.total_active_partitions_count }} /
                {{ dorm.total_partitions_count }}
              </td>
              <td class="text-center" v-else>لا توجد غرف</td>
              <td class="text-center" v-if="dorm.total_partitions_count > 0">
                {{
                  (dorm.total_active_partitions_count /
                    dorm.total_partitions_count) *
                    100
                }}
                %
              </td>
              <td class="text-center" v-else>لا يوجد إشغال</td>
              <td v-if="dorm.status == 'Active'" class="greenFont text-center">
                مفعل
              </td>
              <td v-else class="redFont text-center">{{ $t("off") }}</td>
              <td class="text-center">
                <span class="blueBg actions"
                  ><router-link
                    :to="{ name: 'editDorm', params: { id: dorm.id } }"
                    ><b-icon-pencil-fill></b-icon-pencil-fill></router-link
                ></span>
              </td>
            </tr>
            <tr v-if="dorms.length < 1">
              <td colspan="8">
                <h4 class="text-center">لا توجد مدن مسجلة</h4>
              </td>
            </tr>
          </table>

          <div class="tabel-btns-container save-btn" v-if="dorms.length >= 1">
            <span class="redBg" v-b-modal="'deleteDorm'">{{
              $t("Delete")
            }}</span>
            <AlertBox
              :name="'deleteDorm'"
              question="هل تريد حذف المدينة؟"
              api="/dorm/"
              :ids="this.updateItems"
              :reload="getTableResults"
            />
            <span class="redBg" @click.prevent="changeStatus('off')">{{
              $t("deactivite")
            }}</span>
            <span class="greenBg" @click.prevent="changeStatus('active')">{{
              $t("activite")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AlertBox from "../Global/Alert";
import store from "@/store/index.js";
import axios from "axios";
import AdminstrationCitiesChart from "../Charts/AdminstrationCitiesChart";
import AdminstrationApplicantChart from "../Charts/AdminstrationApplicantChart";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "CurrentDorms",
  components: {
    AdminstrationCitiesChart,
    AdminstrationApplicantChart,
    AlertBox
  },
  data() {
    return {
      dorms: [],
      buildings: [],
      checked: false,
      dormsIds: [],
      all_select: false,
      updateItems: []
    };
  },
  mounted() {
    this.getTableResults();
  },
  methods: {
    SaveDataStore() {
      this.dorms.name_ar = store.state.editDorm.dormNameAr;
      this.dorms.name_en = store.state.editDorm.dormNameEn;
      this.dorms.address_ar = store.state.editDorm.dormAddress;
      this.dorms.status = store.state.editDorm.dormStatus;
    },
    changeStatus(status) {
      const $this = this;
      this.updateItems.forEach(function(id) {
        axios({
          method: "PUT",
          url: store.state.domain + "/dorm/" + id,
          headers: {
            localization: store.state.localization
          },
          data: {
            status: status
          }
        }).then(res => {
          if (res.status == 200 || res.status == 201) {
            $this.getTableResults();
          }
        });
      });
      this.getTableResults;
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.dorms.forEach(dorm => {
          this.updateItems.push(dorm.id, dorm.status);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
    getTableResults() {
      axios
        .get(store.state.domain + "/dorm", config)
        .then(res => (this.dorms = res.data.data));
    }
  }
};
</script>
<style lang="scss">
.chartBoxContainer{
  padding: 20px !important;
}

.top-charts {
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 0 !important;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .chart {
    width: 250px;
    margin: 0 20px;
    position: relative;
    box-shadow: 0px 0px 10px #d2d6d9;
    @media (max-width: 768px) {
      margin-bottom: 30px;
    }
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
.mid-header {
  h2 {
    color: #495469;
    text-align: center;
    margin-top: 20px;
  }
}
.boxContianer {
  margin: 50px 0;
  overflow: hidden;
  background: #fff;
  padding: 60px;
  box-shadow: 0 0 10px #d8dcdf;
  border-radius: 7px;
  .addDorm {
    justify-content: space-between;
    flex-wrap: wrap;
    span {
      width: 20%;
      text-align: center;
      @media (max-width: 768px) {
        width: 32%;
      }
      @media (max-width: 576px) {
        width: 45%;
      }
      @media (max-width: 375px) {
        width: 100%;
      }
    }
    span:before {
      content: "+";
      font-weight: bold;
      padding: 0px 4px;
      border: 1px solid #000;
      border-radius: 60%;
      font-size: 14px;
      margin-left: 7px;
      vertical-align: middle;
    }
  }
}

@media (max-width: 992px) {
  .datatables-admin-pages {
    .side-admin-container {
      .boxContianer {
        .table-style {
          overflow-y: scroll;
          .grey-style {
            width: 950px;
          }
        }
        .addDorm span {
          padding-bottom: 20px;
        }
      }
    }
  }
}
</style>
