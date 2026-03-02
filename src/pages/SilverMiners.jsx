import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import Footer from '../components/Footer'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const deficitChartData = {
  labels: ['2021', '2022', '2023', '2024 (Est)', '2025 (Proj)'],
  datasets: [
    {
      label: 'Global Supply',
      data: [998, 1004, 1011, 1005, 1010],
      backgroundColor: '#cbd5e1',
      borderRadius: 4,
    },
    {
      label: 'Total Demand',
      data: [1050, 1242, 1195, 1219, 1250],
      backgroundColor: '#0f172a',
      borderRadius: 4,
    },
  ],
}

const leverageChartData = {
  labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
  datasets: [
    {
      label: 'Silver Spot Price (%)',
      data: [0, 5, 12, 18, 25, 30],
      borderColor: '#94a3b8',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: 'Miner Equities (SILJ) (%)',
      data: [0, 8, 25, 40, 65, 85],
      borderColor: '#3b82f6',
      borderWidth: 3,
      tension: 0.4,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
    },
  ],
}

const portfolios = {
  1: {
    label: 'Conservative (Safety First)',
    desc: 'Focuses heavily on streamers (WPM) to eliminate mining operational risk, with broad ETF exposure for stability.',
    data: [60, 30, 0, 10, 0],
    labels: ['WPM (Streamer)', 'SIL (Large ETF)', 'SILJ (Junior ETF)', 'HL (US Miner)', 'PAAS (Diversified)'],
    colors: ['#34d399', '#94a3b8', '#3b82f6', '#818cf8', '#cbd5e1'],
  },
  2: {
    label: 'Balanced (Core & Satellite)',
    desc: 'A solid mix. Uses SIL as the core holding, anchors with WPM for safety, and adds HL and PAAS for direct production leverage.',
    data: [30, 40, 10, 10, 10],
    labels: ['WPM (Streamer)', 'SIL (Large ETF)', 'SILJ (Junior ETF)', 'HL (US Miner)', 'PAAS (Diversified)'],
    colors: ['#34d399', '#94a3b8', '#3b82f6', '#818cf8', '#cbd5e1'],
  },
  3: {
    label: 'Aggressive (Max Leverage)',
    desc: 'Heavily weighted towards the Junior ETF (SILJ) and individual producers to maximize percentage gains during a physical silver squeeze.',
    data: [10, 10, 40, 20, 20],
    labels: ['WPM (Streamer)', 'SIL (Large ETF)', 'SILJ (Junior ETF)', 'HL (US Miner)', 'PAAS (Diversified)'],
    colors: ['#34d399', '#94a3b8', '#3b82f6', '#818cf8', '#cbd5e1'],
  },
}

const chartOptions = {
  deficit: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 4,
      },
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 800,
        title: { display: true, text: 'Millions of Ounces (Moz)' },
        grid: { color: '#f1f5f9' },
      },
      x: { grid: { display: false } },
    },
  },
  leverage: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: +${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: 'Percentage Gain' },
        grid: { color: '#f1f5f9' },
      },
      x: { grid: { display: false } },
    },
  },
}

export default function SilverMiners() {
  const [activeTab, setActiveTab] = useState('panel-paper')
  const [riskLevel, setRiskLevel] = useState(2)

  const portfolio = portfolios[riskLevel]
  const allocationChartData = useMemo(
    () => ({
      labels: portfolio.labels,
      datasets: [
        {
          data: portfolio.data,
          backgroundColor: portfolio.colors,
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    }),
    [riskLevel]
  )

  const allocationOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      color: '#fff',
      cutout: '70%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#cbd5e1', padding: 15, font: { size: 12 } },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
          },
        },
      },
    }),
    []
  )

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Silver sticky nav - sticks below TunaFin header (top-16 = 64px) */}
      <nav className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-slate-800">Research Article</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#macro" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                The Setup
              </a>
              <a href="#vehicles" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Vehicle Analysis
              </a>
              <a href="#etfs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                ETF Solutions
              </a>
              <a href="#equities" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Top Producers
              </a>
              <a
                href="#allocation"
                className="text-sm font-medium text-white bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
              >
                Build Portfolio
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Capturing the Silver Breakout
            <br />
            <span className="text-slate-400 font-light">Without the Burden of Physical Silver</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed">
            Geopolitical instability, structural supply deficits, and surging industrial demand have primed silver for a
            historic run. For investors avoiding physical metal and wary of &quot;paper silver&quot; decoupling, premium
            miners and streamers offer the optimal blend of leverage, security, and tangibility.
          </p>
          <a
            href="https://ninerec.substack.com/p/the-structural-realignment-of-the"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium transition-colors"
          >
            Read the full in-depth article on Substack
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        {/* Section 1: Macro Setup */}
        <section id="macro" className="scroll-mt-32">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Macro Setup: A Structural Deficit</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              This is our core premise: that silver is not just a monetary metal; it is a critical industrial
              component (solar photovoltaics, EVs, electronics). We are currently experiencing severe consecutive years
              of structural supply deficits. Comex inventories are depleting because industrial users are taking physical
              delivery, increasing the risk of &quot;paper&quot; derivatives breaking down.
            </p>
          </div>
          <div className="relative w-full max-w-[800px] mx-auto h-[350px] md:h-[400px] bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <Bar data={deficitChartData} options={chartOptions.deficit} />
          </div>
          <p className="text-sm text-center text-slate-500 mt-4 italic">
            Estimated Global Silver Supply vs. Demand (Millions of Ounces). Notice the widening gap.
          </p>
        </section>

        {/* Section 2: Vehicle Analysis */}
        <section id="vehicles" className="scroll-mt-32 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Decoupling Dilemma: Choosing Your Vehicle</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              There is growing risk in ETFs like SLV. In a severe stress event where physical silver is
              hoarded, &quot;paper&quot; claims may settle in cash at an artificially suppressed spot price, rather than
              delivering the actual metal&apos;s value. Here we compare the three primary ways to play the market,
              demonstrating why equities (miners) are the optimal choice.
            </p>
          </div>

          <div className="border-b border-slate-200 mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              {[
                { id: 'panel-paper', label: '"Paper" ETFs (SLV)' },
                { id: 'panel-physical', label: 'Physical Bullion' },
                { id: 'panel-miners', label: 'Premium Miners' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 text-base focus:outline-none ${
                    activeTab === tab.id
                      ? 'border-b-2 border-slate-700 text-slate-900 font-semibold'
                      : 'border-b-2 border-transparent text-slate-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'panel-paper' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">The &quot;Paper&quot; Illusion</h3>
                <p className="text-slate-600 mb-4">
                  ETFs like SLV track the price of silver using derivatives and custodian vaults. While highly liquid,
                  they carry profound counterparty risk.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">✕</span>{' '}
                    <strong>Decoupling Risk:</strong> If physical supply freezes, paper prices may be capped or
                    cash-settled forcefully.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">✕</span>{' '}
                    <strong>No Real Claim:</strong> Retail investors cannot realistically take physical delivery from
                    these funds.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>{' '}
                    <strong>Liquidity:</strong> Extremely easy to buy and sell instantly.
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg text-center border border-slate-200">
                <div className="text-4xl mb-2">📄</div>
                <div className="font-semibold text-slate-700">Verdict: High Systemic Risk</div>
                <div className="text-sm text-slate-500 mt-2">Unsuitable for the geopolitical/shortage thesis.</div>
              </div>
            </div>
          )}

          {activeTab === 'panel-physical' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">The Heavy Reality</h3>
                <p className="text-slate-600 mb-4">
                  Owning coins or bars outright removes all counterparty risk, but introduces massive logistical
                  hurdles.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>{' '}
                    <strong>Zero Counterparty Risk:</strong> You hold it, you own it. Immune to financial system
                    collapse.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">✕</span>{' '}
                    <strong>Premiums &amp; Storage:</strong> Buying physical often requires paying 10-30% over spot
                    price, plus safe storage costs.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">✕</span>{' '}
                    <strong>Illiquidity:</strong> Hard to sell quickly for full value during normal times.
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg text-center border border-slate-200">
                <div className="text-4xl mb-2">🪙</div>
                <div className="font-semibold text-slate-700">Verdict: Too Cumbersome</div>
                <div className="text-sm text-slate-500 mt-2">We prefer to avoid physical ownership.</div>
              </div>
            </div>
          )}

          {activeTab === 'panel-miners' && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">The Tangible Leverage</h3>
                <p className="text-slate-600 mb-4">
                  Miners own silver in the ground. If paper decouples, the physical silver they pull from the earth will
                  be sold at the true physical premium price, directly benefiting shareholders.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>{' '}
                    <strong>Physical Pricing:</strong> Revenue is based on selling real metal, capturing physical
                    premiums.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">✓</span>{' '}
                    <strong>Leverage:</strong> If silver goes up 20%, miner profit margins can double, causing the stock
                    to vastly outperform the metal.
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">✕</span>{' '}
                    <strong>Operational Risk:</strong> Jurisdictional issues, cost
                    inflation, and management errors.{' '}
                    <em className="text-sm block mt-1">(We mitigate this in the next sections).</em>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg text-center border border-slate-200 shadow-inner">
                <div className="text-4xl mb-2">⛏️</div>
                <div className="font-semibold text-slate-900">Verdict: The Optimal Play</div>
                <div className="text-sm text-slate-600 mt-2">Provides physical upside without the physical burden.</div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: ETFs */}
        <section id="etfs" className="scroll-mt-32">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Broad Exposure: Miner ETFs</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              To mitigate single-company risk (mine collapses, local government expropriations), ETFs offer a basket of
              miners. By spreading capital across North America, South America, and Australia, geopolitical risk is
              diluted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">SIL</h3>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Global X Silver Miners ETF
                  </p>
                </div>
                <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-1 rounded">Large Cap</span>
              </div>
              <p className="text-slate-600 mb-4 text-sm">
                The most established silver miner ETF. It holds the largest, most financially stable producers globally.
                Less volatile, but slightly lower leverage to explosive price action.
              </p>
              <div className="space-y-2 text-sm text-slate-700 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Top Holdings:</span> <span className="font-medium">Wheaton, Pan American</span>
                </div>
                <div className="flex justify-between">
                  <span>Jurisdiction Risk:</span> <span className="font-medium text-green-600">Low-to-Medium</span>
                </div>
                <div className="flex justify-between">
                  <span>Yield:</span> <span className="font-medium">~1.5%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">SILJ</h3>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Amplify Junior Silver Miners
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Mid/Small Cap</span>
              </div>
              <p className="text-slate-600 mb-4 text-sm">
                Focuses on mid-tier producers and developers. These companies have higher costs, meaning when silver
                prices rise above their cost basis, their profitability explodes. Higher risk, higher reward.
              </p>
              <div className="space-y-2 text-sm text-slate-700 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Top Holdings:</span> <span className="font-medium">Hecla, First Majestic</span>
                </div>
                <div className="flex justify-between">
                  <span>Jurisdiction Risk:</span> <span className="font-medium text-yellow-600">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span>Leverage to Silver:</span> <span className="font-medium text-blue-600">Very High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-center font-semibold text-slate-800 mb-2">
              The Leverage Effect (Hypothetical Bull Run)
            </h4>
            <p className="text-center text-xs text-slate-500 mb-4">
              Miners typically outperform the metal 2x to 3x during rapid price appreciations due to margin expansion.
            </p>
            <div className="relative w-full max-w-[800px] mx-auto h-[300px] bg-white">
              <Line data={leverageChartData} options={chartOptions.leverage} />
            </div>
          </div>
        </section>

        {/* Section 4: Individual Equities */}
        <section id="equities" className="scroll-mt-32">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Producer Profiles</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              For direct investment, you requested companies that are <strong>not speculative</strong>, are{' '}
              <strong>actively pulling silver out of the ground</strong>, and have{' '}
              <strong>safe jurisdictions</strong> to avoid export restrictions. Here are the top three actionable picks.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-l-4 border-slate-800 rounded-r-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50 transition-colors">
              <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">WPM</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Wheaton Precious Metals
                </div>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-2">
                  The Ultimate Safety Play
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-lg font-bold text-slate-800 mb-2">Why it fits our thesis:</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Wheaton is a <strong>streaming company</strong>, not a miner. They don&apos;t operate mines. They
                  provide upfront capital to miners in exchange for the right to buy future silver at a fixed, deeply
                  discounted price (e.g., $5/oz). If inflation drives costs up, Wheaton doesn&apos;t care—their cost is
                  fixed. They get the pure upside of the silver price with virtually zero operational or inflation risk.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Business Model:</span>{' '}
                    <span className="font-medium text-slate-800">Streaming (Fixed Cost)</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Jurisdiction Risk:</span>{' '}
                    <span className="font-medium text-green-600">Extremely Low (Diversified globally)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-blue-500 rounded-r-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50 transition-colors">
              <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">HL</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Hecla Mining</div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-2">
                  Top Tier Jurisdiction
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-lg font-bold text-slate-800 mb-2">Why it fits our thesis:</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Hecla is the largest primary silver producer in the <strong>United States</strong>. Their flagship
                  Greens Creek mine in Alaska is one of the highest-grade and lowest-cost silver mines in the world.
                  Because they operate predominantly in North America, the risk of &quot;Zimbabwe-style&quot; export
                  restrictions is effectively zero.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Status:</span>{' '}
                    <span className="font-medium text-slate-800">Active Producer</span>
                  </div>
                  <div>
                    <span className="text-slate-500">AISC (Cost):</span>{' '}
                    <span className="font-medium text-slate-800">Very Low (~$10-12/oz)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-slate-400 rounded-r-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50 transition-colors">
              <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">PAAS</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Pan American Silver
                </div>
                <div className="inline-block px-3 py-1 bg-slate-200 text-slate-800 text-xs font-bold rounded-full mb-2">
                  Diversified Scale
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className="text-lg font-bold text-slate-800 mb-2">Why it fits our thesis:</h4>
                <p className="text-slate-600 text-sm mb-4">
                  A massive, actively producing operator across the Americas (Canada, Mexico, Peru, etc.). By having many
                  producing mines, they dilute the risk of any single geopolitical event or mine collapse. They offer
                  massive torque to the silver price due to their sheer volume of production.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Status:</span>{' '}
                    <span className="font-medium text-slate-800">Major Producer</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Jurisdiction Risk:</span>{' '}
                    <span className="font-medium text-yellow-600">Moderate (LatAm exposure)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Allocation Builder */}
        <section id="allocation" className="scroll-mt-32 bg-slate-900 text-white p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Actionable Portfolio Builder</h2>
            <p className="text-slate-300 max-w-2xl">
              Adjust the slider below based on your risk tolerance. The chart will instantly calculate a suggested
              portfolio allocation blending safety, broad exposure, and leverage, strictly using the vetted instruments
              above.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <label htmlFor="riskSlider" className="block text-sm font-medium text-slate-300 mb-4">
                Investment Profile: <span className="text-white font-bold text-lg ml-2">{portfolio.label}</span>
              </label>
              <input
                type="range"
                id="riskSlider"
                min="1"
                max="3"
                value={riskLevel}
                onChange={(e) => setRiskLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mb-8"
              />

              <div className="space-y-4">
                <p className="text-slate-300 mb-4">{portfolio.desc}</p>
                <ul className="space-y-2">
                  {portfolio.labels.map((label, index) =>
                    portfolio.data[index] > 0 ? (
                      <li
                        key={label}
                        className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-slate-700"
                      >
                        <span className="font-medium text-slate-200">{label}</span>
                        <span className="text-white font-bold">{portfolio.data[index]}%</span>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>

            <div className="max-h-[300px] w-full max-w-[400px] mx-auto">
              <Doughnut data={allocationChartData} options={allocationOptions} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
