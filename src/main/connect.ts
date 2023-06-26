import Corestore from 'corestore'
import Hyperswarm from 'hyperswarm'
import goodbye from 'graceful-goodbye'
import b4a from 'b4a'
import { createHash } from 'crypto'
import { appChannelPort, connectionChannelPort, dataChannelPort } from './messageChannels'
import RemotePeer from './RemotePeer'
import RemotePeers from './RemotePeers'

export const name = process.env.MAIN_VITE_NAME || 'test'
const topic = process.env.MAIN_VITE_TOPIC || 'test-topic'
const topicHex = createHash('sha256').update(topic).digest('hex')
const topicBuffer = b4a.from(topicHex, 'hex')

export async function connect() {
  dataChannelPort.postMessage({ key: 'localPeer', value: { name } })

  const remotePeers = new RemotePeers()

  const store = new Corestore(`./.storage/${name}`)
  const swarm = new Hyperswarm()
  goodbye(() => swarm.destroy())

  const identityCore = store.get({ name: 'identity-core', valueEncoding: 'json' })
  const messagesCore = store.get({ name: 'messages-core', valueEncoding: 'utf-8' })
  await Promise.all([identityCore.ready(), messagesCore.ready()])

  swarm.join(topicBuffer)

  swarm.on('connection', async (connection) => {
    store.replicate(connection)
    const remotePeer = new RemotePeer(connection, store, remotePeers)

    await remotePeers.add(remotePeer)

    // tell the remotePeer about this peer's identityCore
    connection.write(
      JSON.stringify({
        name: name,
        identityCoreKey: b4a.toString(identityCore.key, 'hex'),
      })
    )
    connectionChannelPort.postMessage(`connection initiated`)
  })

  if (identityCore.length === 0) {
    await identityCore.append({
      messageCoreKey: b4a.toString(messagesCore.key, 'hex'),
    })
  }

  appChannelPort.on('message', (event) => {
    messagesCore.append(event.data)
  })
}
