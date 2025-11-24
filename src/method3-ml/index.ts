// src/method3-ml/index.ts
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

// Load the API Key from .env file
dotenv.config();

const filePath = path.join(__dirname, "../data/big-file.txt");
const TARGET_WORD = "Project";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function runMLMethod() {
  console.log("\n--- Method 3: Machine Learning Approach (Gemini AI) ---");

  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "AIzaSyYourKeyGoesHere..."
  ) {
    console.error("❌ Error: No API Key found. Please check your .env file.");
    console.error(
      "   Get your free API key from: https://aistudio.google.com/app/apikey"
    );
    return;
  }

  const totalStartTime = performance.now();

  try {
    // Step A: Read the file
    const fileReadStart = performance.now();
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const limitedContent = fileContent.substring(0, 5000); // Sending first ~1 page for speed
    const fileReadTime = (performance.now() - fileReadStart).toFixed(4);

    // Step B: Connect to the Model (Gemini 2.5 Flash is fastest)
    const modelSetupStart = performance.now();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const modelSetupTime = (performance.now() - modelSetupStart).toFixed(4);

    // Step C: Construct the Prompt
    const promptStart = performance.now();
    const prompt = `
            I have a text below. Count exactly how many times the word "${TARGET_WORD}" appears in it.

            Return ONLY the number. Do not write sentences.



            TEXT START:

            ${limitedContent}

            TEXT END
        `;
    const promptTime = (performance.now() - promptStart).toFixed(4);

    console.log("🤖 Sending data to Gemini AI... (Waiting for response)");

    // Step D: The AI Inference (Model Processing)
    const apiCallStart = performance.now();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const apiCallTime = (performance.now() - apiCallStart).toFixed(4);

    const totalEndTime = performance.now();
    const totalTime = (totalEndTime - totalStartTime).toFixed(4);

    console.log(`\n📊 Timing Breakdown:`);
    console.log(`   📁 File Reading: ${fileReadTime} ms`);
    console.log(`   ⚙️  Model Setup: ${modelSetupTime} ms`);
    console.log(`   📝 Prompt Construction: ${promptTime} ms`);
    console.log(`   🧠 AI Inference: ${apiCallTime} ms`);
    console.log(`\n⏱️  Total Time: ${totalTime} ms`);
    console.log(
      `\nAI Answer: Found word "${TARGET_WORD}" approx ${text.trim()} times`
    );
  } catch (error) {
    console.error("Error calling Gemini:", error);
  }
}

runMLMethod();
