import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import ResearchIndex from './pages/ResearchIndex'
import SilverMiners from './pages/SilverMiners'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <About />
              <Pricing />
              <Footer />
            </>
          } />
          <Route path="/research" element={<ResearchIndex />} />
          <Route path="/research/silver-miners" element={<SilverMiners />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
