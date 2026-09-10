# 18: Interactive terminal CLI REPL (agent-browser-cli)

**What to build:** A developer CLI tool allowing a human engineer to launch the browser in the terminal, navigate to any URL, view the colored semantic component tree with the primary card highlighted, and type action commands (#1 click, #2 fill test@example.com).

**Blocked by:** #15

**Status:** ready-for-agent

- [ ] agent-browser-cli binary created in workspace
- [ ] Interactive REPL prompt with commands: nav <url>, click <id>, fill <id> <text>, snap, quit
- [ ] Pretty-prints the semantic component tree with ANSI colors highlighting the primary focus container
- [ ] Manual test verifies interactive navigation and action execution against a public website
