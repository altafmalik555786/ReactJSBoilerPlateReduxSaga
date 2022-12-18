import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from '@utils/hooks/useWindowSize'
import styles from './styles.module.scss'
import { Checkbox } from 'antd'

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

const FilterMultipleCheckboxPopUp: React.FC<Props> = ({
  add = false,
  categories,
  filterId,
  filterLabel,
  options,
  filterName,
  onClose,
  onChange,
  className,
}) => {
  const popupRef = useRef<HTMLInputElement>()
  const selectedFilters = categories || []
  const [filtersSelected, setFiltersSelected] = useState([])
  const { width } = useWindowSize()

  function checkedOnChange(checkedValues) {
    setFiltersSelected(checkedValues)
  }
  const createOrUpdateFilter = (e) => {
    emitOnChanges(e)
    onClose()
  }

  const onCancel = () => {
    onClose()
  }

  const emitOnChanges = (selected) => {
    if (typeof onChange === 'function') {
      onChange({
        id: filterId,
        header: filterLabel,
        name: filterName,
        active: true,
        filterTypes: categories,
        category: selected,
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
    if (filtersSelected?.length > 0) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (selectedFilters?.length === 0) {
      setFiltersSelected([''])
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
        <Checkbox.Group
          className={styles.checkboxesStyle}
          options={options}
          onChange={checkedOnChange}
        />
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

export default FilterMultipleCheckboxPopUp
