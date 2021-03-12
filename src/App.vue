<template>
  <div id="main">
    <!-- <keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。-->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- 加载框 -->
    <loading></loading>
  </div>
</template>
<script>
  import Loading from '@/components/Loading.vue'
  export default {
    name: 'App',
    components: {
      Loading
    }
  }
</script>