/* Native React port of the Framer HamburgerMenu component.
   Source: https://framer.com/m/HamburgerMenu-Qm4u.js
   Made with care by Pixelcot — ported into Advaita's stack. */

export default function HamburgerMenu({
  open = false,
  onToggle,
  strokeColor = '#111111',
  strokeWidth = 3,
  size = 36,
  ariaLabel = 'Toggle menu',
}) {
  const handleChange = () => {
    if (onToggle) onToggle(!open)
  }

  return (
    <label
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        width: size,
        height: size,
      }}
    >
      <input
        type="checkbox"
        checked={open}
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-label={ariaLabel}
      />
      <svg
        viewBox="0 0 32 32"
        style={{
          width: '100%',
          height: '100%',
          transform: open ? 'rotate(-45deg)' : 'rotate(0deg)',
          transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <path
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          strokeDasharray={open ? '20 300' : '12 63'}
          strokeDashoffset={open ? -32.42 : 0}
          style={{
            transition:
              'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <path
          d="M7 16 27 16"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          style={{
            transition:
              'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
    </label>
  )
}
