<template>
  <div id="AddContest">
    <h2>创建比赛</h2>
    <a-form :model="form" size="large"  label-align="left">
      <!-- 比赛名称 -->
      <a-form-item field="title" label="比赛名称">
        <a-input v-model="form.title" placeholder="请输入比赛名称" allow-clear style="width: 638px;" />
      </a-form-item>
      <!-- 时间范围 -->
      <a-form-item field="time" label="起止时间">
        <a-range-picker @ok="onOk" format="YYYY-MM-DD HH:mm" :time-picker-props="{ defaultValue: ['00:00:00', '00:00:00'] }" show-time style="width: 360px;" />
      </a-form-item>
      <!-- 比赛说明 -->
      <a-form-item field="description" label="比赛说明">
        <MdEditor :value="form.description" :handle-change="onDescriptionChange" />
      </a-form-item>
      <!-- 搜索题目 -->
      <a-form-item field="questionId" label="搜索题目" >
        <a-input v-model="searchParams.id" placeholder="请输入题目id" allow-clear style="width: 360px" />
        <MyButton @click="addQuestion" style="margin-left: 20px">添加</MyButton>
      </a-form-item>
      <!-- 题目列表 -->
      <a-form-item field="questionSort" label="题目排序">
        <a-table :columns="columns" :data="data" @change="handleChange" :draggable="{ type: 'handle', width: 80 }" :pagination="false" style="width: 638px;">
          <!-- 删除按钮 -->
          <template #optional="{ record }">
            <a-space>
              <button class="red btn" @click="doDelete(record)">删除</button>
            </a-space>
          </template>
        </a-table>
      </a-form-item>
      <!-- 提交按钮 -->
      <a-form-item style="margin-top: 16px">
        <MyButton @click="doSubmit" style="font-size: 17px; padding: 0.5em 3.4em;" >提交</MyButton>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  Question,
  ContestControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus'

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

const searchParams = ref<QuestionQueryRequest>({
  id: undefined,
  title: ""
});

let form = ref({
  title: "",
  startTime: "",
  endTime: "",
  description: "",
  questionId: "",
  questionSort: [],
});

// 确定时间
function onOk(dateString: string) {
  console.log('onOk: ', dateString);
  form.value.startTime = dateString[0];
  form.value.endTime = dateString[1];
}

// 比赛说明
const onDescriptionChange = (value: string) => {
  form.value.description = value;
};

// 添加题目
const addQuestion = async() => {
  if (searchParams.value.id ) {
    const res = await ContestControllerService.getQuestionByIdUsingGet(
      searchParams.value.id as any
    );
    if (res.code === 0){
      searchParams.value.title = res.data?.title as string
      data.value.push({
        id: searchParams.value.id, 
        title: searchParams.value.title,
      });
      ElMessage.success("添加成功");
    } else {
      ElMessage.error("查找失败" + res.message);
    }
  } else {
    ElMessage.warning("id未定义，无法添加题目");
  }
}

// 题目排序
const columns = reactive([
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '题目名称',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title:"操作",
    slotName: "optional",
    align: 'center',
  },
]);
const data = ref([
  {
    id: 2323,
    title: '二叉树',
  },
  {
    id: 9900,
    title: 'HelloKitty',
  },
]);
const handleChange = (_data: any) => {
  data.value = _data
}

// 删除按钮
const doDelete = (record: any) => {
  const index = data.value.indexOf(record)
  if (index > -1) {
    data.value.splice(index, 1)
    ElMessage.success("删除成功");
  } else {
    ElMessage.error("无法找到该记录");
  }
};

/**
 * 根据题目 id 获取老的数据
 */
 const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await ContestControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // 不知道startTime: "",endTime: "",questionSort: []要不要改格式
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

/**
 * 提交按钮
 */
 const doSubmit = async () => {
  // console.log(form.value);
  // 获取数据的顺序
  // dataOrder = computed(() => data.value.map((item) => item.id));
  // 如果是更新
  if (updatePage) {
    const res = await ContestControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      ElMessage.success("更新成功");
    } else {
      ElMessage.error("更新失败，" + res.message);
    }
  } else {// 如果是创建
    const res = await ContestControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      ElMessage.success("创建成功");
    } else {
      ElMessage.error("创建失败，" + res.message);
    }
  }
};
</script>

<style scoped lang="scss">
#AddContest {
  margin: 0 auto;
  width: 830px;

  h2 {
    padding-bottom: 15px;
    font-size: 22px;
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