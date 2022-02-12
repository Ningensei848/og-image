import type { ButtonProps } from 'types/og-image'

const Button = ({ label, onClick }: ButtonProps) => <button onClick={onClick}>{label}</button>

export default Button
