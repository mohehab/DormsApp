<template>
  <div class="step-five boxedFormAllSteps">
    <div class="payment">
      <h4>رسوم استمارة التقديم</h4>
      <h3>
        يرجى سداد مبلغ جنيه ثمن استمارة التقديم
      </h3>
      <div class="payment-method">
        <b-form-select v-model="selected" class="mb-3">
          <b-form-select-option :value="null" disabled
            >برجاء اختيار طريقة الدفع</b-form-select-option
          >
          <b-form-select-option value="a"
            >الدفع عن طريق الفيزا</b-form-select-option
          >
          <b-form-select-option value="b"
            >الدفع عن طريق البنك</b-form-select-option
          >
          <b-form-select-option value="b"
            >الدفع عن طريق فورى</b-form-select-option
          >
          <b-form-select-option value="b"
            >الدفع كاش فى إدارة المدن الجامعية بالجامعة</b-form-select-option
          >
        </b-form-select>
      </div>
    </div>
    <div class="slideRegisterSteps">
      <div class="text-right prevLinkRegisterFrom" @click.prevent="prev">
        <b-icon-chevron-right></b-icon-chevron-right>
        السابق
      </div>
      <div class="text-left nextLinkRegisterFrom">
        <button type="submit" @click.prevent="submitForm">
          انهاء التسجيل
          <b-icon-chevron-left></b-icon-chevron-left>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "@/store/index.js";
const config = {
          headers: {
            localization: store.state.localization
        }
};
export default {
  name: "PaymentMethods",
  data() {
    return {
      slug: "apply-application-fees",
      payment: "",
      file: [],
      selected: null
    };
  },
  mounted() {
    axios
      .get(store.state.domain + "/systemFeesRelation?" + this.slug, config)
      .then(res => (this.payment = res.data.data[0]));
  },
  methods: {
    next() {
      store.state.RegisterStep++;
    },
    prev() {
      store.state.RegisterStep--;
    },
    submitForm() {
      const fd = new FormData();
      const fileType = store.state.studentFormStore.documentOne.type;
      fd.append("image", store.state.studentFormStore.documentOne);
      const validImageTypes = ["image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        axios.post(store.state.domain + "/upload/image", fd, config).then(res => {
          this.file = res.data.data.temp_path;
          if (res.status == 200) {
            axios({
              method: "POST",
              url: store.state.domain + "/dormsApplication",
              headers: {
                localization: store.state.localization
              },
              data: {
                paid: 0,
                student_id: store.state.studentFormStore.studentID,
                documents: [
                  {
                    application_document_id: 1,
                    file: this.file
                  }
                ]
              }
              // eslint-disable-next-line no-constant-condition
            }).then(res => {
              // eslint-disable-next-line no-constant-condition
              if (res.config.status === 200 || 201) {
                this.next();
              }
            });
          }
        });
      } else {
        console.log("File Type is invalid");
      }
    }
  }
};
</script>
<style lang="scss">
.payment {
  height: 100%;
  padding-bottom: 60px;
  .payment-method {
    .custom-select {
      width: 55%;
      background-position: 2%;
      @media screen and (max-width: 425px) {
        width: 100%;
      }
    }
    select {
      height: 40px;
      border-radius: 10px;
      color: #606e7b;
      border: 2px solid #606e7b;
      outline: none;
    }
  }
}
</style>
