<template>
  <div class="admission-table">
    <b-row>
      <b-col>
        <h3>الطلبات الإدارية</h3>
      </b-col>
    </b-row>
    <table class="grey-style mt-5">
      <tr>
        <th><input
              type="checkbox"
              @click="select_all_via_check_box"
              v-model="all_select"
            /></th>
        <th>اسم الطلب</th>
        <th>كود الطالب</th>
        <th>اسم الطالب</th>
        <th>التاريخ</th>
        <th>الحالة</th>
        
      </tr>
      <tr>
        <td><input type="checkbox" v-model="updateItems" /></td>
        <td>تغيير الغرفة</td>
        <td>20201789</td>
        <td>توماس</td>
        <td>2021.02.03</td>
        <td><b-form-select
            v-model="status"
            :options="options"
            value-field="value"
            text-field="text"
            disabled-field="notEnabled"
            required
          >
            <b-form-select-option :value="null" disabled
              >{{ $t('choose') + ' ' + $t("Status")}}</b-form-select-option
            >
          </b-form-select></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: null,
      all_select: false,
      updateItems: [],
      options: [
        { value: "confirmed", text: "مقبول" },
        { value: "pending", text: "في الإنتظار" },
        { value: "rejected", text: "مرفوض" }
      ]
    };
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
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 95%;
  margin: auto;
  .save-term {
    margin-top: 40px;
    span {
      background: #008eb9;
      padding: 1px 20px;
      border-radius: 10px;
      color: #fff;
    }
  }
}
.admission-table {
  margin: 45px 0;
  img{
    width: 55px;
  }
}
.accepted {
  color: #adca65;
}
.hold {
  color: #03a9f4;
}
.rejected {
  color: #fc394b;
}
</style>
