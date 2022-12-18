import { notification as antdNotification } from 'antd'

export const notification = {
  error(message: string) {
    return antdNotification.error({
      message,
      placement: 'bottomRight',
      key: 'error',
    })
  },

  success(message: string) {
    return antdNotification.success({
      message,
      placement: 'bottomRight',
    })
  },

  info(message: string) {
    return antdNotification.info({
      message,
      placement: 'bottomRight',
      key: 'info',
    })
  },
}
