<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="boxContianer">
      <h4>{{$t('InfractionsList')}}</h4>
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
            <th>نوع المخالفة</th>
            <th>عقوبة الانذار الأول</th>
            <th>عقوبة الإنذار الثاني</th>
            <th>عقوبة الإنذار الثالث</th>
            <th>{{ $t("Edit") }}</th>
          </tr>
          <tr v-for="(infraction, index) in infractions" :key="index">
            <td>
              <input
                type="checkbox"
                v-model="updateItems"
                :value="infraction.id"
              />
            </td>
            <td>{{ infraction.name_ar }}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>
              <span class="blueBg actions"
                ><router-link
                  :to="{
                    name: 'editInfraction',
                    params: { id: infraction.id }
                  }"
                  ><b-icon-pencil-fill></b-icon-pencil-fill></router-link
                ></span
              >
            </td>
          </tr>
          <tr v-if="infractions.length < 1">
            <td colspan="8">
              <h4 class="text-center">لا توجد مخالفات مسجلة</h4>
            </td>
          </tr>
        </table>

        <div class="tabel-btns-container save-btn mt-3">
          <router-link class="link-to blueBg" to="/infractions/Add"
            >{{$t('add') + ' ' + $t('infraction')}}</router-link
          >
          <span
              class="redBg" v-b-modal="'deleteInfractions'"
              >{{$t('Delete')}}</span
            >
            <AlertBox
              :name="'deleteInfractions'"
              question="هل تريد حذف المخالفة؟"
              api="/infractions/destroy/"
              :ids="updateItems"
              :reload="getTableResults"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertBox from "../Global/Alert";
import store from "@/store/index.js";
import axios from "axios";
const config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "infractions",
  components: {
    AlertBox
  },
  data() {
    return {
      all_select: false,
      infractions: [],
      updateItems: []
    };
  },
  mounted() {
    this.getTableResults();
  },
  methods: {
    getTableResults() {
      axios
        .get(store.state.domain + "/infractions", config)
        .then(res => (this.infractions = res.data.data));
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
    }
  }
};
</script>
