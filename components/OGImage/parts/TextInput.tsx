import type { TextInputProps } from 'types/og-image'

const TextInput = ({ type = 'text', value, onInput }: TextInputProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const handleInput = (e: any) => onInput(e.target.value)

  return (
    <div className='input-outer-wrapper'>
      <div className='input-inner-wrapper'>
        <input type={type} value={value} onInput={handleInput} />
      </div>
    </div>
  )
}

export default TextInput
