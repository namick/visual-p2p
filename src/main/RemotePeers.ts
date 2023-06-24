import RemotePeer from './RemotePeer'
import { dataChannelPort } from './messageChannels'

class RemotePeers {
  public peers: RemotePeer[] = []

  add(remotePeer: RemotePeer) {
    this.peers.push(remotePeer)
    this.notifyRenderer()
  }

  notifyRenderer() {
    dataChannelPort.postMessage({ key: 'remotePeers', value: this.serialize() })
  }

  serialize() {
    return this.peers.map((peer) => {
      return {
        name: peer.name,
      }
    })
  }
}

export default RemotePeers
