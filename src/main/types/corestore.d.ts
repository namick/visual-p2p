import { Hypercore } from 'hypercore'

declare module 'corestore' {
  declare class Corestore {
    constructor(path: string)
    ready(): Promise<void>
    get(options: {
      name?: string
      key?: Buffer
      valueEncoding?: 'json' | 'utf-8' | 'binary'
    }): Hypercore
    replicate(connection: any): void
  }
}

export default Corestore
