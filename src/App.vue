<template>
  <div>
    <div class="container">
      <TheMenu/>
      <TheHeader/>
      <TheContent/>
    </div>
  </div>
</template>

<script>
// 1. import
import TheMenu from './components/layout/TheMenu.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheContent from './components/layout/TheContent.vue'

export default {
  name: 'App',
  components: {
    // 2. register
    TheMenu,TheHeader,TheContent
  }
}
</script>

<style>
    @import url("./styles/main.css");
    @import url(./styles/layout/container.css);
    @import url(./assets/fonts/fontawesome-free-6.1.1-web/css/all.min.css);
</style>
