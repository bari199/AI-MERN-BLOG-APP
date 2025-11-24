import { GoogleGenAI } from "@google/genai";

import {
  blogPostIdeasPrompt,
  blogSummaryPrompt,
  generateReplyPrompt,
  
} from "../utils/prompts.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --------------------- Generate Blog Post ---------------------
const generateBlogPost = async (req, res) => {
  try {
    const { title, tone } = req.body;

    if (!title || !tone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
      Write a markdown-formatted blog post titled "${title}".
      Use a ${tone} tone. Include an introduction, subheadings,
      code examples if relevant, and a conclusion.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;
    res.status(200).json(rawText);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate blog post",
      error: error.message,
    });
  }
};

// --------------------- Generate Ideas ---------------------
const generateBlogPostIdeas = async (req, res) => {
  try {
    const { topics } = req.body;

    if (!topics) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = blogPostIdeasPrompt(topics);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate blog idea",
      error: error.message,
    });
  }
};

// --------------------- Generate Reply ---------------------
const generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = generateReplyPrompt({ author, content });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;
    res.status(200).json(rawText);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate comment reply",
      error: error.message,
    });
  }
};

// --------------------- Generate Summary ---------------------
const generatePostSummary = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = blogSummaryPrompt(content);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate summary",
      error: error.message,
    });
  }
};

export {
  generateBlogPost,
  generateBlogPostIdeas,
  generatePostSummary,
  generateCommentReply,
};
