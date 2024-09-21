import { RouteRecordRaw } from "vue-router";
// import HomeView from "@/views/ExampleView.vue";
// import AdminView from "@/views/AdminView.vue";
// import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

// 用户相关
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";

// 题目相关
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

// 比赛相关
import ContestList from "@/views/contest/ContestList.vue";
import AddContest from "@/views/contest/AddContest.vue";
import ContestId from "@/views/contest/ContestId.vue";
import ContestDescription from "@/views/contest/ContestDescription.vue";
import ContestQuestion from "@/views/contest/ContestQuestion.vue";
import ContestSubmit from "@/views/contest/ContestSubmit.vue";
import ContestRank from "@/views/contest/ContestRank.vue";

export const routes: Array<RouteRecordRaw> = [
  // 用户相关
  {
    path: "/user",
    name: "用户",
    component: UserLayout,

    children: [
      {
        path: "login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },

  // 题目相关
  {
    path: "/",
    name: "题库",
    component: QuestionsView,
  },
  {
    path: "/question_submit",
    name: "提交情况",
    component: QuestionSubmitView,
  },

  // 比赛相关
  {
    path: "/contest_list",
    name: "比赛列表",
    component: ContestList,
  },
  {
    path: "/add_contest",
    name: "创建比赛",
    component: AddContest,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/update_contest",
    name: "修改比赛",
    component: AddContest,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/contest/:id",
    name: "比赛详情",
    component: ContestId,
    children: [
      {
        path: '',
        name: 'main-index',
        components: {
          ContestDescription,
          ContestQuestion,
          ContestSubmit,
          ContestRank,
        }
      }
    ],
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },

  // 题目相关
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/noAuth",
  //   name: "无权限",
  //   component: NoAuthView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
