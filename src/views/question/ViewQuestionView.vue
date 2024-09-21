<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">

      <!-- 左侧题目 -->
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <!-- 菜单栏一：题目 -->
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <!-- 题目内容 -->
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <!-- 菜单栏二：评论 -->
          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
          <!-- 菜单栏三：答案 -->
          <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>

      <!-- 右侧编译 -->
      <a-col :md="12" :xs="24">
        <!-- 选择编程语言 -->
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px;margin-bottom: 20px;"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '250px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <!-- 编译器 -->
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <!-- 提交代码 -->
        <MyButton style="min-width: 180px;height: 40px;font-size: 17px;" @click="doSubmit">提交代码</MyButton>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import { ElMessage } from 'element-plus'

const question = ref<QuestionVO>();

// 定义一个 Props 接口，其中包含一个 id 属性
interface Props {
  id: string;
}
// 使用 withDefaults 函数为 id 属性设置了一个默认值，即空字符串
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
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

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 更改代码
 */
const changeCode = (value: string) => {
  form.value.code = value;
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    ElMessage.success("提交成功");
  } else {
    ElMessage.error("提交失败," + res.message);
  }
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
