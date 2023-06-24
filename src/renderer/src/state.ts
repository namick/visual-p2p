import { atom } from 'recoil'
import { syncEffect } from 'recoil-sync'
import { array, object, string } from '@recoiljs/refine'

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

export const remotePeersState = atom({
  key: 'remotePeers',
  default: [],
  effects: [
    syncEffect({
      itemKey: 'remotePeers',
      storeKey: 'dataChannel',
      refine: array(object({ name: string() })),
    }),
  ],
})
