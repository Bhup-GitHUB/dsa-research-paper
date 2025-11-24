// src/tests/test-repeated-searches.ts
// Test: Searching for the SAME word multiple times (like a search engine)
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";

const filePath = path.join(__dirname, "../data/big-file.txt");
const TARGET_WORD = "Project";
const SEARCH_COUNT = 1000; // Search same word 1000 times

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log(`║  TEST 3: REPEATED SEARCHES (Same word ${SEARCH_COUNT}x)      ║`);
console.log("╚════════════════════════════════════════════════════════════╝\n");
console.log("Simulating: User searches for same word multiple times\n");

// Method 1: Normal Loop - Scan file 1000 times!
function method1RepeatedSearch() {
  console.log(
    `--- Method 1: Normal Loop (Scan file ${SEARCH_COUNT} times) ---`
  );
  const startTime = performance.now();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  // Search 1000 times - each time scans entire file!
  for (let search = 0; search < SEARCH_COUNT; search++) {
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const words = line.split(" ");
      for (let j = 0; j < words.length; j++) {
        const word = words[j];
        if (!word) continue;
        const cleanWord = word.replace(/[.,]/g, "");
        if (cleanWord === TARGET_WORD) {
          count++;
        }
      }
    }
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(4);

  console.log(`⏱️  Total Time: ${timeTaken} ms`);
  console.log(`📊 Scanned file ${SEARCH_COUNT} times`);
  console.log(`💡 Complexity: O(N × M) where M=${SEARCH_COUNT} searches`);
  return parseFloat(timeTaken);
}

// Method 2: Hash Map - Build once, lookup 1000 times!
function method2RepeatedSearch() {
  console.log(
    `\n--- Method 2: Hash Map (Build once, lookup ${SEARCH_COUNT} times) ---`
  );
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

  // Lookup 1000 times (instant!)
  for (let search = 0; search < SEARCH_COUNT; search++) {
    const count = wordMap.get(TARGET_WORD) || 0;
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(4);

  console.log(`⏱️  Total Time: ${timeTaken} ms`);
  console.log(`📊 Built Map once, looked up ${SEARCH_COUNT} times`);
  console.log(`💡 Complexity: O(N) build + O(M) lookups = O(N + M)`);
  return parseFloat(timeTaken);
}

// Run both methods
const time1 = method1RepeatedSearch();
const time2 = method2RepeatedSearch();

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║                    COMPARISON RESULTS                     ║");
console.log("╚════════════════════════════════════════════════════════════╝");
console.log(`\nMethod 1 (Normal Loop): ${time1.toFixed(4)} ms`);
console.log(`Method 2 (Hash Map):    ${time2.toFixed(4)} ms`);
console.log(`\n🏆 Winner: Method 2 is ${(time1 / time2).toFixed(2)}x FASTER!`);
console.log(
  `\n💡 Key Insight: For repeated searches (like search engines), Hash Map is MUCH better!`
);
console.log(`   Method 1 wastes time re-scanning the same file over and over.`);
console.log(`   Method 2 builds an index once and reuses it efficiently.`);
