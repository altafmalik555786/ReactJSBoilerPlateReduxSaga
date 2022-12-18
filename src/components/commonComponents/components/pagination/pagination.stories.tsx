import React from 'react'
import { Pagination, PaginationProps } from '.'

export default {
  title: 'Pagination',
  component: Pagination,
}

const Template: React.FC<PaginationProps> = (args) => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {
  onChange: (e) => {
    // eslint-disable-next-line no-console
  },
  total: 120,
  pageSize: 12,
  current: 5,
  defaultPageSize: 20,
  pageSizeOptions: ['20', '50', '100'],
  defaultCurrent: 5,
  showQuickJumper: false,
} as PaginationProps
