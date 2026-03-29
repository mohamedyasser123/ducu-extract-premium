import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Upload from './pages/Upload'
import SplitReview from './pages/SplitReview'
import OCRProcessing from './pages/OCRProcessing'
import Download from './pages/Download'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Upload />} />
          <Route path="/split" element={<SplitReview />} />
          <Route path="/ocr" element={<OCRProcessing />} />
          <Route path="/download" element={<Download />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
