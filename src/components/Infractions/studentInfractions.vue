<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="boxContianer">
      <b-row class="admission-progress">
        <b-col xl="4">
          <h6>مقبول</h6>
          <p>١٥٠ مخالفة</p>
          <b-progress :max="max">
            <b-progress-bar
              :value="value"
              class="greenBg"
            ></b-progress-bar>
            <span style="color: #adca65">{{ `${((value / max) * 100).toFixed(2)}%` }}</span>
          </b-progress>
        </b-col>
        <b-col xl="4">
          <h6>في الإنتظار</h6>
          <p>١٥٠ مخالفة</p>
          <b-progress :max="max">
            <b-progress-bar
              :value="value"
              class="blueBg"
            ></b-progress-bar>
            <span style="color: #008eb9">{{ `${((value / max) * 100).toFixed(2)}%` }}</span>
          </b-progress>
        </b-col>
        <b-col xl="4">
          <h6>مرفوض</h6>
          <p>١٥٠ مخالفة</p>
          <b-progress :max="max">
            <b-progress-bar
              :value="value"
              class="blueBg"
            ></b-progress-bar>
            <span style="color: #008eb9">{{ `${((value / max) * 100).toFixed(2)}%` }}</span>
          </b-progress>
        </b-col>
      </b-row>
    </div>
    <div class="boxContianer">
      <h4>قائمة مخالفات الطلاب</h4>
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
            <th>{{$t('ID')}}</th>
            <th class="text-center">اسم الطالب</th>
            <th class="text-center">المخالفة</th>
            <th>عدد مرات الانذار</th>
            <th class="text-center">العقوبة</th>
            <th>{{$t('notes')}}</th>
            <th class="text-center">{{ $t('Status') }}</th>
            <!-- <th>{{ $t("Edit") }}</th> -->
          </tr>
          <tr v-for="(infraction, index) in infractions" :key="index">
            <td>
              <input
                type="checkbox"
                v-model="updateItems"
                :value="infraction.id"
              />
            </td>
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">
              <p class="text-right">{{ infraction.student_infraction.student_first_name_ar + ' ' + infraction.student_infraction.student_second_name_ar }}</p>
              <span class="text-center">{{$t('ID')}} {{ infraction.student_infraction.student_id}}</span>
            </td>
            <td><p class="limit-text">{{ infraction.student_infraction.infraction.name_ar }} </p>
                <router-link to="" :id="infraction.id + 'tooltip'">{{$t('readMore')}}</router-link>
                <b-tooltip :target="infraction.id + 'tooltip'" triggers="hover">
                  {{ infraction.student_infraction.infraction.name_ar }}
                </b-tooltip>
            </td>
            <td class="text-center">{{ infraction.student_infraction.number_of_repeats }}</td>
            <td class="text-center">{{ infraction.penalty.name_ar }}
              <p v-if="infraction.penalty.option_values.length > 0">{{infraction.penalty.option_values[0].data_typeOption_value + ' ' + infraction.penalty.option_values[1].attribute_name_ar}}</p>
            </td>
            <td>{{ infraction.student_infraction.note }}</td>
            <td>{{infraction.penalty_status}}</td>
          </tr>
          <tr v-if="infractions.length < 1">
            <td colspan="9">
              <h4 class="text-center">لا توجد مخالفات مسجلة</h4>
            </td>
          </tr>
        </table>
        <div class="tabel-btns-container save-btn mt-3">
          <span class="blueBg"
            ><router-link :to="{ name: 'createStudentInfractions' }"
              >{{$t('add') + ' ' + $t('infraction')}}</router-link
            ></span
          >
          <slot v-if="infractions.length >= 1">
            <span class="greenBg" @click="changeStatus('confirmed')">تفعيل</span>
            <span class="redBg" @click="changeStatus('rejected')">رفض</span>
            <span class="redBg" @click="deleteData">{{ $t('Delete')}}</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "studentInfractions",
  data() {
    return {
      infractionStatus: null,
      status: "",
      all_select: false,
      infractions: [],
      updateItems: [],
      student_penalties:[],
      value: 33.333333333,
      max: 50,
      options: [
        { value: "confirmed", text: "مقبول" },
        { value: "pending", text: "في الإنتظار" },
        { value: "rejected", text: "مرفوض" }
      ]
    };
  },
  mounted() {
    this.getTableResults();
  },
  methods: {
    getTableResults() {
        axios({
          method: "POST",
          url:
            store.state.domain + "/studentPenalties/index",
          headers: {
            localization: store.state.localization
          },
        }).then(res => {
          if (res.status == 200 || res.status == 201) {
            this.infractions = res.data.data
          }
        });
      axios
        .get(store.state.domain + "/studentPenalties/penaltyStatus", config)
        .then(res => this.status = res.data);
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.infractions.forEach(infraction => {
          this.updateItems.push(infraction.id, infraction.status);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
    changeStatus(status) {
      const $this = this;
      this.updateItems.forEach(function(id) {
        axios({
          method: "POST",
          url: store.state.domain + "/studentPenalties/changeStudentPenaltyStatus",
          headers: {
            localization: store.state.localization
          },
          data: {
            student_penalties: [{
              student_penalty_id: id,
              penalty_status: status
            }]
          }
        }).then(res => {
          if (res.status == 200 || res.status == 201) {
            $this.getTableResults();
          }
        });
      });
      this.getTableResults;
    },
    deleteData() {
      const $this = this;
      this.updateItems.forEach(function(ids) {
        axios({
          method: "POST",
          url:
            store.state.domain + "/studentInfractions/removeStudentInfraction",
          headers: {
            localization: store.state.localization
          },
          data: {
            student_id: ids.student_id,
            infraction_id: ids.infraction.id
          }
        }).then(res => {
          if (res.status == 200 || res.status == 201) {
            $this.getTableResults();
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.limit-text {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   max-width: 35ch;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
}
td a {
  font-size: 12px
}
.table-style td span {
  color: #000;
  padding: 7px;
  background: #fff;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
