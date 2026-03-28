import { useState } from 'react'
import { THEORY } from '../data/content'

function Render({ md }) {
  if (!md) return null
  const lines = md.trim().split('\n')
  const out = []; let i = 0
  const ri = text => text
    .replace(/\*\*([^*]+)\*\*/g,'<strong style="color:var(--txt);font-weight:600">$1</strong>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
  while (i < lines.length) {
    const l = lines[i]
    if (l.startsWith('```')) {
      const lang=l.slice(3).trim()||'bash'; const code=[]; i++
      while(i<lines.length&&!lines[i].startsWith('```')){code.push(lines[i]);i++}
      out.push(<pre key={i} data-lang={lang}><code style={{color:'#9ab'}}>{code.join('\n')}</code></pre>)
      i++;continue
    }
    if (l.startsWith('|')) {
      const rows=[]; while(i<lines.length&&lines[i].startsWith('|')){if(!lines[i].includes('---'))rows.push(lines[i].split('|').filter(Boolean).map(c=>c.trim()));i++}
      const [hd,...bd]=rows
      out.push(<div key={i} className="tw" style={{margin:'.75rem 0'}}><table><thead><tr>{hd.map((h,j)=><th key={j}>{h}</th>)}</tr></thead><tbody>{bd.map((r,ri2)=><tr key={ri2}>{r.map((c,ci)=><td key={ci} dangerouslySetInnerHTML={{__html:ri(c)}}/>)}</tr>)}</tbody></table></div>)
      continue
    }
    if(l.startsWith('## ')){out.push(<h2 key={i} style={{fontFamily:'var(--fc)',fontSize:'1rem',color:'var(--acc)',margin:'1.2rem 0 .5rem',borderBottom:'1px solid var(--brd)',paddingBottom:'.3rem'}}>{l.slice(3)}</h2>);i++;continue}
    if(l.startsWith('### ')){out.push(<h3 key={i} style={{fontSize:'.92rem',color:'var(--txt)',margin:'.95rem 0 .4rem',fontWeight:600}}>{l.slice(4)}</h3>);i++;continue}
    if(l.startsWith('> ')){out.push(<div key={i} className="alert alert-i" style={{fontStyle:'italic'}} dangerouslySetInnerHTML={{__html:ri(l.slice(2))}}/>);i++;continue}
    if(l.trim()==='---'){out.push(<div key={i} className="divider"/>);i++;continue}
    if(l.match(/^[-*] /)){
      const items=[]; while(i<lines.length&&lines[i].match(/^[-*] /)){items.push(lines[i].slice(2));i++}
      out.push(<ul key={i} className="ul">{items.map((it,j)=><li key={j} dangerouslySetInnerHTML={{__html:ri(it)}}/>)}</ul>)
      continue
    }
    if(l.trim()===''){i++;continue}
    out.push(<p key={i} style={{color:'var(--txt2)',margin:'.25rem 0 .6rem',fontSize:'.86rem',lineHeight:1.75}} dangerouslySetInnerHTML={{__html:ri(l)}}/>)
    i++
  }
  return <div>{out}</div>
}

export default function Theory() {
  const [cat, setCat] = useState(THEORY[0])
  const [sec, setSec] = useState(THEORY[0].sections[0])
  const pick = c => { setCat(c); setSec(c.sections[0]); window.scrollTo(0,0) }

  return (
    <div>
      <div style={{marginBottom:'1.3rem'}}>
        <h1 style={{fontSize:'clamp(1.3rem,3.5vw,1.8rem)',fontWeight:800}}><span className="gt">Lý thuyết</span></h1>
        <p style={{color:'var(--txt3)',fontSize:'.84rem',marginTop:'.3rem'}}>Nền tảng lý thuyết NGN, IPv6, VoIP và QoS</p>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="theory-cat-scroll">
        {THEORY.map(t=>(
          <button key={t.id} onClick={()=>pick(t)} style={{
            padding:'.36rem .72rem',borderRadius:7,flexShrink:0,
            background:cat.id===t.id?'rgba(0,212,255,.12)':'var(--sur)',
            border:`1px solid ${cat.id===t.id?'rgba(0,212,255,.4)':'var(--brd)'}`,
            color:cat.id===t.id?'var(--acc)':'var(--txt3)',
            cursor:'pointer',fontSize:'.77rem',fontWeight:cat.id===t.id?600:400,whiteSpace:'nowrap'
          }}>{t.title}</button>
        ))}
      </div>

      <div className="theory-layout">
        {/* Desktop sidebar */}
        <div className="theory-cat-list">
          {THEORY.map(t=>(
            <button key={t.id} onClick={()=>pick(t)} style={{
              display:'flex',flexDirection:'column',width:'100%',
              padding:'.43rem .62rem',borderRadius:7,marginBottom:3,
              background:cat.id===t.id?'rgba(0,212,255,.09)':'transparent',
              border:cat.id===t.id?'1px solid rgba(0,212,255,.2)':'1px solid transparent',
              cursor:'pointer',textAlign:'left',transition:'all .12s'
            }}>
              <span style={{fontSize:'.61rem',color:'var(--acc2)',fontFamily:'var(--fc)',marginBottom:'.1rem'}}>{t.cat}</span>
              <span style={{fontSize:'.79rem',color:cat.id===t.id?'var(--acc)':'var(--txt2)',fontWeight:cat.id===t.id?600:400,lineHeight:1.3}}>{t.title}</span>
            </button>
          ))}
        </div>

        <div className="fu">
          <div className="tabs">
            {cat.sections.map(s=>(
              <button key={s.id} className={`tab ${sec.id===s.id?'active':''}`} onClick={()=>setSec(s)}>{s.title}</button>
            ))}
          </div>
          <div className="card" style={{padding:'1.2rem'}}><Render md={sec.content}/></div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:'.75rem',gap:'.5rem'}}>
            <button className="btn btn-g" disabled={cat.sections.indexOf(sec)===0} onClick={()=>{setSec(cat.sections[cat.sections.indexOf(sec)-1]);window.scrollTo(0,0)}}>← Trước</button>
            <button className="btn btn-o" disabled={cat.sections.indexOf(sec)===cat.sections.length-1} onClick={()=>{setSec(cat.sections[cat.sections.indexOf(sec)+1]);window.scrollTo(0,0)}}>Tiếp →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
