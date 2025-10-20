import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import useReducedMotion from './hooks/useReducedMotion'
import Home from './pages/Home'
import Docs from './pages/Docs'
import SJson from './pages/SJson'
import Aion from './pages/Aion'
import Beta from './pages/Beta'
import Adoption from './pages/Adoption'
import About from './pages/About'
import Licensing from './pages/Licensing'
import Patent from './pages/Patent'
import Press from './pages/Press'
import Privacy from './pages/Privacy'
import Roadmap from './pages/Roadmap'
import Terms from './pages/Terms'
import Trademark from './pages/Trademark'

function App() {
  useReducedMotion()
  
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/sjson" element={<SJson />} />
          <Route path="/aion" element={<Aion />} />
          <Route path="/beta" element={<Beta />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/about" element={<About />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="/patent" element={<Patent />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/trademark" element={<Trademark />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
