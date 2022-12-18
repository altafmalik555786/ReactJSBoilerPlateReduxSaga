import React, { useState, useEffect, useCallback, useRef } from 'react'
import RadioButton from '../radio-button'
import useWindowSize from '@utils/hooks/useWindowSize'
import styles from './styles.module.scss'
import Button from '../button-component'

interface Props {
  type?: string
  add?: boolean
  filtersLength?: number
  filterId?: number
  filterLabel?: string
  filterName?: string
  onClose?: () => void
  removeItem?: () => void
  onChange?: (filter: any) => void
  className?: string
  initialFrom?: string
  initialTo?: string
}

const FilterPopUp: React.FC<Props> = ({
  removeItem,
  add = false,
  type,
  filterId,
  filtersLength,
  filterLabel,
  filterName,
  onClose,
  onChange,
  className,
  initialFrom,
  initialTo,
}) => {
  const [value, setValue] = useState('between')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const popupRef = useRef<HTMLInputElement>()
  const { width } = useWindowSize()

  useEffect(() => {
    if (initialFrom) {
      setFrom(initialFrom)
    }
    if (initialTo) {
      setTo(initialTo)
    }
    if (type) {
      setValue(type)
    }
  }, [])

  const onChangeValue = useCallback((e) => setValue(e.target.value), [])

  const createOrUpdateFilter = (e) => {
    e.preventDefault()
    emitOnChanges(from, to)
    onClose()
  }

  const onCancel = () => {
    if (initialFrom || initialTo) {
      removeItem()
    }
    onClose()
  }
  //
  const emitOnChanges = (from: string, to: string) => {
    if (typeof onChange === 'function') {
      onChange({
        id: filterId,
        header: filterLabel,
        name: filterName,
        type: value,
        from: !from ? '0' : from,
        to,
        active: true,
      })
    }
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [popupRef])

  const disablingButton = () => {
    if (value === 'between' && +from > +to) return true
    if (value === 'between' && (!from || !to)) return true
    if (value === 'higher' && !from) return true
    if (value === 'lower' && !to) return true
    if ((initialFrom || initialTo) && to === initialTo && from === initialFrom)
      return true
    return false
  }

  useEffect(() => {
    if (!type) {
      setTo('')
      setFrom('')
    }
  }, [value])

  return (
    <div
      ref={popupRef}
      onSubmit={createOrUpdateFilter}
      onClick={(e) => e.stopPropagation()}
      style={
        (add && filtersLength < 4) || width < 1000
          ? { right: '-145%', left: 'unset' }
          : {}
      }
      className={`${styles.filterPopup} ${className}`}
    >
      <div className={styles.filterPopupOptions}>
        <div className={styles.filterPopupOptionsOption}>
          <RadioButton
            label="between"
            radioValue="between"
            radioChecked={value === 'between'}
            handleChange={onChangeValue}
          />
          {value === 'between' && (
            <div className={styles.filterPopupOptionsBetween}>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value.replace(/\D/g, ''))}
              />{' '}
              and{' '}
              <input
                value={to}
                onChange={(e) => setTo(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          )}
        </div>
        <div>
          <RadioButton
            label="greater than"
            radioValue="higher"
            radioChecked={value === 'higher'}
            handleChange={onChangeValue}
          />
          {value === 'higher' && (
            <div className={styles.filterPopupOptionsOther}>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          )}
        </div>
        <div>
          <RadioButton
            label="less than"
            radioValue="lower"
            radioChecked={value === 'lower'}
            handleChange={onChangeValue}
          />
          {value === 'lower' && (
            <div className={styles.filterPopupOptionsOther}>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.filterPopupButtons}>
        <Button onClick={onCancel}>
          {initialFrom || initialTo ? 'remove' : 'cancel'}
        </Button>
        <Button
          style={disablingButton() ? 'light-transparent' : 'solid'}
          disabled={disablingButton()}
          onClick={createOrUpdateFilter}
        >
          {'apply-filter'}
        </Button>
      </div>
    </div>
  )
}

export default FilterPopUp
