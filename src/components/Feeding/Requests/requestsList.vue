<template>
  <section class="datatables-admin-pages">
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <div class="top-container">
        <div class="top-charts">
          <div v-b-modal.modal-3 class="chart">
            <FeedingRequestList />
          </div>
        </div>
        <div class="boxContianer1">
          <div class="d-flex addDorm requests-date">
            <b-row class="data-row media-row">
              <b-col cols="4" class="data-item">
                <label for="" class="help-label">من </label>
                <b-form-datepicker
                  locale="ar"
                  v-model="StartingDate"
                  :min="currentDate"
                  :initial-date="currentDate"
                  v-bind="labels || {}"
                  @change="MountRequestsAndFilterByPriority"
                ></b-form-datepicker>
              </b-col>
              <b-col
                cols="4"
                class="data-item"
                @change="MountRequestsAndFilterByPriority"
              >
                <label for="" class="help-label">الى</label>
                <b-form-datepicker
                  locale="ar"
                  v-model="EndingDate"
                  :min="StartingDate"
                  v-bind="labels || {}"
                ></b-form-datepicker>
              </b-col>
              <b-col cols="4" class="data-item">
                <label>الاهميه</label>
                <b-form-select
                  disabled-field="notEnabled"
                  v-model="priority"
                  @change="MountRequestsAndFilterByPriority"
                >
                  <b-form-select-option :value="null" disabled
                    >حدد اختيار</b-form-select-option
                  >
                  <b-form-select-option value="high"
                    >عاليه</b-form-select-option
                  >
                  <b-form-select-option value="medium"
                    >متوسط</b-form-select-option
                  >
                  <b-form-select-option value="low">منخفض</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>

      <div class="boxContianer">
        <div class="table-style">
          <table class="grey-style">
            <tr>
              <th>
                <input
                  type="checkbox"
                  @click="select_all_via_check_box"
                  v-model="all_select"
                />
              </th>
              <th>الموضوع</th>
              <th>ذات علاقه</th>
              <th>الاهميه</th>
              <th class="text-center">تكرار كل</th>
              <th>التاريخ</th>
              <th class="text-center">{{ $t("Edit") }}</th>
            </tr>
            <tr
              v-for="(requestIngredient, index) in requestIngredients"
              :key="index"
            >
              <td>
                <input
                  type="checkbox"
                  v-model="updateItems"
                  :value="requestIngredient.id"
                />
              </td>
              <td>{{ requestIngredient.subject_ar }}</td>
              <td>
                {{
                  requestIngredient.related_to == "inventory"
                    ? "المخزون"
                    : "صيانه"
                }}
              </td>
              <td v-if="requestIngredient.priority == 'low'">منخفض</td>
              <td v-else-if="requestIngredient.priority == 'medium'">متوسطه</td>
              <td v-else-if="requestIngredient.priority == 'high'">عاليه</td>
              <td v-else>طارئه</td>
              <td v-if="requestIngredient.repeated == 'daily'">يوميا</td>
              <td v-else-if="requestIngredient.repeated == 'Weekly'">اسبوعيا</td>
              <td v-else-if="requestIngredient.repeated == 'monthly'">شهريا</td>
              <td v-else>سنويا</td>
              <td>{{ requestIngredient.created_at.substring(0, 10) }}</td>
              <td class="text-center">
                <router-link
                  :to="{
                    name: 'editRequest',
                    params: { id: requestIngredient.id }
                  }"
                  ><span class="blueBg actions"
                    ><b-icon-pencil-fill></b-icon-pencil-fill></span
                ></router-link>
              </td>
            </tr>
            <tr v-if="requestIngredients.length < 1">
              <td colspan="7">
                <h4 class="text-center">لا توجد طلبات مسجلة</h4>
              </td>
            </tr>
          </table>

          <div class="table-btns-container save-btn">
            <span class="blueBg"
              ><router-link :to="'/feeding/createRequest'"
                >انشاء طلب</router-link
              ></span
            >
            <span class="redBg" v-b-modal="'deleteRequest'">حذف</span>
            <AlertBox
              :name="'deleteRequest'"
              question="هل تريد حذف الطلب ؟"
              api="/kitchenRequest/"
              :ids="updateItems"
              :reload="requestIngredientAPI"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AlertBox from "../../Global/Alert";
import store from "@/store/index.js";
import axios from "axios";
import FeedingRequestList from "../../Charts/FeedingRequestList";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "CurrentDorms",
  components: {
    FeedingRequestList,
    AlertBox
  },
  data() {
    return {
      priority: null,
      requestIngredients: [],
      all_select: false,
      updateItems: [],
      StartingDate: "",
      EndingDate: "",
      currentDate: new Date().toISOString().substring(0, 10),
      labels: {
        labelNoDateSelected: "لم يتم اختيار التاريخ",
        labelNoTimeSelected: "لم يتم اختيار الوقت",
        labelMinutes: "الدقائق",
        labelHours: "ساعات",
        labelSeconds: "ثواني",
        labelAmpm: "صباحا مساء",
        labelAm: "ص",
        labelPm: "م",
        labelCloseButton: "اختار"
      }
    };
  },
  mounted() {
    this.MountRequestsAndFilterByPriority();
  },
  methods: {
    requestIngredientAPI() {
      axios
        .get(store.state.domain + "/kitchenRequest", config)
        .then(res => (this.requestIngredients = res.data.data));
    },
    MountRequestsAndFilterByPriority() {
      if (
        this.priority == null ||
        this.StartingDate == "" ||
        this.EndingDate == ""
      ) {
        axios
          .get(store.state.domain + "/kitchenRequest", config)
          .then(res => (this.requestIngredients = res.data.data));
      } else if (
        this.priority !== null ||
        this.StartingDate !== "" ||
        this.EndingDate !== ""
      ) {
        axios({
          method: "GET",
          url: store.state.domain + "/requestRegardingPriority",
          headers: {
            localization: store.state.localization
          },
          params: {
            priority: this.priority,
            start_date: this.StartingDate,
            toDate: this.EndingDate
          }
        }).then(res => (this.requestIngredients = res.data.data));
      }
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.requestIngredients.forEach(requestIngredient => {
          this.updateItems.push(requestIngredient.id);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    }
  }
};
</script>
<style lang="scss">
.top-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    justify-content: center;
  }
}
.boxContianer1 {
  margin: 50px 0;
  background: #fff;
  padding: 60px;
  box-shadow: 0 0 10px #d8dcdf;
  border-radius: 7px;
  width: 100%;
  .requests-date .row {
    width: 100%;
  }
}
.top-charts {
  display: flex;
  justify-content: space-evenly;
  padding-top: 25px;
  position: relative;
  width: unset;
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
.datatables-admin-pages {
  .boxContianer {
    .table-style {
      .tabel-btns-container {
        text-align: left;
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
        span {
          padding: 8px 15px;
          text-align: center;
          display: block;
          margin-right: 20px;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
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
    justify-content: center;
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
