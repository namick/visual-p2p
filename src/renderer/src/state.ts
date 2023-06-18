import { atom } from 'recoil'

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
