// src/method5-bst/index.ts
import * as fs from 'fs';
import * as path from 'path';
import { performance } from 'perf_hooks';

const filePath = path.join(__dirname, '../data/big-file.txt');
const TARGET_WORD = "Project";

// BST Node Class
class BSTNode {
    word: string;
    count: number;
    left: BSTNode | null;
    right: BSTNode | null;

    constructor(word: string) {
        this.word = word;
        this.count = 1;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree Data Structure
class BST {
    root: BSTNode | null;
    size: number;

    constructor() {
        this.root = null;
        this.size = 0;
    }

    // Insert a word into the BST
    insert(word: string): void {
        this.root = this._insert(this.root, word);
    }

    private _insert(node: BSTNode | null, word: string): BSTNode {
        if (node === null) {
            this.size++;
            return new BSTNode(word);
        }

        if (word < node.word) {
            node.left = this._insert(node.left, word);
        } else if (word > node.word) {
            node.right = this._insert(node.right, word);
        } else {
            // Word already exists, increment count
            node.count++;
        }

        return node;
    }

    // Search for a word and return its count
    search(word: string): number {
        return this._search(this.root, word);
    }

    private _search(node: BSTNode | null, word: string): number {
        if (node === null) {
            return 0;
        }

        if (word === node.word) {
            return node.count;
        } else if (word < node.word) {
            return this._search(node.left, word);
        } else {
            return this._search(node.right, word);
        }
    }

    getUniqueWordCount(): number {
        return this.size;
    }
}

function runBSTMethod() {
    console.log("\n--- Method 5: Binary Search Tree (BST) Data Structure ---");
    
    const startTime = performance.now();
    
    try {
        // Step A: Read File
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Step B: Pre-processing (Tokenization)
        const allWords = fileContent.split(/\s+/);
        
        // Step C: Building the BST
        const bst = new BST();
        
        for (let i = 0; i < allWords.length; i++) {
            const rawWord = allWords[i];
            if (!rawWord) continue;
            
            // Remove punctuation for accuracy
            const word = rawWord.replace(/[.,]/g, '');
            
            // Insert word into BST
            bst.insert(word);
        }
        
        // Step D: The Lookup
        const count = bst.search(TARGET_WORD);
        
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(4);
        
        console.log(`Found word "${TARGET_WORD}": ${count} times`);
        console.log(`⏱️ Time Taken: ${timeTaken} milliseconds`);
        console.log(`📊 Structure Used: Binary Search Tree - ${bst.getUniqueWordCount()} unique words`);
        console.log(`💡 Complexity: O(log N) average, O(N) worst case for search`);
    } catch (error) {
        console.error("Error:", error);
    }
}

runBSTMethod();

