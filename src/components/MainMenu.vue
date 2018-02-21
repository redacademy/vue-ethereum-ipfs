<template>
  <div>
    <article v-if="netId" class="message is-primary">
      <div class="message-header">
        <p>Connected To:</p>
      </div>
      <div class="message-body">
        {{ netId }}
      </div>
    </article>
    <article v-if="!netId" class="message is-danger">
      <div class="message-header">
        <p>Not Connected</p>
      </div>
      <div class="message-body">
        Please install, <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">MetaMask</a> to use this app.
      </div>
    </article>
    <aside class="menu">
      <p class="menu-label">
        Menu
      </p>
      <ul class="menu-list">
        <li><router-link exact to="/contract">Create a Contract</a></router-link></li>
        <li><router-link exact to="/contracts">View Stored Contracts</a></router-link></li>
        <li><router-link exact to="/">Links</a></router-link></li>
        <li><router-link exact to="/">Home</a></router-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  computed: {
    netId () {
      return this.$store.state.netId
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
