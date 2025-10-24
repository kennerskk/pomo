import { Routes, Route, Link } from 'react-router-dom'
import Clock from './pages/Clock.tsx'
import Contact from './pages/Contact.tsx'
import './index.css'

function App() {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav>
        <div className='nav-container'>
          <Link to="/" className='logo'>
            <img src="/pomo.svg" alt="pomo Logo" height={ '24px' }  />
          </Link>
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

      {/* Page Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Clock />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className='version-info'>pomo v1.0.0 | S.Khuprachamit & T.Songtalay | 2025</p>
      </footer>
    </div>
  )
}

export default App
