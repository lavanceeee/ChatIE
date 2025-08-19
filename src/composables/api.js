import axios from "axios";

//火山引擎API文档：https://www.volcengine.com/docs/82379/1298459
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

export async function getResponse(prompt, usersKey){
    const apiKey = usersKey;

    try {
        const response = await axios.post(
            BASE_URL,
            {
                model: "doubao-lite-32k-240828",
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        );
        const structuredIE = response.data.choices[0]?.message?.content || "";
        console.log(structuredIE);
        return structuredIE;

    } catch (error) {
        return `API请求失败:", ${error}`;

    } finally {
        
        document.body.style.cursor = "default";
    }
}