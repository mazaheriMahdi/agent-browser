# 09: Primary focus detection heuristic

**What to build:** Implement heuristics in the DOM extractor to evaluate containers and determine the single Primary Focus area on the page (e.g., an open modal/dialog, a login/signup card, or a form with active inputs), marking it with primary_focus = true.

**Blocked by:** #8

**Status:** ready-for-agent

- [ ] Open dialog or role="dialog" elements automatically take top priority as the primary focus
- [ ] In the absence of a modal, forms containing focused or primary interactive inputs (e.g. login/search forms) are identified as primary focus
- [ ] Exactly one container (or none if ambiguous) receives primary_focus: true
- [ ] Unit tests assert correct primary focus identification on modal fixtures, login page fixtures, and search page fixtures
