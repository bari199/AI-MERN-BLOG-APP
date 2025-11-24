// ----------------------------- Blog Ideas Prompt -----------------------------
const blogPostIdeasPrompt = (topic) => `
Generate a list of exactly **5 blog post ideas** related to: "${topic}".

For each idea, return:
- a title
- a 2-line description
- 3 relevant tags
- the tone (e.g., technical, casual, beginner-friendly, etc.)

Return the result strictly as **valid JSON**, formatted like this:

[
  {
    "title": "",
    "description": "",
    "tags": ["", "", ""],
    "tone": ""
  }
]

Important rules:
- Do NOT add explanations.
- Do NOT add markdown.
- Do NOT include code fences like \`\`\`.
- Only return the JSON array.
`;


// ----------------------------- Reply Prompt -----------------------------
function generateReplyPrompt(comment) {
  const authorName = comment.author?.name || "User";
  const content = comment.content;

  return `
You are writing a helpful and concise reply to a blog comment.

Comment Author: ${authorName}
Comment: "${content}"

Write a friendly, relevant, and thoughtful reply (2–4 sentences).
  `;
}


// ----------------------------- Blog Summary Prompt -----------------------------
const blogSummaryPrompt = (blogContent) => `
Read the blog post below and generate:

1. A short, catchy, SEO-friendly title (max 12 words).
2. A clear, engaging summary of about 300 words.
3. At the end of the summary, include a markdown section:

## What You'll Learn
- bullet point
- bullet point
- bullet point
(3–5 bullets total)

Return the result strictly as **valid JSON** with this structure:
{
  "title": "Short SEO-friendly title",
  "summary": "300-word summary with the markdown section included at the end"
}

Important rules:
- Do NOT add extra text.
- Do NOT include code blocks or markdown outside the JSON.
- Only return valid JSON.

Blog Post Content:
${blogContent}
`;

export { blogPostIdeasPrompt, generateReplyPrompt, blogSummaryPrompt };
