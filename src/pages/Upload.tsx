import { useRef, useState } from 'react'
import { FileUp, Shield, Zap, Copy, Clock, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { pdfService } from '../services/api'
import { HealthStatus } from '../components/common/HealthStatus'

const features = [
  {
    icon: Shield,
    title: 'Encrypted Vault',
    desc: 'Your documents are processed in an isolated environment with AES-256 encryption.',
  },
  {
    icon: Zap,
    title: 'Fast OCR',
    desc: 'Intelligent optical character recognition that handles even low-res scans perfectly.',
  },
  {
    icon: Copy,
    title: 'Bento Sorting',
    desc: 'Automatically organize and split documents based on semantic content detection.',
  },
]

export default function Upload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleUpload = async () => {
  if (!file) return;

  setIsLoading(true);
  setError(null);
  
  try {
    const result = await pdfService.splitPdf(file);
    navigate('/split', { state: { pdfData: result, originalFile: file } });
  } catch (err) {
    console.error("Error splitting PDF:", err);
    setError("Failed to process the PDF. Please ensure it is a valid file and try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.type === 'application/pdf') setFile(dropped)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) setFile(selected)
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: '#f0f2f5',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px 32px' }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: 'center', maxWidth: '580px', marginBottom: '32px' }}>
          {/* Badge */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              display: 'inline-block',
              background: '#eeecfd',
              color: '#3525cd',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: '999px',
            }}>
              New Workflow
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: '52px',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            color: '#191c1e',
            margin: '0 0 16px',
          }}>
            Premium PDF{' '}
            <span style={{ color: '#3525cd' }}>Extraction</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '14px',
            color: '#464555',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Transform static documents into dynamic data structures with Lumina's
            editorial-grade extraction engine. Designed for precision, speed, and elegance.
          </p>
        </div>

        {/* ── UPLOAD CARD ── */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '560px',
            background: isDragging ? 'rgba(238,236,253,0.7)' : '#ffffff',
            borderRadius: '20px',
            boxShadow: isDragging
              ? '0 24px 48px rgba(53,37,205,0.14)'
              : '0 8px 40px rgba(25,28,30,0.08)',
            padding: '52px 48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            transition: 'box-shadow 0.25s ease, background 0.25s ease',
            marginBottom: '40px',
          }}
        >
          {/* Decorative blob */}
          <div style={{
            position: 'absolute', top: '24px', right: '24px',
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(79,70,229,0.10) 0%,transparent 70%)',
            filter: 'blur(12px)',
            pointerEvents: 'none',
          }} />

          {/* Upload icon circle */}
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: '#f3f4f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isLoading ? (
              <Loader2 size={24} color="#3525cd" className="animate-spin" />
            ) : (
              <FileUp size={24} color="#3525cd" />
            )}
          </div>

          {/* Text */}
          {file ? (
            <div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#191c1e', margin: '0 0 4px' }}>{file.name}</p>
              <p style={{ fontSize: '12px', color: '#8b8fa8', margin: 0 }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '20px', fontWeight: 700, color: '#191c1e', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                Drag &amp; Drop Documents
              </p>
              <p style={{ fontSize: '13.5px', color: '#464555', lineHeight: 1.6, margin: 0, maxWidth: '280px' }}>
                Securely upload your files to start the intelligence extraction process.
              </p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            id="file-input"
          />

          {/* CTA Button — Signature Gradient */}
          <button
            id="action-btn"
            onClick={file ? handleUpload : () => inputRef.current?.click()}
            disabled={isLoading}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: isLoading 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: 'none', 
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px', fontWeight: 600,
              padding: '13px 32px',
              borderRadius: '999px',
              boxShadow: isLoading ? 'none' : '0 8px 24px rgba(53,37,205,0.30)',
              transition: 'all 0.2s ease',
              marginTop: '4px',
            }}
            onMouseEnter={e => {
              if (!isLoading) {
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(53,37,205,0.42)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={e => {
              if (!isLoading) {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(53,37,205,0.30)'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing PDF...
              </>
            ) : (
              <>
                {file ? 'Start Extraction' : 'Browse Files'}
                <span style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 400, lineHeight: 1,
                }}>
                  {file ? '→' : '+'}
                </span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#fef2f2',
              color: '#b91c1c',
              fontSize: '12px',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #fee2e2',
              marginTop: '8px'
            }}>
              {error}
            </div>
          )}

          {/* Info row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '4px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: '#6cf8bb', color: '#00714d',
              fontSize: '11px', fontWeight: 700,
              padding: '4px 12px', borderRadius: '999px',
            }}>
              <FileUp size={10} />
              PDF SUPPORTED
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#8b8fa8' }}>
              <Clock size={12} />
              Max file size: 50MB
            </span>
          </div>
        </div>

        {/* ── FEATURE CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          width: '100%',
          maxWidth: '680px',
        }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                display: 'flex', flexDirection: 'column', gap: '10px',
                padding: '16px',
                borderRadius: '16px',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e6e8ea')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: '#eeecfd',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={17} color="#3525cd" />
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#191c1e', margin: 0, letterSpacing: '-0.01em' }}>
                {title}
              </p>
              <p style={{ fontSize: '12px', color: '#464555', lineHeight: 1.6, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#ffffff',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -1px 0 rgba(0,0,0,0.05)',
      }}>
        <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#8b8fa8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          © 2024 Lumina PDF. All Rights Reserved.
        </span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {['Help Center', 'Documentation'].map(label => (
            <span key={label} style={{
              fontSize: '10.5px', fontWeight: 600, color: '#8b8fa8',
              textTransform: 'uppercase', letterSpacing: '0.07em', cursor: 'pointer',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#191c1e')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8b8fa8')}
            >{label}</span>
          ))}
          <HealthStatus />
        </div>
      </footer>
    </div>
  )
}
