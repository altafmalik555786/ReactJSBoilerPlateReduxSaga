import { notification } from 'antd'

const clientSuccessNoti = (msg, type) => {
  notification[type]({
    message: msg,
    duration: 1,
  })
}
export default clientSuccessNoti
