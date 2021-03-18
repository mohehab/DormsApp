<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <div class="students-data boxedFormAllSteps">
      <b-row>
        <div class="student-img">
          <img src="@/assets/images/image.png" alt="" />
        </div>
      </b-row>
      <div class="register-data">
        <b-row align-h="between" class="data-row">
          <b-col cols="4" class="data-item">
            <label for="">الاسم الكامل</label>
            <span>محمد ايهاب</span>
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">النوع</label>
            <input type="text" readonly disabled />
          </b-col>
        </b-row>
        <b-row align-h="between" class="data-row">
          <b-col cols="4" class="data-item">
            <label for="">الكليه</label>
            <input type="text" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">الفرقه</label>
            <input type="text" v-model="studentEduYear" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">التقدير</label>
            <input type="tel" v-model="studentGpa" readonly disabled />
          </b-col>
        </b-row>
        <b-row align-h="between" class="data-row">
          <b-col cols="4" class="data-item">
            <label for="">المدرسه</label>
            <input type="text" v-model="studentSchool" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">الشهاده</label>
            <input type="text" v-model="studentCertificate" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">النسبه المئويه</label>
            <input type="tel" v-model="studentPerc" readonly disabled />
          </b-col>
        </b-row>
        <b-row class="data-row">
          <b-col cols="4" class="data-item item-width">
            <label for="">تاريخ الميلاد</label>
            <input type="date" v-model="studentBirth" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">الرقم القومى</label>
            <input type="tel" v-model="studentID" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">محل الاقامه</label>
            <input type="text" v-model="studentAddress" readonly disabled />
          </b-col>
        </b-row>
        <b-row class="data-row">
          <b-col cols="4" class="data-item item-width">
            <label for="">المحافظه</label>
            <input type="text" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item ">
            <label for="">رقم الهاتف الارضى</label>
            <input type="tel" v-model="studentPhone" readonly disabled />
          </b-col>
          <b-col cols="4" class="data-item">
            <label for="">رقم الموبايل</label>
            <input type="tel" v-model="studentMobile" readonly disabled />
          </b-col>
        </b-row>
        <StudentAgentDetails />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentPersonalPg"
};
</script>

<style></style>
