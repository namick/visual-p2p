declare module 'hypercore' {
  export class Hypercore {
    ready: () => Promise<void>
    update: () => Promise<void>
    get: (index: number) => Promise<any>
    on: (event: string, callback: (data: any) => void) => void
    get length(): number
    key: Buffer
    append: (data: any) => Promise<void>
  }
}
