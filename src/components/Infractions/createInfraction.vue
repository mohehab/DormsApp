<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h4 class="text-center">إضافة مخالفة</h4>
    <form>
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>اسم المخالفة باللغة العربية</label>
          <b-form-input
            type="text"
            v-model="infraction.nameAr"
            required
            :state="infractionNameArState"
          ></b-form-input>
          <b-form-invalid-feedback>
            ادخل اسم المخالفة باللغة الانجليزية
          </b-form-invalid-feedback>
        </b-col>
        <b-col cols="5" class="data-item">
          <label>اسم المخالفة باللغة الانجليزية</label>
          <b-form-input
            type="text"
            v-model="infraction.nameEn"
            :state="infractionNameEnState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            ادخل اسم المخالفة باللغة الانجليزية
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="5" class="data-item" offset-lg="1">
          <label>وصف المخالفة باللغة العربية</label>
          <b-form-input
            type="text"
            v-model="infraction.desAr"
            required
            :state="infractionDesArState"
          ></b-form-input>
          <b-form-invalid-feedback>
            ادخل وصف المخالفة باللغة العربية
          </b-form-invalid-feedback>
        </b-col>
        <b-col cols="5" class="data-item">
          <label>وصف المخالفة باللغة الانجليزية</label>
          <b-form-input
            type="text"
            v-model="infraction.desEn"
            :state="infractionDesEnState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            ادخل اسم المخالفة باللغة الانجليزية
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <div class="table-style">
          <table class="grey-style">
            <label class="text-center">العقوبات</label>
            <tr>
              <th>مرات التكرار</th>
              <th>تصنيف العقوبة</th>
              <th>{{$t('Delete')}}</th>
            </tr>
            <tr v-for="(penalty, index) in repeatPenalties" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <b-form-select
                  v-model="penalty.penalty_id"
                  disabled-field="notEnabled"
                >
                  <b-form-select-option :value="null" disabled
                    >اختار العقوبة</b-form-select-option
                  >
                  <b-form-select-option
                    v-for="penalty in penalities"
                    :key="penalty.id"
                    :value="penalty.id"
                    >{{ penalty.name_ar }}</b-form-select-option
                  >
                </b-form-select>
              </td>
              <td><span class="redBg">{{$t('Delete')}}</span></td>
            </tr>
            <tr>
              <td colspan="3">
                <span @click="addPenaltyRepeat">إضافة تكرار للعقوبة +</span>
              </td>
            </tr>
          </table>
        </div>
      </b-row>
      <div class="save-btn">
        <span class="blueBg" @click.prevent="OnSubmit('PUT', '/infractions/update/' + $route.params.id)"
          v-if="
              $route.params.name == 'editInfraction' &&
              infractionNameArState == true &&
                infractionNameEnState == true &&
                infractionDesEnState == true &&
                infractionDesArState == true
            "
        >
          {{$t('Edit')}}
        </span>
        <span class="blueBg" @click.prevent="OnSubmit('POST', '/infractions/store')"
          v-if="
              $route.params.name !== 'editInfraction' &&
              this.infractionNameArState == true &&
                this.infractionNameEnState == true &&
                this.infractionDesEnState == true &&
                this.infractionDesArState == true
            "
        >
          {{$t('save')}}
        </span>
        <span class="redBg" @click="resetData">{{$t('cancel')}}</span>
      </div>
    </form>
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
  name: "createInfraction",
  data() {
    return {
      err: [],
      penalities: [],
      repeatPenalties: [
        {
          repeat: 1,
          penalty_id: null
        }
      ],
      infractions: [],
      infraction: {
        nameAr: "",
        nameEn: "",
        desAr: "",
        desEn: "",
        penalities: null
      }
    };
  },
  mounted() {
    if (this.$route.params.id) {
      axios
        .get(
          store.state.domain + "/infractions/show/" + this.$route.params.id,
          config
        )
        .then(res => {
          (this.infraction.nameAr = res.data.data.name_ar),
            (this.infraction.nameEn = res.data.data.name_en),
            (this.infraction.desAr = res.data.data.description_ar),
            (this.infraction.desEn = res.data.data.description_en);
        });
    }
    axios
      .get(store.state.domain + "/penalties/index", config)
      .then(res => (this.penalities = res.data.data));
  },
  computed: {
    infractionNameArState() {
      if (this.infraction.nameAr.length == 0) {
        return null;
      } else if (
        this.infraction.nameAr.match(/[\u0600-\u06FF\u0750-\u077F]/) &&
        this.infraction.nameAr.length > 0 &&
        !this.infraction.nameAr.match(/^[a-zA-Z0-9,.!? ]*$/)
      ) {
        return true;
      } else {
        return false;
      }
    },
    infractionNameEnState() {
      if (this.infraction.nameEn.length == 0) {
        return null;
      } else if (
        this.infraction.nameEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.infraction.nameEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    infractionDesEnState() {
      if (this.infraction.desEn.length == 0) {
        return null;
      } else if (
        this.infraction.desEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.infraction.desEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    infractionDesArState() {
      if (this.infraction.desAr.length == 0) {
        return null;
      } else if (
        this.infraction.desAr.match(/[\u0600-\u06FF\u0750-\u077F]/) &&
        this.infraction.desAr.length > 0 &&
        !this.infraction.desAr.match(/^[a-zA-Z0-9,.!? ]*$/)
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    addPenaltyRepeat(index) {
      this.repeatPenalties.push({
        repeat: "",
        penalty_id: index + 1
      });
    },
    OnSubmit(method, link) {
        axios({
          method: method,
          url:
            store.state.domain + link,
          headers: {
            localization: store.state.localization
          },
          data: {
            name_ar: this.infraction.nameAr,
            name_en: this.infraction.nameEn,
            description_ar: this.infraction.desAr,
            description_en: this.infraction.desEn
          }
        })
          .then(this.$router.push("/infractions"))
          .catch(error => {
            this.err = error.response.data.errors;
          })
    },
    resetData() {
      this.infraction.nameAr = "";
      this.infraction.nameEn = "";
      this.infraction.desAr = "";
      this.infraction.desEn = "";
    }
  }
};
</script>