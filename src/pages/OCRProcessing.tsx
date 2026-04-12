import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Eye, Pause, Settings, X, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { pdfService, type SplitResponse } from '../services/api';

interface OCRFile {
  id: number;
  name: string;
  size: string;
  pages: number;
  status: 'DONE' | 'OCR ACTIVE' | 'QUEUED' | 'WAITING' | 'PENDING';
  exported: boolean;
  rawText?: string;
}

// initialMockFiles removed in favor of dynamic data from navigation state

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'DONE':
      return 'bg-[#d1fae5] text-[#047857]';
    case 'OCR ACTIVE':
      return 'bg-[#e0e7ff] text-[#4f46e5]';
    case 'QUEUED':
      return 'bg-[#fef3c7] text-[#92400e]';
    case 'WAITING':
      return 'bg-[#f3f4f6] text-[#6b7280]';
    case 'PENDING':
      return 'bg-[#f3f4f6] text-[#9ca3af]';
    default:
      return 'bg-[#f3f4f6] text-[#6b7280]';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'DONE':
      return <CheckCircle2 size={20} />;
    case 'OCR ACTIVE':
      return <AlertCircle size={20} />;
    case 'QUEUED':
    case 'WAITING':
      return <Clock size={20} />;
    default:
      return <FileText size={20} />;
  }
};

export default function OCRProcessing() {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfData = location.state?.pdfData as SplitResponse | undefined;
  const originalFile = location.state?.originalFile as File | undefined;

  const initialFiles: OCRFile[] = pdfData?.files?.map((file, index) => ({
    id: index + 1,
    name: file.file_name,
    size: '--- KB',
    pages: 1,
    status: 'PENDING' as const,
    exported: false
  })) || [];

  const [files, setFiles] = useState<OCRFile[]>(initialFiles);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (originalFile && files.length > 0 && !isProcessing) {
      handleStartOCR();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalFile]);

  const handleStartOCR = async () => {
    if (!originalFile) return;
    
    setIsProcessing(true);
    // Set all files to ACTIVE status
    setFiles(prev => prev.map(f => ({ ...f, status: 'OCR ACTIVE' })));

    try {
      const result = await pdfService.extractText(originalFile);
      
      setFiles(prev => prev.map((file, index) => {
        const ocrData = result.pages.find(p => p.page_number === index);
        return {
          ...file,
          status: 'DONE',
          exported: true,
          rawText: ocrData?.raw_text || 'No text extracted for this page.'
        };
      }));
    } catch (err) {
      console.error("OCR Extraction failed:", err);
      setFiles(prev => prev.map(f => ({ ...f, status: 'PENDING' })));
    } finally {
      setIsProcessing(false);
    }
  };

  const doneCount = files.filter(f => f.status === 'DONE').length;
  const activeCount = files.filter(f => f.status === 'OCR ACTIVE').length;
  const progress = files.length > 0 ? (doneCount / files.length) * 100 : 0;

  const handleAddCard = () => {
    // This could trigger a new upload in a real scenario
    const newFile: OCRFile = {
      id: Math.max(...files.map(f => f.id), 0) + 1,
      name: `New_Document_${files.length + 1}.pdf`,
      size: '0 KB',
      pages: 0,
      status: 'PENDING',
      exported: false
    };
    setFiles([...files, newFile]);
  };

  return (
    <>
      <div className="containerPrv mx-auto py-8">
        {/*__ Header __ */}
        <div className="mb-8">
          <span className="text-[#4f46e5] text-[13px] font-bold uppercase tracking-widest">STEP 3 OF 4</span>
          <h1 className="text-[36px] font-black text-gray-900 mt-2 mb-2">Intelligence at Work</h1>
          <p className="text-[16px] text-gray-600">Extracting structured data from your scanned PDFs.</p>
        </div>

        {/*__ Processing Status Card __ */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-[#f0f2f5] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e0e7ff] rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-[#4f46e5]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[15px]">
                  {activeCount > 0 
                    ? `Extracting ${doneCount + 1} of ${files.length} files...` 
                    : doneCount === files.length && files.length > 0
                    ? "All files processed!"
                    : `Ready to process ${files.length} files`}
                </h3>
                <p className="text-gray-500 text-[12px]">
                  {activeCount > 0 ? "Estimated time remaining: Calculating..." : "Waiting to start..."}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[36px] font-black text-[#4f46e5]">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="w-full bg-[#e5e7eb] rounded-full h-2 overflow-hidden">
            <div className="bg-[#4f46e5] h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {files.map((file, index) => (
            <div
              key={file.id}
              className={`bg-white rounded-2xl p-5 border border-[#f0f2f5] shadow-sm hover:shadow-md transition-shadow flex flex-col ${
                file.status === 'PENDING' && index === files.length - 1 ? 'border-dashed' : ''
              }`}
            >
              {/* Header with icon and status */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  file.status === 'DONE' ? 'bg-[#d1fae5] text-[#047857]' :
                  file.status === 'OCR ACTIVE' ? 'bg-[#e0e7ff] text-[#4f46e5]' :
                  'bg-[#f3f4f6] text-[#d1d5db]'
                }`}>
                  {getStatusIcon(file.status)}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest ${getStatusStyle(file.status)}`}>
                  {file.status}
                </span>
              </div>

              {/* File info */}
              <h3 className="font-bold text-gray-900 text-[14px] mb-1 line-clamp-2">{file.name}</h3>
              <p className="text-gray-500 text-[12px] mb-4">{file.size} • {file.pages} Pages</p>

              {/* Action or Progress */}
              {file.status === 'DONE' && (
                <>
                  <div className="mt-auto">
                    <p className="text-[#047857] text-[11px] font-bold uppercase tracking-widest mb-3">READY FOR EXPORT</p>
                    <button 
                      onClick={() => setSelectedText(file.rawText || null)}
                      className="text-[#4f46e5] text-[13px] font-bold flex items-center gap-2 hover:underline"
                    >
                      <Eye size={16} /> View Text
                    </button>
                  </div>
                </>
              )}

              {file.status === 'OCR ACTIVE' && (
                <div className="mt-auto">
                  <p className="text-[#4f46e5] text-[11px] font-bold uppercase tracking-widest mb-2">PARSING TABLES...</p>
                  <div className="w-full bg-[#e5e7eb] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#4f46e5] h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {['QUEUED', 'WAITING'].includes(file.status) && (
                <div className="mt-auto">
                  <p className="text-[#6b7280] text-[11px] font-bold uppercase tracking-widest">WAITING...</p>
                </div>
              )}
            </div>
          ))}

          {/* Add More to Queue Card */}
          <div
            onClick={handleAddCard}
            className="bg-white rounded-2xl p-5 border-2 border-dashed border-[#e5e7eb] shadow-sm hover:shadow-md hover:border-[#4f46e5] transition-all cursor-pointer flex items-center justify-center flex-col min-h-[200px]"
          >
            <Plus size={32} className="text-[#d1d5db] mb-2" />
            <p className="text-[#9ca3af] text-[11px] font-bold uppercase tracking-widest">ADD MORE TO QUEUE</p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex gap-4 justify-center">
          {doneCount === files.length && files.length > 0 ? (
            <button 
              onClick={() => navigate('/download', { state: { files, originalFile } })}
              className="flex items-center gap-2 bg-[#4f46e5] text-white px-8 py-3 rounded-full font-bold text-[14px] hover:bg-[#4338ca] transition-colors shadow-[0_4px_14px_rgba(79,70,229,0.39)]"
            >
              <CheckCircle2 size={18} /> CONTINUE TO DOWNLOAD
            </button>
          ) : (
            <>
              <button className="flex items-center gap-2 bg-white border border-[#f0f2f5] text-gray-700 px-6 py-2 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors">
                <Pause size={18} /> PAUSE
              </button>
              <button className="flex items-center gap-2 bg-white border border-[#f0f2f5] text-gray-700 px-6 py-2 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors">
                <Settings size={18} /> SETTINGS
              </button>
              <button className="flex items-center gap-2 bg-white border border-[#f0f2f5] text-red-600 px-6 py-2 rounded-full font-bold text-[13px] hover:bg-red-50 transition-colors">
                <X size={18} /> ABORT
              </button>
            </>
          )}
        </div>

        {/* Text Preview Modal */}
        {selectedText !== null && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-black text-gray-900">Extracted Text Content</h3>
                <button 
                  onClick={() => setSelectedText(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1 bg-white">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  {selectedText || "No text available for this selection."}
                </pre>
              </div>
              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedText);
                    alert("Text copied to clipboard!");
                  }}
                  className="px-6 py-2.5 bg-[#4f46e5] text-white rounded-full font-bold text-sm hover:bg-[#4338ca] transition-all shadow-lg"
                >
                  Copy to Clipboard
                </button>
                <button 
                  onClick={() => setSelectedText(null)}
                  className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full font-bold text-sm hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

