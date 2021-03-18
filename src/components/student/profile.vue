<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <form>
      <h2 class="text-center">الملف الشخصي للطالب</h2>

    <b-row>
        <b-col>
            <img src="@/assets/emptyimg.png" alt="" />
        </b-col>
    </b-row>        
      <b-row>
        <b-col>
          <label>الاسم</label>
          <input />
        </b-col>
        <b-col>
          <label>الكود</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>المدرسه</label>
          <input />
        </b-col>
        <b-col>
          <label>الدرجه</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>الكليه</label>
          <input />
        </b-col>
        <b-col>
          <label>التقدير/GPA</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>السنه الدراسيه</label>
          <input />
        </b-col>
        <b-col>
          <label>الديانه</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>طالب جديد / قديم</label>
          <input />
        </b-col>
        <b-col>
          <label>تاريخ القبول</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>رقم المبني</label>
          <input />
        </b-col>
        <b-col>
          <label>رقم الغرفه</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>شركاء الغرفه</label>
          <input />
        </b-col>
        <b-col>
          <label>رقم الغرفه</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>نوع السكن</label>
          <input />
        </b-col>
        <b-col>
          <label>الدفع</label>
          <input />
        </b-col>
      </b-row>


      <b-row>
        <b-col lg="6">
          <label>التغذيه</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label>الطلبات</label>
          <input />
        </b-col>
        <b-col>
          <label>اخر الطلبات</label>
          <input />
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6">
          <label>تحذير</label>
          <input />
        </b-col>
      </b-row>

    <h3>المخالفات</h3>
    <div class="show-data table-style">
      <table class="grey-style">
        <tr>
          <th> المخالفات </th>
          <th>الوقت المتكرر</th>
          <th>اخر تاريخ</th>
          <th>ملاحظات</th>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
      </table>
    </div>

    </form>

    <b-row>
        <b-col>
            <h3>النشاط المسجل: </h3>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <p class="activity-request">محمد طلب تغيير الغرفه</p>
        </b-col>
    </b-row>

  </div>
</template>

<script>
// import emptyimg from '../../assets/emptyimg.png';
export default {
    name: "profile"
}
</script>

<style lang="scss">
    .activity-request{
        margin: 30px 10% 30px 0;
    }
</style>