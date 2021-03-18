<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h2 class="text-center">الوجبات المفضلة</h2>
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
              <th>الوجبة</th>
              <th>ملاحظات</th>
            </tr>
            <tr>
              <td>
                <input type="checkbox" v-model="updateItems" />
              </td>
              <td></td>
              <td></td>
            </tr>
<!--             <tr>
              <td colspan="3">
                <h4 class="text-center">لا توجد وجبات مسجلة</h4>
              </td>
            </tr> -->
          </table>
          <div class="tabel-btns-container save-btn">
            <span class="redBg">حذف</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
export default {
    name: "favouriteMeal",
    data() {
        return {
            meal: [],
            updateItems: [],
            all_select: false,
        }
    },
    mounted() {
     axios
      .get(store.state.domain + "/meal")
      .then(res => (this.meals = res.data.data));
    },
    methods: {
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
    }
}
</script>
