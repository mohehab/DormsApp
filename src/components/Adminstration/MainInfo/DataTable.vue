<template>
  <div class="admission-table">
    <table class="grey-style">
      <tr>
        <th><font-awesome-icon icon="sort-amount-down" />اسم الطالب</th>
        <th><font-awesome-icon icon="sort-amount-down" />الكليه</th>
        <th><font-awesome-icon icon="sort-amount-down" />الفرقه</th>
        <th><font-awesome-icon icon="sort-amount-down" />المحافظه</th>
      </tr>
      <tr>
        <td>أسر نبيه محمد عيد</td>
        <td>حاسبات ومعلومات</td>
        <td>الثانية</td>
        <td>شمال سيناء</td>
      </tr>
      <tr>
        <td>أسر نبيه محمد عيد</td>
        <td>حاسبات ومعلومات</td>
        <td>الثانية</td>
        <td>شمال سيناء</td>
      </tr>
      <tr>
        <td>أسر نبيه محمد عيد</td>
        <td>حاسبات ومعلومات</td>
        <td>الثانية</td>
        <td>شمال سيناء</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSortAmountDown,
  faSortAmountUp,
  faSearch,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown, faSortAmountUp, faSearch, faFilter);
export default {
  data() {
    return {
      DormsStudentID: [],
      DormsStatus: "",
      studentID: null,
      studentData: null
    };
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 95%;
  margin: auto;
  .save-term {
    margin-top: 40px;
    span {
      background: #008eb9;
      padding: 1px 20px;
      border-radius: 10px;
      color: #fff;
    }
  }
}
.admission-table {
  margin: 45px 0;
}
.accepted {
  color: #adca65;
}
.hold {
  color: #03a9f4;
}
.rejected {
  color: #fc394b;
}
</style>
