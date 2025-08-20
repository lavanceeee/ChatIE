import axios from "axios";
import { getResponse } from "./api";
import { reg } from "../utils/regs";
import { loadPattern, buildPrompt, replacePrompt } from "../utils/loadPattern";
import storeData from "../store";


export async function getUsersForm(selectedPattern, usersInputForm) {
    
    //加载可视化
    document.body.style.cursor = 'wait';

    /*
    先判断用户有没有pattern
    有的话不加载默认模板，直接传出去
    没有就先加载模板->加载提示词然后再传给后续的请求
    */
    storeData.loadParameter(usersInputForm, selectedPattern);

    loadPattern(); //坑：异步函数加上await否则后面结果接到未定义的值。

    const {sentence: sentence, usersPattern: usersPattern, usersKey: usersKey} = usersInputForm;

    let stage = "stage_1";

    let orginal_prompt = await buildPrompt(stage);

    //stage_1: 替换关键词
    const prompt_stage1 = replacePrompt (stage, orginal_prompt);

    console.log(prompt_stage1);

    

    

    
    
}