import React, { useState } from 'react';
import { Sparkles, RefreshCw, Info } from 'lucide-react';
import UploadComponent from './components/UploadComponent';
import PreviewPanel from './components/PreviewPanel';
import DynamicRenderer from './components/DynamicRenderer';

function App() {
  const [uploadedData, setUploadedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleUploadSuccess = (data) => {
    console.log('✅ App received upload success with data:', data);
    console.log('📊 Data type:', typeof data);
    console.log('🔑 Data keys:', data ? Object.keys(data) : 'null');
    setUploadedData(data);
    setIsProcessing(false);
  };

  const handleUploadStart = () => {
    setIsProcessing(true);
    setUploadedData(null);
  };

  const handleReset = () => {
    setUploadedData(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">DocUI</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Transform Documents into Interactive UIs</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {uploadedData && (
                <button
                  onClick={handleReset}
                  className="btn btn-secondary flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
                >
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">New Document</span>
                  <span className="sm:hidden">New</span>
                </button>
              )}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-600 hover:text-gray-900 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
                title="App Information"
              >
                <Info className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About DocUI</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>📄 <strong>Supported formats:</strong> PDF, TXT, MD, JSON</p>
                  <p>🎨 <strong>Auto-generates:</strong> Interactive forms, dashboards, and templates</p>
                  <p>⚡ <strong>Smart caching</strong> for faster repeat processing</p>
                  <p>📥 <strong>Export:</strong> Download analysis as PDF</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full px-3 sm:px-6 lg:px-12 py-4 sm:py-8">
        {!uploadedData ? (
          // Upload State (including progress)
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {!isProcessing && (
              <div className="text-center mb-8 px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  AI-Powered Document Processing
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Upload any document and watch as AI transforms it into a clean, 
                  interactive user interface tailored to your content.
                </p>
              </div>
            )}

            <UploadComponent 
              onUploadSuccess={handleUploadSuccess}
              onUploadStart={handleUploadStart}
            />

            {/* Features */}
            {!isProcessing && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-5xl">
                {[
                  { title: 'Smart Analysis', desc: 'AI identifies document type and structure' },
                  { title: 'Dynamic UI', desc: 'Generates forms, wizards, or dashboards' },
                  { title: 'Fully Interactive', desc: 'Edit fields and execute actions' },
                  { title: 'Fast & Cached', desc: 'Lightning quick with smart caching' },
                ].map((feature, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Results State - Full Width
          <div className="w-full">
            <DynamicRenderer data={uploadedData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="w-full px-6 sm:px-8 lg:px-12 py-6 text-center text-sm text-gray-600">
          <p>
            AI-Powered Document Intelligence • Transform your documents into actionable insights
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
