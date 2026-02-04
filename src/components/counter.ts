/*
 * Import the function used to register a component.
 * This lets the component be added to the global registry.
*/
import { defineComponent } from "../core/registry";

/*
 * Register a new component named "counter".
 * When the system sees <div data-ui="counter">, it will call this function and pass the element.
*/
defineComponent("counter", (el) => {
    /*
     * Read the starting value from the element's data-count attribute.
     * Example: <div data-count="5"> -> 5
     * If this attribute is missing, default to "0".
     * Number(...) converts the string to a number.
    */
    let count = Number(el.dataset.count ?? "0");
    /*
     * If the conversion resulted in NaN or Infinity,
     * reset to 0 so the number is always a safe value.
    */
    if (!Number.isFinite(count)) count = 0;

    // Set the visible text inside the element.
    el.textContent = `Count: ${count}`;
    // Change the mouse cursor to a pointer to show that the element is clickable.
    el.style.cursor = "pointer";

    // Add a click evenet listener to the element. Each time it's clicked, run the function.
    el.addEventListener("click", () => {
        // Increase the counter value.
        count++;
        // Update the displayed text with the new counter value.
        el.textContent = `Count: ${count}`;
    });
});