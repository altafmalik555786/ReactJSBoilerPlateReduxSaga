import makeInspectable from 'mobx-devtools-mst'
import { applySnapshot, getSnapshot, Instance, types } from 'mobx-state-tree'
import { useMemo } from 'react'
import { initSigninInfo, signinInfo } from './singin/Signin'
import { initSignupInfo, signupInfo } from './signup/signup'
import { initClientDetails, clientDetails } from './client/Client'

const RootStore = types
  .model({
    signupInfo: signupInfo,
    signinInfo: signinInfo,
    clientDetails: clientDetails,
  })
  .actions((self) => {
    let initialState = {}
    return {
      afterCreate: () => {
        initialState = getSnapshot(self)
      },
      reset: () => {
        applySnapshot(self, initialState)
      },
    }
  })

export type RootStoreType = Instance<typeof RootStore>

let store: RootStoreType

export function resetStore() {
  store.reset()
}

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    RootStore.create({
      signupInfo: initSignupInfo(),
      signinInfo: initSigninInfo(),
      clientDetails: initClientDetails(),
    })
  if (snapshot) {
    applySnapshot(_store, snapshot)
  }
  if (typeof window === 'undefined') {
    return _store
  }

  if (!store) {
    store = _store
  }
  makeInspectable(store)
  return _store
}

export function useStore(
  initialState: null | undefined
): Instance<typeof RootStore> {
  return useMemo(() => initializeStore(initialState), [initialState])
}
