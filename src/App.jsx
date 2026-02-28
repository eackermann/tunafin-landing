import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <Features />
        <About />
        <Pricing />
        <Footer />
      </main>
    </div>
  )
}

export default App
