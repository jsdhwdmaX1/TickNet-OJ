<template>
  <div id="questionsView">

    <!-- 搜索栏 -->
    <el-input
      v-model="searchParams.title"
      style="width: 300px; height: 36px; margin-right: 20px;"
      placeholder="输入题目回车搜索"
      :prefix-icon="Search"
      @keyup.enter="doSubmit"
      clearable
    />
    <el-input
      v-model="searchParams.tags"
      style="width: 300px; height: 36px;"
      placeholder="输入标签回车搜索"
      :prefix-icon="Search"
      @keyup.enter="doSubmit"
      clearable
    />

    <!-- 题目列表 -->
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
      <!-- 题目名称 -->
      <template #title="{ record }">
        <div class="title" @click="toQuestionPage(record)">
          {{ record.title }}
        </div>
      </template>
      <!-- 标签 -->
      <template #tags="{ record }">
        <a-space>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <!-- 通过率 -->
      <template #acceptedRate="{ record }">
        {{
          `${
            record.submitNum ? record.acceptedNum / record.submitNum : "0"
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <!-- 创建时间 -->
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <!-- 做题按钮 -->
      <template #optional="{ record }">
        <a-space>
          <MyButton @click="toQuestionPage(record)">做题</MyButton>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import moment from "moment";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// const dataList = ref([]);
const total = ref(1);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 8,
  current: 1,
});

const dataList = ref([{
      id: '1',
      title: '二叉树',
      tags: '树'
    }, {
      id: '2',
      title: 'HelloKitty',
      tags: '简单'
    },
]);

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
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

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "题号",
    dataIndex: "id",
    align: 'center',
  },
  {
    title: "题目名称",
    slotName: "title",
    align: 'center',
  },
  {
    title: "标签",
    slotName: "tags",
    align: 'center',
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title:"操作",
    slotName: "optional",
    align: 'center',
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 在新窗口跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  console.log(question.id)
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
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
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
