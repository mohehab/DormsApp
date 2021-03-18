<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
      <h2 class="text-center">الطلبات و اعلانات</h2>
    <div class="boxContianer">
      <b-row class="admission-progress">
        <b-col xl="4">
          <h6>مقبول</h6>
          <p>٤ طلب</p>
          <b-progress :max="max">
            <b-progress-bar
              :value="value"
              class="greenBg"
            ></b-progress-bar>
            <span style="color: #adca65">{{ `${((value / max) * 100).toFixed(2)}%` }}</span>
          </b-progress>
        </b-col>
        <b-col xl="4">
          <h6>قائمة الإنتظار</h6>
          <p>٤ طلب</p>
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
          <p>٤ طلب</p>
          <b-progress :max="max">
            <b-progress-bar
              :value="value"
              class="goldBg"
            ></b-progress-bar>
            <span style="color: #ddb300">{{ `${((value / max) * 100).toFixed(2)}%` }}</span>
          </b-progress>
        </b-col>
      </b-row>
    </div>
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
export default {
   name: "requestsAndDeclarations",
     components: {
      RequestsTable
    },
  data() {
    return {
      value: 33.333333333,
      max: 50,
   }
  }
}
</script>
