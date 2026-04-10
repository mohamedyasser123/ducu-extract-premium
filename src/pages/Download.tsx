// src/pages/Download.tsx
import { Download, Plus, FileText, Check } from 'lucide-react'

const files = [
  { name: 'Q3_Financial_Summary.txt', size: '4.2 KB' },
  { name: 'Invoice_2024_081.txt', size: '1.8 KB' },
  { name: 'Meeting_Notes_Draft.txt', size: '12.5 KB' },
  { name: 'Project_Alpha_Spec.txt', size: '8.7 KB' },
  { name: 'Legal_Addendum_V1.txt', size: '2.1 KB' },
]

export default function DownloadPage() {
  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* ── SUCCESS HEADER (FIX COLOR) ── */}
      <div style={{
        maxWidth: '980px',
        width: '100%',
        margin: '0 auto',
        background: '#6CF8BB33',
        borderRadius: '32px',
        padding: '28px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

        <div style={{ maxWidth: '60%' }}>
          <p style={{ color: '#006c49', fontWeight: 700, fontSize: '12px' }}>
            PROCESSING SUCCESSFUL
          </p>
          <h1 style={{ fontSize: '26px', fontWeight: 800 }}>
            Extraction Complete! 12 files Ready.
          </h1>
          <p style={{ color: '#464555', fontSize: '13px' }}>
            All documents processed with OCR and converted to text.
          </p>
        </div>

        <button className="btn-primary">
          <Download size={16} /> Download All (.ZIP)
        </button>
      </div>

      {/* ── GRID ── */}
      <div style={{
        maxWidth: '980px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px'
      }}>

        {files.slice(0,4).map((file, i) => (
          <FileCard key={i} file={file} />
        ))}

        <div style={{ gridColumn: 'span 2' }}>
          <EfficiencyCard />
        </div>

        <FileCard file={files[4]} />

        <NewExtractionCard />

      </div>

      {/* ── FLOATING BAR (MATCH FIGMA EXACT) ── */}
      <div style={{
        width: '520px',
        height: '78px',
        margin: '20px auto 0',
        borderRadius: '48px',
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 20px 40px rgba(25,28,30,0.08)'
      }}>

        {/* LEFT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3525cd' }} />
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#8b8fa8', fontWeight: 700, margin: 0 }}>
              CURRENT WORKSPACE
            </p>
            <p style={{ fontWeight: 600, fontSize: '13px', margin: 0 }}>
              Extraction_Project_88.ZIP
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Download size={20} color="#3525cd" />

          <span style={{ color: '#464555', fontSize: '18px' }}>⤴</span>
          <span style={{ color: '#464555', fontSize: '18px' }}>↻</span>
          <span style={{ color: '#ff4d4f', fontSize: '18px' }}>🗑</span>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{
        marginTop: '20px',
        padding: '14px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#8b8fa8' }}>
          © 2024 Lumina PDF. All Rights Reserved.
        </span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#8b8fa8' }}>Help Center</span>
          <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#8b8fa8' }}>Documentation</span>
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#006c49' }}>● STATUS: SYSTEM READY</span>
        </div>
      </footer>

    </div>
  )
}

/* ───────── COMPONENTS ───────── */

function FileCard({ file }: any) {
  return (
    <div style={{
      height: '382px',
      borderRadius: '32px',
      background: '#ffffff',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 20px 40px rgba(25,28,30,0.06)'
    }}>

      {/* preview with icon */}
      <div style={{
        height: '224px',
        background: '#e6e8ea',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FileText size={40} color="#8b8fa8" />
      </div>

      <div>
        <p style={{ fontWeight: 600, fontSize: '13px' }}>{file.name}</p>
        <p style={{ fontSize: '11px', color: '#8b8fa8' }}>{file.size}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>

        <button style={{
          padding: '10px 16px',
          borderRadius: '999px',
          background: '#f2f4f6',
          border: 'none'
        }}>
          View Text
        </button>

        <button style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: '#eeecfd',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Download size={16} color="#3525cd" />
        </button>

      </div>

    </div>
  )
}

function EfficiencyCard() {
  return (
    <div style={{
      height: '392px',
      borderRadius: '32px',
      background: 'linear-gradient(135deg,#3525cd,#4f46e5)',
      color: '#fff',
      padding: '32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h3>Efficiency Boost</h3>
        <p style={{ opacity: 0.8 }}>You saved ~1.4 hours today</p>
      </div>
      <h1 style={{ fontSize: '42px', fontWeight: 800 }}>98.2%</h1>
    </div>
  )
}

function NewExtractionCard() {
  return (
    <div style={{
      height: '382px',
      borderRadius: '32px',
      background: '#f2f4f6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Plus />
      </div>
      <p style={{ fontWeight: 600 }}>New Extraction</p>
    </div>
  )
}
