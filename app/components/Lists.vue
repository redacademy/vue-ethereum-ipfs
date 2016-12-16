<template>
  <div class="">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>12340</strong> の宿・ホテル
          </p>
        </div>
        <div class="level-item">
          <p>
            <input class="input" type="text" placeholder="場所">
          </p>
        </div>
        <div class="level-item">
          <p>
            <input class="input" type="text" placeholder="日程">
          </p>
        </div>
        <div class="level-item">
          <p>
            <input class="input" type="text" placeholder="人数">
          </p>
        </div>
        <p class="level-item"><a class="button is-success">検索</a></p>

      </div>

      <!-- Right side -->
      <div class="level-right">
      </div>
    </nav>
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">One</p>
        </div>
        <div class="tile is-child box">
          <p class="title">Two</p>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">Three</p>
        </div>
      </div>
    </div>
    <article class="tile box">
      <p>
        hoo
      </p>
    </article>
    <article class="tile box">
      <p>
        hoo
      </p>
    </article>
  </div>

</template>

<script>
import { Lory, Item, Prev, Next } from 'vue-lory'
import User from 'components/User.vue'
export default {
  components: {
    Lory,
    Item,
    Prev,
    Next,
    User
  }
}
</script>

<style lang="sass">
</style>
