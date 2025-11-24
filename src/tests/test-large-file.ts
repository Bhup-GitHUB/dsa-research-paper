// src/tests/test-large-file.ts
// Test: Increasing file size to see scalability
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";

const TARGET_WORD = "Project";

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║  TEST 2: SCALABILITY TEST (Different File Sizes)         ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

// Generate different sized files
function generateTestFile(multiplier: number): string {
  const sampleText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Project DSA requires analysis of algorithms versus machine learning efficiency. ";
  return sampleText.repeat(5000 * multiplier);
}

const fileSizes = [1, 5, 10, 50]; // 1x, 5x, 10x, 50x original size

console.log("Testing scalability with different file sizes:\n");

const results: Array<{
  size: number;
  method1: number;
  method2: number;
  speedup: number;
}> = [];

for (const multiplier of fileSizes) {
  const testContent = generateTestFile(multiplier);
  const fileSizeKB = (Buffer.byteLength(testContent) / 1024).toFixed(2);

  console.log(`\n📁 File Size: ${multiplier}x (${fileSizeKB} KB)`);

  // Method 1: Normal Loop
  const start1 = performance.now();
  const words1 = testContent.split(/\s+/);
  let count1 = 0;
  for (let i = 0; i < words1.length; i++) {
    const word = words1[i]?.replace(/[.,]/g, "");
    if (word === TARGET_WORD) count1++;
  }
  const time1 = performance.now() - start1;

  // Method 2: Hash Map
  const start2 = performance.now();
  const words2 = testContent.split(/\s+/);
  const wordMap = new Map<string, number>();
  for (let i = 0; i < words2.length; i++) {
    const word = words2[i]?.replace(/[.,]/g, "");
    if (word) {
      wordMap.set(word, (wordMap.get(word) || 0) + 1);
    }
  }
  const count2 = wordMap.get(TARGET_WORD) || 0;
  const time2 = performance.now() - start2;

  const speedup = time1 / time2;

  console.log(`  Method 1: ${time1.toFixed(4)} ms`);
  console.log(`  Method 2: ${time2.toFixed(4)} ms`);
  console.log(`  Speedup: ${speedup.toFixed(2)}x`);

  results.push({ size: multiplier, method1: time1, method2: time2, speedup });
}

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║              SCALABILITY ANALYSIS                         ║");
console.log("╚════════════════════════════════════════════════════════════╝");
console.log("\nAs file size increases:");
console.log("• Method 1 scales linearly: O(N) per search");
console.log("• Method 2 also scales linearly for build, but lookups stay O(1)");
console.log(
  "• For larger files with multiple searches, Method 2's advantage grows!"
);
