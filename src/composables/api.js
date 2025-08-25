export async function getResponse(message_stage1, APIKey) {
  try {
    const body = {
      message: message_stage1,
      APIKey: APIKey,
    };

    const URL = "/.netlify/functions/proxy";

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw new Error(errorData?.error || `前端请求失败：${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
}
