<template>
    <div class="more">
        <h2>{{ttl}}相关专利</h2>
        <div class="item flex" v-for="(item,i) in collectList" :key="i" @click="view(item)">
            <i class="iconfont icon-zhuanli"></i>
            <h5 class="grow ellipsis">{{item.title1}}</h5>
            <!--<i class="icon iconfont icon-shoucang" @click="getDel(item.patent_id)" v-if="collect(item.patent_id)"></i>-->
            <!--<i class="icon iconfont icon-shoucang1" @click="getDel(item.patent_id)" v-else></i>-->
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

const ztip = 'http://192.168.5.179:8888'
let commit
export default {
  name: 'More',
  props: {
    name: {
      type: Array,
      default() {
      },
    },
  },
  data() {
    return {
      collectList: [], ttl: ''
    }
  },
  computed: {
    ...mapGetters([]), // 页面i18n obj
    ...mapState(['openId']),
  },
  created() {
    commit = this.$store.commit
    const { openid } = this.$route.query
    if (openid) {
      localStorage.setItem('openId', openid)
      commit('saveOpenId', openid)
    }
    const { ttl } = this.$route.query
    if (!ttl) {
      this.$router.push('/list')
      return
    }
    this.ttl = ttl
    this.get(`${ztip}/patent/search?ttl=${ttl}`).then(e => {
      commit('hideLoading')
      this.collectList = []
      e.data.map((h, i) => {
        this.collectList[i] = h
        if (h.title[0].lang.toLowerCase() == 'cn') {
          this.collectList[i].title1 = h.title[0].text
        } else if (h.title[1] && h.title[1].lang.toLowerCase() == 'cn') {
          this.collectList[i].title1 = h.title[1].text
        }
        if (!this.collectList[i].title1) {
          this.collectList[i].title1 = h.title[0].text
        }
      })
      this.collectList = [...this.collectList]
    })
  },
  mounted() {
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations(['']),
    default() {
    },
    view(ip) {
      commit('saveIp', ip)
      this.$router.push(`/ip/${ip.patent_id}`)
    },
    collect() {
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
    .more {
        padding: 0 .4rem;
        .item {
            margin: .3rem 0;
            align-items: center;
        }
        i {
            font-size: .6rem;
            color: #38f;
        }
        h5 {
            font-size: .45rem;
            margin: 0 .2rem;
        }
    }
</style>
