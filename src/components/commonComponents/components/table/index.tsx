import React from 'react'
import classnames from 'classnames'
import { Table as TableAntd } from 'antd'
import { TableProps as TablePropsAntd } from 'antd/es/table'
import { TableProps as DataSourceProp } from 'rc-table/lib/Table'
import styles from './style.module.scss'
import { observer } from 'mobx-react-lite'
import { TableSkeleton } from './skeleton'

const customBreak: React.CSSProperties = {
  wordBreak: 'break-word',
}

export type { DataSourceProp }

export interface TableProps extends TablePropsAntd<any> {
  loadingRows?: number
  containerClassName?: string
  rowClass?: any
  loading?: boolean
  grayLoader?: boolean
  isEmpty?: boolean
  loaderClassName?: string
}

export const Table: React.FC<TableProps> = observer(
  ({
    loadingRows = 6,
    loading = false,
    grayLoader = false,
    isEmpty,
    containerClassName,
    rowClass,
    loaderClassName,
    ...props
  }: TableProps) => {
    return (
      <div
        className={classnames(styles.table, {
          [styles.rounded]: isEmpty,
          [containerClassName]: containerClassName,
        })}
      >
        {loading ? (
          <TableSkeleton
            isGrayLoader
            style={customBreak}
            tableProps={props}
            loadingRows={loadingRows}
            loaderClassName={loaderClassName}
          />
        ) : (
          <TableAntd
            rowClassName={rowClass}
            className={styles.tableInner}
            style={customBreak}
            {...props}
          />
        )}
      </div>
    )
  }
)
