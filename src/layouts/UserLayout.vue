<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh;">

      <!-- 头部 -->
      <a-layout-header class="header">
        <!-- logo -->
        <a-space>
          <img src="../assets/logo-oj.svg" class="logo" />
          <div>TickNet OJ</div>
        </a-space>
        <!-- 去首页 -->
        <RouterLink class="entry" to="/">
          <button class="cssbuttons-io-button">
            进入系统首页
            <div class="icon">
              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" ></path>
              </svg>
            </div>
          </button>
        </RouterLink>
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
.cssbuttons-io-button {
  background:  #79bbff;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 14px;
  font-weight: 500;
  border-radius: 0.9em;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em  #337ecc;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;
}

.cssbuttons-io-button .icon {
  background: white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  box-shadow: 0.1em 0.1em 0.6em 0.2em  #79bbff;
  right: 0.3em;
  transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
  width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color:  #79bbff;
}

.cssbuttons-io-button:hover .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
  transform: scale(0.95);
}

#userLayout {
  text-align: center;
  background: #fff;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  width: 80vw;
  margin: 10px 10vw;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 16px;

  .entry {
    display: flex;
    justify-items: center;
    justify-content: center;
    height: 40px;
    margin-bottom: 10px;
  }
}

#userLayout .footer {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  a:hover {
    color: #409EFF;
  }
}
</style>

<script></script>
