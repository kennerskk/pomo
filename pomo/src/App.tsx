import { Routes, Route, Link } from 'react-router-dom'
import Clock from './pages/Clock.tsx'
import Contact from './pages/Contact.tsx'
import './index.css'

function App() {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <div className='nav-container'>
          <Link to="/" className='logo'>POMO</Link>
          <div className='nav-links-container'>
            <div className='nav-buttons'>
              <Link to="/clock" className='nav-links'>Clock</Link>
            </div>
            <div className='nav-buttons'>
              <Link to="/contact" className='nav-links'>Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Clock />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
