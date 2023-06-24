import { atom, selectorFamily } from 'recoil'
import { syncEffect } from 'recoil-sync'
import { array, bool, object, string } from '@recoiljs/refine'

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

export const localPeerState = atom({
  key: 'localPeer',
  default: { name: 'unknown' },
  effects: [
    syncEffect({
      storeKey: 'dataChannel',
      refine: object({ name: string() }),
    }),
  ],
})

export const remotePeersState = atom({
  key: 'remotePeers',
  default: [],
  effects: [
    syncEffect({
      storeKey: 'dataChannel',
      refine: array(
        object({
          name: string(),
          cores: array(
            object({
              name: string(),
              peer: string(),
              key: string(),
              writeable: bool(),
              valueEncoding: string(),
            })
          ),
        })
      ),
    }),
  ],
})

export const selectedPeerState = selectorFamily({
  key: 'selectedPeer',
  get:
    (name: string) =>
    ({ get }) => {
      const peers = get(remotePeersState)
      return peers.find((peer) => peer.name === name)
    },
})

export const selectedCoreState = selectorFamily({
  key: 'selectedCore',
  get:
    (params: { name: string; coreKey: string }) =>
    ({ get }) => {
      const peer = get(selectedPeerState(params?.name))
      return peer?.cores.find((core) => core.key === params?.coreKey)
    },
})
