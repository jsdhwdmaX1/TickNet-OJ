<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form" size="large"  label-align="left">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" allow-clear style="width: 638px;"/>
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear  style="width: 638px;"/>
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>

      <!-- 判题配置 -->
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 450px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              min="0"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <!-- 测试用例配置 -->
      <a-form-item label="测试用例配置" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input allow-clear
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input allow-clear
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>
            <button class="noselect nored" @click="handleDelete(index)">
              <span class="text">删除此用例</span>
              <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
            </button>
          </a-space>
        </a-form-item>
        <button class="noselect nogreen" @click="handleAdd">
          <span class="text">新增测试用例</span>
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26"><path fill="none" d="M0 0h24v24H0z"></path><path fill="write" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg></span>
        </button>
      </a-form-item>

      <!-- 提交按钮 -->
      <a-form-item style="margin-top: 16px">
        <MyButton 
          style="font-size: 17px; padding: 0.5em 3.4em;" 
          @click="doSubmit"
        >提交</MyButton>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus'

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  answer: "",
  content: "",
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json 转 js 对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
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
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      ElMessage.success("更新成功");
    } else {
      ElMessage.error("更新失败，" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      ElMessage.success("创建成功");
    } else {
      ElMessage.error("创建失败，" + res.message);
    }
  }
};

/**
 * 新增判题用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除判题用例
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped lang="scss">
#addQuestionView {
  margin: 0 auto;
  width: 830px;

  h2 {
    padding-bottom: 15px;
    font-size: 22px;
  }

  .noselect {
    width: 150px;
    height: 35px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
  }

  // 单独给绿色按钮设置
  .nogreen {
    background:  #95d475;
    .text {
      transform: translateX(7px);
    }
    .icon {
      border-left: 1px solid  #529b2e;
    }
    :hover {
      background:  #95d475;
    }
  }

  // 单独给红色按钮设置
  .nored {
    background: rgb(250,120,120);
    margin-bottom: 32px;
    .text {
      transform: translateX(14px);
    }
    .icon {
    border-left: 1px solid  rgb(199, 7, 7);
    }
    :hover {
    background:  rgb(250,120,120);
    }
    svg {
      width: 13px;
    }
  }

  .noselect, .noselect span {
    transition: 200ms;  
  }

  .noselect .text {
    color: white;
    font-size: 15px;
  }

  .noselect .icon {
    position: absolute;
    transform: translateX(108px);
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .noselect svg {
    fill: #fff;
  }

  .noselect:hover .text {
    color: transparent;
  }

  .noselect:hover .icon {
    width: 140px;
    border-left: none;
    transform: translateX(0);
  }

  .noselect:focus {
    outline: none;
  }

  .noselect:active .icon svg {
    transform: scale(0.8);
  }
}
</style>
