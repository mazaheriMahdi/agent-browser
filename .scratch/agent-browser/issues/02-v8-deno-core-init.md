# 02: Embedded V8 engine initialization with Happy DOM

**What to build:** Initialize a V8 runtime using deno_core in Rust within agent-browser-core. Embed the Happy DOM bundle into the V8 isolate on startup, setting up the global browser environment (window, document, console logging). Expose a clean Rust Engine wrapper struct.

**Blocked by:** #1

**Status:** ready-for-agent

- [ ] agent-browser-core crate created in workspace with deno_core dependency
- [ ] Rust Engine struct initializes an isolated V8 runtime pre-loaded with the Happy DOM bundle
- [ ] Console logs (console.log, console.error) from JavaScript route cleanly into Rust tracing / log
- [ ] Rust unit test verifies that JavaScript code executed in the isolate has access to window and document
