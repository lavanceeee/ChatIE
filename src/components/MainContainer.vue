<script setup>
import { ref, reactive, watch, computed } from "vue";
import { getUsersForm } from "../composables/useData";
import { marked } from "marked";

const selectedPattern = reactive({
  selectedLanguage: "eng",
  selectedModel: "RE",
});

const usersInputForm = reactive({
  sentence: "",
  usersPattern: "",
  usersKey: "",
});

//提取结果
const result = ref("");

//清空功能，放在watch前面初始化
const clearInput = () => {
  Object.keys(usersInputForm)
  .filter((key) => key !== "usersKey")
  .forEach((key) => {
    usersInputForm[key] = "";
  });

  //清空结果
  result.value = [];
};

//监控中英文的变化
watch(
  () => selectedPattern.selectedLanguage,
  () => clearInput(),
  { immediate: true } 
);

//将要渲染的pattern
const patternOnBottom = computed(() => {
  return Object.entries(usersInputForm)
    .filter(
      ([key, value]) => value !== "" && key !== "sentence" && key !== "usersKey"
    )
    .map(([key, value]) => `${key}: ${value}`);
});

const submmitInput = async () => {
  // if (!usersInputForm.sentence || !usersInputForm.usersKey) {
  //   alert("sentence and your API key is required");
  //   return;
  // }

  //submmit users input
  //坑：不能直接覆盖ref对象, 且函数是异步的
  const result_orginal = await getUsersForm(selectedPattern, usersInputForm);
  result.value = marked.parse(result_orginal);

};

</script>

<template>
  <div class="selector">
    <div class="radio-language">
      <input
        type="radio"
        id="en"
        value="eng"
        v-model="selectedPattern.selectedLanguage"
      />
      <label for="en">English</label>

      <input
        type="radio"
        id="ch"
        value="chi"
        v-model="selectedPattern.selectedLanguage"
      />
      <label for="ch">Chinese</label>
    </div>

    <div class="radio-model">
      <input
        type="radio"
        id="RE"
        value="RE"
        v-model="selectedPattern.selectedModel"
      />
      <label for="RE">RE</label>

      <input
        type="radio"
        id="NER"
        value="NER"
        v-model="selectedPattern.selectedModel"
      />
      <label for="RE">NER</label>

      <input
        type="radio"
        id="EE"
        value="EE"
        v-model="selectedPattern.selectedModel"
      />
      <label for="RE">EE</label>
    </div>
  </div>

  <div class="content-container">
    <input
      type="text"
      placeholder="sentence* (required)"
      v-model="usersInputForm.sentence"
    />

    <input 
      type="text"
      placeholder="pattern (optional)"
      v-model="usersInputForm.usersPattern"
      >

    <input
      type="text"
      placeholder="DouBao API key (optinal)"
      v-model="usersInputForm.usersKey"
    />
  </div>

  <div class="btn-container">
    <button @click="submmitInput">Generate</button>
    <button @click="clearInput">Clear</button>
  </div>

  <div class="result-container">
    <h3 style="margin-top: 0">Result:</h3>

    <div v-html="result"></div>
  </div>
</template>

<style scoped>
.selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-top: 1rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
}

.content-container input {
  width: 35rem;
  height: 3rem;
  border-radius: 3px;
  border: 1px solid black;
  padding: 0 10px;
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.btn-container button {
  width: 10rem;
  height: 3rem;
  background-color: rgb(0, 0, 0);
  border: 1px solid black;
  border-radius: 5px;
  transition: all 0.3s ease;
  color: white;
}

.btn-container button:hover {
  background-color: rgb(55, 55, 55);
  cursor: pointer;
}

.result-container {
  margin: 20px auto;
  border: 1px, solid black;
  border-radius: 5px;
  width: 35rem;
  /* height: 8rem; */
  padding: 20px;
}
</style>