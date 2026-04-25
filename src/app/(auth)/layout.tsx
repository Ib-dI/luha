export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid-light min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--bg-light)' }}
    >
      {children}
    </div>
  )
}
