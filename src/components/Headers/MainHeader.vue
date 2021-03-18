<template>
  <section class="MainHeader">
    <b-row>
      <div id="open-menu">
        <font-awesome-icon icon="bars" class="open-menu-icone" @click="menuStatus = !menuStatus" />
      </div>
      <b-col cols="6" sm="4" class="logo">
        <img src="@/assets/images/Iskan-Dorms.png" />
      </b-col>
      <b-col cols="4" class="searchBar d-none d-sm-block">
        <b-icon-search></b-icon-search>
        <input placeholder="بحث" type="text" />
      </b-col>
      <b-col cols="6" sm="4" class="UserInfo">
        <div class="notificationsHeadear">
          <b-icon-bell-fill></b-icon-bell-fill>
        </div>
        <div class="settingsLink">
          <b-icon-gear></b-icon-gear>
        </div>
        <div id="ProfileInfo">
          <span id="UserName">أحمد الشناوي</span>
          <img src="@/assets/images/dummy.png" />
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { BRow, BCol } from "bootstrap-vue";
import {
  faBars
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faBars
);
export default {
  name: "MainHeader",
  components: {
    BRow,
    BCol
  },
  computed: {
    menuStatus: {
      get() {
        return this.$store.state.sideMenuStatus;
      },
      set(value) {
        this.$store.commit("setMenuStatus", value);
      }
    },
  },
  methods: {
    toggleMenu() {
      this.menuStatus = !this.menuStatus
    }
  }
};
</script>

<style lang="scss" scoped>
.MainHeader {
  background: #f5f5f5;
  text-align: right;
  box-shadow: 0px 3px 6px #00000029;
  overflow: hidden;
  top: 0;
  right: 0;
  z-index: 1000;
  position: fixed;
  left: 0;
  height: 90px;
  .row{
    height: 100%;
  }
  .logo {
    height: 100%;
  }
  #open-menu{
    position: absolute;
    top: 28px;
    right: 13px;
    z-index: 2;
    cursor: pointer;
    .open-menu-icone{
      font-size: 30px;
    }
  }
  .logo {
    background: #fff;
    text-align: center;
    img {
      width: 50%;
      margin: auto;
    }
  }
  .row {
    align-items: center;
  }
  .searchBar {
    input {
      border: 1px solid #9f9f9f;
      border-radius: 9px;
      padding: 3px 32px 3px 30px;
      background: transparent;
    }
    .bi-search {
      position: absolute;
      top: 7px;
      right: 24px;
      font-size: 16px;
      transform: rotateY(180deg);
      color: #9f9f9f;
    }
  }
  .UserInfo {
    text-align: left;
    @media screen and (max-width: 320px) {
      padding: 15px;
    }
    div {
      display: inline-block;
      margin-left: 30px;
      vertical-align: middle;
      @media screen and (max-width: 375px) {
        margin-left: 20px;
      }
      @media screen and (max-width: 320px) {
        margin-left: 15px;
      }
      .b-icon {
        color: #c7c7c7;
        font-size: 24px;
      }
      #UserName {
        padding-left: 10px;
        font-size: 14px;
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
