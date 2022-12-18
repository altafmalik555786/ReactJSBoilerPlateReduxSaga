import React from 'react'
import { Checkbox, CheckboxProps } from '.'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

const DeltaTemplate: React.FC<CheckboxProps> = (args) => <Checkbox {...args} />

export const DefaultCheckbox = DeltaTemplate.bind({})
DefaultCheckbox.args = {
  label: 'Checkbox label',
} as CheckboxProps

export const PreCheckedCheckbox = DeltaTemplate.bind({})
PreCheckedCheckbox.args = {
  label: 'Checkbox label',
  checked: true,
} as CheckboxProps
