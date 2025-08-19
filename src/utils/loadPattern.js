import axios from "axios";

export async function loadPattern(selectedPattern, usersInputForm) {
  const usersPattern = usersInputForm.usersPattern;
  console.log(usersPattern);
  const { selectedLanguage: language, selectedModel: model } = selectedPattern;

  if (usersPattern) {
    //不空
    return usersInputForm;
  } else {
    const file = `src/assets/default_match_pattern.json`;
    const response = await axios.post(file); //坑：忘记写异步了，直接访问属性是undefined

    if (response.status === 200) {
      const default_pattern = response.data[language][model];
      console.log(default_pattern);

      usersInputForm.usersPattern = default_pattern;
    }

    return usersInputForm;
  }
}

export async function buildPrompt(model, language, stage) {
  //stage: string -> "stage_1" "stage_2"
  const promptFile = `src/assets/system_prompt/${model}/${stage}/${language}.prompt`;

  console.log(promptFile);

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

export function replacePrompt(
  model,
  stage,
  orginal_prompt,
  sentence,
  usersPattern
) {
  switch (model) {
    case "RE":
      switch (stage) {
        case "stage_1":
          prompt = orginal_prompt.replace("$sentence", sentence);
          prompt = orginal_prompt.replace("$relations", usersPattern["rtl"]);

        case "stage_2":
          prompt = orginal_prompt.replace("$stl", usersPattern["stl"]);
          prompt = orginal_prompt.replace("otl", usersPattern["otl"]);
      }
  }
}
