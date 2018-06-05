<template>
    <div class="app flex">
        <!--<img :src="img"/>-->
        <div class="loading" v-if="show" :class="{fade:fade}">
            <div class="loader-10"></div>
        </div>
        <router-view class="grow"></router-view>
        <div class="error msg" v-if="showMsg" :class="{fade:msgfade}" @click="hidemsg">
            <div>{{msg}}</div>
        </div>
        <Tabs></Tabs>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { mapState } from 'vuex'
import Tabs from './components/Tabs'
import './reset.scss'
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.eot'
import './assets/fonts/iconfont.ttf'
import './assets/fonts/iconfont.woff'
import img from './assets/logo.png'

let commit, time1, time2
export default {
  data() {
    return {
      img,
      fade: false,
      msgfade: false,
      showMsg: false,
      show: true,
      msg: '',
    }
  },
  watch: {
    errorMsg(errorMsg) {
      if (errorMsg) {
        this.showMsg = true
        this.msg = errorMsg
        time1 = setTimeout(() => {
          this.msgfade = true
        }, 2000)
        time2 = setTimeout(() => {
          this.hidemsg()
        }, 2800)
      }
    },
    showLoading(e) {
      if (e) {
        this.show = e
      } else {
        this.fade = true
        setTimeout(() => {
          this.fade = false
          this.show = false
        }, 800)
      }
    },
  },
  methods: {
    hidemsg() {
      clearTimeout(time1)
      clearTimeout(time2)
      this.msgfade = false
      this.showMsg = false
      commit('clearMsg')
    },
  },
  created() {
    commit = this.$store.commit
  },
  mounted() {
  },
  computed: {
    ...mapState(['showLoading', 'errorMsg'])
  },
  name: 'app',
  components: { Tabs },
}
</script>

<style lang="scss" scoped>
    .app {
        /*padding-bottom: .6rem;*/
        width: 100vw;
        height: 100vh;
        flex-direction: column;
        align-items: stretch;
        padding-top: .4rem;
        overflow-y: scroll;
        img {
            height: .4rem;
            position: fixed;
            top: .05rem;
            left: .05rem;
        }
        .msg {
            transition: .3s;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            justify-content: center;
            width: 8rem;
            display: flex;
            &.fade {
                transition: 1.2s;
                opacity: 0;
            }
            div {
                padding: .3rem;
                color: white;
                font-size: .4rem;
                line-height: .6rem;
                background: rgba(0, 0, 0, .7);
                border-radius: .08rem;
            }
        }
    }

    .loading {
        background: rgba(50, 136, 255, .5);
        background: rgba(0, 0, 0, .6);
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 11;
        top: 0;
        left: 0;
        transition: 1s;
        &.fade {
            opacity: 0;
        }
        > div {
            height: 3rem;
            width: 3rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -1.8rem 0 0 -1.5rem;
            &:after, &:before {
                border: .5rem solid white;
            }
        }
    }
</style>
