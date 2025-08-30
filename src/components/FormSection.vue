<template>
  <div class="selector">
    <div class="radio-language">
      <input
        type="radio"
        id="en"
        value="eng"
        v-model="localPattern.selectedLanguage"
      />
      <label for="en">English</label>

      <input
        type="radio"
        id="ch"
        value="chi"
        v-model="localPattern.selectedLanguage"
      />
      <label for="ch">Chinese</label>
    </div>

    <div class="radio-model">
      <input
        type="radio"
        id="RE"
        value="RE"
        v-model="localPattern.selectedModel"
      />
      <label for="RE">RE</label>

      <input
        type="radio"
        id="NER"
        value="NER"
        v-model="localPattern.selectedModel"
      />
      <label for="RE">NER</label>

      <input
        type="radio"
        id="EE"
        value="EE"
        v-model="localPattern.selectedModel"
      />
      <label for="RE">EE</label>
    </div>
  </div>

  <div class="content-container">
    <input
      type="text"
      placeholder="sentence* (required)"
      v-model="localInputForm.sentence"
    />

    <details>
      <summary>Rules</summary>
      <div><strong>Both are JSON format</strong></div>

      <div>
        RE: {"rtl": ["xxx", "xxx"], "stl": ["xxx"], "otl": ["xxx", "xxx"]}
      </div>
      <div>NER: {"etl: {""Business:Declare-Bankruptcy": [ "Org", "Time", "Place" ]} }</div>
      <div>EE: {"etl": ["PROD", "ORG", "DATE", "DATE"]}</div>
    </details>

    <input
      type="text"
      placeholder="pattern (optional)"
      v-model="localInputForm.usersPattern"
    />

    <input
      type="text"
      placeholder="doubao API key (optinal)"
      v-model="localInputForm.usersKey"
    />
  </div>

  <div class="btn-container">
    <button @click="submmitInput" :disabled="isLoading">
      {{ isLoading ? "Generating" : "Generate" }}
    </button>

    <button @click="clearInput" :disabled="isLoading">Clear</button>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  selectedPattern: {
    type: Object,
    required: true,
  },
  usersInputForm: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:selected-pattern",
  "update:users-input-form",
  "submit",
  "clear",
]);

const localPattern = reactive({ ...props.selectedPattern });
const localInputForm = reactive({ ...props.usersInputForm });

watch(
  localPattern,
  (newValue) => {
    emit("update:selected-pattern", { ...newValue });
  },

  {
    deep: true,
  }
);

watch(
  localInputForm,
  (newValue) => {
    emit("update:users-input-form", { ...newValue });
  },
  { deep: true }
);

const submmitInput = () => {
  if (!localInputForm.sentence) {
    alert(`${localPattern.selectedModel} sentence is required!`);
  }

  emit("submit");
};

const clearInput = () => {
  emit("clear");
};
</script>
