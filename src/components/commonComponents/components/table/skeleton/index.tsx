import React from 'react'
import { Table as TableAntd } from 'antd'
import cloneDeep from 'lodash/cloneDeep'
import {
  SkeletonHorizontalLoaderGray,
  SkeletonHorizontalLoader,
} from '@commonComponents'

export interface TableSkeletonProps {
  style: React.CSSProperties
  tableProps: any
  loadingRows: number
  isGrayLoader: boolean
  loaderClassName?: string
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  style,
  tableProps,
  loadingRows,
  isGrayLoader,
  loaderClassName,
}) => {
  const columns = cloneDeep(tableProps) // copy without reference, so we can change it.

  if (!columns) return <></>

  const dataSource = []
  for (let i = 0; i < loadingRows; i++) {
    dataSource.push(
      columns.reduce((result, column) => {
        result[column.key] = isGrayLoader ? (
          <SkeletonHorizontalLoaderGray
            containerClassName={loaderClassName}
            lightLoader
            width={i % 2 == 0 ? '45px' : '55px'}
            height="10px"
            skeletonHeight="10px"
            align={column.skeletonAlign ? column.skeletonAlign : 'left'}
          />
        ) : (
          <SkeletonHorizontalLoader
            width="45px"
            height="10px"
            align={column.skeletonAlign ? column.skeletonAlign : 'left'}
          />
        )
        return result
      }, {})
    )
  }

  const newColumns = columns.map((col) => {
    delete col['render']
    return col
  })

  const newTableProps = Object.assign({}, tableProps, {
    dataSource,
    loading: false,
  })
  newTableProps.columns = newColumns

  return <TableAntd style={style} rowKey="key" {...newTableProps} />
}
