// src/pages/Download.tsx
import { Download, Plus, FileText } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { HealthStatus } from '../components/common/HealthStatus';

interface OCRFile {
  id: number;
  name: string;
  size: string;
  pages: number;
  status: string;
  exported: boolean;
  rawText?: string;
}

export default function DownloadPage() {
  const location = useLocation();
  const files: OCRFile[] = location.state?.files || [];
  const originalFile: File | undefined = location.state?.originalFile;
  const [downloadingZip, setDownloadingZip] = useState(false);

  const handleDownloadZip = async () => {
    if (files.length === 0) return;
    setDownloadingZip(true);
    try {
      const zip = new JSZip();
      let hasFiles = false;
      
      const { pdfService } = await import('../services/api');
      
      for (const file of files) {
        const txtName = file.name.replace(/\.[^/.]+$/, "") + ".txt";
        try {
          const blob = await pdfService.downloadFile(txtName);
          zip.file(txtName, blob);
          hasFiles = true;
        } catch {
          if (file.rawText) {
            zip.file(txtName, file.rawText);
            hasFiles = true;
          }
        }
      }
      
      if (hasFiles) {
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, originalFile ? `${originalFile.name.replace(/\.[^/.]+$/, "")}_Extraction.zip` : 'Extraction_Project.zip');
      } else {
        alert("No text available to download.");
      }
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setDownloadingZip(false);
    }
  };

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
            {files.length > 0 
              ? `Extraction Complete! ${files.length} files Ready.` 
              : `No files processed yet.`}
          </h1>
          <p style={{ color: '#464555', fontSize: '13px' }}>
            All documents processed with OCR and converted to text.
          </p>
        </div>

        <button 
          onClick={handleDownloadZip}
          disabled={files.length === 0 || downloadingZip}
          className="cursor-pointer flex items-center gap-2 bg-[#4f46e5] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#4338ca] transition-all shadow-[0_4px_14px_rgba(79,70,229,0.39)] disabled:opacity-50"
        >
          <Download size={16} /> 
          {downloadingZip ? 'Zipping...' : 'Download All (.ZIP)'}
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

        {files.length > 0 ? (
          <>
            {files.slice(0,4).map((file, i) => (
              <FileCard key={i} file={file} />
            ))}

            <div style={{ gridColumn: 'span 2' }}>
              <EfficiencyCard />
            </div>

            {files.slice(4).map((file, i) => (
              <FileCard key={i + 4} file={file} />
            ))}
          </>
        ) : (
          <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: '40px', color: '#8b8fa8' }}>
            No files available. Please go back and process documents through the OCR step.
          </div>
        )}

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
              {originalFile ? `${originalFile.name.replace(/\.[^/.]+$/, "")}_Extraction.zip` : 'Extraction_Project_88.ZIP'}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div onClick={handleDownloadZip} style={{ cursor: 'pointer', display: 'flex' }}>
            <Download size={20} color="#3525cd" />
          </div>

          <span style={{ color: '#464555', fontSize: '18px', cursor: 'pointer' }}>⤴</span>
          <span style={{ color: '#464555', fontSize: '18px', cursor: 'pointer' }}>↻</span>
          <span style={{ color: '#ff4d4f', fontSize: '18px', cursor: 'pointer' }}>🗑</span>
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
          <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#8b8fa8', cursor: 'pointer' }}>Help Center</span>
          <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#8b8fa8', cursor: 'pointer' }}>Documentation</span>
          <HealthStatus />
        </div>
      </footer>

    </div>
  )
}

/* ───────── COMPONENTS ───────── */

function FileCard({ file }: { file: OCRFile }) {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownloadSingle = async () => {
    const txtName = file.name.replace(/\.[^/.]+$/, "") + ".txt";
    try {
      const { pdfService } = await import('../services/api');
      const blob = await pdfService.downloadFile(txtName);
      saveAs(blob, txtName);
    } catch (err) {
      console.error('Failed to download from server, falling back to local text', err);
      if (file.rawText) {
        const blob = new Blob([file.rawText], { type: "text/plain;charset=utf-8" });
        saveAs(blob, txtName);
      }
    }
  };

  return (
    <>
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
          <p style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {file.name.replace(/\.[^/.]+$/, "") + ".txt"}
          </p>
          <p style={{ fontSize: '11px', color: '#8b8fa8' }}>{file.size || 'Unknown KB'}</p>
        </div>

        <div style={{ display: 'flex', justifyItems: 'center', gap: '10px' }}>

          <button 
            onClick={() => setShowPreview(true)}
            style={{
              padding: '10px 16px',
              borderRadius: '999px',
              background: '#f2f4f6',
              border: 'none',
              cursor: 'pointer',
              flex: 1
            }}>
            View Text
          </button>

          <button 
            onClick={handleDownloadSingle}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#eeecfd',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}>
            <Download size={16} color="#3525cd" />
          </button>

        </div>

      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-black text-gray-900">Extracted Text Content</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="p-8 overflow-y-auto flex-1 bg-white text-left">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                {file.rawText || "No text available for this file."}
              </pre>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => {
                  if (file.rawText) {
                    navigator.clipboard.writeText(file.rawText);
                    alert("Text copied to clipboard!");
                  }
                }}
                className="cursor-pointer px-6 py-2.5 bg-[#4f46e5] text-white rounded-full font-bold text-sm hover:bg-[#4338ca] transition-all shadow-lg"
              >
                Copy to Clipboard
              </button>
              <button 
                onClick={() => setShowPreview(false)}
                className="cursor-pointer px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full font-bold text-sm hover:bg-gray-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/')}
      style={{
        height: '382px',
        borderRadius: '32px',
        background: '#f2f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0 20px 40px rgba(25,28,30,0.06)'
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
