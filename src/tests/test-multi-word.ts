// src/tests/test-multi-word.ts
// Test: Searching for MULTIPLE different words
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";

const filePath = path.join(__dirname, "../data/big-file.txt");

// Search for 20 different words
const TARGET_WORDS = [
  "Project",
  "DSA",
  "algorithms",
  "machine",
  "learning",
  "efficiency",
  "analysis",
  "requires",
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "versus",
  "of",
  "and",
  "the",
];

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║  TEST 1: MULTIPLE WORD SEARCHES (20 different words)     ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

// Method 1: Normal Loop - Search each word separately
function method1MultiSearch() {
  console.log("--- Method 1: Normal Loop (20 separate scans) ---");
  const startTime = performance.now();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  const results: { [word: string]: number } = {};

  // Search for EACH word separately (20 full file scans!)
  for (const targetWord of TARGET_WORDS) {
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const words = line.split(" ");
      for (let j = 0; j < words.length; j++) {
        const word = words[j];
        if (!word) continue;
        const cleanWord = word.replace(/[.,]/g, "");
        if (cleanWord === targetWord) {
          count++;
        }
      }
    }
    results[targetWord] = count;
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(4);

  console.log(`⏱️  Total Time: ${timeTaken} ms`);
  console.log(`📊 Searched ${TARGET_WORDS.length} words`);
  console.log(
    `💡 Complexity: O(N × M) where N=file size, M=number of searches`
  );
  return { time: parseFloat(timeTaken), results };
}

// Method 2: Hash Map - Build once, search 20 times
function method2MultiSearch() {
  console.log("\n--- Method 2: Hash Map (Build once, search 20 times) ---");
  const startTime = performance.now();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const allWords = fileContent.split(/\s+/);

  // Build Map ONCE
  const wordMap = new Map<string, number>();
  for (let i = 0; i < allWords.length; i++) {
    const rawWord = allWords[i];
    if (!rawWord) continue;
    const word = rawWord.replace(/[.,]/g, "");
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // Search for ALL words (instant lookups!)
  const results: { [word: string]: number } = {};
  for (const targetWord of TARGET_WORDS) {
    results[targetWord] = wordMap.get(targetWord) || 0;
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(4);

  console.log(`⏱️  Total Time: ${timeTaken} ms`);
  console.log(`📊 Built Map once, searched ${TARGET_WORDS.length} words`);
  console.log(`💡 Complexity: O(N) build + O(M) searches = O(N + M)`);
  return { time: parseFloat(timeTaken), results };
}

// Run both methods
const result1 = method1MultiSearch();
const result2 = method2MultiSearch();

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║                    COMPARISON RESULTS                     ║");
console.log("╚════════════════════════════════════════════════════════════╝");
console.log(`\nMethod 1 (Normal Loop): ${result1.time.toFixed(4)} ms`);
console.log(`Method 2 (Hash Map):    ${result2.time.toFixed(4)} ms`);
console.log(
  `\n🏆 Winner: Method 2 is ${(result1.time / result2.time).toFixed(
    2
  )}x FASTER!`
);
console.log(
  `\n💡 Key Insight: For multiple searches, Hash Map wins because it builds the index once!`
);
