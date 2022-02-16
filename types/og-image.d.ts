import { Dispatch, ReactNode, SetStateAction } from 'react'

export type FileType = 'png' | 'jpeg'
export type Theme = 'light' | 'dark'

export interface ParsedRequest {
  fileType: FileType
  theme: Theme
  timestamp: string
  title: string
  tags: string[]
  copyright: string
  logo: string
  avater: string
  author: string
  aka: string
  site: string
}

export interface DropdownOption {
  text: string
  value: string
}

export interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (val: string) => void
  small?: boolean
}

export interface TextInputProps {
  type?: string
  value: string
  onInput: (val: string) => void
}

export interface ButtonProps {
  label: string
  onClick: (e: unknown) => void
}

export interface FieldProps {
  label: string
  input: ReactNode
}

export interface ThemeFieldProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  logo: string
  setLogo: Dispatch<SetStateAction<string>>
}

export interface FileTypeFieldProps {
  fileType: FileType
  setFileType: Dispatch<SetStateAction<string>>
}

export interface TextInputFieldProps {
  label: string
  type?: string
  state: string
  setState: Dispatch<SetStateAction<string>>
}

export interface ImagePreviewProps {
  src: string
  onClick: (e: unknown) => void
  setToast: Dispatch<
    SetStateAction<{
      show: boolean
      message: string
    }>
  >
}

export interface AuthorProps {
  avater: string
  author: string
  aka: string
}
