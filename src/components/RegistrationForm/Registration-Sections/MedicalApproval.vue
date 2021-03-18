<template>
  <div class="step-five boxedFormAllSteps">
    <div class="medical-examination">
      <h4>الموافقة الطبية</h4>
      <h3>
        يرجى اختيار الميعاد المناسب من المواعيد المحددة بالجدول لتوقيع الكشف
        الطبي
      </h3>
      <div class="medicalAppoChoose">
        <b-calendar
          v-bind="labels || {}"
          locale="ar"
          @context="onContext"
        ></b-calendar>
        <div class="medicalAvailb">
          <span @click="toggleActive()" :class="{active: isActive}">الساعة ١٠ صباحاً</span>
          <span>الساعة ١١ صباحاً</span>
          <span>الساعة ١ ظهرا</span>
          <span>الساعة ٢ ظهرا</span>
        </div>
      </div>
      <div v-if="context" class="medicalAppoTime">
        <h4>يرجى التوجه الى الإدارة الطبية لتوقيع الكشف الطبي</h4>
        <p>
          يوم: <span>{{ context.selectedFormatted }}</span>
          <span>الساعة: 1 ظهرا </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MedicalApproval",
  data() {
    return {
      labels: {
        labelNoDateSelected: "لم يتم اختيار التاريخ"
      },
      context: null,
      isActive: false
    };
  },
  methods: {
    onContext(ctx) {
      this.context = ctx;
    },
    toggleActive() {
      this.isActive = !this.isActive
    }
  }
};
</script>
<style lang="scss">
.step-five {
  .medical-examination {
    p {
      color: #03a9f3;
      font-size: 15px;
      font-weight: bold;
    }
    .medicalAppoChoose {
      display: flex;
      align-items: center;
      @media screen and (max-width: 768px) {flex-direction: column}
      .medicalAvailb {
        display: inline-flex;
        flex-direction: column;
        font-size: 17px;
        margin-right: 50px;
        @media screen and (max-width: 768px) {
          margin-right: 0;
          margin-top: 30px
        }
        span {
          width: 250px;
          text-align: center;
          padding: 12px 15px;
          border-radius: 20px;
          margin-bottom: 20px;
          color: #fff;
          background: #ddb300;
          &:not(.active) {
            color: #606e7b;
            background: #f1f1f1;
          }
        }
      }
    }
    .medicalAppoTime {
      p {
        color: #626f80;
        font-size: 17px;
      }
      h4 {
        color: #03a9f3;
        margin-top: 25px;
        font-size: 19px;
      }
    }
  }
}
</style>
