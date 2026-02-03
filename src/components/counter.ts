import { defineComponent } from "../registry";

defineComponent("counter", (el) => {
    // Optional initial value from data-count
    let count = Number(el.dataset.count ?? "0");
    if (!Number.isFinite(count)) count = 0;

    // Render
    el.textContent = `Count: ${count}`;
    el.style.cursor = "pointer";

    el.addEventListener("click", () => {
        count++;
        el.textContent = `Count: ${count}`;
    });
});