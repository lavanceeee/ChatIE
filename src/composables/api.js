export async function getResponse(message, APIKey) {
  try {
    const response = await fetch("http://localhost:5000/api/call_doubao", {
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
