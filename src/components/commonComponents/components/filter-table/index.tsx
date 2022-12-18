import React from 'react'
import { RangeFilter } from './range-filter'
import { observer } from 'mobx-react-lite'
import styles from '@components/common-components/components/filter-table/index.module.scss'

export interface Props {
  store?: any
  identifiers: any
}

export const FilterTable: React.FC<Props> = observer(
  ({ store, identifiers }) => {
    const getQuery = (identifiers) => {
      let query = { min: 0, max: 0 }

      if (store.filters[identifiers] != null) {
        query.min = store.filters[identifiers].min
        query.max = store.filters[identifiers].max
      } else {
        query = null
      }
      return query
    }
    return (
      <div className={styles.filters}>
        {identifiers.length > 0 &&
          identifiers.map((option: string, index: number) => {
            return (
              <RangeFilter
                key={index}
                identifier={option['key']}
                store={store}
                query={getQuery(option['key'])}
                label={`${option['label']}`}
              />
            )
          })}
      </div>
    )
  }
)
