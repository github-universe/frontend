<template>
    <div class="collection">
        <h2>已收藏专利</h2>
        <div class="item flex" v-for="(item,i) in collectList" :key="i">
            <i class="iconfont icon-zhuanli" @click="view(item)"></i>
            <h3 @click="view(item)">{{item.title1}}</h3>
            <i class="icon iconfont icon-shoucang" @click="getDel(item.patent_id)"></i>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

let commit
const yjip = 'http://192.168.14.198:8000'
const yjip2 = 'http://192.168.14.198:8888'
const ztip = 'http://192.168.5.179:8888'
const ztip2 = 'http://192.168.5.179:8000'
export default {
  name: 'Collection',
  props: {
    name: {
      type: Array,
      default() {
      },
    },
  },
  data() {
    return { collectList: [] }
  },
  computed: {
    ...mapGetters([]), // 页面i18n obj
    ...mapState(['openId']),
  },
  mounted() {
    commit('hideLoading')
  },
  created() {
    commit = this.$store.commit
    this.manage()

  },
  methods: {
    default() {
    },
    manage() {
      this.get(`${ztip}/collection/${this.openId}`).then(e => {
        const f = e.data
        this.get(`${ztip}/patent?patentId=${f}`).then(g => {
          this.collectList = []
          g.data.map((h, i) => {
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
          // console.log(this.collectList)
        })
      })
    },
    getDel(id) {
      this.del(`${ztip}/collection?openid=${this.openId}&patentId=${id}`).then(() => {
        this.manage()

      })
    },
    view(ip) {
      commit('saveIp', ip)
      this.$router.push(`/ip/${ip.patent_id}`)
    },
    ...mapActions(['']),
    ...mapMutations(['']),
  },
  components: {},
}
</script>

<style lang="scss" scoped>
    .collection {
        h2{padding: .4rem 0;}
        .item {
            width: 10rem;
            padding: 0 .5rem;
            align-items: center;
            justify-content: space-around;
            margin-bottom: .5rem;
            h3 {
                margin: 0 .5rem;
                font-size: .44rem;
                line-height: .6rem;
                text-align: left;
                width: 6.6rem;
                overflow: hidden;
                text-overflow: ellipsis;
                color:#454545;
                white-space: nowrap;
            }
            i {
                font-size: .6rem;
                color: #38f;
            }
        }
    }
</style>
