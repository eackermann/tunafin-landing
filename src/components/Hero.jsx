const APP_URL = 'https://app.tunafin.io'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.15),transparent)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
            Your portfolio.
            <br />
            <span className="text-teal-600">Fully understood.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl">
            TunaFin is the financial portfolio tracker and trade analysis app that gives you clarity on every position, every trade, and every opportunity.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/25"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
