import { useEffect, useState } from 'react'

import Field from 'components/OGImage/parts/FieldBase'
import Dropdown from 'components/OGImage/parts/Dropdown'
import TextInput from 'components/OGImage/parts/TextInput'

import type {
  FileType,
  Theme,
  FileTypeFieldProps,
  TextInputFieldProps,
  ThemeFieldProps,
  DropdownOption
} from 'types/og-image'

const themeOptions: DropdownOption[] = [
  { text: 'Light', value: 'light' },
  { text: 'Dark', value: 'dark' }
]

const fileTypeOptions: DropdownOption[] = [
  { text: 'PNG', value: 'png' },
  { text: 'JPEG', value: 'jpeg' }
]

const pattern_vercel =
  /https:\/\/assets\.vercel\.com\/image\/upload\/front\/assets\/design\/vercel-triangle-(white|black)\.svg/i

export const ThemeField = (props: ThemeFieldProps): JSX.Element => {
  const { theme, setTheme, logo, setLogo } = props

  return (
    <Field
      label='Theme'
      input={
        <Dropdown
          options={themeOptions}
          value={theme as string} // "light" | "dark"
          onChange={(val: Theme) => {
            const color = val === 'dark' ? 'white' : 'black'
            setTheme(val)
            if (pattern_vercel.test(logo)) {
              setLogo(`https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-${color}.svg`)
            }
          }}
        />
      }
    />
  )
}

export const FileTypeField = (props: FileTypeFieldProps): JSX.Element => {
  const { fileType, setFileType } = props

  return (
    <Field
      label='File Type'
      input={<Dropdown options={fileTypeOptions} value={fileType} onChange={(val: FileType) => setFileType(val)} />}
    />
  )
}

export const TextInputField = (props: TextInputFieldProps): JSX.Element => {
  const { type, label, state, setState } = props
  const [localValue, setLocalvalue] = useState(state)

  // Debounce Update: cf. https://zenn.dev/luvmini511/articles/4924cc4cf19bc9
  useEffect(() => {
    // delay 後 debounce の対象 state をアップデート
    const timer = setTimeout(() => {
      console.log('onInput ' + localValue)
      setState(localValue)
    }, 650)
    // 次の effect が実行される直前に timer キャンセル
    return () => clearTimeout(timer)
    // value、delay がアップデートするたびに effect 実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue])

  return (
    <Field
      label={label}
      input={
        <TextInput
          type={type}
          value={localValue}
          onInput={(val: string) => {
            setLocalvalue(val)
          }}
        />
      }
    />
  )
}
