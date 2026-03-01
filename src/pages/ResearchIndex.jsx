import { Link } from 'react-router-dom'

const researchEntries = [
  {
    title: 'Silver Equities: Navigating the Breakout',
    href: '/research/silver-miners',
    badges: ['silver', 'slv'],
    date: null, // null = today; use Date or 'YYYY-MM-DD' string for fixed dates
  },
]

function formatDate(d) {
  if (d === null) return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  if (typeof d === 'string') return d
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDateISO(d) {
  if (d === null) return new Date().toISOString().split('T')[0]
  if (typeof d === 'string') return d
  return d.toISOString().split('T')[0]
}

export default function ResearchIndex() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Research & Investment Theses</h1>
        <p className="text-slate-600 mb-12">
          Free research articles and investment theses from the TunaFin team.
        </p>

        <ul className="space-y-8">
          {researchEntries.map((entry) => (
            <li key={entry.href} className="border-b border-slate-200 pb-8 last:border-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <time className="text-sm text-slate-500" dateTime={formatDateISO(entry.date)}>
                  {formatDate(entry.date)}
                </time>
                {entry.badges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <Link
                to={entry.href}
                className="text-lg font-semibold text-slate-900 hover:text-teal-600 transition-colors"
              >
                {entry.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
