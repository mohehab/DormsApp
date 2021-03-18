<template>
  <div class="RegisterWelcome">
    <div class="boxed-form-welcome text-center">
      <img src="@/assets/images/Iskan-square.png" />
      <div class="welcome-msg-Register">
        مرحبا بك في برنامج إسكان للمدن الجامعية قبل البدأ في عملية التسجيل يرجى
        التأكد من تحميل و ملء استمارة <span class="welcome-msg-Register-bold">موافقة ولى الامر</span > و <span class="welcome-msg-Register-bold">إقرار الضامن و تصويرهما</span>
        الكترونيا لاعادة رفعهما اثناء قيامك بعملية التسجيل
      </div>
      <div class="informForUpload">
        <div class="" v-for="(file, index) in filesName" :key="index">
          <a :href="file.file">
            <span>{{ download }} {{ file.document.name_ar }} </span>
            <b-icon-download></b-icon-download>
          </a>
        </div>
      </div>
      <div class="nextLinkRegisterFromContainer">
        <div class="text-left nextLinkRegisterFrom" @click.prevent="next">
          ابدأ التسجيل <b-icon-chevron-left></b-icon-chevron-left>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
export default {
  name: "WelcomeRegisterForm",
  data() {
    return {
      download: "تحميل"
    };
  },
  methods: {
    next() {
      store.state.RegisterStep++;
    }
  },
  props: {
    filesName: Array
  }
};
</script>
<style lang="scss" scoped>
.RegisterWelcome {
  margin-top: -30px !important;
}
.RegisterWelcome {
  .boxed-form-welcome {
    box-shadow: 0px 3px 6px #00000029;
    padding: 50px 0;
    background-color: #fff;
    height: 91vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;     
    .welcome-msg-Register-bold {
      font-weight: bold;
    }
  }
  img {
    width: 14%;
    padding-bottom: 10px;
    @media screen and (max-width: 425px) {width: 30%}
  }
  .welcome-msg-Register {
    font-size: 24px;
    padding: 30px 19%;
    color: #747E87;
    margin-top: 130px;
    @media screen and (max-width: 425px) {
      font-size: 16px;
      padding: 30px 9%;
    }
  }
  .informForUpload {
    margin: 30px 0;
    padding: 0 15%;
    div {
      display: inline-block;
      margin-left: 20px;
      border: 2px solid #626f80;
      border-radius: 10px;
      font-size: 15px;
      padding: 6px 0;
      margin-bottom: 15px;
      svg {
        color: #626f80;
      }
      span {
        background: #626f80;
        color: #fff;
        margin-left: 10px;
        padding: 10px;
        border-radius: 8px;
      }

      .b-icon.bi {
        margin-left: 10px;
        font-size: 13px;
      }
    }
  }
  .nextLinkRegisterFromContainer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .nextLinkRegisterFrom {
      margin-left: 60px;
      font-size: 20px;
      color: #008eb9;
      font-weight: 600;
    }
  }
}
</style>
