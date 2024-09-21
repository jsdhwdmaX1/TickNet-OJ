<template>
<div id="ContestRank">

  <!-- 搜索栏 -->
  <el-input
    v-model="searchParams.userId"
    style="width: 280px; margin-bottom: 13px;"
    placeholder="输入用户名回车搜索"
    :prefix-icon="Search"
    @keyup.enter="doSubmit"
    clearable
  />

  <!-- 排行榜 -->
  <a-table
    :columns="columns" 
    :data="data"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }"
    @page-change="onPageChange"
  >
    <template v-for="(item, index) in questions" :key="index" #[`question${index}`]="{record}">
      <div class="d" :style="questionStyle(record[`question${index}`].answer)">
        {{ formatTimeDifference(record[`question${index}`].time) }}
      </div>
    </template>
  </a-table>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import {
  Question,
  ContestControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// const dataList = ref([]);
const total = ref(1);
const searchParams = ref<QuestionSubmitQueryRequest>({
  userId: undefined,
  pageSize: 20,
  current: 1,
});

const loadData = async () => {
  const res = await ContestControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    data.value = res.data.records;
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

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
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

// 假设你有一个题目列表
const questions = ref(['A', 'B', 'C', 'D']);

// 生成表头数据
const generateColumns = () => {
  const columns = [];
  // 添加固定列
  columns.push({
    title: '名次',
    dataIndex: 'rank',
    align: 'center',
  }, {
    title: '学号',
    dataIndex: 'userAccount',
    align: 'center',
  }, {
    title: '姓名',
    dataIndex: 'userName',
    align: 'center',
  }, {
    title: '通过',
    dataIndex: 'accepted',
    align: 'center',
  });
  // 添加问题列
  questions.value.forEach((item, index) => {
    columns.push({
      title: item,
      slotName: `question${index}`,
      align: 'center',
    });
  });
  return columns;
};

const columns = ref(generateColumns());

// 自定义渲染逻辑
const questionStyle = (answer: number) => {
  if(answer!==undefined)
    return { backgroundColor: answer === 0 ? '#e1f3d8' : '#fde2e2'};
};

// 格式化时间差
const formatTimeDifference = (timeDifference: string) => {
  if(timeDifference){
    const currentTime = new Date().getTime(); // 获取当前时间的时间戳
    const submittedTime = new Date(timeDifference).getTime(); // 获取提交时间的时间戳
    const timeDifferenceInMilliseconds = currentTime - submittedTime; // 计算时间差（毫秒）
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000); // 转换为秒
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
    const seconds = timeDifferenceInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
};

// 假设你有一个数据列表
const data = ref([
  { id: '1', rank: 1, userAccount: '12345', userName: '张三', accepted: 2, question0: {time:'2024-8-14 00:00:00',answer:0}, question1: {time:'2024-8-14 10:00:00',answer:0}, question2: {time:'2024-8-14 04:00:00',answer:1}, question3: {} },
  { id: '2', rank: 2, userAccount: '67890', userName: '李四', accepted: 1, question0: {time:'2024-8-13 00:00:00',answer:0}, question1: {time:'2024-8-12 00:07:00',answer:1}, question2: {}, question3: {time:'2024-8-11 07:00:00',answer:1} },
]);
</script>

<style lang="scss">
#ContestRank {
  .d {
    padding: 9px;
  }
  
  .arco-table .arco-table-cell {
    padding: 0;
  }   
  .arco-table .arco-table-th-title {
    padding: 9px;
  }
}
</style>