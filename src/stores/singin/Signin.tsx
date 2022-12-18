import { flow, types } from 'mobx-state-tree'

import axios from 'axios'
import { setTokenIntoCookies } from '../../api/common-utils'
import { baseUrlStart } from '../../api/const'

const info = types.model({
  userName: types.maybeNull(types.string),
  password: types.maybeNull(types.string),
})

export const signinInfo = types
  .model({
    userInfo: types.array(info),
    erorMessage: types.maybeNull(types.string),
    loading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get errorMessage() {
      return self.erorMessage
    },
    get isLoading() {
      return self.loading
    },
  }))
  .actions((self) => {
    const addInfo = flow(function* fetchData(info) {
      try {
        self.loading = true
        yield axios
          .post(`${baseUrlStart}user/token/`, {
            username: info.userName,
            password: info.password,
          })
          .then(function (response) {
            setTokenIntoCookies(response.data.access)
            window.location.pathname='/'
            return response
          })
      } catch (error: any) {
        if (error?.response?.status === 401) {
          self.erorMessage = error?.response?.data?.detail
        }
      } finally {
        self.loading = false
      }
    })
    return { addInfo }
  })

export function initSigninInfo() {
  return signinInfo.create({
    userInfo: [],
  })
}
