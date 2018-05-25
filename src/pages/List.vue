<template>
    <scroll-load :bottom-load-method="refresh" :is-top-bounce="false" :is-bottom-bounce="bottomBounce"
                 :bottom-config-0="{triggerText:'啦啦啦'}">
        <div class="list">
            <router-link class="item" v-for="item in newsList" :key="item.id" :to="'detail/'+item.id">
                <div class="p0" v-if="!item.imgs">
                    <h4 class="ellipsis-2">{{item.title}}</h4>
                    <div class="content ellipsis-2">{{item.content}}</div>
                    <p class="flex">
                        <em>
                            <span v-for="(word,i) in item.keywords" :key="i">{{word}}</span>
                        </em>
                        <i class="grow"></i>
                        <i>{{item.created}}</i>
                    </p>
                </div>
                <div class="flex p1" v-if="item.imgs&&item.imgs.length==1">
                    <img v-for="img in item.imgs" :key="img" :src="img">
                    <div class="flex">
                        <h4 class="ellipsis-2">{{item.title}}</h4>
                        <p class="flex">
                            <em>
                                <span v-for="(word,i) in item.keywords" :key="i">{{word}}</span>
                            </em>
                            <i class="grow"></i>
                            <i>{{item.created}}</i>
                        </p>
                    </div>
                </div>
                <div class="p3" v-if="item.imgs&&item.imgs.length==3">
                    <h4 class="ellipsis-2">{{item.title}}</h4>
                    <div class="flex">
                        <img v-for="img in item.imgs" :key="img" :src="img">
                    </div>
                    <p class="flex">
                        <em>
                            <span v-for="(word,i) in item.keywords" :key="i">{{word}}</span>
                        </em>
                        <i class="grow"></i>
                        <i>{{item.created}}</i>
                    </p>
                </div>
            </router-link>
        </div>
    </scroll-load>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

let commit
const yjip = 'http://192.168.14.234:8000'
const yjip2 = 'http://192.168.14.234:8888'
const ztip = 'http://192.168.5.279:8888'

export default {
  name: 'List',
  props: {
    name: {
      type: Array,
      default() {
      },
    },
  },
  data() {
    return {
      pageNum: 0,
      bottomBounce: true,
      list: []
    }
  },
  computed: {
    ...mapGetters([]), // 页面i18n obj
    ...mapState(['newsList', 'openId']),
  },
  mounted() {
  },
  created() {
    commit = this.$store.commit
    commit('showLoading')
    commit('clearList')
    this.getPage()
    setTimeout(() => {
      commit('hideLoading')
    }, 3000)
  },
  methods: {
    showmsg(e) {
      commit('setMsg', e)
    },
    getPage() {
      return this.get(`${yjip}/news/?pageNum=${++this.pageNum}&pageSize=10`).then(e => {
        commit('saveList', e.data)
        commit('hideLoading')
        if (e.data.total <= this.newsList.length) {
          this.bottomBounce = false
        }
        return e
      })
    },
    default() {
    },
    refresh(loaded) {
      this.getPage().then(() => {
        loaded('done')
      })
    },
    ...mapActions(['']),
    ...mapMutations(['']),
  },
  components: {},
}
</script>

<style lang="scss" scoped>
    button {
        font-size: .8rem
    }

    .list {
        padding-bottom: 1rem;
        a {
            /*border-bottom: .2rem solid rgba(22, 133, 255, .3);*/
            /*box-shadow: 0 0 .2rem 0 rgba(22, 133, 255, .3);*/
        }
        a > div {
            padding: .4rem 0 0;
            border: .02rem solid #eee;
            box-shadow: .02rem .1rem .42rem 0 rgba(133, 133, 133, .3);
        }
        .item {
            padding: .4rem .3rem .2rem;
            display: block;
            img {
                width: 3rem;
                flex: 0 0 auto;
                height: 2rem;
            }
            h4 {
                font-size: .5rem;
                line-height: .7rem;
                max-height: 1.4rem;
                padding: 0 .2rem;
                color: #333;
                font-weight: normal;
                /*position: relative;*/
                /*&:before {*/
                /*content: "";*/
                /*position: absolute;*/
                /*left: 0;*/
                /*top: .1rem;*/
                /*height: .5rem;*/
                /*width:.12rem;*/
                /*border-radius: .04rem;*/
                /*background: #38f;*/
                /*}*/
            }
            p {
                height: .5rem;
                margin: 0 .2rem;
                font-size: .32rem;
                color: #555;
                align-items: center;
                i, span {
                    word-break: keep-all;
                }
                span {
                    font-size: .32rem;
                }
                span + span {
                    margin-left: .2rem;
                }
                em {
                    max-width: 6.2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .flex {
                align-items: center;
            }
            .content {
                /*display: block;*/
                font-size: .36rem;
                line-height: .42rem;
                margin: .2rem;
                /*width: 8rem;*/
                height: .84rem;
                color: #666;
            }
            i {
                font-size: .28rem;
            }
            .p0 p {
                margin: .2rem;
            }
            .p1 {
                align-items: stretch;
                height: 2rem;
                > .flex {
                    flex-direction: column;
                    align-items: stretch;
                    justify-content: space-between;
                }
            }
        }
        .ellipsis-2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
</style>
