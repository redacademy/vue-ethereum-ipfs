<template>
  <nav class="nav has-shadow">
    <div class="nav-left">
      <router-link to="/top" class="nav-item is-brand subtitle is-4">
        <strong>にゃらん</strong>
      </router-link>
    </div>

    <div class="nav-center">
      <a class="nav-item" href="#">
        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>
      <a class="nav-item" href="#">
        <span class="icon">
          <i class="fa fa-twitter"></i>
        </span>
      </a>
    </div>

    <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div class="nav-right nav-menu">
      <router-link class="nav-item" to="/user">アカウント</router-link>
      <a class="nav-item" href="#">
        お問い合わせ
      </a>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="sass">
</style>
