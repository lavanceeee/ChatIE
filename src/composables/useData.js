import { loadPattern, buildPrompt, replacePrompt } from "./loadPattern";
import storeData from "../store";
import { callAPI } from "./callAPI";

/*
先判断用户有没有pattern
有的话不加载默认模板，直接传出去
没有就先加载模板->加载提示词然后再传给后续的请求
*/
export async function getUsersForm(selectedPattern, usersInputForm) {
  //加载可视化
  document.body.style.cursor = "wait";

  storeData.loadParameter(usersInputForm, selectedPattern);

  //大坑: 不能直接统一变量，还未赋值；
  loadPattern();

  let stage = "stage_1";

  let orginal_prompt = await buildPrompt(stage);

  let prompt = replacePrompt(stage, orginal_prompt);

  const result = await callAPI(prompt);

  document.body.style.cursor = "default";
  
  return result;
}
