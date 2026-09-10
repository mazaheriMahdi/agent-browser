# 01: Happy DOM standalone bundle pipeline

**What to build:** Set up an automated bundle pipeline under bundle/ that packages happy-dom into a single standalone, self-contained JavaScript payload (bundle/dist/happy-dom.bundle.js). Provide a test script demonstrating that the bundled script successfully initializes global window and document instances with basic DOM node creation.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] bundle/package.json and bundling config (esbuild/rollup) configured to package happy-dom
- [ ] A build script generates a single-file, self-contained bundle/dist/happy-dom.bundle.js
- [ ] Automated test or verification script confirms that evaluating the bundle exposes functional window, document, and HTML parsing without runtime errors
