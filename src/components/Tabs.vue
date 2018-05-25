<template>
    <div class="tabs flex">
        <router-link to="/list" class="iconfont icon-hot" router-link-active></router-link>
        <router-link to="/detail" class="iconfont icon-newspaper" router-link-active></router-link>
        <!--<router-link to="/ip" router-link-active></router-link>-->
        <a class="iconfont icon-zhuanli" :class="{active:isIp}" @click="go"></a>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Tabs',
  props: {
    name: {
      type: Array,
      default() {
      },
    },
  },
  watch: {
    $route(e) {
      this.queryIp(e)
    }
  },
  data() {
    return {
      isIp: false
    }
  },
  computed: {
    ...mapGetters([]), // 页面i18n obj
    ...mapState([]),
  },
  mounted() {
    this.queryIp(this.$route)
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations(['']),
    queryIp({ name }) {
      if (name == 'Ip' || name == 'IpId') {
        this.isIp = true
      } else {
        this.isIp = false
      }
    },
    go() {
      if (this.$route.name == 'Ip') return
      this.$router.push('/ip')
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
    .tabs {
        background: #f5f5f5;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .9rem;
        align-items: stretch;
        justify-content: center;
        a {
            width: 30%;
            text-align: center;
            font-size: .6rem;
            line-height: .9rem;
            color: #abcdef;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        }
        a:hover, a:active {
        }
        .active {
            color: #07f;
        }
        .router-link-active {
            color: #07f;
        }
    }
</style>
<!--
1.获取新闻列表 -- 分页
2.获取单个新闻明细 -- 包含相关专利列表
3.获取单个专利明细
4.check用户免费查看专利次数
-->
