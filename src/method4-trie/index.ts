// src/method4-trie/index.ts
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";

const filePath = path.join(__dirname, "../data/big-file.txt");
const TARGET_WORD = "Project";

// Trie Node Class
class TrieNode {
  children: Map<string, TrieNode>;
  count: number;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.count = 0;
    this.isEndOfWord = false;
  }
}

// Trie Data Structure
class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the Trie
  insert(word: string): void {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!char) continue;

      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }

      const nextNode = current.children.get(char);
      if (nextNode) {
        current = nextNode;
      }
    }

    // Mark end of word and increment count
    current.isEndOfWord = true;
    current.count++;
  }

  // Search for a word and return its count
  search(word: string): number {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!char) continue;

      if (!current.children.has(char)) {
        return 0; // Word not found
      }

      const nextNode = current.children.get(char);
      if (!nextNode) {
        return 0;
      }
      current = nextNode;
    }

    return current.isEndOfWord ? current.count : 0;
  }

  // Get total number of unique words
  getUniqueWordCount(): number {
    let count = 0;
    const traverse = (node: TrieNode) => {
      if (node.isEndOfWord) {
        count++;
      }
      for (const child of node.children.values()) {
        traverse(child);
      }
    };
    traverse(this.root);
    return count;
  }
}

function runTrieMethod() {
  console.log("\n--- Method 4: Trie (Prefix Tree) Data Structure ---");

  const startTime = performance.now();

  try {
    // Step A: Read File
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Step B: Pre-processing (Tokenization)
    const allWords = fileContent.split(/\s+/);

    // Step C: Building the Trie
    const trie = new Trie();

    for (let i = 0; i < allWords.length; i++) {
      const rawWord = allWords[i];
      if (!rawWord) continue;

      // Remove punctuation for accuracy
      const word = rawWord.replace(/[.,]/g, "");

      // Insert word into Trie
      trie.insert(word);
    }

    // Step D: The Lookup
    const count = trie.search(TARGET_WORD);

    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(4);

    console.log(`Found word "${TARGET_WORD}": ${count} times`);
    console.log(`⏱️ Time Taken: ${timeTaken} milliseconds`);
    console.log(
      `📊 Structure Used: Trie (Prefix Tree) - ${trie.getUniqueWordCount()} unique words`
    );
    console.log(
      `💡 Complexity: O(M) insert, O(M) search where M = word length`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

runTrieMethod();
