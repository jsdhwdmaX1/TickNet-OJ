// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import { getInfo, setInfo, removeInfo } from "@/plugins/storage"

export default {
  namespaced: true,
  state: () => ({
    loginUser: getInfo()
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      console.log("从远程请求获取登录信息为：")
      console.log(res)
      // console.log(payload)
      // console.log(state.loginUser)
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
      setInfo(payload)
      // console.log(state.loginUser)
    },
  },
} as StoreOptions<any>;
