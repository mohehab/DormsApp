<template>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
        <h3 class="text-center">التوزيع</h3>

        <div class="show-data table-style">
          <table class="grey-style">
            <tr>
              <th><input type="checkbox"></th>
              <th>اسم الطالب</th>
              <th>رقم المبني</th>
              <th>رقم الدور</th>
              <th>مشرف الدور</th>
              <th>رقم الغرفه</th>
            </tr>
            <tr>
              <td><input type="checkbox"></td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </table>
        </div>

        <div class="save-btn">
          <button type="submit" class="blueBg">
            اظهار الكل
          </button>
          <span class="blueBg">تعديل</span>
        </div>
    </div>
</template>
<script>

export default {
name: "Distribution"

}
</script>
<style lang="scss" scoped>

</style>