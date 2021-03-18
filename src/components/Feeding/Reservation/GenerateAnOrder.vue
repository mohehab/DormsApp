<template>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">    
        <h2 class="text-center">اضافه طلب</h2>
        <form>
            <b-row>
                <b-col xl="6" md="12">
                    <label>تاريخ البدء</label>
                    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
                </b-col>
                <b-col xl="6" md="12">
                    <label>الوقت</label>
                    <b-form-timepicker v-model="value" locale="ar"></b-form-timepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col xl="6" md="12">
                    <label>تاريخ الانتهاء</label>
                    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
                </b-col>
                <b-col xl="6" md="12">
                    <label>الوقت</label>
                    <b-form-timepicker v-model="value" locale="ar"></b-form-timepicker>
                </b-col>
            </b-row>
            <b-row>
                <b-col xl="6" md="12">
                    <label>الموقع</label>
                    <b-form-select disabled-field="notEnabled">
                        <b-form-select-option>

                        </b-form-select-option>
                    </b-form-select>
                </b-col>
                <b-col xl="6" md="12">
                    <label>الحاله</label>
                    <b-form-select disabled-field="notEnabled">
                        <b-form-select-option>

                        </b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row>


       
        

      
            
        </form>
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
// import store from "@/store/index.js";
// import axios from "axios";
export default {
name: "generateAnOrder",
  data() {
    return {
      value: ''
    }
  }     
}
  
</script>
<style lang="scss">

</style>