const API_KEY = "b68c6897-77f4-45dd-874f-19d38003eb6d";
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

export async function callDoubaoAPI(messages, APIKey) {
  try {
    const start = Date.now();

    const key = APIKey ?? API_KEY;

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "doubao-1-5-pro-32k-250115",
        messages: messages, 
        "thinking": {
          "type": "disabled",
        }
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`请求API失败：${errorBody}`);
    }

    const data = await response.json();
    const structuredIE = data.choices?.[0]?.message?.content || "";

    const duration = Date.now() - start;
    console.log(`前端直连豆包 API 花费时间: ${duration}ms`);

    return structuredIE;
  } catch (error) {
    console.error("调用豆包API失败：", error);
    throw error;
  }
}



export async function getResponse(message_stage1, APIKey) {
  try {
    // const body = {
    //   message: message_stage1,
    //   APIKey: APIKey,
    // };

    // const URL = "/.netlify/functions/proxy";

    // const response = await fetch(URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // });

    const response = await callDoubaoAPI(message_stage1, APIKey);

    // if (!response.ok) {
    //   const errorData = await response.json().catch(() => {});
    //   throw new Error(errorData?.error || `前端请求失败：${response.status}`);
    // }

    // const data = await response.json();
    // return data.result;

    return response;
  } catch (error) {
    throw error;
  }
}
