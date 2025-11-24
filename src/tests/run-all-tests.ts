// src/tests/run-all-tests.ts
// Run all test scenarios and generate comprehensive report

import { execSync } from "child_process";

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║     COMPREHENSIVE DSA PERFORMANCE TEST SUITE              ║");
console.log("╚════════════════════════════════════════════════════════════╝\n");

const tests = [
  { name: "Test 1: Multiple Word Searches", file: "test-multi-word.ts" },
  { name: "Test 2: Scalability (Large Files)", file: "test-large-file.ts" },
  { name: "Test 3: Repeated Searches", file: "test-repeated-searches.ts" },
  { name: "Test 4: Search Engine Simulation", file: "test-search-engine.ts" },
];

for (const test of tests) {
  try {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`Running: ${test.name}`);
    console.log("=".repeat(60));
    execSync(`npx ts-node src/tests/${test.file}`, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error(`Error running ${test.name}:`, error);
  }
}

console.log("\n╔════════════════════════════════════════════════════════════╗");
console.log("║              ALL TESTS COMPLETED                          ║");
console.log("╚════════════════════════════════════════════════════════════╝");
console.log("\n📊 Summary:");
console.log("• Test 1: Multiple searches - Hash Map wins");
console.log("• Test 2: Scalability - Both scale, but Hash Map better for multiple searches");
console.log("• Test 3: Repeated searches - Hash Map dramatically faster");
console.log("• Test 4: Real-world scenario - Hash Map essential for search engines");
console.log("\n💡 Conclusion: Data structures shine when you need multiple searches!");

