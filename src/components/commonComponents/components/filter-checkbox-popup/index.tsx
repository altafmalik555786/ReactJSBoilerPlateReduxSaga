import React, { useState, useEffect, useCallback, useRef } from 'react'
import useWindowSize from '@utils/hooks/useWindowSize'
import styles from './styles.module.scss'
import { Radio } from 'antd'

interface Props {
  styleClass?: string
  options: any
  filterLabel?: string
  categories?: string[]
  add?: boolean
  filtersLength?: number
  filterId?: number
  filterName?: string
  onClose?: () => void
  removeItem?: () => void
  onChange?: (filter: any) => void
  className?: string
}

const FilterCheckboxPopUp: React.FC<Props> = ({
  add = false,
  categories,
  filterId,
  filterLabel,
  filterName,
  onClose,
  onChange,
  className,
}) => {
  const popupRef = useRef<HTMLInputElement>()
  const selectedFilters = categories || []
  const [filtersSelected, setFiltersSelected] = useState('')
  const { width } = useWindowSize()

  const onChangeValue = useCallback(
    (e) => setFiltersSelected(e.target.value),
    []
  )
  const createOrUpdateFilter = (e) => {
    emitOnChanges(e)
    onClose()
  }

  const onCancel = () => {
    onClose()
  }

  const emitOnChanges = (selected: string) => {
    if (typeof onChange === 'function') {
      onChange({
        id: filterId,
        header: filterLabel,
        name: filterName,
        active: true,
        filterTypes: categories,
        type: selected,
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
    if (filtersSelected) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (selectedFilters?.length === 0) {
      setFiltersSelected('')
    }
  }, [selectedFilters?.length])

  return (
    <div
      ref={popupRef}
      onSubmit={() => createOrUpdateFilter(filtersSelected)}
      onClick={(e) => e.stopPropagation()}
      style={add || width < 1000 ? { right: '-145%', left: 'unset' } : {}}
      className={`${styles.filterPopup} ${className}`}
    >
      <div className={styles.filterPopupOptions}>
        <div className={styles.filterPopupOptionsOption}>
          <Radio.Group
            onChange={onChangeValue}
            value={filtersSelected}
            style={{ width: '100%' }}
          >
            {categories?.map((item, index) => {
              return (
                <>
                  <Radio key={index} value={item} style={{ width: '100%' }}>
                    <h4>{item}</h4>
                  </Radio>
                </>
              )
            })}
          </Radio.Group>
        </div>
      </div>
      <div className={styles.filterPopupButtons}>
        <button className={styles.filterPopupButtonCancel} onClick={onCancel}>
          {'cancel'}
        </button>
        <button
          disabled={disablingButton()}
          onClick={() => createOrUpdateFilter(filtersSelected)}
          className={`${styles.filterPopupButtonApply} ${
            disablingButton() && styles.disabled
          }`}
        >
          {'apply-filter'}
        </button>
      </div>
    </div>
  )
}

export default FilterCheckboxPopUp
