import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import styles from '@commonComponents/filter-table/range-filter.module.scss'
import { observer } from 'mobx-react-lite'
import { InputForm } from '@commonComponents/filter-table/input-form'

interface RangeQuery {
  min: number
  max: number
}

interface RangeFilterProps {
  identifier: string
  label: string
  query?: RangeQuery
  store: any
}

export const RangeFilter: React.FC<RangeFilterProps> =
  observer<RangeFilterProps>(({ identifier, label, query, store }) => {
    const isOpen = store.filters.isOpen(identifier)
    let range = ': Any'
    if (query) {
      const { min, max } = query
      range = `${min}-${max}`
    }
    const filterRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const [openPop, setOpenPop] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(() => {
      function handleClickOutside(event) {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
          setOpenPop(false)
          setIsOpenModal(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [filterRef])

    return (
      <div ref={filterRef} className={styles.rangeFilter}>
        <div
          onClick={() => {
            store.filters.setActive(identifier)
            setOpenPop(true)
            setIsOpenModal(true)
          }}
          className={classnames(styles.button, { [styles.open]: isOpen })}
        >
          {label}&nbsp; <span className={styles.rangeLabel}>{range}</span>
          {isOpen && openPop ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </div>
        {isOpen && isOpenModal && (
          <InputForm
            setModal={() => setIsOpenModal(false)}
            setPop={() => setOpenPop(false)}
            isOpen={isOpen}
            store={store}
            identifier={identifier}
          />
        )}
      </div>
    )
  })
