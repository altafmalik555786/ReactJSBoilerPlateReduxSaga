import React from 'react'
import { Textarea, TextareaProps } from './input'

export default {
  title: 'Form textarea',
  component: Textarea,
}

const DeltaTemplate: React.FC<TextareaProps> = (args) => <Textarea {...args} />

export const Default = DeltaTemplate.bind({})
Default.args = {
  style: { maxWidth: '200px' },
} as TextareaProps
