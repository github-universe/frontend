<template>
    <scroll-load :bottom-load-method="refresh" :is-top-bounce="false" class="ip1"
                 :bottom-config="{triggerText:'向我推荐专利'}">
        <div class="ip">
            <h2><i class="icon iconfont icon-zhuanli1"></i>专利详情</h2>
            <div class="item">
                <div class="flex">
                    <img :src="ipDetail.thumbnail"/>
                    <div>
                        <div class="title" :class="{'ellipsis-2':ellipsis}">{{title}}</div>
                        <div>{{ipDetail.patent_number}}</div>
                        <div>{{ipDetail.apno}}</div>
                        <div style="text-align: right">
                            <a :href="ipDetail.claim_link" target="_blank">智慧芽链接</a>
                        </div>
                    </div>
                </div>
                <!--<div class="flex">-->
                <p>{{abstract}}</p>
                <!--</div>-->
                <div style="padding:.2rem">申请状态：<span style="font-weight: bold">{{legal}}</span></div>
                <h3 style="margin-top:.3rem;font-size: .4rem;text-align: left;margin:0 .2rem;">专利价值分析：</h3>
                <div v-for="(e,key) in ipValueDetail[0]" :key="key" class="flex line"
                     v-if="key!='patent_id'">
                    <div style="width:60%">{{key}}：</div>
                    <div style="width:40%">{{e}}</div>
                </div>
                <div class="flex line" v-if="citationDetail[0]">
                    <div style="width:60%">被引用次数：</div>
                    <div style="width:40%">{{citationDetail[0].count}}</div>
                </div>
            </div>
        </div>
    </scroll-load>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

const yjip = 'http://192.168.14.234:8000'
const yjip2 = 'http://192.168.14.234:8888'
const ztip = 'http://192.168.5.179:8888'
let commit
export default {
  name: 'Ip',
  props: {
    name: {
      type: Array,
      default() {
      },
    },
  },
  data() {
    return {
      ellipsis: false,
      url: '',
      id: undefined,
    }
  },
  computed: {
    legal() {
      let legal
      this.ipDetail.legal.legal_status[0].legal_desc.map(e => {
        if (e.lang.toLowerCase() == 'cn') {
          legal = e.text
        }
      })
      return legal
    },
    abstract() {
      let abstract
      this.ipDetail.abstract.map(e => {
        if (e.lang.toLowerCase() == 'cn') {
          abstract = e.text
        }
      })
      return abstract
    },
    title() {
      let title
      console.log(this.ipDetail)
      if (this.ipDetail.title) return undefined
      this.ipDetail.title.map(e => {
        if (e.lang.toLowerCase() == 'cn') {
          title = e.text
        }
      })
      return title
    },
    ...mapGetters([]), // 页面i18n obj
    ...mapState(['ipDetail', 'citationDetail', 'ipValueDetail', 'openId']),
  },
  created() {
    commit = this.$store.commit
    commit('clearIp')
    let { ipId } = this.$route.params
    if (ipId) {
      localStorage.setItem('ipId', ipId)
    } else {
      ipId = localStorage.getItem('ipId')
    }
    this.id = ipId
    commit('showLoading')
    setTimeout(() => {
      commit('hideLoading')
    }, 0)
    // this.get this.post
  },
  mounted() {
    // document.getElementsByClassName('default-text')[0].style.paddingTop='.4rem'
    // this.$router.push({ name: 'IpDetail', id: 1 })
    // console.log(this.url)
    // this.$router.push(this.url)
    // this.getAnother()
    this.getIpValueDetail()
    this.getCitationDetail()
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations(['']),
    getIp(id) {
      commit('clearIp')
      this.get(`${ztip}/patent?patentId=${id}`).then(e => {
        commit('hideLoading')
        commit('saveIp', e.data[0])
        this.getIpValueDetail()
        this.getCitationDetail()
      }, err => {
      })
    },
    getAnother(loaded) {
      console.log('getAnother')
      this.get(`${ztip}/recommend/userbase?openid=${this.openId}&howMany=1`)
        .then(({ data }) => {
          this.id = data[0]
          this.getIp(data[0])
          console.log(this.id)
          loaded && loaded('done')
        })
    },
    refresh(loaded) {
      commit('showLoading')
      this.getAnother(loaded)
      return
      this.get(`/recommend/userbase?openid=${this.openId}&howMany=1 `).then(s => {
        console.log(10)
        loaded('done')
      }, e => {
        console.log(0)
        this.$toastr.e('网络出了问题')
        loaded('done')
      })
    },
    getIpValueDetail() {
      this.get(`${ztip}/patent/valuation?patentId=${this.id}`).then(e => {
        commit('saveIpValueDetail', e.data)
      })
    },
    getCitationDetail() {
      this.get(`${ztip}/patent/citation/count?patentId=${this.id}&citationType=CITES`).then(e => {
        commit('saveCitationDetail', e.data)
      })
      // this.get(`${ztip}/patent/citation/count?patentId=a1737d9eb0f86be647b612bc4ea0ccdd6770f521ad9b9ce3e2f05c637fcc16514f5f4316d753e24df7122ff562ea86bc`).then(e=>{
      //   console.log(e, 'yinyong')
      // })
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
    .ip {
        padding-bottom: 1rem;
        .ellipsis-2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .item {
            margin: .2rem 0 0;
            padding: 0 .2rem .4rem;
            > div {
                align-items: center;
                justify-content: space-around;
            }
            div, a, p {
                line-height: .48rem;
                font-size: .36rem;
                color: #666;
            }
            a {
                color: #38f;
            }
            .title {
                /*height: .8rem;*/
                font-size: .4rem;
                line-height: .48rem;
                color: #333;
                width: 5.6rem;
                margin: .2rem 0;
            }
            img {
                width: 3.6rem;
            }
            p {
                margin: .2rem 0 0;
                text-indent: .6rem;
                padding: .2rem;
                font-size: .4rem;
                word-break: break-word;
            }
        }
        .line {
            > div {
                font-size: .44rem;
                line-height: .6rem;
                &:nth-of-type(1) {
                    padding: 0 .5rem 0 0;
                    text-align: right;
                }
            }
        }
    }
</style>
<style>
    .scroll-container {
        overflow-x: hidden;
    }

    .ip .default-text {
        padding: .3rem 0 0 !important;
    }
</style>
