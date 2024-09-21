<template>
  <div id="questionSubmitView">

    <!-- 搜索栏 -->
    <el-input
      v-model="searchParams.questionId"
      style="width: 300px; height: 36px; margin-right: 20px;"
      placeholder="输入题目id回车搜索"
      :prefix-icon="Search"
      @keyup.enter="doSubmit"
      clearable
    />
    <!-- 管理员才需要搜索，用户默认只能看到自己的 -->
    <el-input
      v-model="searchParams.userId"
      style="width: 300px; height: 36px;"
      placeholder="输入用户id回车搜索"
      :prefix-icon="Search"
      @keyup.enter="doSubmit"
      clearable
    />

    <!-- 题目提交列表 -->
    <a-divider size="0" />
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
      <!-- 题目 id -->
      <template #questionId="{ record }">
        <a-space class="blue" @click="toQuestionPage">
          {{ record.questionId }}
        </a-space>
      </template>
      <!-- 判题信息 -->
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <!-- 创建时间 -->
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import moment from "moment";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// const dataList = ref([]);
const total = ref(1);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  userId: undefined,
  pageSize: 10,
  current: 1,
});

const dataList = ref([{
      id: '1',
      language: 'java',
      judgeInfo: 'Accepted',
      status: '0',
      questionId: '0012',
      userId: '220501',
    },
]);

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
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
    title: "题目 id",
    slotName: "questionId",
    align: 'center',
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
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped lang="scss">
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;

  .blue {
    color: #409EFF;
    font-weight: 600;
  }
  .blue:hover {
    color: #337ecc;
    cursor: pointer;
  }
}
</style>
