import storeData from "../store";
import { reg } from "../utils/regs";
import { buildPrompt, replacePrompt } from "./loadPattern";
import { getResponse } from "./api";

const APIKey = storeData.getAPIKey();

const usersLanguage = storeData.getLanguage();

const content =
  usersLanguage === "eng"
    ? "You are a senior NLP expert, and now you are required to output strictly according to the user's prompt."
    : "你是一名资深NLP语义提取专家，现在要求你严格按照用户的提示进行语义提取和输出。";

export async function callAPI(prompt_stage1) {
  try {
    //stage1
    //构建提示词
    const stage1_start = Date.now();

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

    const stage1_time = Date.now() - stage1_start;
    console.log(`第一阶段花费, ${stage1_time}`);
    const stage2_start = Date.now();

    const response_in_stage_1 = reg(response); //string

    //stage_2
    let message_stage2 = [
      //坑：不能直接赋值message_stage1.push()，是一个number
      ...message_stage1,
      {
        role: "assistant",
        content: response,
      },
    ];

    const stage = "stage_2";

    let orginal_prompt_stage2 = await buildPrompt(stage);

    //构建提示词
    const prompt_stage2 = replacePrompt(
      stage,
      orginal_prompt_stage2,
      response_in_stage_1
    );

    message_stage2.push({
      role: "user",
      content: prompt_stage2,
    });

    const response_stage2 = await getResponse(message_stage2, APIKey);

    const stage2_time = Date.now() - stage2_start;
    console.log(`第二阶段花了, ${stage2_time}`);

    return response_stage2;

  } catch (error) {
    alert(error);
  }
}
