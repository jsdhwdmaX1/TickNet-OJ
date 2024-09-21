<template>
<div id="ContestId">
  <!-- 头部 -->
  <div class="back"></div>
  <div class="header">
    <h1 class="title">TickNet2024下半年招新赛</h1>
    <div class="time">2024-10-20 13:00 至 2024-10-20 18:00</div>
    <div class="time">时长：5h</div>
    <div class="number">已有 80 人报名</div>
    <el-button type="info" disabled>已报名</el-button>&nbsp;
    <button class="gray btn">取消报名</button>&nbsp;
    <button class="green btn">报名</button>
  </div>

  <!-- 分段控制器 -->
  <div class="gap">
    <el-segmented block v-model="value" :options="options" size="large" @change="handleSegmentedChange" class="seg"/>
  </div>

  <!-- 内容区 -->
  <div class="content">
    <router-view :name="arcontent[is]" />
  </div>
  
</div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import {
  ContestControllerService,
  QuestionVO,
} from "../../../generated";
import { ElMessage } from 'element-plus'

const contest = ref<QuestionVO>();
const arcontent = ref(['ContestDescription', 'ContestQuestion', 'ContestSubmit', 'ContestRank']);
const is = ref(0); // 用于控制内容区显示的索引

const value = ref('说明'); // 初始值
const options = ref(['说明', '题目', '提交', '排名']); // 分段选项

// 分段控制器变化时的处理函数
const handleSegmentedChange = (value: string) => {
  is.value = options.value.indexOf(value);
  // 可以在这里执行更多的逻辑，例如重新加载数据等
};

// 定义一个 Props 接口，其中包含一个 id 属性
interface Props {
  id: string;
}
// 使用 withDefaults 函数为 id 属性设置了一个默认值，即空字符串
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  if (!props.id) {
    return;
  }
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

</script>

<style scoped lang="scss">
#ContestId {
  max-width: 1000px;
  margin: 0 auto;
    .gap {
      width: 500px;
      margin-bottom: 20px;
    }
    .seg {
      color: #000;
      height: 42px;
      --el-segmented-item-selected-bg-color: #409EFF;
      --el-border-radius-base: 21px;
    }
    .back {
      height: 270px;
      width: 100vw;
      background: url('../../assets/back2.jpeg') no-repeat center / 100% 100% ;
      position: absolute;
      left: 0;
      top: 75px;
    }
    .header {
        position: relative;
        height: 260px;
        width: 1000px;
        padding-left: 100px;
        color: #f5f5f5;
        .title {
          font-size: 36px;
          margin-bottom: 15px;
        }
        .time {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .number {
          font-size: 16px;
          margin-bottom: 20px;
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
          background: #a5a7ab;
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
          background: #4ad603;
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
    }
}
</style>