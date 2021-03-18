<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="boxContianer">
      <b-row class="admission-progress">
        <b-col xl="5">
          <h6>لم يتخطى المسموح</h6>
          <p>١٥٠ طالب</p>
          <b-progress :max="max">
            <b-progress-bar
              :value="value"
              class="greenBg"
            ></b-progress-bar>
            <span style="color: #adca65">{{ `${((value / max) * 100).toFixed(2)}%` }}</span>
          </b-progress>
        </b-col>
        <b-col xl="5">
          <h6>تخطى المسموح</h6>
          <p>١٥٠ طالب</p>
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
      <div class="admission-table">
    <b-row>
      <b-col>
        <h3>إحصاء غياب وحضور الطلاب</h3>
      </b-col>
    </b-row>
    <table class="grey-style mt-5">
      <tr>
        <th><input
              type="checkbox"
              @click="select_all_via_check_box"
              v-model="all_select"
            /></th>
        <th>{{ $t('Name')}} </th>
        <th>اسم المدينة</th>
        <th>المبنى</th>
        <th>الدور - الغرفة</th>
        <th>معدل الغياب</th>
        
      </tr>
      <tr>
        <td><input type="checkbox" v-model="updateItems" /></td>
        <td>توماس وحيد</td>
        <td>مبنـي تسكين البنين</td>
        <td>مبنى أ</td>
        <td>2 - 3</td>
        <td>30</td>
      </tr>
    </table>
  </div>
  </div>
</template>

<script>
export default {
    name: 'attendence',
    data() {
    return {
      all_select: false,
      updateItems: [],
      value: 33.333333333,
      max: 50,
   }
  },
  methods: {
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.buildings.forEach(building => {
          this.updateItems.push(building.id);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
  }
}
</script>