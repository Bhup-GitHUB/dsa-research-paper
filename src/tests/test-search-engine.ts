// src/tests/test-search-engine.ts
// Test: Real-world search engine scenario
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";

const filePath = path.join(__dirname, "../data/big-file.txt");

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║  TEST 4: REAL-WORLD SEARCH ENGINE SIMULATION              ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");
console.log("Scenario: 50 users search for 100 different words each\n");

// Simulate user search queries
const allPossibleWords = [
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

// Generate random search queries (50 users × 100 searches each = 5000 searches)
function generateSearchQueries(): string[] {
  const queries: string[] = [];
  for (let user = 0; user < 50; user++) {
    for (let search = 0; search < 100; search++) {
      const randomWord =
        allPossibleWords[Math.floor(Math.random() * allPossibleWords.length)];
      queries.push(randomWord);
    }
  }
  return queries;
}

const searchQueries = generateSearchQueries();
console.log(`Generated ${searchQueries.length} search queries\n`);

// Method 1: Normal Loop - Scan file for EACH query
function method1SearchEngine() {
  console.log("--- Method 1: Normal Loop (Scan file for each query) ---");
  const startTime = performance.now();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");

  const results: { [word: string]: number } = {};

  // For EACH query, scan the entire file
  for (const query of searchQueries) {
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const words = line.split(" ");
      for (let j = 0; j < words.length; j++) {
        const word = words[j];
        if (!word) continue;
        const cleanWord = word.replace(/[.,]/g, "");
        if (cleanWord === query) {
          count++;
        }
      }
    }
    results[query] = (results[query] || 0) + count;
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(4);

  console.log(`⏱️  Total Time: ${timeTaken} ms`);
  console.log(`📊 Processed ${searchQueries.length} queries`);
  console.log(`💡 Scanned file ${searchQueries.length} times!`);
  return parseFloat(timeTaken);
}

// Method 2: Hash Map - Build index once, answer all queries instantly
function method2SearchEngine() {
  console.log(
    "\n--- Method 2: Hash Map (Build index once, answer all queries) ---"
  );
  const startTime = performance.now();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const allWords = fileContent.split(/\s+/);

  // Build index ONCE
  const wordMap = new Map<string, number>();
  for (let i = 0; i < allWords.length; i++) {
    const rawWord = allWords[i];
    if (!rawWord) continue;
    const word = rawWord.replace(/[.,]/g, "");
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // Answer ALL queries instantly
  const results: { [word: string]: number } = {};
  for (const query of searchQueries) {
    results[query] = wordMap.get(query) || 0;
  }

  const endTime = performance.now();
  const timeTaken = (endTime - startTime).toFixed(4);

  console.log(`⏱️  Total Time: ${timeTaken} ms`);
  console.log(`📊 Built index once, answered ${searchQueries.length} queries`);
  console.log(`💡 Only scanned file ONCE!`);
  return parseFloat(timeTaken);
}

// Run both methods
const time1 = method1SearchEngine();
const time2 = method2SearchEngine();

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║                    COMPARISON RESULTS                     ║");
console.log("╚════════════════════════════════════════════════════════════╝");
console.log(`\nMethod 1 (Normal Loop): ${time1.toFixed(4)} ms`);
console.log(`Method 2 (Hash Map):    ${time2.toFixed(4)} ms`);
console.log(`\n🏆 Winner: Method 2 is ${(time1 / time2).toFixed(2)}x FASTER!`);
console.log(
  `\n💡 Real-World Impact: This is why search engines use indexing!`
);
console.log(`   Google doesn't scan the entire internet for each query.`);
console.log(`   They build an index once and reuse it for millions of queries.`);

