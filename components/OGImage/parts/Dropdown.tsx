import type { ChangeEvent } from 'react'
import type { DropdownProps } from 'types/og-image'

const Dropdown = ({ options, value, onChange, small }: DropdownProps) => {
  const wrapper = small ? 'select-wrapper small' : 'select-wrapper'
  const arrow = small ? 'select-arrow small' : 'select-arrow'

  return (
    <div className={wrapper}>
      <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}>
        {options.map((o, idx) => (
          <option key={`${idx}-${o.value}`} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
      <div className={arrow}>▼</div>
    </div>
  )
}

export default Dropdown
