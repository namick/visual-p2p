import RemotePeer from './RemotePeer'
import { dataChannelPort } from './messageChannels'

class RemotePeers {
  public peers: RemotePeer[] = []

  async add(remotePeer: RemotePeer) {
    this.peers.push(remotePeer)

    await this.notifyRenderer()
  }

  async notifyRenderer() {
    const value = await this.serialize()

    dataChannelPort.postMessage({ key: 'remotePeers', value })
  }

  async serialize() {
    return Promise.all(this.peers.map((peer) => peer.serialize()))
  }
}

export default RemotePeers
