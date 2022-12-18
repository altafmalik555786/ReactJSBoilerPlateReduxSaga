import React, { useCallback, useEffect, useRef } from 'react'
import { Input, Form } from 'antd'
import { observer } from 'mobx-react-lite'
import styles from '@components/common-components/components/filter-table/input-form.module.scss'
import { CustomButton } from '@commonComponents'

interface State {
  min?: number
  max?: number
}
export interface Props {
  store?: any
  identifier: string
  setPop: () => void
  setModal: () => void
  isOpen: boolean
}
export const InputForm: React.FC<Props> = observer(
  ({ store, identifier, setPop, setModal, isOpen }) => {
    const [form] = Form.useForm<State>()
    const handleFinish = (values: State) => {
      const { min, max } = values
      const parsedMin = min ? Number(min) : 0
      const parsedMax = max ? Number(max) : 0
      let data = { min: parsedMin, max: parsedMax }
      if (parsedMax == 0 && parsedMin == 0) {
        data = null
      }
      store.filters.setFilter(store.filters.active, data)
      setModal()
    }
    const filterRef = useRef(null)
    useEffect(() => {
      const data = store.filters.getFilters(store.filters.active)

      if (data) {
        form.setFieldsValue(data)
      } else {
        form.resetFields()
      }
    }, [store.filters.active, form, store.filters])

    const clickListener = useCallback(
      (e) => {
        if (!filterRef.current?.contains(e.target) && isOpen) {
          setPop()
        }
      },
      [isOpen, setPop]
    )

    useEffect(() => {
      window.addEventListener('mousedown', clickListener)

      return () => {
        window.removeEventListener('mousedown', clickListener)
      }
    }, [clickListener])

    return (
      <div ref={filterRef} className={styles.inputForm}>
        <Form form={form} onFinish={handleFinish}>
          <div className={styles.inputs}>
            <Form.Item label="From" name="min" className={styles.formItem}>
              <Input placeholder="min" type="number" className={styles.input} />
            </Form.Item>

            <Form.Item label="To" name="max" className={styles.formItem}>
              <Input placeholder="max" type="number" className={styles.input} />
            </Form.Item>
          </div>

          <div className={styles.divider} />
          <div className={styles.button}>
            <CustomButton
              size="large"
              onClick={() => {
                store.filters.setFilter(store.filters.active, null)
                store.filters.setActive(identifier)
              }}
              className={styles.cancelBtn}
              type="default"
              title="Cancel"
            ></CustomButton>
            <CustomButton
              size="large"
              className={styles.applyBtn}
              title="Apply"
            ></CustomButton>
          </div>
        </Form>
      </div>
    )
  }
)
