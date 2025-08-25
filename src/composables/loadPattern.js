import storeData from "../store";

//加载提示词模板
export async function loadPattern() {
  if (storeData.getUsersPattern()) {
    //string转Object对象
    //导致显示框的[object Object]bug
    const pattern = JSON.parse(storeData.getUsersPattern());

    storeData.setPattern(pattern);
  } else {
    const language = storeData.getLanguage();
    const model = storeData.getModel();

    const file = `default_match_pattern.json`;
    const response = await fetch(file); //坑：忘记写异步了，直接访问属性是undefined

    if (!response.ok) {
      throw new Error(`failed loading default pattern: ${response.status}`);
    }

    const data = await response.json();

    const default_pattern = data[language][model];

    storeData.setPattern(default_pattern);
  }
}

export async function buildPrompt(stage) {
  //stage: string -> "stage_1" "stage_2"

  const language = storeData.getLanguage();
  const model = storeData.getModel();

  const promptFile = `system_prompt/${model}/${stage}/${language}.prompt`;

  //必须是get
  const response = await fetch(promptFile);

  if (!response.ok) {
    throw new Error(`failed loading prompt: ${response.status}`);
  }

  const orginal_prompt = await response.text();

  return orginal_prompt;
}

/*
在这里进行原提示词的替换
*/
export function replacePrompt(stage, orginal_prompt, result_of_stage1) {
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
          orginal_prompt = orginal_prompt.replace(/\$stl/g, pattern["stl"]); //替换全部
          orginal_prompt = orginal_prompt.replace(/\$otl/g, pattern["otl"]);
          prompt = orginal_prompt.replace("$relation", result_of_stage1);
          break;
      }
      break; //坑，忘记break了。

    case "EE":
      switch (stage) {
        case "stage_1":
          orginal_prompt = orginal_prompt.replace("$sentence", sentence);
          prompt = orginal_prompt.replace(
            "$etl",
            JSON.stringify(pattern["etl"])
          );
          break;

        case "stage_2":
          orginal_prompt = orginal_prompt.replace(
            "$etl",
            JSON.stringify(pattern["etl"])
          );
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
  return prompt;
}
