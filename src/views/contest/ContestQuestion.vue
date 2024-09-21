<template>
  <div id="ContestQuestion">
    <a-table :columns="columns" :data="dataList" :pagination="false">
      <!-- 题目名称 -->
      <template #title="{ record }">
        <div class="title" @click="toQuestionPage(record)">
          {{ record.title }}
        </div>
      </template>
      <!-- 通过率 -->
      <template #acceptedRate="{ record }">
        {{
          `${
            record.submitNum ? record.acceptedNum / record.submitNum : "0"
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <!-- 状态 -->
      <template #status="{ record }">
        <div :style="statusStyle(record.status)">
          {{ statusText(record.status) }}
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, } from "vue";
import {
  Question,
  QuestionVO,
  ContestControllerService,
} from "../../../generated";
import { ElMessage } from 'element-plus'

// const dataList = ref([]);

const dataList = ref([{
      id: '001',
      sort: 'A',
      title: '二叉树',
      status: 0
    }, {
      id: '002',
      sort: 'B',
      title: 'HelloKitty',
      status: 1
    },
]);

// 调状态字体样式
const statusText = (status: number) => {
  switch (status) {
    case 0:
      return '未通过';
    case 1:
      return '已通过';
    default:
      return '未知状态';
  }
};
const statusStyle = (status: number) => {
  switch (status) {
    case 0:
      return { color: '#f77b7b', fontWeight: 'bold' }; // 红色文字
    case 1:
      return { color: '#67C23A', fontWeight: 'bold' }; // 绿色文字
    default:
      return {};
  }
};

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const contest = ref<QuestionVO>();

const loadData = async () => {
  const res = await ContestControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    contest.value = res.data;
  } else {
    ElMessage.error("加载失败，" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    dataIndex: "sort",
    align: 'center',
    width: 100
  },
  {
    title: "题目名称",
    slotName: "title",
    align: 'center',
    width: 400
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
    align: 'center',
  },
  {
    title:"我的状态",
    slotName: "status",
    align: 'center',
  },
];

/**
 * 在新窗口跳转到做题页面
 */
const toQuestionPage = (question: Question) => {
  window.open(`/view/question/${question.id}`, '_blank');
};
</script>

<style scoped lang="scss">
#ContestQuestion {
  .title {
    color: #409EFF;
    font-weight: 600;
  }
  .title:hover {
    color: #337ecc;
    cursor: pointer;
  }
}
</style>