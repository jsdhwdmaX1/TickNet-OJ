<template>
  <div id="ContestList">

    <!-- 头部 -->
    <div class="header">
      <!-- 搜索栏 -->
      <el-input
        v-model="searchParams.title"
        style="width: 300px;"
        placeholder="输入比赛名称回车搜索"
        :prefix-icon="Search"
        @keyup.enter="doSubmit"
        clearable
      />
      <!-- 创建比赛（管理员） -->
      <MyButton @click="$router.push('/add_contest')" style="width: 100px;height: 36px;">创建比赛</MyButton>
    </div>

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
      <!-- 状态 -->
      <template #status="{ record }">
        <div :style="statusStyle(record.status)">
          {{ statusText(record.status) }}
        </div>
      </template>
      <!-- 比赛名称 -->
      <template #title="{ record }">
        <div class="bluetitle" @click="toContestPage(record)">
          {{ record.title }}
        </div>
      </template>
      <!-- 开始时间 -->
      <template #startTime="{ record }">
        {{ moment(record.startTime).format("YYYY-MM-DD HH:mm") }}
      </template>
      <!-- 结束时间 -->
      <template #endTime="{ record }">
        {{ moment(record.endTime).format("YYYY-MM-DD HH:mm") }}
      </template>
      <!-- 报名按钮 -->
      <template #optional="{ record }">
        <a-space>
          <MyButton @click="doApply">报名</MyButton>
          <button class="gray btn" @click="toContestPage(record)">已报名</button>
          <!-- 只有管理员才能修改和删除 -->
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
  ContestControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { useRouter } from "vue-router";
import moment from "moment";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// const dataList = ref([]);
const total = ref(1);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  pageSize: 8,
  current: 1,
});

const dataList = ref([{
      status: '2',
      id: '003',
      title: 'TickNet2025上半年招新赛',
      startTime: '2025-05-01 13:00',
      duration: '5h',
      endTime: '2025-05-01 18:00',
      number: 10,
    }, {
      status: '1',
      id: '002',
      title: 'TickNet2024下半年招新赛',
      duration: '5h',
      number: 10,
    },
    {
      status: '0',
      id: '001',
      title: 'TickNet2023下半年招新赛',
      startTime: '2023-11-01 13:00',
      duration: '5h',
      endTime: '2023-11-01 18:00',
      number: 10,
    },
]);

// 调状态字体样式
const statusText = (status: string) => {
  switch (status) {
    case '0':
      return '已结束';
    case '1':
      return '进行中';
    case '2':
      return '未开始';
    default:
      return '未知状态';
  }
};
const statusStyle = (status: string) => {
  switch (status) {
    case '0':
      return { color: '#f77b7b', fontWeight: 'bold' }; // 红色文字
    case '1':
      return { color: '#409EFF', fontWeight: 'bold' }; // 蓝色字体
    case '2':
      return { color: '#67C23A', fontWeight: 'bold' }; // 绿色文字
    default:
      return {};
  }
};

const loadData = async () => {
  const res = await ContestControllerService.listQuestionByPageUsingPost(
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
    title: "状态",
    slotName: "status",
    align: 'center',
    filterable: {
      filters: [
        { text: '未开始', value: '2', }, 
        { text: '进行中', value: '1',}, 
        { text: '已结束', value: '0', }, 
      ],
      filter: (value:string, row:any) => row.status?.includes(value),
    }
  },
  {
    title: "比赛 id",
    dataIndex: "id",
    align: 'center',
  },
  {
    title: "比赛名称",
    slotName: "title",
    align: 'center',
  },
  {
    title: "开始时间",
    slotName: "startTime",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: "持续时长",
    dataIndex: "duration",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: "结束时间",
    slotName: "endTime",
    align: 'center',
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  {
    title: "题数",
    dataIndex: "number",
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

const router = useRouter();

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

/**
 * 报名按钮
 */
 const doApply = async (contest: Question) => {
  const res = await ContestControllerService.deleteQuestionUsingPost({
    id: contest.id,
  });
  if (res.code === 0) {
    ElMessage.success("报名成功！");
  } else {
    ElMessage.error("加载失败，" + res.message);
  }
};

/**
 * 在新窗口跳转到比赛页面
 */
 const toContestPage = (contest: Question) => {
  window.open(`/contest/${contest.id}`,'_blank');
};

/**
 * 修改按钮
 */
 const doUpdate = (contest: Question) => {
  router.push({
    path: "/update_contest",
    query: {
      id: contest.id,
    },
  });
};

/**
 * 删除按钮
 */
 const doDelete = async (contest: Question) => {
  const res = await ContestControllerService.deleteQuestionUsingPost({
    id: contest.id,
  });
  if (res.code === 0) {
    ElMessage.success("删除成功");
    loadData();
  } else {
    ElMessage.error("删除失败");
  }
};

</script>

<style scoped lang="scss">
#ContestList {
  max-width: 1280px;
  margin: 0 auto;
  
  .header {
    display: flex;
    justify-content: space-between;
  }

  .bluetitle {
    color: #409EFF;
    font-weight: 600;
  }
  .bluetitle:hover {
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
  // 灰色
  .gray {
    background: #a9abaf;
  }
  .gray:hover {
    -webkit-animation: pulse 1.5s infinite;
    animation: pulse510 1.5s infinite;
  }
  @keyframes pulse510 {
    0% {
      box-shadow: 0 0 0 0 #c8c9cc;
    }
    70% {
      box-shadow: 0 0 0 8px rgba(218, 03, 8,  0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(218, 03, 8,  0);
    }
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