import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

const API_KEY = process.env.GEMINI_API_KEY;
const BLOGS_DIR = path.join(process.cwd(), 'content/blogs');

interface BlogTopic {
  topic: string;
  tags: string[];
}

const topics: BlogTopic[] = [
  { topic: "Next.js performance issues", tags: ["nextjs", "performance", "frontend"] },
  { topic: "React mistakes developers make", tags: ["react", "javascript", "mistakes"] },
  { topic: "Frontend security vulnerabilities", tags: ["security", "frontend", "web"] },
  { topic: "TypeScript best practices", tags: ["typescript", "javascript", "best-practices"] },
  { topic: "CSS Grid vs Flexbox", tags: ["css", "layout", "frontend"] },
  { topic: "API design patterns", tags: ["api", "backend", "architecture"] },
  { topic: "State management in 2026", tags: ["react", "state-management", "frontend"] },
  { topic: "Web accessibility mistakes", tags: ["accessibility", "a11y", "frontend"] },
  { topic: "Database optimization tips", tags: ["database", "performance", "backend"] },
  { topic: "Docker for frontend developers", tags: ["docker", "devops", "frontend"] },
];

const blogTypes = [
  { type: 'negative', label: '🔥 Problem', prompt: 'negative' },
  { type: 'fix', label: '⚡ Solution', prompt: 'fix' },
  { type: 'opinion', label: '🚀 Opinion', prompt: 'opinion' },
] as const;

async function generateBlog(topic: BlogTopic, blogType: typeof blogTypes[number]) {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const slug = topic.topic
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  const prompt = `You are a senior frontend developer and technical blog writer.

Generate a blog post in STRICT MDX format.

Topic: ${topic.topic}
Type: ${blogType.prompt} (${blogType.type})
Tags: ${topic.tags.join(', ')}

---

## 📁 File Rules
- File lives in: content/blog/{slug}.mdx
- Slug must be URL-safe (kebab-case)
- Do NOT include date in slug

---

## 🧾 Frontmatter (REQUIRED)

---
title: "Your compelling title here"
description: "Brief but engaging description"
slug: "${slug}"
publishedAt: "${new Date().toISOString().split('T')[0]}"
updatedAt: "${new Date().toISOString().split('T')[0]}"
author: "Kowshik Valipireddy"
tags: [${topic.tags.map(t => `"${t}"`).join(', ')}]
category: "${blogType.type}"
coverImage: ""
draft: false
noindex: false
faq:
  - question: "What is the main takeaway?"
    answer: "The key insight from this article."
  - question: "How can I apply this?"
    answer: "Start with small, incremental changes."
---

---

## 🧠 Content Rules

- DO NOT add a top-level # heading
- Start directly with paragraphs or h2
- Use clean, professional developer tone
- Focus on real problems, mistakes, fixes
- Keep content structured and readable
- Avoid fluff and generic AI wording
- Keep it concise but informative (around 500-800 words)
- Include code examples where relevant

---

## 🎨 UI / Design Rules

- Design must follow **white, black, gray theme**
- Clean, minimal blog layout
- No inline random styles
- Use ONLY allowed MDX components:
  - Callout
  - InlineCTA
  - FAQList

---

## ⚠️ VERY IMPORTANT

- DO NOT add Navbar
- DO NOT add Footer
👉 These are handled globally in layout

- DO NOT break MDX
- DO NOT add unsupported JSX

---

## 🔍 SEO + UX

- Add section headings (h2, h3)
- Add bullet points where useful
- Add 1 Callout component
- Add FAQList at end (from frontmatter faq)

---

## 🧱 Example Content Flow

- Hook
- Problem explanation
- Common mistakes
- Fix / solution
- Practical checklist
- Conclusion

---

## 📦 Output

Return ONLY valid MDX.

NO explanations.
NO markdown outside MDX.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Response:', errorText);
      throw new Error(`API request failed: ${res.statusText} - ${errorText}`);
    }

    const data = await res.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No content generated');
    }

    return generatedText;
  } catch (error) {
    console.error('Error generating blog:', error);
    throw error;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function sanitizeContent(content: string): string {
  // Remove markdown code block markers if present
  let sanitized = content.trim();
  if (sanitized.startsWith('```mdx')) {
    sanitized = sanitized.slice(6);
  } else if (sanitized.startsWith('```')) {
    sanitized = sanitized.slice(3);
  }
  if (sanitized.endsWith('```')) {
    sanitized = sanitized.slice(0, -3);
  }
  return sanitized.trim();
}

async function run() {
  if (!API_KEY) {
    console.error('❌ GEMINI_API_KEY environment variable is not set');
    console.log('Please create a .env file with:');
    console.log('GEMINI_API_KEY=your_api_key_here');
    process.exit(1);
  }

  // Ensure blogs directory exists
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
  }

  const date = new Date().toISOString().split('T')[0];
  const generatedFiles: string[] = [];

  console.log('🚀 Starting blog generation...');
  console.log(`📅 Date: ${date}`);
  console.log(`📝 Topics: ${topics.length}`);
  console.log(`📄 Types per topic: ${blogTypes.length}`);
  console.log(`📊 Total blogs to generate: ${topics.length * blogTypes.length}`);
  console.log('');

  for (const topic of topics) {
    for (const blogType of blogTypes) {
      try {
        console.log(`⏳ Generating: ${topic.topic} (${blogType.label})...`);

        const content = await generateBlog(topic, blogType);
        const sanitizedContent = sanitizeContent(content);

        // Parse frontmatter to get the actual title
        let fileName = `${date}-${slugify(topic.topic)}-${blogType.type}.mdx`;
        try {
          const { data } = matter(sanitizedContent);
          if (data.title) {
            fileName = `${date}-${slugify(data.title as string)}.mdx`;
          }
        } catch (e) {
          // Use default filename if parsing fails
        }

        const filePath = path.join(BLOGS_DIR, fileName);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
          console.log(`⚠️  File already exists: ${fileName}`);
          continue;
        }

        fs.writeFileSync(filePath, sanitizedContent);
        generatedFiles.push(fileName);
        console.log(`✅ Generated: ${fileName}`);

        // Rate limiting - wait between requests
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`❌ Failed to generate ${topic.topic} (${blogType.label}):`, error);
      }
    }
  }

  console.log('');
  console.log('🎉 Blog generation complete!');
  console.log(`📊 Generated ${generatedFiles.length} new blog posts`);
  console.log('');
  console.log('Generated files:');
  generatedFiles.forEach(file => console.log(`  - ${file}`));
}

// Run the script
run().catch(console.error);