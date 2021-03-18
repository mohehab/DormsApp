<template>
     <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
         <div class="boxContianer">
        <div class="table-style">
          <table class="grey-style">
            <tr>
              <th>
                <input
                  type="checkbox"
                />
              </th>
              <th>الرقم</th>
              <th>اللقب</th>
              <th>فئه المقيمين</th>
              <th>الجنسيه</th>
              <th>نوع السكن</th>
              <th>تعديل</th>
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
            </tr>
          </table>
        </div>
      </div>
      <div class="save-btn">
            <button
            type="submit"
            class="blueBg"
            >
            اضافه نظام دفع جديد
            </button>
            <span class="redBg">
                اللغاء
            </span>
        </div>
     </div>    
</template>
<script>
export default {
    name: "PaymentsOverView"
}
</script>
<style lang="scss" scoped>

</style>