import { getComponent } from "./registry";

const mounted = new WeakSet<HTMLElement>();

export function mountAll(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>("[data-ui]");
    for (const el of nodes) mountOne(el);
}

export function mountOne(el: HTMLElement) {
    if (mounted.has(el)) return;

    const name = el.dataset.ui;
    if (!name) return;

    const mount = getComponent(name);
    if (!mount) {
        console.warn(`[ui] Unknown component: "${name}"`, el);
        return;
    }

    mounted.add(el);
    mount(el);
}