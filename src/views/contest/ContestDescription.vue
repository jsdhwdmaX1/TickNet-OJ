<template>
  <div id="ContestDescription">
    <MdViewer :value="contest?.content || ''" />
    <h1>考察排序，二分查找，递归，线性表，二叉树等常见的算法与数据结构</h1>
    <br>
    <div style="font-size: 16px;">注意：请不要直接copy答案，重在理解掌握，所有的提交都是可见的！</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  ContestControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import { ElMessage } from 'element-plus'

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
</script>

<style scoped lang="scss">
#ContestDescription {
  background-color: rgb(238, 238, 238);
  padding: 40px;
}
</style>