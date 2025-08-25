<template>
  <div ref="container" id="vis-container"></div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import { DataSet, Network } from "vis-network/standalone";
import { getRandomColor } from "../utils/vis_utils";
import { transformRE2Object } from "../utils/vis_utils";

const container = ref(null);
let network = null;
let nodes = null;
let edges = null;

const props = defineProps({
  responseData: {
    type: String,
    default: "",
  },
});

//reactive()不会触发响应式更新
const result = ref({});

watch(
  () => props.responseData,
  (newValue) => {
    if (newValue) {
      result.value = { ...transformRE2Object(newValue) };
      //用户点击clear
    } else {
      //clear
      nodes.clear();
      edges.clear();
      result = {};
    }
  }
);

const initDataSets = () => {
  nodes = new DataSet();
  edges = new DataSet();
  return { nodes, edges };
};

const updateNetwork = (data) => {
  nodes.clear();
  edges.clear();

  const nodeMap = new Map();
  let id = 1;

  data.stl.forEach((source, index) => {
    const target = data.otl[index];
    const relation = data.relation[index];

    //stl
    if (!nodeMap.has(source)) {
      nodeMap.set(source, id);
      nodes.add({ id, label: source, color: getRandomColor() });
      id++;
    }

    //otl
    if (!nodeMap.has(target)) {
      nodeMap.set(target, id);
      nodes.add({ id, label: target, color: getRandomColor() });
      id++;
    }

    edges.add({
      from: nodeMap.get(source),
      to: nodeMap.get(target),
      label: relation,
      arrows: "to",
    });
  });

  if (network) {
    network.setData({ nodes, edges });
  } else {
    initNetwork();
  }
};

const initNetwork = () => {
  if (container.value && nodes && edges) {
    const options = {
      width: "100%",
      height: "100%",
      nodes: {
        size: 30,
        shape: "ellipse",
      },
      edges: {
        width: 2,
        arrows: "to",
      },
    };
    network = new Network(container.value, { nodes, edges }, options);
  }
};

watch(
  () => result.value,
  (newVal) => {
    // 当数据有效时更新网络
    if (newVal && Object.keys(newVal).length > 0) {
      // 确保数据集已初始化
      if (!nodes || !edges) {
        initDataSets();
      }
      updateNetwork(newVal);
    }
  },
  { immediate: true } // 立即执行一次检查
);

onMounted(() => {
  initDataSets();
});
</script>


<style scoped>
#vis-container {
  width: 35rem;
  height: 350px;
  border: 1px solid black;
  margin: 20px auto;
  padding: 0;
  border-radius: 5px;
}
</style>