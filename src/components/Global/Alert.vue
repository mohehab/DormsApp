<template>
  <b-modal :id="name" title="تأكيد الحذف">
    <p class="my-4">{{ this.question }}</p>
    <slot v-for="errors in err">
      <p v-for="(error, i) in errors" :key="i" class="redFont">{{ error }}</p>
    </slot>
    <template #modal-footer="{ cancel }">
      <b-button size="sm" variant="success" @click="handleOk">
        حذف
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()">
        الغاء
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "alert",
  props: ["name", "question", "api", "ids", "reload"],
  data() {
    return {
      err: []
    };
  },
  methods: {
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.delete();
    },
    delete() {
      const $this = this;
      if (Array.isArray(this.ids)) {
      $this.ids.forEach(function(id) {
        axios({
          method: "DELETE",
          url: store.state.domain + $this.api + id,
          headers: {
            localization: store.state.localization
          }
        }).then(res => {
          if (res.status == 200 || res.status == 201) {
            $this.$nextTick(() => {
              $this.$bvModal.hide();
            });
            $this.reload();
          }
        }).catch(error => {
          $this.err = error.response.data.errors;
        });
      });
      } else {
        axios
          .delete(store.state.domain + $this.api + this.ids, config)
          .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$nextTick(() => {
              this.$bvModal.hide();
            });
            this.reload();
          }
        }).catch(error => {
          this.err = error.response.data.errors;
        });
      }
    }
  }
};
</script>
