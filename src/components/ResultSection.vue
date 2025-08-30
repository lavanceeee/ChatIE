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

watch(
  () => props.responseData,
  (newValue) => {
    if (!newValue) {
      console.log("即将清除result");
      result.value = "";
    }
    result.value = marked.parse(newValue);
  }
);
</script>