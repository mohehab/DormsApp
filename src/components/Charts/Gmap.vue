<template>
  <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
    <h1>
      Your coordinates
    </h1>
    <p>{{ coordinates.lat }}, {{ coordinates.lng }}</p>
    <iframe src="https://www.google.com/maps/@30.616419,32.2664637,15.12z"></iframe>
  </div>
</template>

<script>
export default {
  name: "Gmap",
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      }
    };
  }
};
</script>
