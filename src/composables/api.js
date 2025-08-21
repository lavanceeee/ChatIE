import axios from "axios";

//火山引擎API文档：https://www.volcengine.com/docs/82379/1298459
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

export async function getResponse(message, APIKey) {

  const default_key = "4c4054bc-8d13-4eb7-b4f9-14cb1699362f";

  const key = APIKey ?? default_key;

  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: "doubao-seed-1-6-250615",
        messages: message,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
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
