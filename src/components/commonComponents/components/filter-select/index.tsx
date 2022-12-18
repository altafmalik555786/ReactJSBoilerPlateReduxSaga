import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'
import { Checkbox } from 'antd'
import Button from '../button'
import { CaretDownOutlined } from '@ant-design/icons'
import { Tooltip as AntdCommonTooltip } from 'antd'

export interface FilterCheckBoxes {
  styleClass?: string
  options: any
  handleChange: any
  filterLabel?: string
  disabled?: boolean
  selectedFilters?: string[]
}

export const FilterCheckboxes: React.FC<FilterCheckBoxes> = ({
  styleClass,
  ...props
}) => {
  const FilterInputItemDom = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const selectedFilters = props.selectedFilters || []
  const [filtersSelected, setFiltersSelected] = useState([])
  const options = props.options
  const filterLabel = props.filterLabel
  const handleChange = props.handleChange
  const disabled = props.disabled || false

  const escapePress = function (e) {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const clickHandler = function (e) {
    const path = e?.path || (e?.composedPath && e?.composedPath())
    const isInPath = path?.includes(FilterInputItemDom.current)
    if (!isInPath) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandler)
    document.addEventListener('keyup', escapePress)
    return () => {
      window.removeEventListener('click', clickHandler)
      document.removeEventListener('keyup', escapePress)
    }
  }, [])

  function onChange(checkedValues) {
    setFiltersSelected(checkedValues)
  }

  useEffect(() => {
    if (selectedFilters?.length === 0) {
      setFiltersSelected([])
    }
  }, [selectedFilters?.length])

  return (
    <div className={`${styles.filterSelect} ${styleClass}`}>
      <AntdCommonTooltip
        title={disabled ? 'filter-select-tooltiple-title' : ''}
        overlayClassName={styles.customTooltip}
        placement="top"
      >
        <div
          ref={FilterInputItemDom}
          className={classnames({
            [styles.isBodyVisible]: isOpen,
            [styles.filterInputItem]: true,
          })}
        >
          <div
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            className={styles.header}
          >
            <strong>{filterLabel}:</strong>
            <span style={{ display: 'flex', marginLeft: '6px' }}>
              {selectedFilters.length > 0
                ? `(${selectedFilters.length})`
                : 'filter-select-any'}
              <span className={styles.icon}>
                <CaretDownOutlined color="#77757D" />
              </span>
            </span>
          </div>

          {isOpen && (
            <div className={styles.filterCheckboxs}>
              <Checkbox.Group
                value={filtersSelected}
                onChange={onChange}
                options={options}
              ></Checkbox.Group>
              <div className={styles.filterActions}>
                <Button
                  onClick={() => {
                    handleChange(filtersSelected)
                    setIsOpen(false)
                  }}
                  type="primary"
                  disabled={disabled}
                  title={'filter-select-apply'}
                ></Button>
                <Button
                  onClick={() => {
                    if (selectedFilters?.length > 0) {
                      onChange([])
                      handleChange([])
                    }
                    setIsOpen(false)
                  }}
                  title={
                    selectedFilters?.length > 0
                      ? 'Remove'
                      : 'filter-select-cancel'
                  }
                  type="ghost"
                ></Button>
              </div>
            </div>
          )}
        </div>
      </AntdCommonTooltip>
    </div>
  )
}
