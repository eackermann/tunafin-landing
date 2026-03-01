import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const APP_URL = 'https://app.tunafin.io'

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#about', label: 'About' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/research', label: 'Research' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isResearch = location.pathname.startsWith('/research')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl text-slate-800">
            <span><span className="text-teal-600">Tuna</span>Fin</span>
            <img src="/logo.svg" alt="" className="h-8" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isResearchLink = link.href === '/research'
              const isActive = isResearchLink && isResearch
              const linkClass = `transition-colors ${isActive ? 'font-semibold text-teal-600' : 'text-slate-600 hover:text-slate-900'}`
              return isResearchLink ? (
                <Link key={link.href} to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              )
            })}
            <a
              href={APP_URL}
              className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            >
              Login
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isResearchLink = link.href === '/research'
                const isActive = isResearchLink && isResearch
                const linkClass = isActive ? 'font-semibold text-teal-600' : 'text-slate-600 hover:text-slate-900'
                const onClick = () => setMobileOpen(false)
                return isResearchLink ? (
                  <Link key={link.href} to={link.href} className={linkClass} onClick={onClick}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} className={linkClass} onClick={onClick}>
                    {link.label}
                  </a>
                )
              })}
              <a
                href={APP_URL}
                className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 text-center"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
