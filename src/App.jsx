import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import Home      from './pages/Home'
import Modules   from './pages/Modules'
import Theory    from './pages/Theory'
import Quiz      from './pages/Quiz'
import Exercises from './pages/Exercises'
import Thesis    from './pages/Thesis'
import Resources from './pages/Resources'
import Guide     from './pages/Guide'
import Contact   from './pages/Contact'
import Topology  from './pages/Topology'

const NAV = [
  { to:'/',          label:'Tổng quan'    },
  { to:'/theory',    label:'Lý thuyết'    },
  { to:'/modules',   label:'Modules & Lab'},
  { to:'/topology',  label:'Topology'     },
  { to:'/quiz',      label:'Trắc nghiệm'  },
  { to:'/exercises', label:'Bài tập'      },
  { to:'/thesis',    label:'Đề tài'       },
  { to:'/resources', label:'Tài liệu'     },
  { to:'/guide',     label:'Hướng dẫn'    },
  { to:'/contact',   label:'Liên hệ GV'   },
]

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return m
}

function Sidebar({ open, onClose }) {
  const loc  = useLocation()
  const mob  = useIsMobile()
  // Close on navigate
  const prev = useRef(loc.pathname)
  useEffect(() => {
    if (prev.current !== loc.pathname) { prev.current = loc.pathname; onClose() }
  }, [loc.pathname])

  return (
    <>
      {/* Overlay */}
      {open && mob && (
        <div className="overlay" onClick={onClose}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,.62)',zIndex:98,backdropFilter:'blur(2px)'}}/>
      )}

      <aside className={`layout-sidebar${open?' open':''}`}>
        {/* Logo */}
        <div style={{padding:'1rem',borderBottom:'1px solid var(--brd)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.55rem'}}>
            <div style={{width:34,height:34,borderRadius:7,flexShrink:0,background:'linear-gradient(135deg,var(--acc),var(--grn))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'1rem',color:'#000'}}>N</div>
            <div>
              <div style={{fontWeight:800,fontSize:'.85rem',color:'var(--acc)',letterSpacing:.5}}>NGN / VoIP EDU</div>
              <div style={{fontSize:'.6rem',color:'var(--txt3)',fontFamily:'var(--fc)'}}>DLU · Khoa CNTT</div>
            </div>
          </div>
          {mob && (
            <button onClick={onClose}
              style={{background:'none',border:'none',color:'var(--txt3)',cursor:'pointer',fontSize:'1.1rem',padding:'.2rem',lineHeight:1}}>✕</button>
          )}
        </div>

        {/* Nav */}
        <nav style={{padding:'.45rem .4rem',flex:1}}>
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.to==='/'}
              style={({isActive})=>({
                display:'flex',alignItems:'center',gap:'.4rem',
                padding:'.46rem .65rem',borderRadius:7,marginBottom:2,
                fontSize:'.83rem',fontWeight:isActive?600:400,
                color:isActive?'var(--acc)':'var(--txt2)',
                background:isActive?'rgba(0,212,255,.09)':'transparent',
                border:isActive?'1px solid rgba(0,212,255,.2)':'1px solid transparent',
                textDecoration:'none',transition:'all .12s',
              })}
            >{n.label}</NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{padding:'.7rem 1rem',borderTop:'1px solid var(--brd)',fontSize:'.66rem',color:'var(--txt3)'}}>
          <div style={{marginBottom:'.15rem'}}>GV. Trần Vĩnh Phúc</div>
          <a href="mailto:phuctv@dlu.edu.vn" style={{color:'var(--acc2)'}}>phuctv@dlu.edu.vn</a>
        </div>
      </aside>
    </>
  )
}

function Topbar({ onMenu }) {
  const mob = useIsMobile()
  const loc = useLocation()
  const cur = NAV.find(n => n.to === loc.pathname) || NAV[0]
  if (!mob) return null
  return (
    <div className="topbar">
      <button onClick={onMenu}
        style={{background:'var(--sur)',border:'1px solid var(--brd)',color:'var(--txt)',cursor:'pointer',fontSize:'1rem',borderRadius:6,width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        ☰
      </button>
      <span style={{fontWeight:700,fontSize:'.88rem',color:'var(--acc)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
        {cur.label}
      </span>
      <span style={{fontSize:'.6rem',color:'var(--txt3)',fontFamily:'var(--fc)',flexShrink:0}}>NGN EDU</span>
    </div>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <div style={{display:'flex',minHeight:'100vh'}}>
      <Sidebar open={open} onClose={close}/>
      <div className="layout-main">
        <Topbar onMenu={() => setOpen(true)}/>
        <div className="layout-content">
          <Routes>
            <Route path="/"          element={<Home/>}/>
            <Route path="/theory"    element={<Theory/>}/>
            <Route path="/modules"   element={<Modules/>}/>
            <Route path="/topology"  element={<Topology/>}/>
            <Route path="/quiz"      element={<Quiz/>}/>
            <Route path="/exercises" element={<Exercises/>}/>
            <Route path="/thesis"    element={<Thesis/>}/>
            <Route path="/resources" element={<Resources/>}/>
            <Route path="/guide"     element={<Guide/>}/>
            <Route path="/contact"   element={<Contact/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}
