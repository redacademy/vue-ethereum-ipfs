<template>
  <div>
    <top-nav></top-nav>
    <div class="container">
      <div class="columns">
          <main-menu class="column is-one-quarter" />
          <div class="column is-three-quarters">
            <div class="box">
              <vue-form :state="formstate" @submit.prevent="onSubmitContract">
                <div class="field">
                  <validate>
                    <label class="label">Name this Contract</label>
                    <div class="control">
                      <input v-model="contract.name" name="name" required class="input" type="text" placeholder="Enter a name for this contract">
                    </div>
                  </validate>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <validate>
                        <label class="label">Participant 1</label>
                        <div class="control">
                          <input v-model="contract.participant1" name="participant1" required class="input" type="text" placeholder="Enter the wallet address of participant 1">
                        </div>
                        <p class="help">Enter a valid Ethereum wallet address</p>
                      </validate>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                       <validate>
                        <label class="label">Participant 2</label>
                        <div class="control">
                          <input v-model="contract.participant2" name="participant2" required class="input" type="text" placeholder="Enter the wallet address of participant 2">
                        </div>
                      </validate>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <validate>
                    <label class="label">Enter your agreement</label>
                    <div class="control">
                      <textarea v-model="contract.terms" name="terms" required class="textarea" type="text" placeholder="..."></textarea>
                    </div>
                  </validate>
                </div>
                <div class="field">
                  <validate>
                    <label class="label">Witness (You)</label>
                    <div class="control">
                      <input v-model="contract.witness" name="witness" :disabled="!contract.witness" :class="{ ['is-danger']: !contract.witness }" required class="input" type="text" placeholder="This input will autofill with your Metamask wallet address">
                      <p v-if="!contract.witness" class="help is-danger">You are not signed in. Sign in to <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">MetaMask</a> to use this app.</p>
                    </div>
                  </validate>
                </div>
                  <article class="message is-warning">
                    <div class="message-body">
                      Submitting this contract adds a record to the Ethereum Blockchain with the above information. 
                    </div>
                  </article>
                  <div class="card-footer-item">
                    <button type="submit" :disabled="formstate.$invalid" class="button is-primary is-fullwidth subtitle">Store Contract</button>
                  </div>
              </vue-form>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import MainMenu from './MainMenu'
    import TopNav from './TopNav.vue'
    import { saveContract } from '../web3Service'

    export default {
      data () {
        return {
          formstate: {},
          contract: {
            name: '',
            terms: '',
            participant1: '0xdce2ad5EA9eABe93f7a43E00D15abf90aD35b0d4',
            participant2: '0x206A54DD90f1B1126C4ceE00Cd95D2037980Db59',
            witness: web3.eth.defaultAccount
          }
        }
      },
      methods: {
        onSubmitContract () {
          saveContract(this.$data.contract)
        }
      },
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
