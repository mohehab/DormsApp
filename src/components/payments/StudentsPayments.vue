<template>
     <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
        <b-row>
            <b-col xl="3">
                <b-form-input
                    type="text"
                    placeholder="Search"
                ></b-form-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="text-center">
                <h3>قائمه طلاب المسددين للرسوم</h3>
            </b-col>
        </b-row>
         <div class="boxContianer">
        <div class="table-style">
          <table class="grey-style">
            <tr>
              <th>
                <input
                  type="checkbox"
                />
              </th>
              <th>الكود</th>
              <th>اسم الطالب</th>
              <th>الجنسيه</th>
              <th>نوع السكن</th>
              <th>التغذيه</th>
              <th>ادمالي المصاريف</th>
              <th>الحاله</th>
            </tr>
            <tr>
              <td>
                <input type="checkbox"/>
              </td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </table>
        </div>
      </div>
     </div>    
</template>
<script>
export default {
    name: "StudentsPayments"
}
</script>
<style lang="sass" scoped>

</style>