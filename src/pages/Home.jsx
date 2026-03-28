import { Link } from 'react-router-dom'
import { MODULES } from '../data/modules'
import { THESIS } from '../data/thesis'
import { QUIZ, EXERCISES, instructor } from '../data/content'

export default function Home() {
  const totalLabs = MODULES.reduce((s,m)=>s+m.labList.length,0)
  return (
    <div className="fu">
      {/* Hero */}
      <div style={{textAlign:'center',padding:'1.8rem 0 2.2rem'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'.4rem',background:'rgba(0,212,255,.07)',border:'1px solid rgba(0,212,255,.18)',padding:'.22rem .8rem',borderRadius:999,marginBottom:'1.1rem'}}>
          <span style={{width:6,height:6,background:'var(--grn)',borderRadius:'50%',animation:'pulse 2s infinite',display:'inline-block'}}/>
          <span style={{fontSize:'.7rem',color:'var(--acc)',fontFamily:'var(--fc)'}}>Đại học Đà Lạt · Khoa CNTT · 2025</span>
        </div>
        <h1 style={{fontSize:'clamp(1.55rem,5vw,2.4rem)',fontWeight:800,lineHeight:1.15,marginBottom:'.65rem'}}>
          <span className="gt">NGN / VoIP EDU</span><br/>
          <span style={{color:'var(--txt2)',fontSize:'.44em',fontWeight:400}}>Mạng Thế Hệ Mới & Voice over IP</span>
        </h1>
        <p style={{color:'var(--txt2)',maxWidth:480,margin:'0 auto 1.4rem',fontSize:'.87rem',lineHeight:1.75}}>
          Giáo trình thực hành toàn diện: IPv6 NGN, Multicast, QoS, Cisco CME, FreePBX — từ lý thuyết đến lab EVE-NG.
        </p>
        <div style={{display:'flex',gap:'.55rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/theory"  className="btn btn-p">Bắt đầu học</Link>
          <Link to="/modules" className="btn btn-o">Xem Labs</Link>
          <Link to="/quiz"    className="btn btn-g">Trắc nghiệm</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="fu d1 stat-grid" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'.55rem',marginBottom:'1.8rem'}}>
        {[[MODULES.length,'Modules','var(--acc)'],[totalLabs,'Labs','var(--grn)'],[QUIZ.length,'Câu quiz','var(--org)'],[EXERCISES.length,'Bài tập','var(--pur)'],[THESIS.length,'Đề tài','var(--yel)']].map(([v,l,c],i)=>(
          <div key={i} className="card" style={{padding:'.9rem .5rem',textAlign:'center'}}>
            <div style={{fontSize:'1.4rem',fontWeight:800,color:c,fontFamily:'var(--fc)',marginBottom:'.18rem'}}>{v}</div>
            <div style={{fontSize:'.7rem',color:'var(--txt3)',lineHeight:1.3}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Modules grid */}
      <div className="fu d2" style={{marginBottom:'1.8rem'}}>
        <div style={{fontSize:'.67rem',color:'var(--txt3)',fontFamily:'var(--fc)',marginBottom:'.65rem',textTransform:'uppercase',letterSpacing:'.07em'}}>Chương trình học</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(250px,100%),1fr))',gap:'.6rem'}}>
          {MODULES.map(m=>(
            <Link key={m.id} to="/modules" state={{modId:m.id}} className="card card-acc fu"
              style={{padding:'.95rem',textDecoration:'none',borderColor:`${m.color}20`}}>
              <div style={{display:'flex',gap:'.6rem',alignItems:'flex-start'}}>
                <div style={{width:34,height:34,borderRadius:7,flexShrink:0,background:`${m.color}16`,border:`1px solid ${m.color}35`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontWeight:700,color:m.color,fontFamily:'var(--fc)'}}>M{m.id}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'.62rem',color:m.color,fontFamily:'var(--fc)',marginBottom:'.1rem',fontWeight:700}}>{m.labs}</div>
                  <div style={{fontWeight:700,fontSize:'.84rem',color:'var(--txt)',marginBottom:'.22rem',lineHeight:1.3}}>{m.title}</div>
                  <div style={{fontSize:'.75rem',color:'var(--txt3)',lineHeight:1.4}}>{m.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Instructor */}
      <div className="fu d3 card" style={{padding:'1.1rem',borderColor:'rgba(0,212,255,.2)',background:'rgba(0,212,255,.03)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'.85rem',flexWrap:'wrap'}}>
          <div style={{width:44,height:44,borderRadius:'50%',flexShrink:0,background:'linear-gradient(135deg,var(--acc),var(--grn))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'.95rem',color:'#000'}}>{instructor.avatar}</div>
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontWeight:700,fontSize:'.92rem',color:'var(--txt)',marginBottom:'.08rem'}}>GV. {instructor.fullName}</div>
            <div style={{fontSize:'.75rem',color:'var(--txt3)',marginBottom:'.08rem'}}>{instructor.dept} · {instructor.university}</div>
            <div style={{fontSize:'.72rem',color:'var(--acc2)',fontFamily:'var(--fc)'}}>{instructor.email} · {instructor.phone}</div>
          </div>
          <Link to="/contact" className="btn btn-o" style={{flexShrink:0}}>Liên hệ GV</Link>
        </div>
      </div>
    </div>
  )
}
