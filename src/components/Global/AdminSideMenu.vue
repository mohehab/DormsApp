<template>
  <div class="admin-side-menu" v-if="this.$store.state.sideMenuStatus">
    <div id="close-menu">
      <font-awesome-icon icon="times" class="close-menu-icone" />
    </div>
    <ul class="admin-side-menu-list">
      <li class="admin-side-menu-item">
        <router-link class="admin-side-menu-item-link" to="/"
          ><div class="menu-icon">
            <font-awesome-icon icon="times-circle" />
          </div>
          الرئيسية</router-link
        >
      </li>
      <li class="admin-side-menu-item" @click="dropdown('one')">
        <router-link class="admin-side-menu-item-link" to="#info"
          ><div class="menu-icon">
            <b-icon-person-square></b-icon-person-square>
          </div>
          بيانات الطلاب</router-link
        >
        <ul class="drop-menu-list" v-if="listOne" @click="dropdown('one')">
          <li>
            <router-link :to="{ name: 'AppliedStudents' }"
              > الطلبه المتقدمين </router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'CurrentStudents' }"
              >الطلبه الحاليين</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'TemporarilyStudents' }"
              >الطلبه المؤقتين</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'WaitingList' }"
              >قائمة الانتظار</router-link
            >
          </li>
        </ul>
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item" @click="dropdown('five')">
        <router-link to="#admissions" class="admin-side-menu-item-link"
          ><div class="menu-icon">
            <b-icon-card-list></b-icon-card-list>
          </div>
          مراحل التقديم
        </router-link>
        <ul class="drop-menu-list" v-if="listFive" @click="dropdown('five')">
          <li>
            <router-link :to="{ name: 'newAdmissionPhase' }"
              >قائمة المراحل</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'AdmissionPhaseForm' }"
              >إضافة مرحلة</router-link
            >
          </li>
        </ul>
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item" @click="dropdown('two')">
        <router-link to="#dorms" class="admin-side-menu-item-link"
          ><div class="menu-icon">
            <font-awesome-icon icon="building" />
          </div>
          المدن الجامعيه</router-link
        >
        <ul class="drop-menu-list" v-if="listTwo" @click="dropdown('two')">
          <li>
            <router-link :to="{ name: 'CurrentDorms' }"
              >المدن الحالية</router-link
            >
          </li>
          <!-- <li>
            <router-link :to="{ name: 'createDorm' }">إضافة مدينة</router-link>
          </li> -->
          <!-- <li>
            <router-link :to="{ name: 'createBuilding' }"
              >إضافة مبنى</router-link
            >
          </li> -->
          <!-- <li>
            <router-link :to="{ name: 'createFloor' }">إضافة دور</router-link>
          </li> -->
          <!-- <li>
            <router-link :to="{ name: 'createPartition' }"
              >إضافة غرفة</router-link
            >
          </li> -->
          <li>
            <router-link :to="{ name: 'DormsMap' }">التسكين</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Conditions' }">شروط التسكين</router-link>
          </li>
        </ul>
      </li>
      <li class="admin-side-menu-item" @click="dropdown('six')">
        <router-link class="admin-side-menu-item-link" to="#services"
          ><div class="menu-icon">
            <font-awesome-icon icon="times-circle" />
          </div>
          الخدمات</router-link
        >
        <ul class="drop-menu-list" v-if="listSix" @click="dropdown('six')">
          <li>
            <router-link :to="{ name: 'services' }">قائمة الخدمات</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'AddService' }"
              >إضافة خدمة</router-link
            >
          </li>
        </ul>
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item" @click="dropdown('four')">
        <router-link to="#feeding" class="admin-side-menu-item-link"
          ><div class="menu-icon"><font-awesome-icon icon="stamp" /></div>
          التغذية</router-link
        >
        <ul class="drop-menu-list" v-if="listFour" @click="dropdown('four')">
          <li>
            <router-link :to="{ name: 'Ingredients' }">المخزون</router-link>
          </li>
          <li><router-link :to="{ name: 'Meals' }">الاطباق</router-link></li>
          <li>
            <router-link :to="{ name: 'Tools' }">أدوات المطبخ</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'TimeTable' }">الجداول</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'requestsList' }">الطلبات</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'reservations' }">الحجز</router-link>
          </li>
        </ul>
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item">
        <a class="admin-side-menu-item-link" href=""
          ><div class="menu-icon">
            <font-awesome-icon icon="exclamation-circle" />
          </div>
          الطلبات والاعلانات</a
        >
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item">
        <a class="admin-side-menu-item-link" href=""
          ><div class="menu-icon">
            <font-awesome-icon icon="times-circle" />
          </div>
          الغياب والتصاريح</a
        >
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item" @click="dropdown('three')">
        <router-link class="admin-side-menu-item-link" to="#infractions">
          <div class="menu-icon"><font-awesome-icon icon="gavel" /></div>
          التحذيرات والمخالفات
        </router-link>
        <ul class="drop-menu-list" v-if="listThree" @click="dropdown('three')">
          <li>
            <router-link :to="{ name: 'infractions' }">المخالفات</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'studentInfractions' }"
              >قائمة الطلاب المخالفين</router-link
            >
          </li>
        </ul>
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item" @click="dropdown('seven')">
        <router-link class="admin-side-menu-item-link" to="#penalties">
          <div class="menu-icon"><font-awesome-icon icon="gavel" /></div>
          العقوبات
        </router-link>
        <ul class="drop-menu-list" v-if="listSeven" @click="dropdown('seven')">
          <li>
            <router-link :to="{ name: 'penalties' }">قائمة العقوبات</router-link>
          </li>
        </ul>
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item">
        <a class="admin-side-menu-item-link" href=""
          ><div class="menu-icon">
            <font-awesome-icon icon="dollar-sign" />
          </div>
          الرسوم</a
        >
      </li>
      <!-- ############################# -->
      <li class="admin-side-menu-item">
        <a class="admin-side-menu-item-link" href=""
          ><div class="menu-icon">
            <font-awesome-icon icon="chart-line" />
          </div>
          تقارير واحصائيات</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faBed,
  faStamp,
  faExclamationCircle,
  faTimesCircle,
  faGavel,
  faDollarSign,
  faBuilding,
  faUsers,
  faChartLine,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUserSecret,
  faBed,
  faStamp,
  faExclamationCircle,
  faTimesCircle,
  faGavel,
  faDollarSign,
  faBuilding,
  faUsers,
  faChartLine,
  faBars,
  faTimes
);
import { BIconPersonSquare, BIconCardList } from "bootstrap-vue";
export default {
  name: "AdminSideMenu",
  data() {
    return {
      active: false,
      listOne: false,
      listTwo: false,
      listThree: false,
      listFour: false,
      listFive: false,
      listSix: false,
      listSeven: false
    };
  },
  components: {
    BIconPersonSquare,
    BIconCardList
  },
  methods: {
    dropdown(listName) {
      if (listName == "one") {
        (this.listOne = !this.listOne),
          (this.listTwo = false),
          (this.listThree = false),
          (this.listFour = false),
          (this.listFive = false),
          (this.listSeven = false),
          (this.listSix = false);
      } else if (listName == "two") {
        (this.listOne = false),
          (this.listTwo = !this.listTwo),
          (this.listThree = false),
          (this.listFour = false),
          (this.listSeven = false),
          (this.listFive = false),
          (this.listSix = false);
      } else if (listName == "three") {
        (this.listOne = false),
          (this.listTwo = false),
          (this.listThree = !this.listThree),
          (this.listFour = false),
          (this.listFive = false),
          (this.listSeven = false),
          (this.listSix = false);
      } else if (listName == "four") {
        (this.listOne = false),
          (this.listTwo = false),
          (this.listThree = false),
          (this.listFour = !this.listFour),
          (this.listFive = false),
          (this.listSeven = false),
          (this.listSix = false);
      } else if (listName == "five") {
        (this.listOne = false),
          (this.listTwo = false),
          (this.listThree = false),
          (this.listFour = false),
          (this.listFive = !this.listFive),
          (this.listSeven = false),
          (this.listSix = false);
      } else if (listName == "six") {
        (this.listOne = false),
          (this.listTwo = false),
          (this.listThree = false),
          (this.listFour = false),
          (this.listFive = false),
          (this.listSeven = false),
          (this.listSix = !this.listSix);
      } else {
          (this.listOne = false),
          (this.listTwo = false),
          (this.listThree = false),
          (this.listFour = false),
          (this.listFive = false),
          (this.listSix = false),
          (this.listSeven = !this.listSeven);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: #00bbf3;
}
.admin-side-menu {
  position: fixed;
  width: 235px;
  background: #626f80;
  height: 100%;
  text-align: right;
  float: right;
  right: 0;
  top: 91px;
  z-index: 99;

  @media screen and (max-width: 576px) {
    width: 100%;
    z-index: 99;
    overflow: scroll;
  }

  #close-menu {
    display: none;
  }
  .admin-user {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #008eb9;
    padding: 15px;
    .admin-user-data {
      padding: 10px;
      .admin-user-name {
        color: #fff;
        margin-bottom: 0;
        font-size: 18px;
        font-weight: bold;
      }
      .admin-user-type {
        color: #fff;
        font-size: 14px;
      }
    }
    .user-img {
      width: 45px;
      height: 45px;
      border-radius: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        vertical-align: unset;
      }
    }
  }
  .admin-side-menu-list {
    padding-top: 10px;
    overflow-y: scroll;
    scrollbar-color: transparent transparent;
    .admin-side-menu-item {
      .admin-side-menu-item-link {
        padding: 13px 0;
        display: block;
        color: #fff;
        width: 100%;
        &:hover {
          background: #00bbf3;
        }
        .menu-icon {
          width: 25px;
          float: right;
          margin-right: 30px;
        }
      }
    }
    .drop-menu-list {
      margin: 10px 0;
      li {
        margin-bottom: 15px;
        font-size: 14px;
        width: 100%;
        &:hover {
          background: #00bbf3;
        }
        a {
          color: #fff;
          padding: 5px 65px 5px 0px;
          display: block;
        }
      }
    }
    a {
      color: #d2d2d2;
    }
  }
}

// responsive

@media (max-width: 992px) {
  .admin-side-menu[data-v-2970386e] {
    width: unset;
    right: 0;
    top: 42px;
    bottom: 0;
    left: 0;
    text-align: center;
    display: none;
    #close-menu {
      margin-top: 30px;
      display: block;
      .close-menu-icone {
        color: #fff;
        font-size: 26px;
      }
    }
    .admin-side-menu-list[data-v-2970386e] {
      height: 100%;
    }
    .admin-user[data-v-2970386e] {
      display: none;
    }
    .admin-side-menu-item-link[data-v-2970386e] {
      display: flex;
      justify-content: center;
    }
    .admin-side-menu-list {
      .admin-side-menu-item {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
