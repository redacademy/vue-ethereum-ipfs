<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass">
  @import "~bulma"
</style>
