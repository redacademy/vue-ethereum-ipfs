<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <navigation></navigation>
    </div>
  </section>

</template>

<script>
import Navigation from 'components/Navigation.vue'
export default {
  components: {
    Navigation
  }
}
</script>

<style lang="sass">
  .hero
    background-image: url('~assets/okinawa.jpg')
    background-size: 100%
    .nav
      box-shadow: none
</style>
