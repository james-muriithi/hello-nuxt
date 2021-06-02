<template>
  <div>
    <TheHeader @sidenavToggle="sidenavToggle"></TheHeader>
    <TheSidenav :show="show" @close="sidenavToggle"></TheSidenav>
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/Navigation/TheHeader'
import TheSidenav from '~/components/Navigation/TheSidenav'

export default {
  components: {
    TheHeader,
    TheSidenav,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    sidenavToggle() {
      this.show = !this.show
    },
  },
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}
body {
  margin: 0;
}
</style>
