<template>
    <div :class="this.$store.state.sideMenuStatus == false ? 'fullwidthAdminContainer' : 'side-admin-container'">
        <Basic />
        <Services />
        <Surcharging />
        <Rates />
    </div>
</template>
<script>
import Basic from './Basic'
import Services from './Services'
import Surcharging from './Surcharging'
import Rates from './Rates'
export default {
    name: "PaymentsReports",
    components: {
        Basic,
        Services,
        Surcharging,
        Rates

    }
}
</script>