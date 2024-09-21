<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <!-- 头部 -->
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <!-- 内容区 -->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!-- 底部 -->
      <a-layout-footer class="footer">
        <span>CopyRight &copy;</span>
        <a href="https://nic.hnust.edu.cn/zxgk/xstd/6a3bf09697a94c47be2107ef01d075a8.htm" target="_blank">
          网络信息中心TickNet
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped lang="scss">
#basicLayout {
  background: #fff;
}

#basicLayout .header {
  padding: 7px 0;
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  /* background: linear-gradient(to right, #fefefe, #fff); */
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  font-size: 16px;
  background: #efefef;
  padding: 20px;
  text-align: center;
  a:hover {
    color: #409EFF;
  }
}
</style>

<script setup>
import GlobalHeader from "@/components/GlobalHeader";

</script>
