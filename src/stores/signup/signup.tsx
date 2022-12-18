import { flow, types } from 'mobx-state-tree'

import { toJS } from 'mobx'
import axios from 'axios'
import { baseUrl } from '../../api/const'

const info = types.model({
  userName: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  password: types.maybeNull(types.string),
})
const username = types.model({
  username: types.maybeNull(types.array(types.string)),
  email: types.maybeNull(types.array(types.string)),
})
export const signupInfo = types
  .model({
    userInfo: types.array(info),
    erorMessage: types.maybeNull(username),
    loading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get errorMessage() {
      return toJS(self.erorMessage)
    },
    get isLoading() {
      return self.loading
    },
  }))
  .actions((self) => {
    const registerInfo = flow(function* fetchData(info) {
      try {
        self.loading = true
        yield axios
          .post(`${baseUrl}register_user/`, {
            username: info.userName,
            email: info.email,
            password: info.password,
          })
          .then(function (response) {})
      } catch (error: any) {
        if (error?.response?.status === 400) {
          console.log('error', error?.response?.data)
          self.erorMessage = error?.response?.data
          console.log('errormessage is', toJS(self.erorMessage))
        }
      } finally {
        self.loading = false
      }
    })
    return { registerInfo }
  })

export function initSignupInfo() {
  return signupInfo.create({
    userInfo: [],
    // erorMessage: [],
  })
}
