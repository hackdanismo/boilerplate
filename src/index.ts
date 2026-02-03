import { mountAll } from "./mount";

// Register components by importing them (they call defineComponents)
import "./components/counter";

// Mount once the DOM is ready
function ready(fn: () => void) {
    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
        fn();
    }
}

ready(() => {
    mountAll();

    // Optional: auto-mount elements added later (SPA, templates, etc.)
    const obs = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const n of m.addedNodes) {
                if (n instanceof HTMLElement) {
                    // Mount the node itself if it has data-ui
                    // and anything inside it has data-ui
                    if (n.matches?.("[data-ui]")) mountAll(n.parentNode ?? document);
                    else mountAll(n);
                }
            }
        }
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });
});