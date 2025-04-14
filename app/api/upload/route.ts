/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const model = formData.get("model") as string;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Convert file to base64 for OpenAI API
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    // Call OpenAI API with the file
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that can analyze files.",
        },
        {
          role: "user",
          content: `Please analyze this file: ${file.name}\nContent: ${base64}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response =
      completion.choices[0]?.message?.content ||
      "I apologize, but I couldn't analyze the file.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
