export function InvestmentBanner() {
  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(244,123,32,0.12) 0%, rgba(245,208,0,0.10) 50%, rgba(201,184,240,0.14) 100%)',
      borderTop: '1px solid rgba(17,17,17,0.06)',
      borderBottom: '1px solid rgba(17,17,17,0.06)',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      position: 'relative',
      zIndex: 1,
    }}>
      <span style={{
        fontSize: '0.82rem',
        fontWeight: 500,
        color: '#2a2a2a',
        fontFamily: "'Apfel Grotezk', sans-serif",
        letterSpacing: '-0.005em',
      }}>
        <span style={{ fontWeight: 500, color: '#111' }}>Startup Srujan Grant S4</span>
        &nbsp;—&nbsp;<span style={{ color: '#F47B20', fontWeight: 700 }}>backed by IHub</span>
      </span>
    </div>
  )
}
