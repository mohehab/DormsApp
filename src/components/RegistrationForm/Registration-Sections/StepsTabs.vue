<template>
  <div class="GeneralTabs">
    <div
      class="Tabitem"
      :class="[{ active: tab === 'StudentInfo' }]"
      @click="prev()"
    >
      بيانات الطالب
    </div>
    <div class="Tabitem" :class="[{ active: tab === 'DocumentsNeeded' }]">
      المستندات المطلوبة
    </div>
  </div>
</template>
<script>
import store from "@/store/index.js";
import axios from "axios";
export default {
  name: "RegistrationFormTabs",
  data() {
    return {
      files: null
    };
  },
  props: ["tab"],
  methods: {
    prev() {
      if (this.tab === "DocumentsNeeded") {
        store.state.RegisterStep--;
      }
    }
  },
  mounted() {
    var $this = this;
    axios.get(store.state.domain + "/applicationDocument").then(res => {
      const lengthArray = Object.keys(res.data.data).length;
      $this.files = res.data.data;
      for (let i = 0; i < lengthArray; i++) {
        $this.files[i].document.name_ar;
      }
    });
  }
};
</script>
<style lang="scss">
.GeneralTabs .Tabitem {
    width: auto !important;
}
.GeneralTabs .active {
  color: #FFF;
}
a:hover {
  text-decoration: none !important;
}
</style>
