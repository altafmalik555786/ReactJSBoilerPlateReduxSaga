import { getAuthorizationHeader } from '../common-utils'
import axios from 'axios'
import { baseUrl } from '../const'
import { BaseApi } from '../baseApi'

class ClientApi extends BaseApi {
  setClientDetails = async (data) => {
   
    try {
      const response = await axios.post(
        `${baseUrl}client/`,
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
             Authorization: getAuthorizationHeader() 
            },
          cancelToken: this.cancelToken,
        },
      )

      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }

  getClientDetails = async (num = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}client/?page=${num ? num : 1}`,
        {
          headers: { Authorization: getAuthorizationHeader() },
          cancelToken: this.cancelToken,
        }
      )

      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }
  updateClientDetails = async (data, recordId) => {
    try {
      const response = await axios.patch(
        `${baseUrl}client/${recordId}/`,
       data,
        {
          headers: { Authorization: getAuthorizationHeader() },
          cancelToken: this.cancelToken,
        }
      )

      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }
  deleteClientDetails = async (id: Number) => {
    try {
      const response = await axios.delete(`${baseUrl}client/${id}/`, {
        headers: { Authorization: getAuthorizationHeader() },
        cancelToken: this.cancelToken,
      })

      return response.data
    } catch (error) {
      throw Promise.reject(error)
    }
  }
}

export default ClientApi

