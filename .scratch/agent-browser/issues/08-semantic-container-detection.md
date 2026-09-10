# 08: Semantic container and card detection

**What to build:** Extend the DOM extractor to cluster elements into high-level semantic containers: Cards (role="region", section, form wrappers), Forms (form), Dialogs/Modals (dialog, role="dialog"), and Navigation (nav).

**Blocked by:** #7

**Status:** ready-for-agent

- [ ] Structural layout containers are identified and classified into Cards, Forms, Modals, Navigation, or Content
- [ ] Interactive elements are properly nested inside their enclosing parent container
- [ ] Page noise (boilerplate wrappers, empty spacer divs) is pruned
- [ ] Unit test verifies correct grouping of a login card, navigation header, and footer into distinct semantic containers
