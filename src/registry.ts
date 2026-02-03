export type MountFn = (el: HTMLElement) => void;

const registry = new Map<string, MountFn>();

export function defineComponent(name: string, mount: MountFn) {
    if (registry.has(name)) {
        throw new Error(`Component is already defined: ${name}`);
    }
    registry.set(name, mount);
}

export function getComponent(name: string) {
    return registry.get(name);
}