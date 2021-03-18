<template>
  <div class="GeneralTabs">
    <div class="Tabitem" :class="[{ active: tab === 'cities' }]">
      <router-link to="/dorms/createDorm">المدن</router-link>
    </div>
    <div class="Tabitem" :class="[{ active: tab === 'groups' }]">
      <router-link to="/dorms/createGroup">المجموعات</router-link>
    </div>
    <div class="Tabitem" :class="[{ active: tab === 'buildings' }]">
      <router-link to="/dorms/createBuilding">المباني</router-link>
    </div>
    <div class="Tabitem" :class="[{ active: tab === 'floors' }]">
      <router-link to="/dorms/createFloor">الادوار</router-link>
    </div>
    <div class="Tabitem" :class="[{ active: tab === 'rooms' }]">
      <router-link to="/dorms/createPartition">الغرف</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "DormsTabs",
  props: ["tab"]
};
</script>
