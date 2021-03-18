<template>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
        <h3 class="text-center">خريطة المدن الجامعية</h3>
        <div class="boxContianer">
          <div class="groupBuildings" v-for="(group,index) in buildingGroups" :key="index">
            <h4 class="text-center">{{group.name_ar}}</h4>
            <div class="save-btn text-center">
              <slot v-for="(building, i) in buildings">
                <slot v-if="group.id == building.group.id">
                    <span class="greenBg" :key="i"><router-link
                    :to="{ name: 'Buildings', params: { id: building.id } }"
                    >{{building.name_ar}}</router-link
                  ></span>
                </slot>
              </slot>
          </div>
          </div>
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
  name: "DormsMap",
  mounted() {
    axios
      .get(store.state.domain + "/buildingGroup", config)
        .then(res => (this.buildingGroups = res.data.data)).catch(error => {
          this.err = error.response.data.errors;
    });  
    axios
      .get(store.state.domain + "/dormBuilding", config)
        .then(res => (this.buildings = res.data.data));
    },
  data() {
    return {
      buildingGroups: [],
      buildings: []
    }
  }
}
</script>
<style lang="scss" scoped>
.groupBuildings {
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 40px;
    .save-btn {
      float: none;
      a {
        color: #fff
      }
    }
}
</style>