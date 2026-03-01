const APP_URL = 'https://app.tunafin.io'

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#about', label: 'About' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/research', label: 'Research' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="/" className="flex items-center gap-2 font-semibold text-xl text-white">
            <span><span className="text-teal-400">Tuna</span>Fin</span>
            <img src="/logo.svg" alt="" className="h-8" />
          </a>
          <div className="flex flex-wrap justify-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={APP_URL}
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
            >
              Login
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {year} TunaFin. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
