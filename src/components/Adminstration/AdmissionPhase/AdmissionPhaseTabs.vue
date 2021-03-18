<template>
    <div class="admission-phase-tabs">
        <a :class="[{ active: tab === 'main', done: tab === 'terms' }]">بيانات المرحلة الرئيسية</a>
        <a :class="[{ active: tab === 'terms'  }]">الفترات</a>
      </div>
</template>

<script>
export default {
    name: "AdmissionPhaseTabs",
    props: ["tab"],
}
</script>
<style scoped>
  .active {
    background: #03a9f3;
    cursor: pointer;
    color: #fff;
  }
  .done {
    background: transparent;
    color: #5C5C5C
  }
</style>
