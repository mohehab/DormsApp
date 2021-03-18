<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <form>
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>اختار المدينة</label>
          <b-form-select
            disabled-field="notEnabled"
            v-model="dormId"
            @change="housingBuildingFilter"
          >
            <b-form-select-option :value="null" disabled
              >اختار المدينة</b-form-select-option
            >
            <b-form-select-option
              v-for="(dorm, index) in dorms"
              :key="index"
              :value="dorm.id"

              >{{ dorm.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <b-col lg="5" class="data-item">
          <label>اختار المجموعة</label>
          <b-form-select
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled
              >اختار المجموعة</b-form-select-option
            >
            <b-form-select-option
              v-for="(group, index) in groups" :key="index"
              >{{ group.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col lg="5" class="data-item" offset-lg="1">
          <label>اختار المبني</label>
          <b-form-select 
          v-model="buildingId"
          @change="housingFloorFilter"
          >
            <b-form-select-option :value="null" disabled
              >اختار المبني</b-form-select-option
            >
            <b-form-select-option
            v-for="building in buildings"
              :key="building.id"
              :value="building.id"
            >{{ building.name_ar }}</b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col lg="5" class="data-item">
          <label>اختار الدور</label>
          <b-form-select v-model="floorId">
            <b-form-select-option :value="null" disabled
              >اختار الدور</b-form-select-option
            >
            <b-form-select-option
             v-for="floor in floors"
              :key="floor.id"
              :value="floor.id"
            >{{ floor.floor_number }}</b-form-select-option>
          </b-form-select>
        </b-col>
        </b-row>
        <b-row>
            <b-col lg="5" class="data-item">
            <label>رقم الغرفه</label>
            <b-form-select v-model="partitionNumber">
                <b-form-select-option :value="null" disabled
                >اختار رقم الغرفه</b-form-select-option
                >
                <b-form-select-option>-</b-form-select-option>
            </b-form-select>
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="5" class="data-item">
                <label>اثاث الغرفه</label>
                <div class="assets-container">
                    <h3><span> 2 </span> كوميدينو</h3>
                    <h3><span> 2 </span> دولاب</h3>
                    <h3><span> 2 </span> تلفزيون </h3>
                    <h3><span> 2 </span> مروحه </h3>
                </div>
            </b-col>
      </b-row>
      
    </form>
    <b-row>
        <div class="save-btn">
            <button
            class="blueBg"
            >
            اضافه مقيم +
            </button>
            <button
            type="submit"
            class="blueBg"
            >
            اضافه عهده جديده +
            </button>
        </div>
    </b-row>
        <form>
    <b-row>
        <b-col xl="6">
            <label> الطالب </label>
            <b-form-input
            type="text"
            v-model="student"
            ></b-form-input>
        </b-col>
    </b-row>
    <b-row>
        <b-col xl="6">  
            <label> العهده </label>
           <b-form-select v-model="custody">
            <b-form-select-option :value="null" disabled>
                اختار العهده
            </b-form-select-option>
            <b-form-select-option>-</b-form-select-option>
          </b-form-select>
        </b-col>
    </b-row>

        <div class="save-btn">
            <button
            class="blueBg"
            >
            اضافه
            </button>
            <button
            type="submit"
            class="redBg"
            >
             اللغاء
            </button>
        </div>

    </form>

      <div class="show-data table-style create-group-tabel">
      <table class="grey-style">
        <tr>
          <th>
            <input type="checkbox"/>
          </th>
          <th> اسم الطالب</th>
          <th> كود السرير </th>
          <th> العهده </th>
        </tr>
        <tr>
          <td>
            <input
              type="checkbox"
            />
          </td>
          <td></td>
          <td></td>
          <td> <span class="blueBg" @click="returnGroup(buildingGroup.id)">تعديل</span> </td>

        </tr>
      </table>
    </div>

    <div class="save-btn">
        <button
          type="submit"
          class="blueBg"
        >
          تفعيل
        </button>
        <button
          type="submit"
          class="blueBg"
        >
          اللغاء التفعيل
        </button>
        <span class="redBg">إلغاء</span>
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
  name: "Residence",
  data() {
        return{
            dormName: "",
            groupName: "",
            buildingName: "",
            partitionNumber: "",
            student: "",
            custody: "",
            dorms: "",
            groups: "",
            buildings: "",
            floors: "",
            dormId: null,
            buildingId: null,
            floorId: null
        }
},
  mounted(){
      axios
      .get(store.state.domain + "/dorm", config)
      .then(res => this.dorms = res.data.data);
      axios
      .get(store.state.domain + "/buildingGroup", config)
      .then(res => (this.groups = res.data.data));

  },
  methods: {
      housingBuildingFilter() {
      if (this.dormId == null) {
        return this.buildingId == null
      } else if (this.dormId > 0 ) {
     axios
      .get(store.state.domain + "/dormBuilding?dorm_id=" + this.dormId, config)
      .then(res => (this.buildings = res.data.data));
      }
    },
    housingFloorFilter() {
      if (this.buildingId == null) {
        return this.floorId == null
      } else if (this.buildingId > 0 ) {
     axios
      .get(store.state.domain + "/buildingFloor?building_id=" + this.buildingId, config)
      .then(res => (this.floors = res.data.data));
      }
    }
  }

 
};
</script>
<style lang="scss" scoped>
.assets-container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    h3{
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.61);
        margin-left: 20px;
    }
}
</style>