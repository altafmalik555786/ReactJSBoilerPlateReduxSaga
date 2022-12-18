import React from 'react'
import { Modal } from 'antd'
import style from './style.module.scss'

const DeletePopUp = (props) => {
  return (
    <div>
      <Modal
        title={props.msgTitle}
        visible={props.visibleDelete}
        onOk={props.delete}
        confirmLoading={props.isLoading}
        okText="Confirm"
        onCancel={props.handleCancel}
        className={style.delPopupModal}
      >
        <p>{props.msg}</p>
      </Modal>
    </div>
  )
}
export default DeletePopUp
