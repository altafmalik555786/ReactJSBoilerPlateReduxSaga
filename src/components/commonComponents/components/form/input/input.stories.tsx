import React from 'react'
import { Input, InputProps } from './input'

export default {
  title: 'Form input',
  component: Input,
}

const DeltaTemplate: React.FC<InputProps> = (args) => <Input {...args} />

export const Default = DeltaTemplate.bind({})
Default.args = {
  style: { maxWidth: '200px' },
} as InputProps
