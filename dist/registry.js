var t=new Map;function o(n,e){if(t.has(n))throw Error(`Component is already defined: ${n}`);t.set(n,e)}function r(n){return t.get(n)}export{r as getComponent,o as defineComponent};
