<template>
  <div class="page">
    asdasd
    <router-link to="/b">
      跳到B页
    </router-link>
    <div v-text></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .page {
    @include color;
  }
</style>
