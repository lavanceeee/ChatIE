const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

export async function handler(event) {
  try {
    const start = Date.now();

    if (process.env.NODE_ENV !== "production") {
      await import("dotenv").then((d) => d.config());
    }

    const { message, APIKey } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "缺少必要参数：message" }),
      };
    }

    const defaultKey = process.env.API_KEY;
    const key = APIKey ?? defaultKey;

    if (!key) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "API密钥未配置，请检查环境变量或请求参数",
        }),
      };
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "doubao-seed-1-6-250615",
        messages: message,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`请求API失败，${errorBody}`);
    }

    const data = await response.json();
    const structuredIE = data.choices?.[0]?.message?.content || "";

    const duration = Date.now() - start;
    console.log(`这次后端请求花了：${duration}`);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 允许跨域
      },
      body: JSON.stringify({ result: structuredIE }),
    };
  } catch (error) {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
    };
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "调用API失败", details: errorDetails }),
    };
  }
}
