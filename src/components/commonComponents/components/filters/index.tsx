import React, { useState, useEffect, useRef } from 'react'
import FilterPopUp from '../filter-popup'
import FilterCheckboxPopUp from '../filter-checkbox-popup'
import FilterMultipleCheckboxPopUp from '../filter-multiple-checkbox-popup'
import { RadioButton } from '@commonComponents'
import { ChevronDown, ChevronUp } from 'react-feather'
import styles from './style.module.scss'

interface Props {
  mainFilters?: any
  add?: boolean
  notKeywordTerm?: string
  filtersLength?: number
  openFilters?: () => void
  onChange?: (w: any) => void
  openFiltersContainer?: boolean
  onFilter?: Function
}

const Filters: React.FC<Props> = ({
  notKeywordTerm,
  onFilter,
  mainFilters,
  add = false,
  filtersLength,
  openFilters,
  onChange,
  openFiltersContainer,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isItemOpened, setIsItemOpened] = useState(false)
  const [filterItemId, setFilterItemId] = useState(undefined)
  const filtersRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (!isOpened) {
      setIsItemOpened(false)
      setFilterItemId(undefined)
    }
  }, [!isOpened])

  const closeFilters = () => {
    setIsOpened(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target) &&
        isOpened
      ) {
        setIsOpened(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [filtersRef, isOpened])

  const handleHoverItem = (e, id) => {
    e.stopPropagation()
    setFilterItemId(id)
    setIsItemOpened(true)
  }

  const itemExists = (id) => {
    const item = mainFilters.find((item) => item.id === id)
    return item.active
  }
  const makeOptions = (filterTypes) => {
    const type = filterTypes.map((item) => {
      return { label: item, value: item }
    })
    return type
  }

  return (
    <>
      <div
        ref={filtersRef}
        onClick={() =>
          add || (!add && filtersLength < 1)
            ? setIsOpened(!isOpened)
            : openFilters()
        }
        style={add ? { backgroundColor: '#ECE4F3', color: '#7f4ead' } : {}}
        className={styles.filters}
      >
        {add ? (
          '+ Add'
        ) : (
          <>
            <img src="/img/icon/filters-icon.svg" />
            <span className={styles.filtersText}>Filters</span>
            {filtersLength >= 1 && (
              <>
                <span>
                  :{` `}
                  {filtersLength}
                </span>
                <span className={styles.chevron}>
                  {openFiltersContainer ? <ChevronUp /> : <ChevronDown />}
                </span>
              </>
            )}
          </>
        )}

        {isOpened && (
          <div className={styles.filtersItems}>
            {mainFilters.map((item) => (
              <div key={item.id} className={styles.OptionContainer}>
                <div
                  onMouseOver={(e) =>
                    itemExists(item.id)
                      ? setIsItemOpened(false)
                      : handleHoverItem(e, item.id)
                  }
                  className={`${styles.filtersItem} ${
                    filterItemId === item.id && styles.currentRow
                  } ${itemExists(item.id) && styles.gray}`}
                >
                  {item.header}
                </div>
                {isItemOpened &&
                  filterItemId === item.id &&
                  (item.name.includes('exclude') ? (
                    <FilterPopExclude
                      item={item}
                      onChange={onChange}
                      notKeywordTerm={notKeywordTerm}
                      add={add}
                      onFilter={onFilter}
                      filtersLength={filtersLength}
                      closeFilters={closeFilters}
                    />
                  ) : typeof item?.filterTypes !== 'undefined' ? (
                    item.name == 'checkboxes' ? (
                      <FilterMultipleCheckboxPopUp
                        categories={item?.filterTypes}
                        options={makeOptions(item?.filterTypes)}
                        add={add}
                        onChange={onChange}
                        onClose={closeFilters}
                        filterId={item.id}
                        filterLabel={item.header}
                        filterName={item.name}
                      />
                    ) : (
                      <FilterCheckboxPopUp
                        categories={item?.filterTypes}
                        options={makeOptions(item?.filterTypes)}
                        add={add}
                        onChange={onChange}
                        onClose={closeFilters}
                        filterId={item.id}
                        filterLabel={item.header}
                        filterName={item.name}
                      />
                    )
                  ) : (
                    <FilterPopUp
                      filtersLength={filtersLength}
                      add={add}
                      filterId={item.id}
                      onChange={onChange}
                      onClose={closeFilters}
                      filterLabel={item.header}
                      filterName={item.name}
                    />
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Filters

interface FilterPopExcludeProps {
  notKeywordTerm?: string
  className?: string
  removeItem?: Function
  onChange?: Function
  item?: any
  closeFilters?: Function
  add?: boolean
  initialText?: string
  onFilter?: Function
  filtersLength?: number
}

export const FilterPopExclude: React.FC<FilterPopExcludeProps> = ({
  notKeywordTerm,
  onFilter,
  className,
  filtersLength,
  removeItem,
  onChange,
  item,
  closeFilters,
  add,
  initialText,
}) => {
  const [inputText, setInputText] = useState('')
  const popupRef = useRef<HTMLInputElement>()

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closeFilters()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [popupRef])

  useEffect(() => {
    if (initialText) {
      setInputText(initialText)
    }
  }, [initialText])

  const handleExclude = () => {
    onChange({
      ...item,
      type: 'excludeFilter',
      active: true,
    })
    onFilter('watchlist', 'ascend')
    closeFilters()
  }

  const handleNotKeywordSubmit = () => {
    if (inputText) {
      onChange({
        ...item,
        text: inputText,
        active: true,
      })
    } else {
      onChange({
        ...item,
        text: '',
        active: false,
      })
    }

    closeFilters()
  }

  useEffect(() => {
    if (notKeywordTerm) {
      setInputText(notKeywordTerm)
    }
  }, [notKeywordTerm])

  return (
    <div
      className={`${styles.filtersFilterPop} ${className}`}
      ref={popupRef}
      onClick={(e) => e.stopPropagation()}
      style={add && filtersLength < 4 ? { right: '-130%', left: 'unset' } : {}}
    >
      <div
        style={{ paddingBottom: '0px' }}
        className={styles.filtersFilterPopCheck}
      >
        <RadioButton radioChecked={true} label={item.header} />
      </div>
      <div className={styles.filtersFilterPopInputContainer}>
        {item.name === 'exclude' && (
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={styles.input}
          />
        )}
      </div>
      <div className={styles.filtersFilterPopButtons}>
        <button
          onClick={() => {
            if (item.name !== 'exclude' && item.type === 'excludeFilter') {
              onFilter('', '')
              onChange({
                ...item,
                type: undefined,
                active: false,
              })
            } else if (initialText) {
              removeItem()
            }
            closeFilters()
          }}
          className={styles.filtersFilterPopButtonCancel}
        >
          {initialText || item.type === 'excludeFilter' ? 'Remove' : 'Cancel'}
        </button>
        <button
          onClick={() =>
            item.name === 'exclude' ? handleNotKeywordSubmit() : handleExclude()
          }
          disabled={
            (inputText.length < 1 && item.name === 'exclude') ||
            item.type === 'excludeFilter'
          }
          className={`${styles.filtersFilterPopButtonApply} ${
            ((inputText.length < 1 && item.name === 'exclude') ||
              item.type === 'excludeFilter') &&
            styles.disabled
          }`}
        >
          Apply filter
        </button>
      </div>
    </div>
  )
}
