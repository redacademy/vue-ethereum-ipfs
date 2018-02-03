<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="sass">
  $primary: #ff7a15
  @import "~bulma"
  .hero 
    background: none;
  #app
    background-image: url('~assets/img/okinawa.jpg')
    background-size: cover
</style>
