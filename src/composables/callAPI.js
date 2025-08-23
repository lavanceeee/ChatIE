/*
这里进行两次模型地调用并返回结果
stage_1
stage_2
*/

/*
stage1: prompt -> 直接调用
stage2: 进行一次拼接
*/

import storeData from "../store";
import { getResponse } from "../../netlify/functions/proxy";
import { reg } from "../utils/regs";
import { buildPrompt, replacePrompt } from "./loadPattern";

const APIKey = storeData.getAPIKey();

const usersLanguage = storeData.getLanguage();

const content = usersLanguage === 'eng' 
  ? "You are a senior NLP expert, and now you are required to output strictly according to the user's prompt." 
  : "你是一名资深NLP语义提取专家，现在要求你严格按照用户的提示进行语义提取和输出。";

export async function callAPI(prompt_stage1) {
  //stage1
  //构建提示词
  let message_stage1 = [
    {
      role: "system",
      content: content,
    },
    {
      role: "user",
      content: prompt_stage1,
    },
  ];
  const response = await getResponse(message_stage1, APIKey);
  console.log("最终的结果是：", response);

  const response_in_stage_1 = reg(response); //string

  console.log("第一阶段的回复", response_in_stage_1);

  //stage_2
  let message_stage2 = [ //坑：不能直接赋值message_stage1.push()，是一个number
    ...message_stage1,
    {
      role: "assistant",
      content: response,
    },
  ];

  const stage = "stage_2";

  let orginal_prompt_stage2 = await buildPrompt(stage);
  console.log("第二阶段的原本模板：", orginal_prompt_stage2);

  //构建提示词
  const prompt_stage2 = replacePrompt(
    stage,
    orginal_prompt_stage2,
    response_in_stage_1
  );
  console.log("第二阶段构建好的提示词", prompt_stage2);

  message_stage2.push({
    role: "user",
    content: prompt_stage2,
  });

  console.log(message_stage2);

  const response_stage2 = await getResponse(message_stage2, default_API);

  return response_stage2;
}
