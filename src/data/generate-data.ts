// src/data/generate-data.ts
import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "big-file.txt");
const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Project DSA requires analysis of algorithms versus machine learning efficiency. ";

// We will repeat this sentence 5000 times to simulate a large file
const content = sampleText.repeat(5000);

fs.writeFileSync(filePath, content);

console.log(`✅ file created at: ${filePath}`);
console.log(`Size: ${(Buffer.byteLength(content) / 1024).toFixed(2)} KB`);
