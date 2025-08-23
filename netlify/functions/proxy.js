import axios from "axios";

// 火山引擎API文档：https://www.volcengine.com/docs/82379/1298459
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

export async function handler(event) {
  try {
    if (process.env.NODE_ENV !== "production") {
      require("dotenv").config();
    }

    const { message, APIKey } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "缺少必要参数：message" })
      };
    }

    const defaultKey = process.env.API_KEY;
    const key = APIKey ?? defaultKey;

    if (!key) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "API密钥未配置，请检查环境变量或请求参数" })
      };
    }

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
    console.log(`第一阶段返回的提示词：${structuredIE}`); 

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // 允许跨域
      },
      body: JSON.stringify({ result: structuredIE }),
    };

  } catch (error) {
    const errorDetails = {
      message: error.message,
      response: error.response?.data || "无响应",
      status: error.response?.status || "无状态码",
    };
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "调用API失败", details: errorDetails }),
    };
  }
}
