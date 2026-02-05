// Import the function that lets a look up of components by name.
import { getComponent } from "./registry";

/*
 * A WeakSet to track which elements have already been mounted.
 * It only stores objects (HTMLElements).
 * Elements can be garbage collected automatically.
 * Prevents mounting of the same elements twice.
*/
const mounted = new WeakSet<HTMLElement>();

// Mount all components inside of a root note and default to the whole document if no root is provided.
export function mountAll(root: ParentNode = document) {
    /*
     * Find all elements that declare a component using:
     * <div data-ui="componentName">
    */
    const nodes = root.querySelectorAll<HTMLElement>("[data-ui]");
    // Loop through each found element and mount individually.
    for (const el of nodes) mountOne(el);
}

// Mount a single element
export function mountOne(el: HTMLElement) {
    /*
     * If the element is already mounted before this element, stop immediately.
     * Prevents duplicate initialization.
    */
    if (mounted.has(el)) return;

    /*
     * Read the component name from the data attribute added to the HTML:
     * <div data-ui="hello"> -> "hello"
    */
    const name = el.dataset.ui;
    // If there is no name, do not mount anything.
    if (!name) return;

    // Look up the component's mount function from the registry.
    const mount = getComponent(name);
    /*
     * If no component was registered with the name:
     * Display warning to the developer in the console and stop.
    */
    if (!mount) {
        // Warning message in the console.
        console.warn(`[ui] Unknown component: "${name}"`, el);
        // Stope code execution.
        return;
    }

    // Mark the element as being mounted to avoid it being mounted twice.
    mounted.add(el);
    /*
     * Execute the component's mount function.
     * Pass the element so it can render itself.
    */
    mount(el);
}