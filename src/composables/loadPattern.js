import axios from "axios";
import storeData from "../store";

//加载提示词模板
export async function loadPattern() {
  if (storeData.getUsersPattern()) {
    console.log("不空");

    //string转Object对象
    //导致显示框的[object Object]bug
    const pattern = JSON.parse(storeData.getUsersPattern());

    storeData.setPattern(pattern);
  } else {
    console.log("空");
    const language = storeData.getLanguage();
    const model = storeData.getModel();

    const file = `src/assets/default_match_pattern.json`;
    const response = await axios.post(file); //坑：忘记写异步了，直接访问属性是undefined

    if (response.status === 200) {
      const default_pattern = response.data[language][model];
      console.log(default_pattern);

      storeData.setPattern(default_pattern);

      console.log("xxxx", storeData.getPattern());
    }
  }
}

export async function buildPrompt(stage) {
  //stage: string -> "stage_1" "stage_2"

  const language = storeData.getLanguage();
  const model = storeData.getModel();

  const promptFile = `src/assets/system_prompt/${model}/${stage}/${language}.prompt`;

  console.log("打开的promptFile", promptFile);

  const response = await axios.post(promptFile);

  if (response.status === 200) {
    console.log("请求到了prompt");

    const orginal_prompt = response.data;
    console.log(orginal_prompt);
    return orginal_prompt;
  }
}

/*
在这里进行原提示词的替换
*/
export function replacePrompt(stage, orginal_prompt, result_of_stage1) {
  const sentence = storeData.getSentence();
  const model = storeData.getModel();
  const pattern = storeData.getPattern();

  console.log(pattern);
  console.log(typeof(pattern));

  let prompt = "";

  switch (model) {
    case "RE":
      switch (stage) {
        case "stage_1":
          orginal_prompt = orginal_prompt.replace("$sentence", sentence);
          console.log("pattern", pattern);
          prompt = orginal_prompt.replace("$relations", pattern["rtl"]);
          break; //坑：忘记break，case穿透

        case "stage_2":
          orginal_prompt = orginal_prompt.replace(/\$stl/g, pattern["stl"]); //替换全部
          orginal_prompt = orginal_prompt.replace(/\$otl/g, pattern["otl"]);
          prompt = orginal_prompt.replace("$relation", result_of_stage1);
          break;
      }
      break; //大坑，忘记break了。

    case "EE":
      console.log("见啦");
      switch (stage) {
        case "stage_1":
          let etlDescription = "你好";
          console.log("进入第一阶段");
          orginal_prompt = orginal_prompt.replace("$sentence", sentence);
          prompt = orginal_prompt.replace("$etl", JSON.stringify(pattern["etl"]));
          console.log("-----=========", prompt);
          console.log("结束第一阶段");
          break;

        case "stage_2":
          orginal_prompt = orginal_prompt.replace("$etl", JSON.stringify(pattern["etl"]));
          prompt = orginal_prompt.replace("$first_stage", result_of_stage1);

          break;
      }
      break;

    case "NER":
      switch (stage) {
        case "stage_1":
          orginal_prompt = orginal_prompt.replace("$sentence", sentence);
          prompt = orginal_prompt.replace("$etl", pattern["etl"]);
          break;

        case "stage_2":
          prompt = orginal_prompt.replace("$etl", pattern["etl"]);
          break;
      }
      break;
  }
  console.log(`${model}的最终第${stage}阶段prompt`, prompt);
  return prompt;
}
