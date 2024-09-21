<template>
  <div id="ContestSubmit">

    <!-- 搜索栏 -->
    <el-input
      v-model="searchParams.userId"
      style="width: 280px; margin-bottom: 13px;"
      placeholder="输入用户名回车搜索"
      :prefix-icon="Search"
      @keyup.enter="doSubmit"
      clearable
    />

    <!-- 题目提交列表 -->
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <!-- 题目 -->
      <template #questionId="{ record }">
        <a-space class="blue" @click="toQuestionPage">
          {{ record.questionId }}
        </a-space>
      </template>
      <!-- 判题信息 -->
      <!-- <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template> -->
      <template #judgeInfo="{ record }">
        <div :style="statusStyle(record.judgeInfo)">
          {{ statusText(record.judgeInfo) }}
        </div>
      </template>
      <!-- 创建时间 -->
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  ContestControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import moment from "moment";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// const dataList = ref([]);
const total = ref(1);
const searchParams = ref<QuestionSubmitQueryRequest>({
  userId: undefined,
  pageSize: 20,
  current: 1,
});

const dataList = ref([{
      id: '123456',
      language: 'java',
      judgeInfo: 0,
      status: '0',
      questionId: 'A',
      userId: '220501',
      createTime: '2024-08-14 00:00:00'
    },
    {
      id: '234446',
      language: 'cpp',
      judgeInfo: 1,
      status: '0',
      questionId: 'C',
      userId: '220501',
      createTime: '2024-08-15 09:11:22'
    },
    {
      id: '425455',
      language: 'java',
      judgeInfo: 4,
      status: '0',
      questionId: 'D',
      userId: '220501',
    },
]);

// 调状态字体样式
const statusText = (state: number) => {
  switch (state) {
    case 0:
      return '答案正确';
    case 1:
      return '答案错误';
    case 2:
      return '编译错误';
    case 3:
      return '段错误';
    case 4:
      return '时间超限';
    case 5:
      return '内存超限';
    default:
      return '未知状态';
  }
};
const statusStyle = (state: number) => {
  switch (state) {
    case 0:
      return { color: '#67C23A', fontWeight: 'bold' }; // 绿色文字
    case 1:
      return { color: '#f77b7b', fontWeight: 'bold' }; // 红色字体
    case 2:
      return { color: '#f77b7b', fontWeight: 'bold' }; // 红色文字
    case 3:
      return { color: '#f77b7b', fontWeight: 'bold' }; // 红色文字
    case 4:
      return { color: '#777', fontWeight: 'bold' }; // 黑色文字
    case 5:
      return { color: '#777', fontWeight: 'bold' }; // 黑色文字
    default:
      return {};
  }
};

const loadData = async () => {
  const res = await ContestControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    ElMessage.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
    align: 'center',
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
    align: 'center',
  },
  {
    title: "题目",
    slotName: "questionId",
    align: 'center',
    filterable: {
      // 创建一个从'A'开始的筛选器列表
      filters: Array.from({ length: 5 }, (_, i) => ({
        text: String.fromCharCode(65 + i), // 'A' 的 ASCII 码是 65
        value: String.fromCharCode(65 + i),
      })),
      filter: (value: string, row: any) => row.questionId?.includes(value),
    }
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
    align: 'center',
  },
  {
    title: "判题状态",
    dataIndex: "status",
    align: 'center',
  },
  {
    title: "编程语言",
    dataIndex: "language",
    align: 'center',
    filterable: {
      filters: [
        { text: 'java', value: 'java', }, 
        { text: 'cpp', value: 'cpp',}, 
        { text: 'go', value: 'go', }, 
        { text: 'html', value: 'html', },
      ],
      filter: (value:string, row:any) => row.language?.includes(value),
    }
  },
  {
    title: "提交时间",
    slotName: "createTime",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  window.open(`/view/question/${question.id}`, '_blank');
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped lang="scss">
#ContestSubmit {
  .blue {
    color: #409EFF;
    font-weight: bold;
  }
  .blue:hover {
    color: #337ecc;
    cursor: pointer;
  }
}
</style>
