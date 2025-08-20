import axios from "axios";
import storeData from '../store';

//加载提示词模板
export async function loadPattern() {
  console.log(typeof(storeData.getPattern()));
  console.log(storeData.getPattern());

  if (storeData.getPattern()) {
    console.log("不空");
    //不空
    return;

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
export function replacePrompt(stage, orginal_prompt) {
  const sentence = storeData.getSentence();
  const model = storeData.getModel();
  const pattern = storeData.getPattern();

  let prompt = "";

  switch (model) {
    case "RE":
      switch (stage) {
        case "stage_1":

          orginal_prompt = orginal_prompt.replace("$sentence", sentence);
          prompt = orginal_prompt.replace("$relations", pattern["rtl"]);
          break; //坑：忘记break，case穿透

        case "stage_2":
          prompt = orginal_prompt.replace("$stl", pattern["stl"]);
          prompt = orginal_prompt.replace("otl", pattern["otl"]);
          break;
      }
  }
  return prompt;
}
