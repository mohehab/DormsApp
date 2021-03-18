<template>
  <section class="terms-and-conditions">
    <div class="page-container">
      <div class="student-info">
        <div class="student-name">
          <p>
            اضافة/تعديل: <span>محمد عبد الغزيز عوض حسن</span> فى
            <span>8:45pm 6/3/2020 </span>
          </p>
        </div>
        <div class="student-search">
          <div class="input-field">
            <input class="search-field" type="text" placeholder="بحث" />
            <font-awesome-icon icon="search" />
          </div>
          <div class="input-field">
            <input class="filter-field" type="text" placeholder="عرض حسب" />
            <font-awesome-icon icon="filter" />
          </div>
        </div>
      </div>
      <DataTable />
      <div class="save-term">
        <span>حفظ</span>
      </div>
    </div>
  </section>
</template>
<script>
import DataTable from "./DataTable";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSortAmountDown,
  faSortAmountUp,
  faSearch,
  faFilter
} from "@fortawesome/free-solid-svg-icons";

library.add(faSortAmountDown, faSortAmountUp, faSearch, faFilter);
export default {
  components: {
    DataTable
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 95%;
  margin: auto;
  .student-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .student-name {
      p {
        color: #6aa3e3;
        margin: 20px 0;
      }
    }
    .student-search {
      display: flex;
      .input-field {
        position: relative;
      }
      input {
        margin-right: 16px;
        padding-right: 30px;
        font-size: 14px;
        border-radius: 3px;
        outline: none;
        border: 1px solid #aaa;
        padding-top: 3px;
        padding-bottom: 3px;
        background: #e6e7e8;
        font-weight: bold;
      }
      svg {
        top: 7px;
        right: 25px;
        position: absolute;
        color: #008eb9;
      }
    }
  }

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
table {
  width: 100%;
}

td,
th {
  border: 1px solid #aaa;
  text-align: right;
  padding: 8px;
}
th {
  color: #008eb9;
  position: relative;
  svg {
    position: absolute;
    top: 12px;
    left: 15px;
  }
}
tr:nth-child(even) {
  background-color: #ececec;
}
tr:nth-child(odd) {
  background-color: #f9f9f9;
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
