export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid-light ch-box ch-light relative min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--bg-light)' }}
    >
      <span className="ch ch-tl" />
      <span className="ch ch-tr" />
      <span className="ch ch-bl" />
      <span className="ch ch-br" />
      {children}
    </div>
  )
}
