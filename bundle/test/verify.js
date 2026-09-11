const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "..", "dist", "happy-dom.bundle.js");
const bundledCode = fs.readFileSync(bundlePath, "utf-8");


eval(bundledCode);

function assert(condition, message) {
    if (!condition) {
        console.error("❌ FAIL:", message);
        process.exit(1);
    }
    console.log("✅ PASS:", message);
}
assert(typeof globalThis.window !== "undefined", "globalThis.window exists");
assert(typeof globalThis.document !== "undefined", "globalThis.document exists");
// Test basic DOM operations
const div = globalThis.document.createElement("div");
assert(div !== null, "document.createElement('div') works");
div.id = "test";
div.textContent = "hello";
globalThis.document.body.appendChild(div);
const found = globalThis.document.getElementById("test");
assert(found !== null, "document.getElementById works");
assert(found.textContent === "hello", "textContent is correct");
console.log("\n🎉 All checks passed — bundle is functional.");