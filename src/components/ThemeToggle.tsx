import { useTheme } from '../theme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="rounded border px-3 py-1 text-sm"
    >
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  )
}
