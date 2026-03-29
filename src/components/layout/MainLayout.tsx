import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Bell, HelpCircle, Upload, Layers, ScanText, Download, Zap, UserCircle2 } from 'lucide-react'

const navSteps = [
  { path: '/', label: 'Upload', icon: Upload },
  { path: '/split', label: 'Split Review', icon: Layers },
  { path: '/ocr', label: 'OCR Processing', icon: ScanText },
  { path: '/download', label: 'Download', icon: Download },
]

export default function MainLayout() {
  const location = useLocation()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP NAVBAR ── */}
      <header style={{
        background: '#ffffff',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#191c1e' }}>Lumina</span>
            <span style={{ color: '#3525cd' }}>&nbsp;PDF</span>
          </div>
          {/* Nav links */}
          <nav style={{ display: 'flex', gap: '24px' }}>
            {['Documents', 'Templates', 'History'].map((label) => (
              <button key={label} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '13.5px', fontWeight: 500, color: '#464555',
                fontFamily: 'inherit', padding: 0,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#191c1e')}
                onMouseLeave={e => (e.currentTarget.style.color = '#464555')}
              >{label}</button>
            ))}
          </nav>
        </div>
        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {[Bell, HelpCircle].map((Icon, i) => (
            <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#8b8fa8', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#191c1e')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8b8fa8')}
            ><Icon size={18} /></button>
          ))}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
            <UserCircle2 size={32} style={{ color: '#191c1e' }} />
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: '220px',
          flexShrink: 0,
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 12px',
          gap: '2px',
        }}>
          {/* Wizard header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 8px 16px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#3525cd,#4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Zap size={13} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#191c1e', letterSpacing: '-0.01em', margin: 0, lineHeight: '1.3' }}>
                Extraction Wizard
              </p>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#8b8fa8', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>
                4-Step Process
              </p>
            </div>
          </div>

          {/* Step links */}
          {navSteps.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path
            return (
              <NavLink
                key={path}
                to={path}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '10px',
                  fontSize: '13.5px', fontWeight: 500,
                  textDecoration: 'none',
                  background: isActive ? '#eeecfd' : 'transparent',
                  color: isActive ? '#3525cd' : '#464555',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f5f5f7' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={15} color={isActive ? '#3525cd' : '#8b8fa8'} />
                <span>{label}</span>
              </NavLink>
            )
          })}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
