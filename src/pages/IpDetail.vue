<template>
    <div class="ip-detail">IpDetail
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'IpDetail',
  props: {
    name: {
      type: Array,
      default() {
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([]), // 页面i18n obj
    ...mapState([]),
  },
  mounted() {
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations(['']),
    default() {
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
    .ip-detail {
    }
</style>
