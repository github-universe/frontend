<template>
    <div ref="pullRefresh" class="vue-pull-refresh">
        <div class="vue-pull-refresh-msg" ref="refreshMsg">
            <div class="hidenArea">
                <span class="svg-wrapper">
                 <svg t="1497366759944"
                      viewBox="0 0 1024 1024"
                      :class="{'icon-reverse': flag}"
                      style="width: 1rem; height: 1rem; vertical-align: middle;fill: currentColor;overflow: hidden;"
                      version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1040">
                    <path d="M921.6 563.2c-9.6-9.6-25.6-9.6-35.2 0L544 896l0-822.4c0-12.8-9.6-22.4-25.6-22.4s-25.6 9.6-25.6 22.4L492.8 896l-342.4-339.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 22.4 0 32l384 377.6c6.4 6.4 12.8 6.4 19.2 6.4 0 0 0 0 0 0 3.2 0 3.2 0 6.4 0 0 0 0 0 3.2 0 3.2 0 6.4-3.2 9.6-6.4l380.8-371.2C931.2 588.8 931.2 572.8 921.6 563.2z"
                          p-id="1041" fill="#F27981">
                    </path>
                </svg>
                </span>
                {{msg}}
            </div>
        </div>
        <slot name="list"></slot>
    </div>
</template>

<style lang="scss" scoped>
    .vue-pull-refresh {
        /*overflow-y: auto;*/
        transition: .33s;
        -webkit-overflow-scrolling: touch; /* ios5+ */
        .vue-pull-refresh-msg {
            margin-top: -52px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            border-bottom: 2px solid #fb737a;
            .hidenArea {
                color: #918AE1;
                font-weight: bold;
                font-size: 1.2em;
                width: 90vw;
                margin: 0 auto;
                overflow: hidden;
                white-space: nowrap;
                .svg-wrapper {
                    background: #FFF;
                    border-radius: 50%;
                    width: 2em;
                    height: 2em;
                    vertical-align: middle;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 1px 6px rgba(0, 0, 0, .3),
                    0 1px 4px rgba(0, 0, 0, .15);
                }
            }
        }
        .vue-pull-refresh-msg .icon-reverse {
            transform: rotate(180deg);
            transition: all .3s ease;
        }
        .vue-pull-refresh-loading {
            animation: loadRotate 1s linear infinite;
        }
    }

    @keyframes loadRotate {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(360deg)
        }
    }
</style>


<script>
export default {
  props: {
    // next: {
    //   type: Function,
    //   required: true
    // },
    language: {
      type: String,
      required: false
    },
    pullTip: {
      type: String,
      required: false
    },
    releaseTip: {
      type: String,
      required: false
    },
    loadingTip: {
      type: String,
      required: false
    },
    pullDistance: {
      type: Number,
      required: false
    },
    releaseDistance: {
      type: Number,
      required: false
    },
    maxDistance: {
      type: Number,
      required: false
    }

  },
  data() {
    return {
      msg: '',
      flag: false,
      loading: false,
      touchStart: 0,
      distance: 0,
      PullTip: '下拉刷新 (。＾▽＾)',
      ReleaseTip: '释放刷新 ヽ(￣▽￣)و',
      LoadingTip: '努力加载中 ─=≡Σ(((つ•̀ω•́)つ',
      EPullTip: 'Pull To Refresh (。＾▽＾)',
      EReleaseTip: 'Release To Refresh ヽ(￣▽￣)و',
      ELoadingTip: 'Loading  ─=≡Σ(((つ•̀ω•́)つ',
      PullDistance: 50,
      ReleaseDistance: 80,
      MaxDistance: 140
    }
  },
  created() {
    this.setParam()
  },
  mounted() {
    const pullRefresh = this.$refs.pullRefresh,
      refreshMsg = this.$refs.refreshMsg
    pullRefresh.addEventListener('touchstart', (e) => {
      this.start(e)
    })

    pullRefresh.addEventListener('touchmove', (e) => {
      this.moves(e, pullRefresh, refreshMsg)
    })

    pullRefresh.addEventListener('touchend', (e) => {
      this.end(e, pullRefresh, refreshMsg)
    })
  },
  methods: {
    next() {
      return Promise.resolve()
    },
    setParam() {
      if (this.language && this.language.toLowerCase() === 'english') {
        this.PullTip = this.EPullTip
        this.ReleaseTip = this.EReleaseTip
        this.LoadingTip = this.ELoadingTip
      }
      if (this.pullTip || this.releaseTip || this.loadingTip) {
        this.PullTip = this.pullTip || this.PullTip
        this.ReleaseTip = this.releaseTip || this.ReleaseTip
        this.LoadingTip = this.loadingTip || this.LoadingTip
      }
      if (this.pullDistance || this.releaseDistance || this.maxDistance) {
        this.PullDistance = this.pullDistance || this.PullDistance
        this.ReleaseDistance = this.releaseDistance || this.ReleaseDistance
        this.MaxDistance = this.maxDistance || this.MaxDistance
      }
    },
    start(e) {
      if (document.body.scrollTop > 0) {
        return
      }
      if (this.loading) {
        e.preventDefault()
        return
      }
      // 取第一个手指的触摸点作为起始点
      this.touchStart = e.targetTouches[0].clientY
    },
    moves(e, pullRefresh, refreshMsg) {
      if (document.body.scrollTop > 0) {
        return
      }
      if (!this.touchStart) {
        return
      }

      const touch = e.targetTouches[0]
      const scrollTop = pullRefresh.scrollTop

      if (scrollTop === 0) {
        this.distance = touch.clientY - this.touchStart
        if (this.distance > 0) {
          e.preventDefault()
        }
        if (this.distance > this.PullDistance) {
          if (this.distance < this.MaxDistance) {
            pullRefresh.style.overflow = 'inherit'
            pullRefresh.style.transform =
              `translate3D(0px, ${this.distance}px, 0px)`
            refreshMsg.style.height = `${this.distance}px`
            refreshMsg.style.lineHeight = `${this.distance}px`
            if (this.distance >= this.ReleaseDistance) {
              this.msg = this.ReleaseTip
              this.flag = true
            } else {
              this.msg = this.PullTip
            }
          }
        }
      }
    },
    end(e, pullRefresh, refreshMsg) {

      if (document.body.scrollTop > 0) {
        return
      }
      if (this.distance <= this.PullDistance) {
        return
      }
      if (this.loading) {
        e.preventDefault()
        return
      }
      if (this.distance > this.PullDistance && this.distance < this.ReleaseDistance) {
        pullRefresh.scrollTop = 0
        pullRefresh.style.overflow = 'auto'
        pullRefresh.style.transform = 'translate3D(0px, 0px, 0px)'
        refreshMsg.style.height = `50px`
        refreshMsg.style.lineHeight = `50px`
        return

      }
      if (this.flag && this.distance > this.ReleaseDistance) {
        pullRefresh.style.transform = 'translate3D(0px, 50px, 0px)'
        refreshMsg.style.height = `50px`
        refreshMsg.style.lineHeight = `50px`
        this.loading = true
        this.next()
          .then(() => {
            this.flag = false
            this.loading = false
            pullRefresh.scrollTop = 0
            pullRefresh.style.overflow = 'auto'
            pullRefresh.style.transform = 'translate3D(0px, 0px, 0px)'
          })
        return
      }

    }
  }

}
</script>

