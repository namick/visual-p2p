declare module 'hypercore' {
  export class Hypercore {
    ready: () => Promise<void>
    update: () => Promise<void>
    get: (index: number) => Promise<any>
    on: (event: string, callback: (data: any) => void) => void
    get length(): number
    key: Buffer
    append: (data: any) => Promise<void>
    createReadStream: () => Buffer | Array<any>
    info: ({ storage }: { storage: boolean }) => Promise<Info>
  }
}

interface Info {
  key: Buffer
  discoveryKey: Buffer
  length: number
  contiguousLength: number
  byteLength: number
  fork: number
  padding: number
  storage: {
    oplog: number
    tree: number
    blocks: number
    bitfield: number
  }
}
