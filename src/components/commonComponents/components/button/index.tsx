import React from 'react'
import { Button } from 'antd'
import style from './style.module.scss'
import { ButtonHTMLType } from 'antd/lib/button/button'
import { ButtonType, ButtonShape } from 'antd/lib/button'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import classNames from 'classnames'

export interface buttonProps {
  className?: string
  block?: boolean
  danger?: boolean
  disabled?: boolean
  ghost?: boolean
  href?: string
  htmlType?: ButtonHTMLType
  icon?: React.ReactNode
  loading?: boolean
  shape?: ButtonShape
  size?: SizeType
  target?: string
  type?: ButtonType
  title?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

const CustomButton = (props: buttonProps) => {
  return (
    <Button
      className={classNames(style.commonButton, props.className)}
      block={props.block}
      danger={props.danger}
      disabled={props.disabled}
      ghost={props.ghost}
      href={props.href}
      htmlType={props.htmlType}
      icon={props.icon}
      loading={props.loading}
      shape={props.shape}
      size={props.size}
      target={props.target}
      type={props.type}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  )
}

export default CustomButton
