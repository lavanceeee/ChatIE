import { loadPattern, buildPrompt, replacePrompt } from "./loadPattern";
import storeData from "../store";
import { callAPI } from "./callAPI";

export async function getUsersForm(selectedPattern, usersInputForm) {
    
    //加载可视化
    document.body.style.cursor = 'wait';

    /*
    先判断用户有没有pattern
    有的话不加载默认模板，直接传出去
    没有就先加载模板->加载提示词然后再传给后续的请求
    */
    storeData.loadParameter(usersInputForm, selectedPattern);

    //大坑: 不能直接统一变量，还未赋值；
    loadPattern(); 

    let stage = "stage_1";

    let orginal_prompt = await buildPrompt(stage);

    let prompt = replacePrompt (stage, orginal_prompt);

    console.log("最终提示词：" , prompt);

    const result = callAPI(prompt);

    return result;

    /*
    加载stage_2的模板
    构建第二次的提示词
    */
    // stage = "stage_2";

    // orginal_prompt = await buildPrompt(stage);
    // console.log("第二阶段的原本模板：", orginal_prompt);

    // //构建提示词
    // prompt = replacePrompt(stage, orginal_prompt, relations_in_stage_1);
    // console.log("第二阶段构建好的提示词", prompt);

    // //第二次调用
    // await callAPI(stage, prompt);
}