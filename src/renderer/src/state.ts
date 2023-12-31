import { atom, selector, selectorFamily } from 'recoil'
import { syncEffect } from 'recoil-sync'
import { array, bool, number, object, string } from '@recoiljs/refine'

export const messagesState = atom<string[]>({
  key: 'messagesState',
  default: [],
})

export const drawerOpenState = atom<boolean>({
  key: 'drawerOpenState',
  default: false,
})

export const screenState = atom<'Chat' | 'Peers' | 'Core'>({
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
              blocks: array(
                object({
                  height: number(),
                  data: string(),
                  size: number(),
                })
              ),
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

export const currentCoreKeyState = atom({
  key: 'currentCoreKey',
  default: '',
})

export const currentCoreState = selector({
  key: 'currentCore',
  get: ({ get }) => {
    const coreKey = get(currentCoreKeyState)
    const peers = get(remotePeersState)
    return peers.flatMap((peer) => peer.cores).find((core) => core.key === coreKey)
  },
})
