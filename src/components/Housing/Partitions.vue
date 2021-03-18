<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h3 class="text-center">غرفة {{ partition.partition_number }}</h3>
    <div class="boxContianer">
      <b-row>
        <b-col>
          <div class="d-flex">
            <h4>
              حاله الغرفه:
              <span v-if="partition.status == 'Active'">مفعل</span>
              <span v-if="partition.status == 'Off'">مغلق</span>
            </h4>
          </div>
        </b-col>
        <b-col>
          <div class="d-flex">
            <h4>نوع الغرفه: <span>{{partition.type.name_ar}}</span></h4>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <div>
          <h4>محتويات الغرفة</h4>
        </div>
        <b-col lg="12" class="data-item">
          <div class="assets-container">
            <h3 v-for="(asset, i) in partition.assets" :key="i">
              <span>{{ asset.quantity }}</span> {{ asset.name_ar }}
            </h3>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="show-data table-style">
      <table class="grey-style">
        <tr>
          <th><input type="checkbox" /></th>
          <th>اسم الطالب</th>
          <th>رقم السرير</th>
          <th>العهده</th>
          <th></th>
        </tr>
        <tr>
          <td><input type="checkbox" /></td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td><span class="blueBg">تعديل</span></td>
        </tr>
      </table>
    </div>

    <div class="save-btn">
      <button type="submit" class="blueBg">
        اضافه مقيم
      </button>
      <button type="submit" class="redBg">
        حذف
      </button>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import axios from "axios";
const config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "Partitions",
  mounted() {
    axios
      .get(
        store.state.domain + "/floorPartition/" + this.$route.params.id,
        config
      )
      .then(res => (this.partition = res.data.data))
      .catch(error => {
        this.err = error.response.data.errors;
      });
  },
  data() {
    return {
      partition: []
    };
  }
};
</script>
<style lang="scss" scoped>
h4 {
  font-size: 20px;
}
.assets-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.61);
    margin-left: 20px;
    display: inline-block;
    width: 100px;
  }
}
</style>
