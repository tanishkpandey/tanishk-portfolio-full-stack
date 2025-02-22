import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // Your Google OAuth client credentials
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN!;

    const tokenUrl = "https://oauth2.googleapis.com/token";

    // Send request to Google OAuth API
    const response = await axios.post(tokenUrl, {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("🔴 Google OAuth Token Error:", error);
    return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
  }
}
