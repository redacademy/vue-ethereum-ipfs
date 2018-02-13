<template>
  <div>
    <top-nav></top-nav>
    <div class="container">
      <div class="columns">
          <main-menu class="column is-one-quarter" />
          <div class="column is-three-quarters">
              https://hackernoon.com/ether-purchase-power-df40a38c5a2f
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import MainMenu from './MainMenu'
    import TopNav from './TopNav.vue'
    export default {
      components: {
        MainMenu,
        TopNav
      }
    }
</script>

<style lang="sass" scoped>
    .container
      padding-top: 4rem
</style>
