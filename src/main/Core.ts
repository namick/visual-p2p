import { Hypercore } from 'hypercore'
import { Peer } from './types'
import Corestore from 'corestore'
import b4a from 'b4a'

interface Props {
  name: string
  store: Corestore
  peer: Peer
  writeable: boolean
  key: string
  valueEncoding: 'json' | 'utf-8' | 'binary'
}

class Core {
  name = 'unknown core'
  store: Corestore
  core: Hypercore
  peer: Peer
  writeable: boolean
  key: string
  valueEncoding: 'json' | 'utf-8' | 'binary'

  constructor({ name, store, peer, key, valueEncoding, writeable }: Props) {
    this.name = name
    this.store = store
    this.peer = peer
    this.key = key
    this.writeable = writeable
    this.valueEncoding = valueEncoding

    this.core = this.store.get({
      key: b4a.from(key, 'hex'),
      valueEncoding,
    })
  }

  async blockData() {
    await this.core.ready()

    const fullStream = this.core.createReadStream()
    const blocks: { height: number; data: string; size: number }[] = []
    let height = 0
    for await (const block of fullStream) {
      let data = block
      if (this.valueEncoding === 'json') {
        data = JSON.stringify(data)
      }
      blocks.push({ height, data, size: data.length })
      height++
    }

    return blocks
  }

  async serialize() {
    const blocks = await this.blockData()

    return {
      name: this.name,
      peer: this.peer.name,
      key: this.key,
      writeable: this.writeable,
      valueEncoding: this.valueEncoding,
      blocks,
    }
  }
}

export default Core
