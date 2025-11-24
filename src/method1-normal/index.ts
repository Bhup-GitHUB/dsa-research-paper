// src/method1-normal/index.ts
import * as fs from 'fs';
import * as path from 'path';
import { performance } from 'perf_hooks'; // To measure time accurately

// 1. Get the path to our big file
const filePath = path.join(__dirname, '../../src/data/big-file.txt');

// The keyword we are looking for
const TARGET_WORD = "Project"; 

function runNormalMethod() {
    console.log("--- Method 1: Normal Loop Approach ---");
    
    // START TIMER
    const startTime = performance.now();
    
    try {
        // Step A: Read the file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Step B: Split into lines (simulating line-by-line reading)
        const lines = fileContent.split('\n');
        
        let totalCount = 0;
        
        // Step C: The "Normal" Loop
        // Loop over every line
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Skip empty lines
            if (!line) continue;
            
            // Split line into words
            const words = line.split(' ');
            
            // Loop over every word
            for (let j = 0; j < words.length; j++) {
                const word = words[j];
                if (!word) continue;
                
                // Clean the word (remove punctuation)
                const cleanWord = word.replace(/[.,]/g, '');
                
                if (cleanWord === TARGET_WORD) {
                    totalCount++;
                }
            }
        }
        
        // END TIMER
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(4); // 4 decimal places
        
        console.log(`Found word "${TARGET_WORD}": ${totalCount} times`);
        console.log(`⏱️ Time Taken: ${timeTaken} milliseconds`);
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

// Execute
runNormalMethod();

