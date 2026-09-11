import { Window } from "happy-dom"


const window = new Window({ url: "about:blank" });
const document = window.document;
globalThis.window = window;
globalThis.document = document


globalThis.HTMLElement = window.HTMLElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.Text = window.Text;
globalThis.DocumentFragment = window.DocumentFragment;
globalThis.MutationObserver = window.MutationObserver;
globalThis.CustomEvent = window.CustomEvent;
globalThis.Event = window.Event;
globalThis.navigator = window.navigator;
globalThis.location = window.location;
globalThis.setTimeout = window.setTimeout.bind(window);
globalThis.clearTimeout = window.clearTimeout.bind(window);
globalThis.setInterval = window.setInterval.bind(window);
globalThis.clearInterval = window.clearInterval.bind(window);
