<template>
  <div style="position: absolute;top: 0;left:0;right:0;bottom:0;">
    <transition :name="transitionName">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          class="child-view"
        />
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view
        v-if="!$route.meta.keepAlive"
        class="child-view"
      />
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import ROUTES from './routes'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: ROUTES
})

export default {
  router,
  data () {
    return {
      transitionName: 'slide-left'
    }
  }
}

</script>

<style lang="scss">
    /* 路由过渡动画 */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .child-view {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
        background: white;
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(30px, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-30px, 0);
    }

</style>
