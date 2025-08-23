import axios from "axios";

export async function getResponse(message_stage1, APIKey) {
  try {
    const body = {
      message: message_stage1,
      APIKey: APIKey,
    };

    const URL = "/.netlify/functions/proxy";

    const response = await axios.post(URL, JSON.stringify(body), {
      "Content-Type": "application/json",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "请求失败！");
    }

    return result.result;

  } catch (error) {
    throw error;
  }
}
