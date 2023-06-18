import { atom } from 'recoil'

let appChannelPort: MessagePort

window.onmessage = (event: MessageEvent) => {
  if (event.source === window && event.data === 'message-channel-ports') {
    appChannelPort = event.ports[0]
  }
}

export const messagesState = atom<string[]>({
  key: 'messagesState',
  default: [],
})

export const drawerOpenState = atom<boolean>({
  key: 'drawerOpenState',
  default: false,
})

export const screenState = atom<'Chat' | 'Peers'>({
  key: 'screenState',
  default: 'Chat',
})

type Peer = Record<string, unknown>

export const peersState = atom<Peer[]>({
  key: 'peersState',
  default: [],
  effects: [
    ({ setSelf }) => {
      appChannelPort.onmessage = (event: MessageEvent) => {
        if (event.data.type === 'peer') {
          setSelf((peers: Peer[]) => [...peers, event.data])
        }
      }
    },
  ],
})
