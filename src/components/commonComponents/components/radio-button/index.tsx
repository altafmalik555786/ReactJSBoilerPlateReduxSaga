import React from 'react'
import styles from './styles.module.scss'

interface Props {
  label?: string
  radioValue?: string
  radioChecked?: boolean
  handleChange?: (e: any) => void
}

const RadioButton: React.FC<Props> = ({
  label = '',
  radioValue,
  radioChecked = false,
  handleChange = () => {},
}) => {
  return (
    <label className={styles.container}>
      {label}
      <input
        value={radioValue}
        checked={radioChecked}
        onChange={handleChange}
        type="radio"
      />
      <span className={styles.checkmark}></span>
    </label>
  )
}

export default RadioButton
