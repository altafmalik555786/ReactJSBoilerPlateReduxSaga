import { flow, types } from 'mobx-state-tree'
import { clientApi } from '../../api'
import clientSuccessNoti from '@utils/notification'

export const clientOwner = types.model({
  cnic: types.maybeNull(types.string),
  first_name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
})

export const clientType = types.model({
  client_type: types.maybeNull(types.string),
  id: types.maybeNull(types.string),
})

export const clientInfo = types.model({
  first_name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  id: types.maybeNull(types.string),
  location: types.maybeNull(types.string),
  client_type: types.maybeNull(clientType),
  client_owner: types.maybeNull(clientOwner),
  mobile_number: types.maybeNull(types.string),
  start_date: types.maybeNull(types.string),
  end_date: types.maybeNull(types.string),
  status: types.maybeNull(types.boolean),
  client_image: types.maybeNull(types.string),
})

export const clientDetails = types
  .model({
    clientInfo: types.maybeNull(types.array(clientInfo)),
    loading: types.optional(types.boolean, false),
    count: types.maybeNull(types.number),
  })
  .views((self) => ({
    get getClientInfo() {
      return self.clientInfo
    },
    get isLoading() {
      return self.loading
    },
  }))
  .actions((self) => {
    const setClientInfo = flow(function* (data) {
      self.loading = true
      try {
        const res = yield clientApi.setClientDetails(data)
        clientSuccessNoti('Client Added Successfully', 'success')
        console.log("res", res)
        self.clientInfo = res
      } catch (error) {
        console.log('error', error)
      } finally {
        self.loading = false
      }
    })

    const loadClientInfo = flow(function* (num = 1) {
      self.loading = true
      try {
        self.loading = true
        const res = yield clientApi.getClientDetails(num)
        self.clientInfo = res.results
        self.count = res.count
      } catch (error) {
        console.log('error', error)
      } finally {
        self.loading = false
      }
    })
    const updateClientDetails = flow(function* (data, recordId) {
      try {
        self.loading = true
        const res = yield clientApi.updateClientDetails(data, recordId)  
        let index = self.clientInfo.findIndex((val) => val.id === recordId)
        self.clientInfo[index] = res
        clientSuccessNoti('Client Updated Successfully', 'success')
      } catch (error) {
        console.log('error', error)
      } finally {
        self.loading = false
      }
    })
    const deleteClientDetails = flow(function* (id) {
      try {
        self.loading = true
        const res = yield clientApi.deleteClientDetails(id)
        self.clientInfo = res.results
        clientSuccessNoti('Client Deleted Successfully', 'success')
      } catch (error) {
        console.log('error', error)
      } finally {
        self.loading = false
      }
    })
    return {
      setClientInfo,
      loadClientInfo,
      deleteClientDetails,
      updateClientDetails,
    }
  })

export function initClientDetails() {
  return clientDetails.create({})
}
