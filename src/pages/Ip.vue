<template>
    <scroll-load :bottom-load-method="refresh" :is-top-bounce="false" class="ip1"
                 :bottom-config="{triggerText:'向我推荐专利'}">
        <div class="ip">
            <h2><i class="icon iconfont icon-zhuanli1"></i>专利详情
                <!--<i class="icon iconfont icon-shoucang1" @click="getCollect()"></i>-->
                <!--<i class="icon iconfont icon-shoucang" @click="getCollect()"></i>-->
            </h2>
            <div class="item">
                <div class="title" :class="{'ellipsis-2':ellipsis}">{{title}}</div>
                <div class="flex">
                    <img :src="ipDetail.thumbnail"/>
                    <div class="grow summary">
                        <span>{{ipDetail.patent_number}}</span><br>
                        <span>{{ipDetail.apno}}</span>
                        <div style="text-align: right">
                            <a :href="ipDetail.claim_link" target="_blank">智慧芽链接</a>
                        </div>
                    </div>
                </div>
                <!--<div class="flex">-->
                <p>{{abstract}}</p>
                <!--</div>-->
                <div v-if="legal" style="padding:.2rem;color:#999">申请状态：<span style="font-weight: bold;color:#333">{{legal}}</span></div>
                <h3 style="margin-top:.3rem;font-size: .5rem;text-align: left;margin:0 .2rem;">专利价值分析：</h3>
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

// const yjip = 'http://192.168.14.234:8000'
// const yjip2 = 'http://192.168.14.234:8888'
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
      if (!this.ipDetail.legal) {
        return ''
      }
      if (!this.ipDetail.legal.legal_status) {
        return ''
      }
      this.ipDetail.legal.legal_status[0].legal_desc.map(e => {
        if (e.lang.toLowerCase() == 'cn') {
          legal = e.text
        }
      })
      return legal
    },
    abstract() {
      let abstract
      if (!this.ipDetail.abstract) return
      this.ipDetail.abstract.map(e => {
        if (e.lang.toLowerCase() == 'cn') {
          abstract = e.text
        }
      })
      if (!abstract) {
        abstract = this.ipDetail.abstract[0].text
      }
      return abstract
    },
    title() {
      let title
      // if (this.ipDetail.title) return undefined
      this.ipDetail.title.map(e => {
        if (e.lang.toLowerCase() == 'cn') {
          title = e.text
        }
      })
      if (!title) {
        title = this.ipDetail.title[0].text
      }
      return title
    },
    ...mapGetters([]), // 页面i18n obj
    ...mapState(['ipDetail', 'citationDetail', 'ipValueDetail', 'openId']),
  },
  created() {
    commit = this.$store.commit
    const { openid } = this.$route.query

    if (openid) {
      localStorage.setItem('openId', openid)
      commit('saveOpenId', openid)
    }
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
    getCollect() {
    },
    getIp(id) {
      commit('clearIp')
      this.get(`${ztip}/patent?patentId=${id}`).then(e => {
        commit('hideLoading')
        commit('saveIp', e.data[0])
        this.getIpValueDetail()
        this.getCitationDetail()
      })
    },
    getAnother(loaded) {
      this.get(`${ztip}/recommend/userbase?openid=${this.openId}&howMany=1`)
        .then(({ data }) => {
          this.id = data[0]
          this.getIp(data[0])
          loaded && loaded('done')
        })
    },
    refresh(loaded) {
      commit('showLoading')
      this.getAnother(loaded)
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
            .summary {
                padding: 0 .4rem;
                span {
                    font-size: .4rem;
                    display: inline-block;
                    padding: 0 .4rem .2rem 0;
                }
            }
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
                font-size: .5rem;
                line-height: .7rem;
                color: #333;
                /*width: 5.6rem;*/
                margin: .4rem 0;
            }
            img {
                width: 3.6rem;
            }
            p {
                margin: .2rem 0 0;
                text-indent: 2em;
                padding: .3rem;
                font-size: .45rem;
                line-height: 1.3;
                word-break: break-word;
            }
        }
        .line {
            border-bottom: 1px solid #ddd;
            padding: .1rem 0;
            > div {
                font-size: .44rem;
                line-height: .6rem;
                color:#888;
                &:nth-of-type(1) {
                    padding: 0 .5rem 0 0;
                    text-align: right;
                }
            }
            div:nth-of-type(2){
                color:#555;
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
