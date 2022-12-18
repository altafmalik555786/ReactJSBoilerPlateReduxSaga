import React from 'react'
import { Input } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import style from './style.module.scss'
import classnames from 'classnames'

export interface inputProps {
  onChange?: (
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  allowClear?: boolean
  bordered?: boolean
  defaultValue?: string | number | ReadonlyArray<string> | undefined
  disabled?: boolean | undefined
  id?: string | undefined
  maxLength?: number | undefined
  prefix?: React.ReactNode
  size?: SizeType
  type?: string
  value?: string | ReadonlyArray<string> | number | undefined
  onPressEnter?: (event) => void
  placeholder?: string | undefined
  className?: string | undefined
  styleList?: {}
}

const InputBox = (props: inputProps) => {
  return (
    <Input
      onChange={props.onChange}
      allowClear={props.allowClear}
      bordered={props.bordered}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      id={props.id}
      maxLength={props.maxLength ?? 50}
      size={props.size}
      type={props.type}
      value={props.value}
      onPressEnter={props.onPressEnter}
      placeholder={props.placeholder}
      className={classnames(style.input, props.className, props.styleList)}
      prefix={props.prefix}
    />
  )
}

export default InputBox
