<template>
  <div>
    <section class="login-section">
      <div class="wrapper">
        <nav><a href="javascript:;">登录</a></nav>

        <!-- 表单信息 -->
        <div class="form">
          <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px" status-icon>

            <!-- 账号密码 -->
            <el-form-item prop="userAccount" label="账 号">
              <el-input v-model="form.userAccount" clearable placeholder="请输入学号" />
            </el-form-item>
            <el-form-item prop="userPassword" label="密 码">
              <el-input v-model="form.userPassword" type="password" clearable show-password placeholder="请输入密码" />
            </el-form-item>

            <!-- 登录按钮 -->
            <button class="animated-button" @click="handleSubmit">
              <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" ></path></svg>
              <span class="text">点击登录</span>
              <span class="circle"></span>
              <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg"> <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" ></path> </svg>
            </button>
          
          </el-form>
          <div class="reg">
            <RouterLink style="padding-left: 30px;" to="/user/register">忘记密码</RouterLink>
            <RouterLink to="/user/register">没有账号?去注册</RouterLink>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped lang='scss'>
.login-section {
  background: url('../../assets/back1.jpeg') no-repeat center / cover;
  height: 500px;
  position: relative;

  .wrapper {
    width: 360px;
    background: #fff;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 90px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 20px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.form {
  padding: 0 20px 20px 20px;

  .subBtn {
    width: 100%;
  }

  .reg {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    :hover {
      color: #409EFF;
    }
  }
}

// 按钮
.animated-button {
  width: 100%;
  height: 25px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px 36px;
  border: 4px solid;
  border-color: transparent;
  font-size: 16px;
  background-color: inherit;
  border-radius: 100px;
  font-weight: 600;
  color:  #409EFF;
  box-shadow: 0 0 0 2px  #409EFF;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button svg {
  position: absolute;
  width: 24px;
  fill:  #409EFF;
  z-index: 9;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .arr-1 {
  right: 16px;
}

.animated-button .arr-2 {
  left: -25%;
}

.animated-button .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color:  #409EFF;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button .text {
  padding-left: 90px;
  position: relative;
  z-index: 1;
  transform: translateX(-12px);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-button:hover {
  box-shadow: 0 0 0 12px transparent;
  color: #fff;
  border-radius: 12px;
}

.animated-button:hover .arr-1 {
  right: -25%;
}

.animated-button:hover .arr-2 {
  left: 16px;
}

.animated-button:hover .text {
  transform: translateX(12px);
}

.animated-button:hover svg {
  fill: #fff;
}

.animated-button:active {
  scale: 0.95;
  box-shadow: 0 0 0 4px #409EFF;
}

.animated-button:hover .circle {
  width: 100%;
  height: 220px;
  opacity: 1;
}
</style>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

// 准备规则对象
const rules = {
  userAccount: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 8, message: '密码长度不少于8个字符', trigger: ['blur', 'change'] },
  ],
}

/**
 * 提交表单
 * @param data
 */
 const formRef = ref<FormInstance | null>(null)
 const handleSubmit = () => {
  // 调用实例方法
  formRef.value?.validate(async (valid:any) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行注册逻辑
    if (valid) {
      const res = await UserControllerService.userLoginUsingPost(form);
      console.log("登录返回的信息为：")
      console.log(res)
      // 登录成功，跳转到主页
      if (res.code === 0) {
        await store.dispatch("user/getLoginUser");
        ElMessage.success('登录成功，TickNet欢迎您！')
        // router.replace('/')
      } else {
        ElMessage.error("登录失败，" + res.message);
      }
    }
  })
}

// const handleSubmit = async () => {
//   const res = await UserControllerService.userLoginUsingPost(form);
//   console.log("登录返回的信息为：")
//   console.log(res)
//   // 登录成功，跳转到主页
//   if (res.code === 0) {
//     await store.dispatch("user/getLoginUser");
//     ElMessage.success('登录成功，TickNet欢迎您！')
//     // router.replace('/')
//   } else {
//     ElMessage.error("登陆失败，" + res.message);
//   }
// };
</script>