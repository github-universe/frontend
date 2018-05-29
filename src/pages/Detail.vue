<template>
    <div class="detail">
        <div v-if="news">
            <h3>{{news.title}}
                <a href="#ip-list" class="icon iconfont icon-menu"></a>
            </h3>
            <div class="flex line">
                <div class="keywords flex">
                    <em>
                        <span v-for="(word,i) in news.keywords" :key="i">{{word}}</span>
                    </em>
                </div>
                <div class="grow"></div>
                <div class="time">{{news.created}}</div>
            </div>
            <img v-if="news.imgs&&news.imgs.length==1" src="https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026">
            <div v-if="news.imgs&&news.imgs.length==3" class="flex imgs">
                <img v-for="src in news.imgs" :src="src" :key="src"
                     @click="showFull(src)">
            </div>
            <p class="content">{{news.content}}</p>
        </div>
        <div class="full" v-if="src" @click="src=''">
            <img :src="src">
        </div>
        <div id="ip-list">
            <h4>相关专利</h4>
            <div v-for="(item,i) in ipList" :key="i" class="clear">
                <i class="iconfont icon-zhuanli" @click="viewIp(item)"></i>
                <div class="text" @click="viewIp(item)">{{item.text}}</div>
                <i class="icon iconfont sc icon-shoucang" v-if="collect(item)" @click="getCollected(item)"></i>
                <i class="icon iconfont sc icon-shoucang1" v-else style="font-size: .7rem;"
                   @click="getCollected(item,true)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

// const yjip = 'http://192.168.14.198:8000'
// const yjip2 = 'http://192.168.14.198:8888'
const ztip = 'http://192.168.5.179:8888'
const ztip2 = 'http://192.168.5.179:8000'
let commit

export default {
  name: 'Detail',
  props: {
    name: {
      type: Array,
      default() {
      },
    },
  },
  data() {
    return {
      src: '', patents: '', ipList: [
        // {
        //   text: 123,
        //   ip: {patent_id:1}
        // }
      ],
      collectList: [],
    }
  },
  computed: {
    ...mapGetters([]), // 页面i18n obj
    ...mapState(['news', 'openId']),
  },
  created() {
    commit = this.$store.commit
    let { newsId } = this.$route.params
    if (newsId == 'null') {
      this.$router.push('/lsit')
      return
    }
    if (newsId) {
      localStorage.setItem('newsId', newsId)
    } else {
      newsId = localStorage.getItem('newsId')
      this.$router.push(`detail/${newsId}`)
    }
    this.get(`${ztip2}/news/${newsId}/`).then(d => {
      commit('saveNews', d.data)
      commit('hideLoading')
      const { patents } = d.data
      this.patents = patents
      const str = 'patentId=' + patents.join(',')
      this.get(`${ztip}/patent?${str}`).then(e => {
        this.ipList = []
        e.data.map(f => {
          let text
          if (f.title[0].lang.toLowerCase() == 'cn') {
            text = f.title[0].text
          } else if (f.title[1] && f.title[1].lang.toLowerCase() == 'cn') {
            text = f.title[1].text
          } else if (f.title[0].lang.toLowerCase() == 'en') {
            text = f.title[0].text
          } else if (f.title[1]) {
            text = f.title[1].text
          } else {
            text = f.title[0].text
          }
          this.ipList.push({
            text,
            ip: f,
          })
        })
      })
    })
    commit('clearDetail')
    commit('showLoading')
    setTimeout(() => {
      commit('hideLoading')
    }, 3000)
    // console.log(this.post)
    // console.log(this.get)
    this.get(`${ztip}/collection/${this.openId}`).then(e => {
      this.collectList = e.data.split(',')
    })
  },
  mounted() {
    let { newsId } = this.$route.params
    if (newsId == 'null') {
      this.$router.push('/lsit')
      return
    }
    const { open_id } = this.$route.query
    if (open_id) {
      localStorage.setItem('openId', open_id)
      commit('saveOpenId', open_id)
    }
  },
  methods: {
    default() {
    },
    getCollected(item, v) {
      if (v) {
        this.post(`${ztip}/collection?openid=${this.openId}&patentId=${item.ip.patent_id}`).then(() => {
          this.get(`${ztip}/collection/${this.openId}`).then(f => {
            this.collectList = f.data.split(',')
          })
        })
        // this.collectList = [...this.collectList, item.ip.patent_id]
        // console.log(this.collectList)
      } else {
        this.del(`${ztip}/collection?openid=${this.openId}&patentId=${item.ip.patent_id}`).then(() => {
          this.get(`${ztip}/collection/${this.openId}`).then(f => {
            this.collectList = f.data.split(',')
          })
        })
      }
    },
    collect(item) {
      return this.collectList.indexOf(item.ip.patent_id) > -1
    },
    viewIp(e) {
      this.get(`${ztip}/rating?openid=${this.openId}&patentId=${e.ip.patent_id}`)
      commit('saveIp', e.ip)
      this.$router.push(`/ip/${e.ip.patent_id}`)
    },
    showFull(src) {
      this.src = src
    },
    ...mapActions(['']),
    ...mapMutations(['']),
  },
  components: {},
}
</script>

<style lang="scss" scoped>
    .detail {
        padding: 0 .3rem .8rem;
        h3 {
            font-size: .5rem;
            padding: 0 .5rem;
            margin: .4rem 0;
            position: relative;
            a {
                position: absolute;
                top: .18rem;
                // top: 50%;
                //transform: translateY(-50%);
                font-size: .4rem;
                line-height: 1;
                left: .1rem;
            }
        }
        img {
            margin: .2rem .1rem;
            width: 9.2rem;
        }
        .line {
            margin: .2rem;
        }
        .time {
            text-align: right;
            font-size: .4rem;
            color: #666;
        }
        .keywords {
            em {
                max-width: 6.2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span {
                font-size: .4rem;
                color: #666;
            }
            span + span {
                margin: 0 0 0 .18rem;
            }
        }
        .imgs {
            align-items: center;
            justify-content: space-around;
            img {
                width: 32%;
                margin: 0;
            }
        }
        .content {
            margin: .4rem .2rem;
            display: block;
            font-size: .42rem;
            line-height: .6rem;
            text-indent: .6rem;
        }
        .full {
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, .8);
            width: 100vw;
            height: 100vh;
            img {
                width: 100%;
                margin: 0;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
            }
        }
    }

    #ip-list {
        padding: .2rem .1rem .8rem;
        h4 {
            font-size: .45rem;
            color: #07f;
        }
        div {
            div, i {
                float: left;
            }
        }
        h4 ~ div {
            margin-top: .2rem;
        }
        div {
            font-size: .4rem;
            line-height: .6rem;
        }
        i {
            float: left;
            font-size: .6rem;
            line-height: .6rem;
            color: #38f;
            margin: 0 .2rem;
        }
        .icon.sc {
            float: right;
        }
        .text {
            width: 7rem;
            overflow: hidden;
            height: .6rem;
            text-overflow: ellipsis;
        }
    }
</style>
