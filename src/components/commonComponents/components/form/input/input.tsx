import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames'

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={classnames(styles.input, 'common-component-input', className)}
    />
  )
}

export type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

const Textarea: React.FC<TextareaProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={classnames(
        styles.textarea,
        'common-component-textarea',
        className
      )}
    >
      {children}
    </textarea>
  )
}

export { Input, Textarea }
