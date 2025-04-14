/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import { Ollama } from "ollama";

// Initialize providers
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});
const ollama = new Ollama({
  host: process.env.OLLAMA_HOST || "http://localhost:11434",
});

async function generateOpenAIResponse(message: string, model: string) {
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant. Provide clear and concise responses.",
      },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content || undefined;
}

async function generateGeminiResponse(message: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(message);
  const response = await result.response;
  return response.text();
}

async function generateClaudeResponse(message: string) {
  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    messages: [{ role: "user", content: message }],
  });

  const content = response.content[0];
  if ("type" in content && content.type === "text") {
    return content.text;
  }
  return undefined;
}

async function generateOllamaResponse(message: string, model: string) {
  const response = await ollama.chat({
    model,
    messages: [{ role: "user", content: message }],
  });
  return response.message.content;
}

export async function POST(req: Request) {
  try {
    const { message, model, provider, userId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    let response: string | undefined;

    switch (provider) {
      case "openai":
        response = await generateOpenAIResponse(message, model);
        break;
      case "google":
        response = await generateGeminiResponse(message);
        break;
      case "anthropic":
        response = await generateClaudeResponse(message);
        break;
      case "ollama":
        response = await generateOllamaResponse(message, model);
        break;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }

    if (!response) {
      throw new Error("Failed to generate response");
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
