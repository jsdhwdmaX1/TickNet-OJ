<template>
  <a-row id="globalHeader" align="center" >

    <!-- logo区 -->
    <a-col :span="4" class="title-bar">
      <img class="logo" src="../assets/logo-oj.svg" />
      <div class="title">TickNet OJ</div>
    </a-col>

    <!-- 导航栏 -->
    <a-col flex="auto">
      <a-menu class="menu" style="font-size: 16px;"
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>

    <!-- 右侧按钮 -->
    <a-col :span="4.5" class="right">
      <RightButton></RightButton>
    </a-col>
    
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
// import { removeInfo } from "@/plugins/storage"
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

import RightButton from "./RightButton.vue";

const router = useRouter();
const store = useStore();

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    // if (
    //   !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    // ) {
    //   return false;
    // }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

console.log();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "TickNet皮管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

</script>

<style scoped lang="scss">
.title-bar {
  display: flex;
  align-items: center;

  .logo {
    height: 50px;
    margin-left: 5vw;
  }

  .title {
    color: #444;
    margin-left: 16px;
  }
}

.right {
  display: flex;
  align-items: center;
  // justify-content: center;
}
</style>
