<template>
  <!-- 判断是否处于登录状态 -->

  <!-- 有用户名，处于登录状态 -->
  <!-- <div v-if="store.state.user?.loginUser?.userName"> -->
    <RouterLink to="/" style="padding-right: 10px;">

      <!-- 展示用户名 -->
      <button class="butt">
        <svg t="1722585293445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5810" width="24" height="24"><path d="M1024 512c0-281.6-230.4-512-512-512S0 230.4 0 512s230.4 512 512 512 512-230.4 512-512z m-512 448c-249.6 0-448-198.4-448-448s198.4-448 448-448 448 198.4 448 448-198.4 448-448 448z" fill="#409EFF" p-id="5811"></path><path d="M627.2 505.6c44.8-38.4 76.8-89.6 76.8-153.6 0-108.8-83.2-192-192-192s-192 83.2-192 192c0 64 32 115.2 76.8 153.6-102.4 44.8-172.8 147.2-172.8 262.4 0 19.2 12.8 32 32 32s32-12.8 32-32c0-121.6 102.4-224 224-224s224 102.4 224 224c0 19.2 12.8 32 32 32s32-12.8 32-32c0-115.2-70.4-217.6-172.8-262.4zM512 480c-70.4 0-128-57.6-128-128s57.6-128 128-128 128 57.6 128 128-57.6 128-128 128z" fill="#409EFF" p-id="5812"></path></svg>
        {{ store.state.user?.loginUser?.userName }}莫思思

        <!-- 六颗星星 -->
        <div>
        <div class="star-1">
          <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 784.11 815.53" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs></defs>
            <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path class="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
            </g>
          </svg>
        </div>
        <div class="star-2">
          <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 784.11 815.53" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs></defs>
            <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path class="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
            </g>
          </svg>
        </div>
        <div class="star-3">
          <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 784.11 815.53" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs></defs>
            <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path class="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
            </g>
          </svg>
        </div>
        <div class="star-4">
          <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 784.11 815.53" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs></defs>
              <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"></metadata>
              <path class="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
              </g>
          </svg>
        </div>
        <div class="star-5">
          <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 784.11 815.53" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs></defs>
              <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"></metadata>
              <path class="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
              </g>
          </svg>
        </div>
        <div class="star-6">
          <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 784.11 815.53" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs></defs>
              <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer"></metadata>
              <path class="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path>
              </g>
          </svg>
        </div>
        </div>
      </button>
    </RouterLink>

    <!-- 退出登录 -->
    <button class="Btn" @click="confirm">
      <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
      <div class="text">退出登录</div>
    </button>
  <!-- </div> -->

  <!-- 未登录状态 -->
  <!-- <div v-else> -->
    <button class="button">
      <span class="span">
        <RouterLink style="color: #fff;" to="/user/login">登录</RouterLink>/<RouterLink style="color: #fff;" to="/user/register">注册</RouterLink>
      </span>
    </button>
  <!-- </div> -->
</template>
  
<script setup lang="ts">
  import { useStore } from "vuex";
  // import { removeInfo } from "@/plugins/storage"
  
  const store = useStore();
 
  const confirm = () => {
    console.log('用户要退出登录了')
    // 退出登录业务逻辑实现
    // 1.清除用户信息 触发action
    // store.clearUserInfo()
    // removeInfo()
    // 2.跳转到登录页
  
  }
</script>
  
<style scoped lang="scss">
.button {
  position: relative;
  text-decoration: none;
  font-size: 21px;
  text-transform: uppercase;
  letter-spacing: 5px;
  line-height: 40px;
  width: 160px;
  cursor: pointer;
  height: 55px;
  -webkit-box-reflect: bottom 1px linear-gradient(transparent, #0004);
  transform: scale(0.7);
  border-radius: 15px;
}

.button .span {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 4px;
  right: 4px;
  bottom: 4px;
  left: 4px;
  text-align: center;
  background:  #409EFF;
  color: #fff;
  transition: 0.5s;
  z-index: 1;
  border-radius: 10px;
}

.button::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: 400%;
  opacity: 0;
  transition: 0.5s;
  background: linear-gradient(
    45deg,
    #91155d,
    #525296,
    #0f0,
    #ff0,
    #fb0094,
    #00f,
    #0f0,
    #ff0
  );
  animation: animate123 20% linear infinte;
  border-radius: 15px;
}

.button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: 400%;
  filter: blur(15px);
  opacity: 0.7;
  transition: 0.5s;
  background: linear-gradient(
    45deg,
    #91155d,
    #525296,
    #0f0,
    #ff0,
    #fb0094,
    #00f,
    #0f0,
    #ff0
  );
  animation: animate123 20% linear infinte;
  border-radius: 15px;
}

.button:hover::before,
.button:hover::after {
  opacity: 0.4;
}

@keyframes animate123 {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 300% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.button .span::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
}
  
  .butt {
    position: relative;
    padding: 0 12px 10px 10px;
    background:  #79bbff;
    font-size: 16px;
    // font-weight: bold;
    color: #ffffff;
    border: 3px solid  #79bbff;
    border-radius: 8px;
    box-shadow: 0 0 0 #ffffff;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    .icon {
      background-color: #fff;
      border-radius: 50%;
      transform: translateY(30%);
    }
  }
  
  .star-1 {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 0  #79bbff);
    z-index: -5;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }
  
  .star-2 {
    position: absolute;
    top: 45%;
    left: 45%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 0  #79bbff);
    z-index: -5;
    transition: all 1scubic-bezier(0, 0.4, 0, 1.01);
  }
  
  .star-3 {
    position: absolute;
    top: 40%;
    left: 40%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 0  #79bbff);
    z-index: -5;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }
  
  .star-4 {
    position: absolute;
    top: 20%;
    left: 40%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 0  #79bbff);
    z-index: -5;
    transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
  }
  
  .star-5 {
    position: absolute;
    top: 25%;
    left: 45%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 0  #79bbff);
    z-index: -5;
    transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
  }
  
  .star-6 {
    position: absolute;
    top: 5%;
    left: 50%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 0  #79bbff);
    z-index: -5;
    transition: all 0.8s ease;
  }
  
  .butt:hover {
    background: transparent;
    color:  #409EFF;
    box-shadow: 0 0 0px  #79bbff;
  }
  
  .butt:hover .star-1 {
    position: absolute;
    top: 80%;
    left: -25%;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 0px  #79bbff);
    z-index: 2;
  }
  
  .butt:hover .star-2 {
    position: absolute;
    top: 65%;
    left: 10%;
    width: 10px;
    height: auto;
    filter: drop-shadow(0 0 0px  #79bbff);
    z-index: 2;
  }
  
  .butt:hover .star-3 {
    position: absolute;
    top: -40%;
    left: 0%;
    width: 13px;
    height: auto;
    filter: drop-shadow(0 0 0px  #79bbff);
    z-index: 2;
  }
  
  .butt:hover .star-4 {
    position: absolute;
    top: 50%;
    left: 80%;
    width: 10px;
    height: auto;
    filter: drop-shadow(0 0 0px  #79bbff);
    z-index: 2;
  }
  
  .butt:hover .star-5 {
    position: absolute;
    top: -5%;
    left: 100%;
    width: 17px;
    height: auto;
    filter: drop-shadow(0 0 0px  #79bbff);
    z-index: 2;
  }
  
  .butt:hover .star-6 {
    position: absolute;
    top: -20%;
    left: 60%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 0px  #79bbff);
    z-index: 2;
  }
  
  .fil0 {
    fill:  #79bbff;
  }
   
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #fff;
  }
  
  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sign svg {
    width: 17px;
  }
  
  .sign svg path {
    fill: #409EFF;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: #409EFF;
    font-size: 1.1em;
    // font-weight: 600;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 120px;
    border-radius: 40px;
    transition-duration: .3s;
  }
  
  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 5px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }
</style>
  