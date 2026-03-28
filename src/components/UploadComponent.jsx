import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import { uploadDocument } from '../utils/api';

export default function UploadComponent({ onUploadSuccess, onUploadStart }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const acceptedTypes = '.pdf,.txt,.md,.json';
  const acceptedTypesList = ['PDF', 'TXT', 'Markdown', 'JSON'];

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!['.pdf', '.txt', '.md', '.json'].includes(extension)) {
      setError(`Invalid file type. Accepted: ${acceptedTypesList.join(', ')}`);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStage('Preparing upload...');
    onUploadStart?.();

    try {
      // Stage 1: Uploading (0-20%)
      setUploadStage('Uploading file...');
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 20) return prev + 5;
          return prev;
        });
      }, 150);

      // Wait briefly for upload feel
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Stage 2: Processing (20-40%)
      clearInterval(progressInterval);
      setUploadProgress(20);
      setUploadStage('Uploading and analyzing document with AI...');
      setUploadProgress(50);
      
      // Make the actual API call (this can take 1-2 minutes for large files)
      const response = await uploadDocument(file);
      
      console.log('🚀 Upload API response:', response);
      console.log('📦 Response.data:', response.data);
      console.log('📄 Document type in response:', response.data?.documentType);
      
      setUploadProgress(90);
      setUploadStage('Rendering interactive UI...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadProgress(100);
      setUploadStage('Complete! ✓');
      
      // Show completion briefly before displaying results
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onUploadSuccess(response.data);
    } catch (err) {
      setError(err.message || 'Failed to upload document');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStage('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Drop Zone */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragging 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center gap-3 sm:gap-4">
          {isUploading ? (
            <>
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 animate-spin" />
              <div className="w-full max-w-md space-y-3 sm:space-y-4">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Processing Your Document
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-primary-600">
                    {uploadStage}
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                  </div>
                </div>
                
                <p className="text-base font-semibold text-gray-700 text-center">
                  {uploadProgress}% Complete
                </p>
                
                {/* Stage indicators */}
                <div className="flex items-center justify-between text-xs text-gray-500 px-2">
                  <span className={uploadProgress >= 0 ? 'text-primary-600 font-medium' : ''}>Upload</span>
                  <span className={uploadProgress >= 40 ? 'text-primary-600 font-medium' : ''}>Extract</span>
                  <span className={uploadProgress >= 60 ? 'text-primary-600 font-medium' : ''}>Analyze</span>
                  <span className={uploadProgress >= 95 ? 'text-primary-600 font-medium' : ''}>Build UI</span>
                  <span className={uploadProgress >= 100 ? 'text-green-600 font-medium' : ''}>Done</span>
                </div>
                
                <div className="mt-2 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This may take 10-30 seconds for large files
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3 sm:mb-4">
                <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-primary-500 mx-auto" />
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Upload Your Document
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-4">
                  Drag and drop or click to browse
                </p>
                
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Choose File</span>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Supported: {acceptedTypesList.join(', ')} • Max 10MB
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-red-900">Upload Failed</h4>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
