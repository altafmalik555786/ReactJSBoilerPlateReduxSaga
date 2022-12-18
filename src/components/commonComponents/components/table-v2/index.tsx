import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Table as AntdTable } from 'antd'
import styled from 'styled-components'
import { BaseApi } from '@api/baseApi'
import { AxiosResponse } from 'axios'
import { usePrevious } from '@utils/hooks/usePrevious'
import { getAuthorizationHeader } from '@api/common-utils'
import { Pagination } from '../pagination'
import { SorterResult } from 'antd/lib/table/interface'
import { ColumnType, TableProps } from 'antd/lib/table'
import { SkeletonHorizontalLoaderGray } from '../skeleton/horizontal-loader'
import { toSnakeCase } from '@utils/string'

interface Filter {
  key: string
  displayText: string
  isTypeFilter?: string[]
}

interface Props extends TableProps<any> {
  dataUrl: string
  filters?: Filter[]
  className?: string
  responseDataParam?: string
  responseCountParam?: string
  columns: ColumnType<any>[]
}

interface Params {
  // eslint-disable-next-line camelcase
  page_size: number
  page: number
  ordering: string
  search: string
  type?: string
}

export const Table = forwardRef(
  (
    {
      dataUrl,
      filters,
      className,
      responseDataParam = '',
      responseCountParam = '',
      columns,
      ...props
    }: Props,
    ref
  ) => {
    interface TableResponse {
      results: any[]
      responseDataParam: any[]
      responseCountParam: number
      count: number
      isCancel?: boolean
    }
    const defaultParams = {
      page_size: 10,
      page: 1,
      ordering: '',
      search: '',
      type: '',
    }
    const sortedColumns = columns.find((e) => e.defaultSortOrder)
    if (sortedColumns && sortedColumns['sortField']) {
      const sortOrder = sortedColumns.defaultSortOrder === 'descend' ? '-' : ''
      defaultParams['ordering'] = `${sortOrder}${sortedColumns['sortField']}`
    }

    const [dataSource, setDataSource] = useState<any>([
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(1)
    const [params, setParams] = useState<Params>(defaultParams)
    // Initialize baseApi class with ref to avoid multiple instances on re-render;
    const baseApi = useRef(new BaseApi())

    const prevDataUrl = usePrevious(dataUrl)

    const generateLoadingColumns = () => {
      return columns.map((column) => {
        return {
          ...column,
          render: () => {
            return (
              <div style={{ width: column.width }}>
                <SkeletonHorizontalLoaderGray
                  lightLoader
                  width={
                    (column.width as number) - (column.width as number) * 0.35
                  }
                  height="auto"
                  skeletonHeight="10px"
                  align={column.align}
                />
              </div>
            )
          },
        }
      })
    }

    const fetch = async () => {
      try {
        setLoading(true)
        const { data }: AxiosResponse<TableResponse> =
          await baseApi.current.axios.get(dataUrl, {
            params: { ...params },
            headers: { Authorization: await getAuthorizationHeader() },
            cancelToken: baseApi.current.cancelToken,
          })

        if (data.isCancel) return
        setDataSource(
          responseDataParam ? data[responseDataParam] : data.results
        )
        setTotal(responseCountParam ? data[responseCountParam] : data.count)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    const handlePaginationChange = (page, pageSize) => {
      setParams({ ...params, page, page_size: pageSize })
    }

    const handleTableChange = (
      pagination,
      filters,
      sorter: SorterResult<any> | SorterResult<any>[]
    ) => {
      const { columnKey, order } = sorter as SorterResult<any>
      if (order === 'ascend') {
        setParams({ ...params, ordering: toSnakeCase(columnKey as string) })
      } else if (order === 'descend') {
        setParams({
          ...params,
          ordering: `-${toSnakeCase(columnKey as string)}`,
        })
      } else {
        setParams({ ...params, ordering: '' })
      }
    }

    useEffect(() => {
      if (prevDataUrl !== dataUrl) {
        setParams({ ...params, page: 1 })
      }
      fetch()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, dataUrl])

    useImperativeHandle(ref, () => ({
      reloadTable() {
        if (prevDataUrl !== dataUrl) {
          setParams({ ...params, page: 1 })
        }
        fetch()
      },
      getResults() {
        if (dataSource?.length) {
          return dataSource
        }
      },
    }))

    return (
      <Wrapper className={className}>
        <AntdTableStyled
          dataSource={dataSource}
          columns={loading ? generateLoadingColumns() : columns}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ x: 'auto' }}
          {...props}
        ></AntdTableStyled>
        <PaginationStyled
          onChange={handlePaginationChange}
          total={total}
          pageSize={params['page_size']}
          current={params['page']}
        />
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  background-color: #fff;
  padding: 10px;

  .common-component-input {
    background-color: #fff !important;
    &::placeholder {
      background-color: #fff !important;
    }
  }
`

const AntdTableStyled = styled(AntdTable)`
  .ant-table-column-title {
    font-weight: 600;
    font-size: 12px;
  }

  .ant-table-thead {
    background: #f7f7f7;
    border-radius: 8px;
  }

   {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .ant-table-container table > thead > tr:last-child th:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .ant-table-column-sorters {
    display: inline-flex !important;
    ::before {
      width: 0;
    }
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td,
  .ant-table tfoot > tr > th,
  .ant-table tfoot > tr > td {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

  .ant-table-tbody > tr:last-child td {
    border-bottom: transparent !important;
    margin-right: 0 !important;
  }

  .ant-table-tbody > tr:first-child td {
    border-top: transparent !important;
  }
  .ant-table-container table > tbody > tr > td {
    height: 60px;
    padding: 5px 15px !important;
    border-bottom: 1px solid #f4f4f4;
    margin: 0 25px !important;
  }

  .ant-table-container table > tbody > tr > td:hover {
    //  border-radius:8px;
  }

  .ant-table-container table > tbody > tr:nth-child(2) td {
    padding-top: 30px;
    padding-bottom: 10px;
    margin-left: 0 !important;
  }

  .ant-table-container table > tbody > tr:nth-child(1) td {
    border-bottom: transparent !important;
  }

  .ant-table-container table > tbody > tr td:first-child {
    margin: 0 5px;
    font-size: 12px !important;
    padding-left: 5px !important;
  }

  .ant-table-column-sorter {
    margin-left: 5px;
  }
`

const PaginationStyled = styled(Pagination)`
  padding: 20px 25px;
  text-align: right;
  margin-top: 10px;
  border-top: 1px solid #e8e8e8 !important;

  .ant-pagination-item {
    min-width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-prev {
    width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-next {
    width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-disabled {
    min-width: 25px !important;
    height: 25px !important;
  }
  .ant-pagination-item-link span svg {
    display: flex;
    margin-bottom: 2px;
    align-items: center;
    justify-content: center;
  }
  .ant-pagination-prev {
    min-width: 25px !important;
    max-height: 25px !important;
  }
  .ant-pagination-next {
    min-width: 25px !important;
    max-height: 25px !important;
  }
  .ant-pagination-options {
    height: 25px;
  }
  .ant-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    margin-right: 15px;
  }
`
