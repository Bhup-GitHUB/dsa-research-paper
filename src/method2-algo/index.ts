// src/method2-algo/index.ts
import * as fs from 'fs';
import * as path from 'path';
import { performance } from 'perf_hooks';

// 1. Path to the same big file
const filePath = path.join(__dirname, '../data/big-file.txt');
const TARGET_WORD = "Project";

function runAlgoMethod() {
    console.log("\n--- Method 2: Optimized Hash Map Approach ---");
    
    const startTime = performance.now();
    
    try {
        // Step A: Read File
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Step B: Pre-processing (Tokenization)
        // We split by spaces and newlines to get a flat array of words
        const allWords = fileContent.split(/\s+/);
        
        // Step C: Building the Hash Map (The DSA Part)
        // Key = Word (string), Value = Count (number)
        const wordMap = new Map<string, number>();
        
        for (let i = 0; i < allWords.length; i++) {
            const rawWord = allWords[i];
            if (!rawWord) continue;
            
            // Remove punctuation for accuracy
            const word = rawWord.replace(/[.,]/g, '');
            
            // If word exists in Map, increment count. If not, set to 1.
            // This is O(1) access time!
            if (wordMap.has(word)) {
                wordMap.set(word, wordMap.get(word)! + 1);
            } else {
                wordMap.set(word, 1);
            }
        }
        
        // Step D: The Lookup
        // No looping needed here! Just ask the map.
        const count = wordMap.get(TARGET_WORD) || 0;
        
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(4);
        
        console.log(`Found word "${TARGET_WORD}": ${count} times`);
        console.log(`⏱️ Time Taken: ${timeTaken} milliseconds`);
        console.log(`📊 Structure Used: Hash Map (Size: ${wordMap.size} unique words)`);
    } catch (error) {
        console.error("Error:", error);
    }
}

runAlgoMethod();

