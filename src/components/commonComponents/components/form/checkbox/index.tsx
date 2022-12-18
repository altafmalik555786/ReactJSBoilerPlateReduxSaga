import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { Checkbox as AntdCheckbox } from 'antd'
import { PropsWithChildren } from 'react'
import styles from './style.module.scss'

export type CheckboxProps = PropsWithChildren<{
  prefixCls?: string
  style?: React.CSSProperties
  id?: string
  type?: string
  defaultChecked?: boolean
  disabled?: boolean
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
  readOnly?: boolean
  required?: boolean
  autoFocus?: boolean
  value?: any
  label: string
  transparent: boolean
  className?: string
  onChange?: any
  checked?: boolean
  name?: string
  primary: 'light' | 'dark' | 'primary'
}>

export const Checkbox: React.FC<CheckboxProps> = ({
  type = 'primary',
  label = '',
  transparent = false,
  className,
  checked: passedChecked,
  onChange: passedOnchange,
  children,
  ...props
}) => {
  const [checked, setChecked] = useState(passedChecked)

  useEffect(() => {
    setChecked(passedChecked)
  }, [passedChecked])

  const onChange = (e: any) => {
    if (checked !== e.target.checked) {
      setChecked(e.target.checked)
      passedOnchange && passedOnchange(e)
    }
  }

  return (
    <span
      className={classnames(styles.commonComponentsCheckbox, {
        [styles.lighten]: type === 'light',
        [styles.darken]: type === 'dark',
        [styles.primary]: type === 'primary',
        darken: type === 'dark',
        transparentCheckbox: transparent,
      })}
    >
      <AntdCheckbox
        className={classnames(className)}
        checked={checked}
        onChange={onChange}
        {...props}
      >
        {children && children}
        {label && label}
      </AntdCheckbox>
    </span>
  )
}

export default Checkbox
