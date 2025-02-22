import axios from "axios";

const getAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post("/api/token"); 
    return response.data.access_token;
  } catch (error) {
    console.error("🔴 Failed to get access token:", error);
    return null;
  }
};

export const sendMessageToDialogflow = async (message: string): Promise<string> => {
  const projectId = "mywebsitebot-sixb";
  const sessionId = "123456";
  const apiUrl = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error("🔴 No valid access token available.");
    return "Oops! Authentication failed.";
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        queryInput: {
          text: {
            text: message,
            languageCode: "en",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.queryResult.fulfillmentText || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error("❌ Dialogflow API request error:", error);
    return "Oops! Something went wrong.";
  }
};
