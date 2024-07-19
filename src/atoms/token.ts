import { atom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { store } from './store'

export type UserTokenInfo =
  | { loggedIn: false }
  | {
      loggedIn: true
      userId: number
      token: string
    }

const userTokenAtom = atomWithStorage('user-token', '', undefined, {
  getOnInit: true,
})
export const setUserToken = (token: string) => store.set(userTokenAtom, token)

const adminTokenAtom = atomWithStorage('admin-token', '')

const userTokenInfoAtom = atom<UserTokenInfo>((get) => {
  const token = get(userTokenAtom)

  if (token === '') {
    return { loggedIn: false }
  }

  let payload: {
    exp: number
    userId: number
  }

  try {
    const payloadBytes = Uint8Array.from(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0),
    )
    payload = JSON.parse(new TextDecoder().decode(payloadBytes))
  } catch (error) {
    console.warn('Failed to parse token', error)
    return {
      loggedIn: false,
    }
  }

  // Let's reserve 30 minutes
  if (Date.now() + 1800000 > payload.exp * 1000) {
    return { loggedIn: false }
  }

  return { loggedIn: true, userId: payload.userId, token }
})
export const useUserTokenInfo = () => useAtomValue(userTokenInfoAtom)
export const getUserTokenInfo = () => store.get(userTokenInfoAtom)
