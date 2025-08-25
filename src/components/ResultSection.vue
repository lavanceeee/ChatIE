<template>
  <div class="result-container">

    <h3 style="margin-top: 0">Result:</h3>

    <div v-html="result" class="table-container"></div>

  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { marked } from "marked";

const result = ref("");

const props = defineProps({
  responseData: {
    type: String,
    default: "",
  },
});

watch(() => props.responseData, (newValue) => {
  if (!newValue) {
    console.log("即将清除result");
    result.value = "";
  }

  result.value = marked.parse(newValue);
});
</script>

<style scoped>
.result-container {
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  padding: 20px;
}

.table-container :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 1rem;
  text-align: left;
}

.table-container :deep(th),
.table-container :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.table-container :deep(th) {
  background-color: #f8fafc;
  font-weight: 600;
  color: #334155;
}

.table-container :deep(tr:hover) {
  background-color: #f1f5f9;
}
</style>