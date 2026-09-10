# 17: Stdio Model Context Protocol (MCP) server

**What to build:** An MCP server communicating over stdio that exposes standard tools (browser_navigate, browser_act, browser_snapshot, browser_close) so AI agents (Claude Code, Cursor, Antigravity) can natively drive the browser.

**Blocked by:** #15

**Status:** ready-for-agent

- [ ] Stdio MCP server protocol implemented adhering to Model Context Protocol specification
- [ ] Tools registered: browser_navigate, browser_act, browser_snapshot, browser_close
- [ ] Tool inputs and outputs accurately validate and return the indented semantic tree
- [ ] Test validates tool calling over standard input/output pipes
