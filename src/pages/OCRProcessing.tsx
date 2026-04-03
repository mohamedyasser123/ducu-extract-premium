import { useState } from 'react';
import { FileText, Eye, Pause, Settings, X, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const initialMockFiles = [
  { id: 1, name: 'Invoices_Q3_Final.pdf', size: '1.2 MB', pages: 4, status: 'DONE', exported: true },
  { id: 2, name: 'Contract_Alpha_v2.pdf', size: '840 KB', pages: 12, status: 'DONE', exported: true },
  { id: 3, name: 'Annual_Report_2023...', size: '4.5 MB', pages: 48, status: 'OCR ACTIVE', exported: false },
  { id: 4, name: 'Legal_Notice_DE.pdf', size: '215 KB', pages: 1, status: 'QUEUED', exported: false },
  { id: 5, name: 'Tax_Returns_John.pdf', size: '720 KB', pages: 3, status: 'PENDING', exported: false },
  { id: 6, name: 'Lease_Agreement.pdf', size: '1.1 MB', pages: 6, status: 'PENDING', exported: false },
  { id: 7, name: 'ID_Front_Scan.pdf', size: '140 KB', pages: 1, status: 'PENDING', exported: false },
];

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
  const [files, setFiles] = useState(initialMockFiles);

  const handleAddCard = () => {
    const newFile = {
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
                <h3 className="font-bold text-gray-900 text-[15px]">Extracting 3 of 12 files...</h3>
                <p className="text-gray-500 text-[12px]">Estimated time remaining: 45 seconds</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[36px] font-black text-[#4f46e5]">25%</span>
            </div>
          </div>
          <div className="w-full bg-[#e5e7eb] rounded-full h-2 overflow-hidden">
            <div className="bg-[#4f46e5] h-full rounded-full" style={{ width: '25%' }}></div>
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
                    <button className="text-[#4f46e5] text-[13px] font-bold flex items-center gap-2 hover:underline">
                      <Eye size={16} /> View
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
          <button className="flex items-center gap-2 bg-white border border-[#f0f2f5] text-gray-700 px-6 py-2 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors">
            <Pause size={18} /> PAUSE
          </button>
          <button className="flex items-center gap-2 bg-white border border-[#f0f2f5] text-gray-700 px-6 py-2 rounded-full font-bold text-[13px] hover:bg-gray-50 transition-colors">
            <Settings size={18} /> SETTINGS
          </button>
          <button className="flex items-center gap-2 bg-white border border-[#f0f2f5] text-red-600 px-6 py-2 rounded-full font-bold text-[13px] hover:bg-red-50 transition-colors">
            <X size={18} /> ABORT
          </button>
        </div>
      </div>
    </>
  );
}

