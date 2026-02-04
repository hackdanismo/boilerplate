// Import the function that mounts all components found in the DOM.
import { mountAll } from "./mount";

/*
 * Register components by importing them.
 * Import component modules ONLY for their side effects.
 * Each component file calls defineComponent(...) when imported.
 * This registers itself in the registry automatically.
*/
import "./components/counter";

/*
 * Small helper that runs a function once the DOM is fully ready.
 * This ensures that the elements do no mount before they exist.
*/
function ready(fn: () => void) {
    // Check to see if the document is still loading and the HTML is fully parsed.
    if (document.readyState == "loading") {
        /*
         * Wait until DOMContentLoaded fires, then run the function.
         * { once: true } ensures it only runs a single time.
        */
        document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
        // If the DOM is already ready, run immediately.
        fn();
    }
}

// Call ready() and pass in the startup logic.
ready(() => {
    /*
     * Mount all components currently in the document.
     * This scans for elements with the [data-ui] attribute and initializes them.
    */
    mountAll();

    /*
     * Create a MutationObserver to watch for any DOM changes.
     * Useful for SPAs, dynamic content, or templates added later.
    */
    const obs = new MutationObserver((mutations) => {
        // Loop through each group of changes.
        for (const m of mutations) {
            // Check each node that was added to the DOM.
            for (const n of m.addedNodes) {
                // Only handle real HTML elements (ignore text nodes, comments, etc.).
                if (n instanceof HTMLElement) {
                    /*
                     * If the element itself has a data-ui attribute, mount from its parent so it's included.
                     * Otherwise, mount inside the element.
                    */
                    if (n.matches?.("[data-ui]")) mountAll(n.parentNode ?? document);
                    else mountAll(n);
                }
            }
        }
    });

    /*
     * Start observing the whole document for:
     * - childList: nodes added or removed.
     * - subtree: watch entir tree, not just the top level.
    */
    obs.observe(document.documentElement, { childList: true, subtree: true });
});