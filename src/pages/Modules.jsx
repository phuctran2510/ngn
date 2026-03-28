import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MODULES } from '../data/modules'

function CopyBtn({ code }) {
  const [ok, setOk] = useState(false)
  return (
    <button onClick={()=>{navigator.clipboard?.writeText(code);setOk(true);setTimeout(()=>setOk(false),1800)}}
      style={{position:'absolute',top:'.4rem',right:'.4rem',background:ok?'rgba(0,230,118,.15)':'rgba(0,212,255,.08)',border:`1px solid ${ok?'var(--grn)':'rgba(0,212,255,.2)'}`,color:ok?'var(--grn)':'var(--acc2)',borderRadius:5,padding:'.18rem .5rem',fontSize:'.63rem',cursor:'pointer',fontFamily:'var(--fc)',transition:'all .18s'}}>
      {ok?'✓':'copy'}
    </button>
  )
}

const LAB_TABS = [['deploy','Triển khai'],['cmds','Lệnh'],['topo','Topology'],['result','Kết quả'],['hints','Gợi ý']]

export default function Modules() {
  const loc = useLocation()
  const [expMod, setExpMod] = useState(null)
  const [expLab, setExpLab] = useState(null)
  const [labTab, setLabTab] = useState('deploy')

  useEffect(()=>{ if(loc.state?.modId) setExpMod(loc.state.modId) },[loc.state])

  return (
    <div className="fu">
      <div style={{marginBottom:'1.3rem'}}>
        <h1 style={{fontSize:'clamp(1.3rem,3.5vw,1.8rem)',fontWeight:800}}><span className="gt">Modules & Labs</span></h1>
        <p style={{color:'var(--txt3)',fontSize:'.84rem',marginTop:'.3rem'}}>
          {MODULES.length} modules · {MODULES.reduce((s,m)=>s+m.labList.length,0)} labs với hướng dẫn chi tiết từng bước
        </p>
      </div>

      {MODULES.map(mod=>(
        <div key={mod.id} style={{marginBottom:8}}>
          {/* Module header */}
          <div onClick={()=>{setExpMod(expMod===mod.id?null:mod.id);setExpLab(null)}}
            className="card card-hover"
            style={{padding:'11px 13px',cursor:'pointer',
              borderLeft:`4px solid ${mod.color}`,
              borderColor:expMod===mod.id?mod.color:'var(--brd)',
              borderLeftColor:mod.color,
              borderRadius:expMod===mod.id?'8px 8px 0 0':8,
              transition:'all .15s'}}>
            <div style={{display:'flex',alignItems:'center',gap:9}}>
              <div style={{width:32,height:32,borderRadius:6,background:`${mod.color}14`,border:`1px solid ${mod.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.72rem',fontWeight:700,color:mod.color,fontFamily:'var(--fc)',flexShrink:0}}>M{mod.id}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',gap:6,alignItems:'center',marginBottom:1,flexWrap:'wrap'}}>
                  <span style={{color:mod.color,fontWeight:700,fontSize:'.78rem',fontFamily:'var(--fc)',letterSpacing:.5}}>MODULE {mod.id}</span>
                  <span style={{color:'var(--txt3)',fontSize:'.74rem'}}>{mod.labs}</span>
                </div>
                <div style={{fontWeight:700,fontSize:'.87rem',color:'var(--txt)',lineHeight:1.25}}>{mod.title}</div>
                <div style={{fontSize:'.76rem',color:'var(--txt3)',marginTop:2,lineHeight:1.4}}>{mod.desc}</div>
              </div>
              <div className="mod-tags" style={{display:'flex',gap:3,flexWrap:'wrap',maxWidth:160,justifyContent:'flex-end',flexShrink:0}}>
                {mod.tags.map(t=><span key={t} className="badge" style={{background:`${mod.color}0f`,color:mod.color,border:`1px solid ${mod.color}30`,fontSize:'.58rem'}}>{t}</span>)}
              </div>
              <span style={{color:mod.color,marginLeft:4,flexShrink:0,fontSize:'.85rem'}}>{expMod===mod.id?'▲':'▼'}</span>
            </div>
          </div>

          {expMod===mod.id&&(
            <div style={{background:'var(--bg2)',border:`1px solid ${mod.color}18`,borderTop:'none',borderRadius:'0 0 8px 8px'}}>
              {mod.labList.map(lab=>{
                const k=`${mod.id}-${lab.num}`; const open=expLab===k
                return (
                  <div key={lab.num}>
                    <div onClick={()=>{setExpLab(open?null:k);setLabTab('deploy')}}
                      style={{padding:'9px 13px',borderBottom:'1px solid var(--brd)',display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                      <div style={{width:28,height:28,borderRadius:5,background:`${mod.color}14`,border:`1px solid ${mod.color}35`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.68rem',color:mod.color,flexShrink:0,fontWeight:700,fontFamily:'var(--fc)'}}>{lab.num}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:'.85rem',color:'var(--txt)',fontWeight:600,lineHeight:1.25}}>{lab.name}</div>
                        <div style={{display:'flex',gap:7,marginTop:2}}>
                          <span style={{fontSize:'.7rem',color:'var(--txt3)'}}>⏱ {lab.dur}</span>
                          <span style={{fontSize:'.7rem',color:mod.color}}>{'★'.repeat(lab.diff)}{'☆'.repeat(4-lab.diff)}</span>
                        </div>
                      </div>
                      <span style={{color:'var(--txt3)',fontSize:'.78rem',flexShrink:0}}>{open?'▲':'▼'}</span>
                    </div>

                    {open&&(
                      <div style={{padding:'11px 13px',background:'var(--bg)',borderBottom:'1px solid var(--brd)'}}>
                        <div className="tabs">
                          {LAB_TABS.map(([k2,l])=>(
                            <button key={k2} onClick={e=>{e.stopPropagation();setLabTab(k2)}}
                              className={`tab${labTab===k2?' active':''}`}
                              style={labTab===k2?{color:mod.color,borderBottomColor:mod.color}:{}}>{l}</button>
                          ))}
                        </div>

                        {labTab==='deploy'&&(
                          <div>
                            <div style={{fontSize:'.7rem',color:mod.color,fontWeight:700,letterSpacing:.5,marginBottom:7,fontFamily:'var(--fc)'}}>HƯỚNG DẪN TRIỂN KHAI</div>
                            <ol style={{listStyle:'none',padding:0}}>
                              {lab.deploy.map((d,i)=>(
                                <li key={i} style={{display:'flex',gap:9,marginBottom:6,alignItems:'flex-start'}}>
                                  <span style={{width:20,height:20,borderRadius:'50%',background:`${mod.color}14`,border:`1px solid ${mod.color}30`,color:mod.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.65rem',fontWeight:700,flexShrink:0,fontFamily:'var(--fc)'}}>{i+1}</span>
                                  <span style={{fontSize:'.83rem',color:'var(--txt2)',lineHeight:1.55}}>{d}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        {labTab==='cmds'&&(
                          <div style={{position:'relative'}}>
                            <pre><code style={{color:'#9ab'}}>{lab.cmds}</code></pre>
                            <CopyBtn code={lab.cmds}/>
                          </div>
                        )}
                        {labTab==='topo'&&(
                          <pre style={{background:'rgba(0,212,255,.04)',borderColor:'rgba(0,212,255,.2)'}}><code style={{color:'var(--acc)'}}>{lab.topo}</code></pre>
                        )}
                        {labTab==='result'&&(
                          <ul className="ul">{lab.result.map((r,i)=><li key={i}>{r}</li>)}</ul>
                        )}
                        {labTab==='hints'&&(
                          <div>{lab.hints.map((h,i)=>(
                            <div key={i} className="alert alert-w" style={{margin:'.35rem 0'}}>
                              <span style={{fontSize:'.82rem'}}>{h}</span>
                            </div>
                          ))}</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
