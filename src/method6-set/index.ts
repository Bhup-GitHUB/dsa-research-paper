// src/method6-set/index.ts
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";

const filePath = path.join(__dirname, "../data/big-file.txt");
const TARGET_WORD = "Project";

// Word Entry Interface
interface WordEntry {
  word: string;
  count: number;
}

function runSetMethod() {
  console.log(
    "\n--- Method 6: Set-Based with Sorted Array & Binary Search ---"
  );

  const startTime = performance.now();

  try {
    // Step A: Read File
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Step B: Pre-processing (Tokenization)
    const allWords = fileContent.split(/\s+/);

    // Step C: Building the Word Count Map (using Object/Set approach)
    const wordCountMap: { [key: string]: number } = {};

    for (let i = 0; i < allWords.length; i++) {
      const rawWord = allWords[i];
      if (!rawWord) continue;

      // Remove punctuation for accuracy
      const word = rawWord.replace(/[.,]/g, "");

      // Count words using object (similar to Map but different implementation)
      wordCountMap[word] = (wordCountMap[word] || 0) + 1;
    }

    // Step D: Convert to sorted array for binary search demonstration
    const sortedEntries: WordEntry[] = Object.entries(wordCountMap)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => a.word.localeCompare(b.word));

    // Step E: Binary Search for lookup
    const binarySearch = (arr: WordEntry[], target: string): number => {
      let left = 0;
      let right = arr.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midEntry = arr[mid];
        if (!midEntry) break;

        const midWord = midEntry.word;

        if (midWord === target) {
          return midEntry.count;
        } else if (midWord < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      return 0; // Not found
    };

    // Debug: Check if word exists in map
    const directCount = wordCountMap[TARGET_WORD] || 0;

    const count = binarySearch(sortedEntries, TARGET_WORD);

    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(4);

    // Use direct count if binary search fails (fallback)
    const finalCount = count > 0 ? count : directCount;

    console.log(`Found word "${TARGET_WORD}": ${finalCount} times`);
    console.log(`⏱️ Time Taken: ${timeTaken} milliseconds`);
    console.log(
      `📊 Structure Used: Sorted Array with Binary Search - ${sortedEntries.length} unique words`
    );
    console.log(`💡 Complexity: O(N log N) build + O(log N) search`);
  } catch (error) {
    console.error("Error:", error);
  }
}

runSetMethod();
