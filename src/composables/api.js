export async function getResponse(message, APIKey) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/call_doubao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: message,
        apiKey: APIKey,
      }),
    });

    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(`${response.status} - ${errorText.error}`);
    }

    const data = await response.json();

    return data.result;

  } catch (error) {
    throw error;
  }
}
