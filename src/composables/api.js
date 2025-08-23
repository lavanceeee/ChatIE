import axios from "axios";

export async function getResponse(message_stage1, APIKey) {
  try {
    const body = {
      message: message_stage1,
      APIKey: APIKey,
    };

    const URL = "/.netlify/functions/proxy";

    const response = await axios.post(URL, body, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.status === 200) {
      throw new Error(response.data?.error || "请求失败！");
    }

    return response.data.result;

  } catch (error) {
    throw error;
  }
}
