import React from 'react'
import { Table, TableProps, DataSourceProp } from '.'
import { ColumnType } from 'antd/es/table'

export default {
  title: 'Table',
  component: Table,
}

const Template: React.FC<TableProps> = (args) => <Table {...args} />

interface ItemType {
  linkingUrl: string
  targetDaRange: string
}

const tableConfig: ColumnType<any>[] = [
  {
    title: 'ARTICLE TITLE',
    dataIndex: 'article_title',
    key: 'article_title',
    width: 125,
    sorter: true,
    render: (_: number, item: ItemType) => {
      return <div>{item.linkingUrl}</div>
    },
  },
  {
    title: 'DA RANGE',
    dataIndex: 'target_da_range',
    key: 'target_da_range',
    width: 50,
    sorter: true,
    render: (_: number, item: ItemType) => {
      return item.targetDaRange
    },
  },
]

const tableDataSource: DataSourceProp<any>['data'] = [
  { linkingUrl: 'linkgraph.io', targetDaRange: '20-30' },
  { linkingUrl: 'linkgraph2.io', targetDaRange: '10-20' },
  { linkingUrl: 'linkgraph3.io', targetDaRange: '40-50' },
  { linkingUrl: 'linkgraph4.io', targetDaRange: '50-30' },
  { linkingUrl: 'linkgraph5.io', targetDaRange: '60-70' },
  { linkingUrl: 'linkgraph6.io', targetDaRange: '20-30' },
  { linkingUrl: 'linkgraph7.io', targetDaRange: '30-40' },
  { linkingUrl: 'linkgraph8.io', targetDaRange: '40-50' },
  { linkingUrl: 'linkgraph9.io', targetDaRange: '10-90' },
  { linkingUrl: 'linkgraph10.io', targetDaRange: '20-30' },
]

export const Default = Template.bind({})
Default.args = {
  pagination: false,
  columns: tableConfig,
  dataSource: tableDataSource,
  loading: false,
} as TableProps

export const Loading = Template.bind({})
Loading.args = {
  pagination: false,
  columns: tableConfig,
  dataSource: tableDataSource,
  loading: true,
} as TableProps
