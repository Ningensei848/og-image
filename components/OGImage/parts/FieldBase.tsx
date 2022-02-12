import type { FieldProps } from 'types/og-image'

const FieldBase = ({ label, input }: FieldProps) => (
  <div className='field'>
    <label>
      <div className='field-label'>{label}</div>
      <div className='field-value'>{input}</div>
    </label>
  </div>
)

export default FieldBase
