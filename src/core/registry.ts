/*
 * A type alias that describes a function used to "mount" a component.
 * This must receive an HTMLElement and it doesn't return anything (void).
*/
export type MountFn = (el: HTMLElement) => void;

/*
 * Create a Map to store the components.
 * The key is the component name (string).
 * The value is the mounting function (MountFn).
 * This acts like a registry or dictionary of components.
*/
const registry = new Map<string, MountFn>();

// Function to register (define) a new component.
export function defineComponent(name: string, mount: MountFn) {
    /*
     * Check if a component with the same name already exists.
     * This prevents accidental overwriting.
    */
    if (registry.has(name)) {
        // Throw an error if the component name is already defined.
        throw new Error(`Component is already defined: ${name}`);
    }
    // Store the component's mount function in the registry map.
    registry.set(name, mount);
}

// Function to retrieve a previously registered component.
export function getComponent(name: string) {
    /*
     * Return the mount function associated with the name.
     * If not found, Map.get() will return undefined.
    */
    return registry.get(name);
}