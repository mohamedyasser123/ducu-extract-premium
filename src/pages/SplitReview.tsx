import { MoreVertical, FileText, ArrowRight, LayoutList, Plus, CircleCheck } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { SplitResponse, SplitFile } from '../services/api'
import { HealthStatus } from '../components/common/HealthStatus'

export default function SplitReview() {

  const navigate = useNavigate();

  const location = useLocation();
  const pdfData = location.state?.pdfData as SplitResponse | undefined;
  
  const pdfPages: SplitFile[] = pdfData?.files && Array.isArray(pdfData.files) 
    ? pdfData.files 
    : [];


  return <>
     <div className='containerPrv mx-auto'>
        {/* ── Top Banner ── */}  
        <div className="mt-2 p-3 bg-[#EBFDF6]  border border-[2px] border-[#CDF9E8] rounded-[14px]  flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
             <div className='w-[40px] h-[40px] rounded-full bg-[#6CF8BB] flex items-center justify-center'>< CircleCheck size={20} className="text-[#6CF8BB] bg-[#00714D] rounded-full " /></div>
            <div>
              <h3 className="text-[#191c1e] font-bold text-[15px]">PDF Uploaded & Split Successfully</h3>
              <p className="text-[#464555] text-[13px] mt-0.5">Your document has been processed into {pdfPages.length} individual pages.</p>
            </div>
          </div>
          <button className="text-[#006C49] text-[13px] font-bold hover:underline mr-4">
            View Log
          </button>
        </div>

          {/* ── Header Section ── */}
        <div className="flex justify-between items-end mt-10 mb-8">
          <div className="max-w-xl">
            <h1 className="text-[36px] font-black text-gray-900 tracking-tight leading-none mb-3">Review Split Pages</h1>
            <p className="text-[#464555] text-[16px] leading-relaxed">
              Please verify the split sections before initiating the OCR extraction process. You can
              preview individual pages to ensure visual clarity.
            </p>
          </div>
          <div className="flex gap-3 mb-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#eaeaef] hover:bg-[#e0e0e6] text-[#464555] text-[13.5px] font-bold rounded-full transition-colors">
              <LayoutList size={16} /> Reorder
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#eaeaef] hover:bg-[#e0e0e6] text-[#464555] text-[13.5px] font-bold rounded-full transition-colors">
              <Plus size={16} /> Merge More
            </button>
          </div>
        </div>

         {/* ── Cards Grid ── */}
        <div className="grid grid-cols-4 gap-4">
          {pdfPages.length > 0 ? (
            pdfPages.map((page, index) => (
              <div key={index} className={`bg-white rounded-[24px] p-6 shadow-sm border border-[#f0f2f5] hover:shadow-md transition-shadow relative h-[320px] flex ${index === 0 ? 'col-span-2' : ''}`}>
                
                {index === 0 ? (
                  // Active Card Layout (Horizontal split inside the card)
                  <div className="flex w-full h-full gap-5">
                    <div className="w-[128px] h-[176px] bg-[#B6B9BD] mt-16 rounded-xl flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-inner">
                       <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 flex flex-col items-center justify-center gap-2 border border-white/30 w-full h-full">
                          <FileText size={28} className="text-[#4f46e5]" />
                          <span className="text-white text-[9px] font-bold uppercase tracking-widest text-center leading-tight">Document<br/>Preview</span>
                       </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-1">
                      <div className="bg-[#6CF8BB] text-[#00714D] text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full w-max mb-4">
                        PAGE {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-[17px] font-black text-gray-900 mb-1 leading-tight break-all truncate">{page.file_name}</h3>
                      <p className="text-[12px] font-medium text-gray-500 mb-6">PDF Document</p>
                      <div className="flex items-center gap-2 mt-auto">
                        <button className="bg-[#4f46e5] text-white text-[13px] font-bold py-2.5 px-5 rounded-full hover:bg-[#4338ca] transition-all shadow-md">
                          Preview
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                           <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Inactive Cards Layout (Vertical)
                  <div className="flex flex-col w-full h-full">
                    <div className="absolute top-6 right-6 bg-[#f0f2f5] text-[#8b8fa8] text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full z-10">
                      PAGE {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    <div className="w-[65%] mx-auto h-[160px] bg-[#f8f9fc] rounded-2xl flex items-center justify-center mb-6 relative mt-4 shadow-sm border border-[#f0f2f5]">
                       <FileText size={32} className="text-[#d0d3de]" />
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1 truncate">{page.file_name}</h3>
                      <p className="text-[12px] font-medium text-gray-500 mb-2">PDF Document</p>
                      
                      <div className="mt-auto flex justify-end">
                         <button className="text-[#4f46e5] text-[13px] font-bold py-2 px-4 rounded-full hover:bg-[#eeecfd] transition-colors">
                           Preview
                         </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))
          ) : (
            <div className="col-span-4 bg-white p-16 rounded-[32px] border-2 border-dashed border-[#e5e7eb] text-center flex flex-col items-center">
               <div className="w-20 h-20 bg-[#f3f4f6] rounded-full flex items-center justify-center mb-6">
                 <LayoutList size={40} className="text-[#9ca3af]" />
               </div>
               <h3 className="text-[18px] font-bold text-[#191c1e] mb-2">No Split Pages Found</h3>
               <p className="text-[14px] text-[#464555] max-w-sm leading-relaxed mb-0">
                 The document was uploaded successfully, but no individual pages were detected. 
                 Please check the source file and try again.
               </p>
            </div>
          )}
        </div>


         {/* ── Floating CTA ── */}
        <div className="mt-auto pt-16 pb-4">
          <div className="flex justify-end mb-10">
            <div className="bg-white rounded-full p-2 pr-2 point pl-6 flex items-center gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100">
               <div className="flex flex-col justify-center">
                 <span className="text-[9px] font-bold text-[#8b8fa8] uppercase tracking-widest">Ready to extract</span>
                 <span className="text-[14px] font-black text-gray-900 leading-tight">{pdfPages.length} Pages Selected</span>
               </div>
               <button onClick={() => navigate('/ocr', { state: { pdfData, originalFile: location.state?.originalFile } })} className="cursor-pointer flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-7 py-3.5 rounded-full text-[14px] font-bold transition-all shadow-[0_4px_14px_rgba(79,70,229,0.39)]">
                 Start OCR Extraction <ArrowRight size={18} />
               </button>
            </div>
          </div>
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
      

       

       
  </>
}

