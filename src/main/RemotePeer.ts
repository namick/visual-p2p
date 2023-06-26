import { Peer } from './types'
import Corestore from 'corestore'
import RemotePeers from './RemotePeers'
import { connectionChannelPort } from './messageChannels'
import Core from './Core'

type Connection = { on: (arg0: string, arg1: (data: any) => void) => void }

class RemotePeer implements Peer {
  public name = 'unknown'
  public connection: Connection
  public store: Corestore
  public identityCore?: Core
  public messageCore?: Core
  public remotePeers: RemotePeers

  constructor(connection: Connection, store: Corestore, remotePeers: RemotePeers) {
    this.connection = connection
    this.store = store
    this.remotePeers = remotePeers

    this.listen()
  }

  listen() {
    this.connection.on('data', async (data) => {
      const { name, identityCoreKey } = this.parseConnectionData(data)
      if (identityCoreKey && name) {
        this.name = name
        await this.setupCores(identityCoreKey)
        this.remotePeers.notifyRenderer()
      }
    })
  }

  parseConnectionData(data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return {}
    }
  }

  async setupCores(key: string) {
    this.identityCore = new Core({
      name: 'identity-core',
      key,
      store: this.store,
      peer: this,
      valueEncoding: 'json',
      writeable: false,
    })

    await this.identityCore.core.ready()
    await this.identityCore.core.update()

    const identity = await this.identityCore.core.get(0)

    this.messageCore = new Core({
      name: 'message-core',
      store: this.store,
      peer: this,
      key: identity.messageCoreKey,
      valueEncoding: 'utf-8',
      writeable: false,
    })

    const { core } = this.messageCore

    core.on('append', () => {
      const seq = core.length - 1
      core.get(seq).then((block) => {
        connectionChannelPort.postMessage(`${this.name}: ${block}`)
      })
    })
  }

  get cores() {
    const list = new Array<Core>()
    if (this.identityCore) list.push(this.identityCore)
    if (this.messageCore) list.push(this.messageCore)
    return list
  }

  async serialize() {
    const cores = await Promise.all(this.cores.map((core) => core.serialize()))

    return {
      name: this.name,
      cores,
    }
  }
}

export default RemotePeer
