# Spec: High-Throughput Rust Headless Browser for AI Agents

**Status:** ready-for-agent

---

## Problem Statement

Modern web browsers like Chromium and WebKit are designed for human visual rendering, consuming 50–100MB+ RAM per tab, downloading megabytes of unused assets (images, fonts, ads, tracking scripts), and returning complex, noisy DOM structures with thousands of lines of boilerplate HTML. 

When autonomous AI agents need to interact with the web at scale (navigating pages, filling forms, clicking buttons, extracting data across thousands of concurrent tasks), running traditional headless browsers leads to server memory exhaustion, severe concurrency bottlenecks, and exorbitant LLM token costs due to unstructured, noisy HTML dumps. Furthermore, agents struggle to distinguish the primary active component (such as an open login modal or card) from peripheral page elements.

---

## Solution

A high-performance, lightweight headless browser engine built in Rust, powered by embedded V8 (`deno_core`) and Happy DOM emulation. It executes client-side JavaScript and standard DOM APIs while running network requests through a Rust-native filtering pipeline that drops non-essential assets (images, fonts, media, trackers) by default.

Instead of dumping raw HTML or rasterizing pixels, the engine distills the active page into a token-efficient **Hierarchical Semantic Component Tree**. It clusters elements into cards, forms, modals, and content blocks, automatically detects and highlights the **Primary Focus** area (e.g., an active login card), and assigns simple, stable integer Action IDs (`#1`, `#2`, `#3`) to interactive controls. Agents interact with pages through atomic semantic action primitives (`navigate`, `click`, `fill`, `select`, etc.) across stateful, automatically recycled sessions via a native Rust API, HTTP REST endpoints, and a Model Context Protocol (MCP) server.

---

## User Stories

1. As an AI agent, I want to navigate to any web URL and receive a clean, hierarchical component tree rather than raw HTML, so that I can understand the page structure using minimal context window tokens.
2. As an AI agent, I want the browser to detect and highlight the primary focal card or modal (such as a login card), so that I immediately know which interactive area requires my attention.
3. As an AI agent, I want all interactive elements (buttons, inputs, links, selects) to be tagged with short, unique action IDs (e.g., `#1`, `#2`), so that I can reference and trigger actions unambiguously.
4. As an AI agent, I want to execute a `click(action_id)` command, so that I can trigger buttons, checkboxes, and navigation links.
5. As an AI agent, I want to execute a `fill(action_id, text)` command, so that I can enter credentials and search queries into inputs and textareas with standard DOM `input` and `change` events dispatched.
6. As an AI agent, I want to execute a `select(action_id, option)` command, so that I can choose options from dropdown select elements.
7. As an AI agent, I want to execute a `press_key(key)` command, so that I can submit forms with "Enter" or navigate elements with keyboard shortcuts.
8. As an AI agent, I want the browser to automatically wait for client-side SPA hydration (React/Next.js/Vue) using network-idle, event-loop, and DOM-mutation stability, so that I do not receive an empty or incomplete page.
9. As an AI agent, I want to optionally specify a `wait_for_selector` condition, so that I can guarantee a specific dynamic element is rendered before taking a snapshot.
10. As an AI agent developer, I want all subresources like images, videos, audio, web fonts, and analytics trackers to be blocked by default in Rust, so that network bandwidth and memory usage are cut by over 80%.
11. As a system operator, I want each browsing session to consume under 30MB of RAM, so that a single server can comfortably run thousands of concurrent browsing tasks.
12. As a system operator, I want browsing sessions to maintain state (cookies, local storage, session history) across multi-turn tool calls, so that multi-step user workflows (e.g., login -> dashboard -> export) work seamlessly.
13. As a system operator, I want idle sessions to be automatically reclaimed after a configurable timeout, so that abandoned sessions never cause memory leaks.
14. As an agent framework developer, I want to consume the browser via a standard Model Context Protocol (MCP) server over stdio, so that any MCP-compliant LLM or IDE can use it without custom client code.
15. As a backend developer, I want an HTTP REST API for session management and actions, so that services in Python, TypeScript, Go, or Rust can drive browser sessions remotely.
16. As a Rust developer, I want a modular Rust crate (`agent-browser-core`) that can be embedded directly into custom Rust applications without running an external server process.
17. As an engineer debugging an agent workflow, I want an interactive terminal CLI REPL, so that I can manually navigate URLs, view the distilled component tree, and test action IDs in real time.
18. As an AI agent, I want to execute `evaluate_js(code)` as an escape hatch, so that I can run custom JavaScript in the page context when standard actions are insufficient.
19. As an AI agent, I want the browser to handle client-side cookie persistence and redirect chains transparently, so that authenticated sessions stay logged in across actions.
20. As an AI agent, I want clear, structured error responses when an action fails (e.g., element not found, disabled element, navigation timeout), so that I can self-correct my strategy.

---

## Implementation Decisions

- **Modular Cargo Workspace**:
  - `agent-browser-core`: Embedded V8 runtime, Happy DOM integration, network interceptor, semantic tree distiller, action dispatcher, and session pool.
  - `agent-browser-server`: Axum HTTP REST server and stdio MCP server exposing browser capabilities over standard protocols.
  - `agent-browser-cli`: Standalone terminal REPL for interactive debugging and testing.
- **Embedded JavaScript Engine**:
  - Embedded V8 runtime via `deno_core`.
  - Happy DOM pre-bundled into a single standalone JavaScript payload embedded in the binary or compiled into a V8 startup snapshot for sub-millisecond isolate initialization.
  - V8 isolates pooled and recycled to prevent memory fragmentation and leaks.
- **Network Interception & Resource Filter**:
  - Network requests from Happy DOM routed into Rust via `deno_core` ops.
  - Rust-native HTTP client (`reqwest`) handling HTTP/HTTPS requests, redirects, and cookie jars.
  - Built-in rule-based resource filter that blocks MIME types and file extensions for images (`.png`, `.jpg`, `.svg`, etc.), videos/audio (`.mp4`, `.mp3`), web fonts (`.woff2`, `.ttf`), and known ad/telemetry domains.
- **Hierarchical Semantic Distiller**:
  - Evaluates inside the page DOM to traverse the live node tree.
  - Groups elements into semantic containers based on tags, roles, and structural layout: Cards (`role="region"`, `<section>`, form wrappers), Forms (`<form>`), Dialogs/Modals (`<dialog>`, `role="dialog"`), Navigation (`<nav>`), and Content.
  - Detects Primary Focus: Prioritizes active modals, open dialogs, or forms containing focused/active inputs.
  - Assigns sequential 1-indexed Action IDs to all interactive elements (`<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`, `role="button"`).
  - Serializes to both a concise indented text representation (for LLM context windows) and a structured JSON schema.
- **Adaptive Readiness Probe**:
  - Monitors three readiness criteria before returning snapshots:
    1. V8 microtask and timer queue drainage.
    2. Zero in-flight intercepted HTTP requests.
    3. DOM mutation quiet window (no DOM tree modifications for 50-100ms).
  - Configurable hard timeout fallback (default 5000ms).
- **Session Lifecycle & Pool Management**:
  - Thread-safe session registry (`SessionPool`) holding active isolates keyed by UUID.
  - Background eviction reaper that terminates sessions exceeding the idle threshold.
  - Maximum active session concurrency limit with queue backpressure.
- **Interfaces & Protocols**:
  - Stdio MCP Server implementing standard tools: `browser_navigate`, `browser_act`, `browser_snapshot`, `browser_close`.
  - HTTP REST endpoints: `POST /session`, `POST /session/:id/navigate`, `POST /session/:id/action`, `GET /session/:id/snapshot`, `DELETE /session/:id`.

---

## Testing Decisions

- **Testing Philosophy**:
  - Tests must verify observable external behavior from the caller's perspective rather than internal V8 or Happy DOM implementation details.
  - Tests must run reliably in CI without requiring external internet access by using local in-memory HTTP mock servers (e.g., `wiremock` / `axum` test servers).
- **Highest Seam**:
  - Primary testing seam is the `Session` / Engine API:
    - Given an HTML fixture or local test URL, calling `session.navigate()` returns a valid `SemanticTree` with expected containers, primary focus, and action IDs.
    - Calling `session.act(action_id, payload)` verifies that the DOM state changes as expected (e.g., form submitted, navigation followed, state updated).
- **Network Seam**:
  - Test resource filtering by having a test page request scripts, images, and fonts, verifying that only allowed scripts reach the mock server.
- **Concurrency Seam**:
  - Spin up 50+ concurrent sessions on mock endpoints to verify pool isolation, state separation, and zero cross-session contamination.

---

## Out of Scope

- Pixel rasterization, canvas painting, GPU rendering, and screenshot generation (the engine is strictly semantic and headless).
- Complex browser extension (Chrome Extension / WebExtension) loading.
- Native mobile device emulation (touch sensors, accelerometer, battery APIs).
- Bypassing advanced hardware-level anti-bot mechanisms (e.g., Cloudflare Turnstile CAPTCHA solving, which requires full visual browser rendering).

---

## Further Notes

- Happy DOM is maintained by the open-source community as an ultra-fast DOM implementation with broad web standard compatibility. Bundling it with custom DOM traversal scripts gives us full control over semantic pruning and event dispatching.
