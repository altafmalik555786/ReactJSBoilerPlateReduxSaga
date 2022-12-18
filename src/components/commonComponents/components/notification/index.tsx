import { notification as antdNotification } from 'antd'

export const notification = {
  error(message) {
    return antdNotification.error({
      message,
      placement: 'bottomRight',
      key: 'error',
    })
  },

  success(message) {
    return antdNotification.success({
      message,
      placement: 'bottomRight',
    })
  },

  info(message) {
    return antdNotification.info({
      message,
      placement: 'bottomRight',
      key: 'info',
    })
  },
}
