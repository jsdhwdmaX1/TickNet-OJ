<template>
  <div id="manageQuestionView">

    <!-- 搜索栏 -->
    <el-input
      v-model="searchParams.userId"
      style="width: 300px ;height: 36px;"
      placeholder="输入标题回车搜索"
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
      <!-- 标题 -->
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
      <!-- 创建时间 -->
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <!-- 操作 -->
      <template #optional="{ record }">
        <a-space>
          <button class="green btn" @click="doUpdate(record)">修改</button>
          <button class="red btn" @click="doDelete(record)">删除</button>
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
} from "../../../generated";
import { useRouter } from "vue-router";
import moment from "moment";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// const dataList = ref([]);
const total = ref(1);
const searchParams = ref({
  userId: undefined,
  pageSize: 10,
  current: 1,
});

const dataList = ref([{
      id: '1',
      title: '二叉树',
      content: '输入输出',
      tags: '树',
      answer: '答案',
      submitNum: '10',
      acceptedNum: '8',
      judgeConfig: '配置',
      judgeCase: '用例',
      userId: '220501',
    },
]);

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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
    title: "id",
    dataIndex: "id",
    align: 'center',
  },
  {
    title: "标题",
    slotName: "title",
    align: 'center',
  },
  {
    title: "内容",
    dataIndex: "content",
    align: 'center',
  },
  {
    title: "标签",
    slotName: "tags",
    align: 'center',
  },
  {
    title: "答案",
    dataIndex: "answer",
    align: 'center',
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    align: 'center',
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    align: 'center',
  },
  {
    title: "用户id",
    dataIndex: "userId",
    align: 'center',
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
    title: "操作",
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
 * 在新窗口跳转到比赛页面
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

/**
 * 删除按钮
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    ElMessage.success("删除成功");
    loadData();
  } else {
    ElMessage.error("删除失败");
  }
};

const router = useRouter();

/**
 * 修改按钮
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped lang="scss">
#manageQuestionView {
  // 标题样式
  .title {
    color: #409EFF;
    font-weight: 600;
  }
  .title:hover {
    color: #337ecc;
    cursor: pointer;
  }
  // 按钮样式
  .btn {
    border: none;
    color: #fff;
    border-radius: 5px;
    font-family: inherit;
    font-size: 15px;
    padding: 0.5em 1em;
    transition: scale 0.2s ease;
  }
  .btn:hover {
    cursor: pointer;
  }
  .btn:active {
    scale: 0.95;
  }
  // 绿色
  .green {
    background: #92d670;
  }
  .green:hover {
    -webkit-animation: pulse 1.5s infinite;
    animation: pulse511 1.5s infinite;
  }
  @keyframes pulse511 {
    0% {
      box-shadow: 0 0 0 0  #b3e19d;
    }
    70% {
      box-shadow: 0 0 0 8px rgba(218, 03, 8,  0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(218, 03, 8,  0);
    }
  }  
  // 红色
  .red {
    background:  #f77b7b;
  }
  .red:hover {
    -webkit-animation: pulse 1.5s infinite;
    animation: pulse512 1.5s infinite;
  }
  @keyframes pulse512 {
    0% {
      box-shadow: 0 0 0 0 #fab6b6;
    }
    70% {
      box-shadow: 0 0 0 8px rgba(218, 03, 8,  0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(218, 03, 8,  0);
    }
  }
}
</style>
