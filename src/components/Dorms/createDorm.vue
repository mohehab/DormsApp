<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <Dormstabs tab="cities" />
    <form>
      <h2 class="text-center" v-if="!this.$route.params.id">إضافة مدينة</h2>
      <h2 class="text-center" v-if="this.$route.params.id">
        {{ $t("Edit") }} {{ dorm.dormNameAr }}
      </h2>
      <b-row>
        <b-col>
          <label
            >اسم المدينة باللغة العربية <span class="required">*</span></label
          >
          <b-form-input
            type="text"
            v-model="dorm.dormNameAr"
            :state="cityArState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            ادخل اسم المدينة باللغة العربية
          </b-form-invalid-feedback>
        </b-col>
        <b-col>
          <label
            >اسم المدينة باللغة الانجليزية
            <span class="required">*</span></label
          >
          <b-form-input
            type="text"
            v-model="dorm.dormNameEn"
            :state="cityEnState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            ادخل اسم المدينة باللغة الانجليزية
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label>{{ $t("address") }} <span class="required">*</span></label>
          <b-form-input
            type="text"
            v-model="dorm.dormAddress"
            :state="cityAddress"
            required
          ></b-form-input>
        </b-col>
        <b-col>
          <label>{{ $t("Status") }}<span class="required">*</span></label>
          <b-form-select
            :class="status != null ? 'is-valid' : ''"
            v-model="status"
            :options="options"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null" disabled>{{
              $t("choose") + " " + $t("Status")
            }}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row v-if="err.length != 0">
        <slot v-for="(errors, x) in err">
          <ul class="form--error" :key="x">
            <p>البيانات غير مكتملة أو غير صحيحة، من فضلك أكمل الآتي:</p>
            <li v-for="(error, i) in errors" :key="i">
              {{ error }}
            </li>
          </ul>
        </slot>
      </b-row>
      <div class="save-btn">
        <button
          type="submit"
          @click.prevent="OnSubmit('/dorms', 'PUT', '/' + $route.params.id)"
          class="blueBg"
          v-if="
            this.$route.params.id &&
              this.cityArState == true &&
              this.cityEnState == true &&
              this.dorm.dormAddress !== '' &&
              this.status !== null
          "
        >
          {{ $t("Edit") }}
        </button>
        <slot v-if="!this.$route.params.id">
          <button
            type="submit"
            @click.prevent="OnSubmit('/dorms', 'POST')"
            class="blueBg"
            v-if="
              this.cityArState == true &&
                this.cityEnState == true &&
                this.dorm.dormAddress !== '' &&
                this.status !== null
            "
          >
            {{ $t("save") }}
          </button>
          <button
            type="submit"
            @click.prevent="OnSubmit('/dorms/createGroup', 'POST')"
            class="blueBg"
            v-if="
              this.cityArState == true &&
                this.cityEnState == true &&
                this.dorm.dormAddress !== '' &&
                this.status !== null
            "
          >
            {{ $t("next") }}
          </button>
        </slot>
        <span class="redBg" @click="resetData">{{ $t("cancel") }}</span>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store/index.js";
import axios from "axios";
import Dormstabs from "./DormsTabs";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "createDorm",
  components: {
    Dormstabs
  },
  data() {
    return {
      err: [],
      status: null,
      dorms: "",
      dorm: {
        dormNameAr: "",
        dormNameEn: "",
        dormAddress: ""
      },
      options: [
        { item: "active", name: "مفعل" },
        { item: "off", name: "مغلق" }
      ]
    };
  },
  mounted() {
    if (this.$route.params.id) {
      axios
        .get(store.state.domain + "/dorm/" + this.$route.params.id, config)
        .then(res => {
          (this.dorm.dormNameAr = res.data.data.name_ar),
            (this.dorm.dormNameEn = res.data.data.name_en),
            (this.dorm.dormAddress = res.data.data.address_ar),
            (this.status =
              res.data.data.status.charAt(0).toLowerCase() +
              res.data.data.status.slice(1));
        });
    }
  },
  computed: {
    cityArState() {
      if (this.dorm.dormNameAr.length == 0) {
        return null;
      } else if (
        this.dorm.dormNameAr.match(/^[ء-ي\s]*$/) &&
        this.dorm.dormNameAr.length > 0 &&
        !this.dorm.dormNameAr.match(/^[a-zA-Z0-9,.!? ]*$/)
      ) {
        return true;
      } else {
        return false;
      }
    },
    cityEnState() {
      if (this.dorm.dormNameEn.length == 0) {
        return null;
      } else if (
        this.dorm.dormNameEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.dorm.dormNameEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    cityAddress() {
      if (this.dorm.dormAddress.length == 0) {
        return null;
      } else if (this.dorm.dormAddress.length > 5) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    resetData() {
      this.dorm.dormNameAr = "";
      this.dorm.dormNameEn = "";
      this.dorm.dormAddress = "";
      (this.status = null), (this.err = []);
    },
    OnSubmit(next, method, id) {
      if (id == undefined) {
        id = ''
      }
      axios({
        method: method,
        url: store.state.domain + "/dorm" + id,
        headers: {
          localization: store.state.localization
        },
        data: {
          name_ar: this.dorm.dormNameAr,
          name_en: this.dorm.dormNameEn,
          status: this.status,
          address_ar: this.dorm.dormAddress
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.$router.push(next);
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    }
  }
};
</script>
<style lang="scss">
form {
  margin: 50px 0;
  .row {
    margin-bottom: 20px;
  }
  label {
    color: #6aa3e3;
  }
  input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #707070;
    padding: 3px 5px;
  }
}
</style>
