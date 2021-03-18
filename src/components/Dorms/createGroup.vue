<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <Dormstabs tab="groups" />
    <form>
      <b-row class="data-row">
        <b-col xl="6" lg="8" class="data-item">
          <label>{{$t('choose') + " " + $t('dorm')}} <span class="required">*</span></label>
          <b-form-select
            v-model="dormID"
            disabled-field="notEnabled"
            :class="dormID != null ? 'is-valid' : ''"
          >
            <b-form-select-option :value="null" disabled
              >{{$t('choose') + " " + $t('dorm')}}</b-form-select-option
            >
            <b-form-select-option
              v-for="dorm in dorms"
              :key="dorm.id"
              :value="dorm.id"
              >{{ dorm.name_ar }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-col xl="6" lg="8">
            <label
              >اسم المجموعة باللغة العربية
              <span class="required">*</span></label
            >
            <b-form-input
              type="text"
              v-model="buildingGroupNameAr"
              :state="groupArState"
              required
            ></b-form-input>
            <b-form-invalid-feedback>
              أدخل اسم المجموعة باللغة العربية
            </b-form-invalid-feedback>
        </b-col>
        <b-col xl="6" lg="8">
          <label
            >اسم المجموعة باللغة الانجليزية
            <span class="required">*</span></label
          >
          <b-form-input
            type="text"
            v-model="buildingGroupNameEn"
            :state="groupEnState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            أدخل اسم المجموعة باللغة الانجليزية
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="data-row">
        <b-col xl="6" lg="8" class="data-item">
          <label>الفئة <span class="required">*</span></label>
          <b-form-select
            v-model="category"
            disabled-field="notEnabled"
            :class="category != null ? 'is-valid' : ''"
          >
            <b-form-select-option :value="null" disabled
              >اختيار الفئة</b-form-select-option
            >
            <b-form-select-option
              v-for="buildingGroupCategory in buildingGroupCategories"
              :key="buildingGroupCategory.id"
              :value="buildingGroupCategory.id"
              >{{ buildingGroupCategory.name_ar }}</b-form-select-option
            >
            <b-form-select-option
              v-for="(tag, index) in tags"
              :key="index"
              :value="tag"
              name="Categories"
              >{{ tag }}</b-form-select-option
            >
          </b-form-select>
        </b-col>
        <!-- <b-col xl="6" lg="8" class="data-item">
          <label>إضافة فئة</label>
          <b-form-tags
            class="add-new"
            input-id="tags-remove-on-delete"
            :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
            placeholder="إضافة فئة جديدة"
            add-button-text="إضافة"
            remove-on-delete
            disableAddButton="true"
            v-model="tags"
          ></b-form-tags>
        </b-col> -->
      </b-row>
      <b-row v-if="err.length != 0">
        <p>البيانات غير مكتملة أو غير صحيحة، من فضلك أكمل الآتي:</p>
        <slot v-for="(errors, x) in err">
        <ul class="form--error" :key="x">
          <li v-for="(error, i) in errors" :key="i"
          >
            {{error}}
          </li>
        </ul>
        </slot>
      </b-row>
      <div class="save-btn">
        <slot v-if="recordForUpdate == null">
          <button
            type="submit"
            @click.prevent="OnSubmit"
            class="blueBg"
            v-if="
              this.groupArState == true &&
                this.groupEnState == true &&
                this.dormID !== '' &&
                this.category !== null
            "
          >
            {{$t('save')}}
          </button>
          <button
            type="submit"
            @click.prevent="OnSubmit('/dorms/createBuilding')"
            class="blueBg"
            v-if="
              this.groupArState == true &&
                this.groupEnState == true &&
                this.dormID !== '' &&
                this.category !== null
            "
          >
            {{$t('next')}}
          </button>
        </slot>
        <button
          type="submit"
          class="blueBg"
          @click.prevent="UpdateGroup"
          v-if="recordForUpdate != null"
        >
          {{ $t("Edit") }}
        </button>
        <span class="redBg" @click="resetData">{{$t('cancel')}}</span>
      </div>
    </form>
    <div class="show-data table-style mt-3">
      <table class="grey-style">
        <tr>
          <th>
            <input
              type="checkbox"
              @click="select_all_via_check_box"
              v-model="all_select"
            />
          </th>
          <th>{{$t('group')}}</th>
          <th>الفئة</th>
          <th>{{ $t("Edit") }}</th>
        </tr>
        <tr v-for="buildingGroup in buildingGroups" :key="buildingGroup.id">
          <td>
            <input
              type="checkbox"
              v-model="updateItems"
              :value="buildingGroup.id"
            />
          </td>
          <td>{{ buildingGroup.name_ar }}</td>
          <td>{{ buildingGroup.category.name_ar }}</td>
          <td class="text-center">
            <span class="blueBg actions" @click="returnGroup(buildingGroup.id)"
              ><b-icon-pencil-fill></b-icon-pencil-fill
            ></span>
          </td>
        </tr>
        <tr v-if="buildingGroups.length < 1">
          <td colspan="4">
            <h4 class="text-center">لا توجد مجموعات مسجلة</h4>
          </td>
        </tr>
      </table>

      <div class="table-btns-container save-btn" v-if="buildingGroups.length >= 1">
        <span class="redBg" v-b-modal="'deleteGroup'">{{$t('Delete')}}</span>
        <AlertBox
          :name="'deleteGroup'"
          question="هل تريد حذف المجموعة ؟"
          api="/buildingGroup/"
          :ids="this.updateItems"
          :reload="getTableResults"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertBox from "../Global/Alert";
import store from "@/store/index.js";
import axios from "axios";
import Dormstabs from "./DormsTabs";
let config = {
  headers: {
    localization: store.state.localization
  }
};
export default {
  name: "createGroup",
  components: {
    Dormstabs,
    AlertBox
  },
  data() {
    return {
      recordForUpdate: null,
      err: [],
      dorms: [],
      submitStatus: "",
      all_select: false,
      updateItems: [],
      tags: [],
      buildingGroups: [],
      buildingGroupCategories: [],
      buildingGroupNameAr: "",
      buildingGroupNameEn: "",
      category: null,
      checked: false,
      dormID: null
    };
  },
  mounted() {
    this.getTableResults();
    axios
      .get(store.state.domain + "/buildingGroupCategory", config)
      .then(res => (this.buildingGroupCategories = res.data.data));
    axios
      .get(store.state.domain + "/dorm", config)
      .then(res => (this.dorms = res.data.data));
  },
  computed: {
    groupArState() {
      if (this.buildingGroupNameAr.length == 0) {
        return null;
      } else if (
        this.buildingGroupNameAr.match(/^[ء-ي\s]*$/) &&
        this.buildingGroupNameAr.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    groupEnState() {
      if (this.buildingGroupNameEn.length == 0) {
        return null;
      } else if (
        this.buildingGroupNameEn.match(/^[a-zA-Z0-9,.!? ]*$/) &&
        this.buildingGroupNameEn.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    resetData() {
      this.buildingGroupNameAr = "";
      this.buildingGroupNameEn = "";
      this.tags = [];
      this.category = null;
      this.recordForUpdate = null;
      this.dormID = null,
      this.err = []
    },
    returnGroup(id) {
      this.recordForUpdate = id;
      axios
        .get(store.state.domain + "/buildingGroup/" + id, config)
        .then(res => {
          (this.buildingGroupNameAr = res.data.data.name_ar),
            (this.buildingGroupNameEn = res.data.data.name_en),
            (this.category = res.data.data.category.id),
            (this.dormID = res.data.data.dorm_id),
            (this.err = [])
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    UpdateGroup() {
      axios({
        method: "PUT",
        url: store.state.domain + "/buildingGroup/" + this.recordForUpdate,
        headers: {
          localization: store.state.localization
        },
        data: {
          name_ar: this.buildingGroupNameAr,
          name_en: this.buildingGroupNameEn,
          category_id: this.category,
          dorm_id: this.dormID
        }
      })
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            this.getTableResults();
            this.resetData();
          }
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    OnSubmit(next) {
      const $this = this;
      const categories = $this.buildingGroupCategories;
      if (this.tags.length > 0) {
        this.tags.forEach(function(tag) {
          axios({
            method: "POST",
            url: store.state.domain + "/buildingGroupCategory",
            headers: {
              localization: store.state.localization
            },
            data: {
              name_ar: tag,
              name_en: tag
            }
          }).then(
            axios
              .get(store.state.domain + "/buildingGroupCategory", config)
              .then(res => ($this.buildingGroupCategories = res.data.data))
              .then(
                axios({
                  method: "POST",
                  url: store.state.domain + "/buildingGroup",
                  headers: {
                    localization: store.state.localization
                  },
                  data: {
                    name_ar: $this.buildingGroupNameAr,
                    name_en: $this.buildingGroupNameEn,
                    category_id: categories[categories.length - 1].id + 1,
                    dorm_id: this.dormID
                  }
                })
                  .then(res => {
                    if (res.status == 200 || res.status == 201) {
                      $this.getTableResults();
                      if (next) {
                        $this.$router.push(next);
                      }
                    }
                  })
                  .catch(error => {
                    this.err = error.response.data.errors;
                  })
              )
          );
        });
      } else {
        axios({
          method: "POST",
          url: store.state.domain + "/buildingGroup",
          headers: {
            localization: store.state.localization
          },
          data: {
            name_ar: this.buildingGroupNameAr,
            name_en: this.buildingGroupNameEn,
            category_id: this.category,
            dorm_id: this.dormID
          }
        })
          .then(res => {
            if (res.status == 200 || res.status == 201) {
              $this.getTableResults();
              if (next) {
                $this.$router.push(next);
              }
            }
          })
          .catch(error => {
            this.err = error.response.data.errors;
          });
      }
    },
    select_all_via_check_box() {
      if (this.all_select == false) {
        this.all_select = true;
        this.buildingGroups.forEach(group => {
          this.updateItems.push(group.id);
        });
      } else {
        this.all_select = false;
        this.updateItems = [];
      }
    },
    onUpdate(id) {
      axios
        .get(store.state.domain + "/buildingGroup/" + id, config)
        .then(res => {
          (this.buildingGroupNameAr = res.data.data.name_ar),
            (this.buildingGroupNameEn = res.data.data.name_en),
            (this.category = res.data.data.category.id);
        })
        .catch(error => {
          this.err = error.response.data.errors;
        });
    },
    getTableResults() {
      axios
        .get(store.state.domain + "/buildingGroup", config)
        .then(res => (this.buildingGroups = res.data.data))
        .catch(error => {
          this.err = error.response.data.errors;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 50px 0;
  .row {
    margin: 0;
  }
  .headForm {
    margin-bottom: 20px;
  }
  .data-row {
    margin-bottom: 25px;
    .dropdown {
      width: 74%;
      float: left;
      .custom-control-label {
        padding-right: 35px;
        &::after,
        &::before {
          right: 10px;
        }
      }
    }
  }
  input {
    @media (max-width: 1199px) {
      margin-bottom: 20px;
    }
    @media (max-width: 375px) {
      width: 68%;
    }
    @media (max-width: 320px) {
      width: 65%;
    }
  }
  .add-new {
    @media (max-width: 375px) {
      width: 70%;
    }
    @media (max-width: 320px) {
      width: 65%;
    }
  }
}
.show-data {
  margin-top: 20px;
}
</style>
