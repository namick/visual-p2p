/**
 * Copied this from node_modules/electron-vite/node.d.ts
 * because tsconfig -> compilerOptions "types" and "typeRoots" don't work together
 */

// node asset
declare module '*?asset' {
  const src: string
  export default src
}

declare module '*?asset&asarUnpack' {
  const src: string
  export default src
}

// native node module
declare module '*.node' {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const node: any
  export default node
}

// node wasm
declare module '*.wasm?loader' {
  const loadWasm: (options?: WebAssembly.Imports) => Promise<WebAssembly.Instance>
  export default loadWasm
}
