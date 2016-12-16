<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <transition name="fade" mode="out-in">
      <div class="section">
        <router-view class="view"></router-view>
      </div>
    </transition>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>にゃらん</strong> by <a href="https://github.com/denkigai/">Denkigai</a>.
          </p>
          <p>
            宿・ホテルの宿泊予約・国内旅行ならにゃらん
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="sass">
  $primary: #ff7a15
  @import "~bulma"
  nav
    color: white
  .hero
    .nav
      box-shadow: none
</style>
