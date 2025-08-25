<template>
  <FormSection
    @update:selected-pattern="
      (newPattern) => Object.assign(selectedPattern, newPattern)
    "
    @update:users-input-form="
      (newUsersInput) => Object.assign(usersInputForm, newUsersInput)
    "
    @submit="submitInput"
    @clear="clearInput"
    :selected-pattern="selectedPattern"
    :users-input-form="usersInputForm"
    :isLoading="isLoading"
  />

  <NetworkVis :response-data="result" />

  <ResultSection :response-data="result" />
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { getUsersForm } from "../composables/useData";
import FormSection from "./FormSection.vue";
import NetworkVis from "./NetworkVis.vue";
import ResultSection from "./ResultSection.vue";

const selectedPattern = reactive({
  selectedLanguage: "eng",
  selectedModel: "RE",
});

const usersInputForm = reactive({
  sentence: "",
  usersPattern: "",
  usersKey: "",
});

const isLoading = ref(false);
const result = ref("");

const clearInput = () => {
  Object.keys(usersInputForm)
    .filter((key) => key !== "usersKey")
    .forEach((key) => {
      usersInputForm[key] = "";
    });
  result.value = "";
};

const submitInput = async () => {
  isLoading.value = true;

  try {
    //不能直接覆盖ref对象, 且函数是异步的
    const result_orginal = await getUsersForm(selectedPattern, usersInputForm);
    result.value = result_orginal;
  } catch (error) {
    alert(error);
  } finally {
    isLoading.value = false;
  }
};
</script>