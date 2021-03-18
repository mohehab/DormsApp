<template>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
        <h3 class="text-center">خريطة المدن الجامعية</h3>
        <h3 class="text-center">{{building.name_ar}}</h3>
        <!-- <b-row>
            <b-col xl="3">
                <b-form-input
                    class="my-5"
                    type="text"
                    placeholder="Search"
                ></b-form-input>
            </b-col>
        </b-row> -->
        <div class="boxContianer">
          <div class="groupBuildings" v-for="(floor,index) in floors" :key="index">
            <h4 class="text-center">الدور {{floor.floor_number}}</h4>
            <div class="save-btn text-center">
              <slot v-for="(partition, i) in partitions">
                <slot v-if="floor.id == partition.floor_id" >
                  <router-link
                    :to="{ name: 'Partitions', params: { id: partition.id } }"
                    >
                    <span class="greenBg" :key="i">غرفة {{partition.partition_number}}</span>
                  </router-link>
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
name: "Buildings",
  mounted() { 
    axios
      .get(store.state.domain + "/dormBuilding/" + this.$route.params.id, config)
        .then(res => (this.building = res.data.data));
    axios
      .get(store.state.domain + "/buildingFloor?building_id=" + this.$route.params.id, config)
        .then(res => (this.floors = res.data.data));
    axios
        .get(store.state.domain + "/floorPartition", config)
        .then(res => (this.partitions = res.data.data)).catch(error => {
          this.err = error.response.data.errors;
        });
  },
  data() {
    return {
      building: "",
      floors: [],
      partitions: []
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