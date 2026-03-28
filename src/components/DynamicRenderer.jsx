import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FileText, 
  Edit2, 
  Save, 
  Play, 
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  List,
  LayoutGrid,
  Eye,
  ExternalLink,
  Download,
  Share2,
  Heart,
  Star,
  TrendingUp,
  Code,
  Database,
  Settings,
  Users,
  AlertCircle,
  Info,
  Zap,
  Lock,
  Unlock,
  X,
  Maximize2
} from 'lucide-react';

// Import specialized templates
import { 
  ApiDocsTemplate, 
  ReportTemplate, 
  SetupGuideTemplate, 
  ConfigTemplate,
  UserManualTemplate,
  LegalTemplate,
  MedicalReportTemplate,
  FinancialTemplate,
  InsuranceTemplate,
  IdentityTemplate,
  PropertyTemplate,
  EducationalTemplate,
  EmploymentTemplate,
  InvoiceTemplate
} from './DocumentTemplates';

// Form Renderer
function FormRenderer({ schema, onAction }) {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAction?.('submit', formData);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary-600" />
          Generated Form
        </h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-secondary text-sm flex items-center gap-2"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          {isEditing ? 'Lock' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {schema.fields?.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                disabled={!isEditing}
                className="input"
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                required={field.required}
                disabled={!isEditing}
                className="input"
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                disabled={!isEditing}
                className="input"
              />
            )}
          </div>
        ))}

        {schema.actions && (
          <div className="flex gap-3 pt-4">
            {schema.actions.map((action, idx) => (
              <button
                key={idx}
                type={action.label.toLowerCase() === 'submit' ? 'submit' : 'button'}
                className={`btn ${action.type === 'primary' ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
                onClick={() => action.label.toLowerCase() !== 'submit' && onAction?.(action.label.toLowerCase(), formData)}
              >
                <Play className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

// Wizard Renderer
function WizardRenderer({ schema, onAction }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = schema.steps || [];
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onAction?.('complete', formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Step {currentStep + 1} of {steps.length}: {currentStepData?.title}
        </h3>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {currentStepData?.description && (
        <p className="text-gray-600 mb-6">{currentStepData.description}</p>
      )}

      <div className="space-y-4 mb-6">
        {currentStepData?.fields?.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type || 'text'}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="input"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="btn btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="btn btn-primary flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Complete
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Interactive Card Component
function InteractiveCard({ item, index, onCardClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getIconComponent = (iconName) => {
    const icons = {
      FileText, Edit2, Save, Play, CheckCircle, List, LayoutGrid, Eye,
      TrendingUp, Code, Database, Settings, Users, AlertCircle, Info,
      Zap, ExternalLink, Download, Share2
    };
    return icons[iconName] || FileText;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-50 to-blue-100 border-blue-300 hover:border-blue-400 text-blue-700',
      green: 'from-green-50 to-green-100 border-green-300 hover:border-green-400 text-green-700',
      purple: 'from-purple-50 to-purple-100 border-purple-300 hover:border-purple-400 text-purple-700',
      orange: 'from-orange-50 to-orange-100 border-orange-300 hover:border-orange-400 text-orange-700',
      red: 'from-red-50 to-red-100 border-red-300 hover:border-red-400 text-red-700',
      yellow: 'from-yellow-50 to-yellow-100 border-yellow-300 hover:border-yellow-400 text-yellow-700',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-300 hover:border-indigo-400 text-indigo-700',
      pink: 'from-pink-50 to-pink-100 border-pink-300 hover:border-pink-400 text-pink-700',
    };
    return colors[color] || 'from-gray-50 to-gray-100 border-gray-300 hover:border-gray-400 text-gray-700';
  };

  const IconComponent = getIconComponent(item.icon);
  const colorClass = getColorClasses(item.color);

  return (
    <div 
      className={`relative group bg-gradient-to-br ${colorClass} border-2 rounded-2xl transition-all duration-300 hover:shadow-xl sm:hover:scale-[1.02] cursor-pointer overflow-hidden min-h-[200px]`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => {
        setIsExpanded(!isExpanded);
        onCardClick?.(item);
      }}
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-bl-full"></div>
      
      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white bg-opacity-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-8 h-8" />
          </div>
          
          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="px-3 py-1 text-xs font-bold bg-white rounded-full shadow-sm animate-pulse">
                {item.badge}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className="p-2 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-all"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
        
        <h4 className="font-bold text-2xl mb-3 group-hover:text-gray-900 transition-colors break-words leading-tight">
          {item.title}
        </h4>
        
        {item.description && (
          <p className="text-base opacity-90 mb-4 line-clamp-4 break-words leading-relaxed">
            {item.description}
          </p>
        )}
        
        {item.value && (
          <div className="text-4xl font-extrabold mt-4 mb-3 break-words">
            {item.value}
          </div>
        )}

        {/* Action buttons appear on hover */}
        <div className="flex flex-wrap gap-2 mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.action && (
            <button className="px-4 py-2 bg-white text-sm font-medium rounded-lg hover:shadow-md transition-all flex-shrink-0">
              {item.action}
            </button>
          )}
          <button className="p-2 bg-white rounded-lg hover:shadow-md transition-all flex-shrink-0" title="Open">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white rounded-lg hover:shadow-md transition-all flex-shrink-0" title="Share">
            <Share2 className="w-4 h-4" />
          </button>
          {item.details && (
            <button className="ml-auto px-3 py-2 bg-white text-xs font-semibold rounded-lg hover:shadow-md transition-all flex items-center gap-1" title={isExpanded ? "Show less" : "Show more"}>
              {isExpanded ? 'Less' : 'More'}
              <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>

        {/* Expandable content */}
        {isExpanded && item.details && (
          <div className="mt-5 pt-5 border-t-2 border-white border-opacity-40 animate-fadeIn">
            <p className="text-base leading-relaxed break-words">{item.details}</p>
          </div>
        )}
      </div>

      {/* Progress bar if applicable */}
      {item.progress && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-30">
          <div 
            className="h-full bg-white transition-all duration-1000"
            style={{ width: `${item.progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

// Dashboard Renderer with Enhanced Visuals
function DashboardRenderer({ schema }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getIconComponent = (iconName) => {
    const icons = {
      FileText, Edit2, Save, Play, CheckCircle, List, LayoutGrid, Eye,
      TrendingUp, Code, Database, Settings, Users, AlertCircle
    };
    return icons[iconName] || FileText;
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    };
    return colors[color] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      {schema.hero && (
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 break-words">
              {schema.hero.title}
            </h2>
            {schema.hero.subtitle && (
              <p className="text-lg text-gray-700 break-words max-w-3xl mx-auto">{schema.hero.subtitle}</p>
            )}
          </div>

          {schema.hero.stats && schema.hero.stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {schema.hero.stats.map((stat, idx) => {
                const IconComponent = getIconComponent(stat.icon);
                return (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                    <IconComponent className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-gray-900 break-words mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 break-words">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Sections */}
      {schema.sections?.map((section) => (
        <div key={section.id} className="card">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-primary-600" />
            {section.title}
          </h3>

          {section.type === 'cards' && (
            <div className={`grid gap-6 ${
              section.layout === 'grid' 
                ? 'grid-cols-1' 
                : 'grid-cols-1'
            }`}>
              {section.items?.map((item, idx) => (
                <InteractiveCard 
                  key={idx} 
                  item={item} 
                  index={idx}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          )}

          {section.type === 'list' && (
            <ul className="space-y-3">
              {section.items?.map((item, idx) => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <li key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <IconComponent className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{item.title}</h5>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                      {item.value && (
                        <p className="text-primary-600 font-medium mt-2">{item.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {section.type === 'table' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {section.items?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                      <td className="px-4 py-3 text-gray-600">{item.description}</td>
                      {item.value && (
                        <td className="px-4 py-3 text-primary-600 font-medium">{item.value}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* Modal for card details */}
      {showModal && selectedCard && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-4 sm:p-6 max-w-lg w-full shadow-2xl transform animate-scaleIn max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-2">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">{selectedCard.title}</h3>
                {selectedCard.badge && (
                  <span className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                    {selectedCard.badge}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm sm:text-base text-gray-700 mb-4 break-words">{selectedCard.description}</p>
            
            {selectedCard.value && (
              <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl mb-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 break-all">{selectedCard.value}</div>
              </div>
            )}

            {selectedCard.details && (
              <div className="text-sm text-gray-600 mb-4 break-words">{selectedCard.details}</div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="flex-1 btn btn-primary flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Open</span>
              </button>
              <button className="btn btn-secondary flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="btn btn-secondary flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Viewer Renderer
function ViewerRenderer({ schema }) {
  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Eye className="w-6 h-6 text-primary-600" />
          Document Viewer
        </h3>
      </div>

      {schema.sections?.map((section) => (
        <div key={section.id} className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {section.title}
          </h4>

          {section.type === 'code' ? (
            <pre className="text-sm whitespace-pre-wrap bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{section.content}</code>
            </pre>
          ) : section.type === 'list' ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {section.content?.split('\n').map((line, idx) => (
                line.trim() && <li key={idx}>{line}</li>
              ))}
            </ul>
          ) : (
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Main Dynamic Renderer with Document Type Routing
export default function DynamicRenderer({ data }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef(null);

  const handleAction = (action, formData) => {
    console.log('Action:', action, 'Data:', formData);
    // Here you could send data to backend, show notification, etc.
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsDownloading(true);
    try {
      // Create a hidden container for PDF with proper layout
      const pdfContainer = document.createElement('div');
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      pdfContainer.style.top = '0';
      pdfContainer.style.width = '210mm';
      pdfContainer.style.backgroundColor = 'white';
      pdfContainer.style.padding = '20px';
      pdfContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      // Clone and restructure content for PDF
      const sidebar = contentRef.current.querySelector('.lg\\:w-80');
      const mainContent = contentRef.current.querySelector('.flex-1');
      
      if (sidebar) {
        const sidebarClone = sidebar.cloneNode(true);
        sidebarClone.style.width = '100%';
        sidebarClone.style.marginBottom = '20px';
        pdfContainer.appendChild(sidebarClone);
      }
      
      if (mainContent) {
        const contentClone = mainContent.cloneNode(true);
        contentClone.style.width = '100%';
        pdfContainer.appendChild(contentClone);
      }
      
      // Add to body temporarily
      document.body.appendChild(pdfContainer);
      
      const fileName = `${data.documentTitle || data.fileInfo?.name?.replace(/\.[^/.]+$/, '') || 'document'}_analysis.pdf`;
      
      // Create canvas from the PDF-optimized container
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
      });
      
      // Calculate dimensions for A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      
      // Add image to PDF (split into pages if needed)
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add new pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(fileName);
      
      // Clean up
      document.body.removeChild(pdfContainer);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!data) {
    return (
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-red-600">No Data Received</h2>
        <p className="text-gray-600 mt-2">DynamicRenderer did not receive any data.</p>
      </div>
    );
  }

  const { uiType, schema, documentType, documentTitle, summary, keyFindings, metadata, fileInfo, processingTime } = data;

  // Debug logging
  console.log('🔍 DynamicRenderer received data:', data);
  console.log('📄 Document Type:', documentType);
  console.log('🎨 UI Type:', uiType);
  console.log('📦 Schema exists:', !!schema);

  // Document type badge colors
  const docTypeConfig = {
    api_docs: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'API Documentation' },
    report: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Report' },
    setup_guide: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Setup Guide' },
    config: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Configuration' },
    technical_spec: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Technical Spec' },
    user_manual: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'User Manual' },
    legal: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Legal Document' },
    general: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'General' },
  };

  const docConfig = docTypeConfig[documentType] || docTypeConfig.general;

  // Sidebar with document metadata
  const Sidebar = () => (
    <div className="w-full lg:w-80 flex-shrink-0 space-y-4 lg:sticky lg:top-4 h-fit">
      {/* Document Type Badge */}
      <div className="card">
        <div className={`inline-flex items-center px-4 py-2 rounded-lg ${docConfig.bg} ${docConfig.text} font-semibold text-sm mb-4`}>
          <FileText className="w-4 h-4 mr-2" />
          {docConfig.label}
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3">{documentTitle || 'Document'}</h2>
        
        {summary && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Summary</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </div>
        )}
      </div>

      {/* Key Findings */}
      {keyFindings && keyFindings.length > 0 && (
        <div className="card">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Key Findings
          </h3>
          <ul className="space-y-2">
            {keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* File Info */}
      {fileInfo && (
        <div className="card">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            File Information
          </h3>
          <div className="space-y-2 text-sm">
            {fileInfo.name && (
              <div className="flex justify-between">
                <span className="text-gray-600">File:</span>
                <span className="text-gray-900 font-medium truncate ml-2 max-w-[180px]" title={fileInfo.name}>
                  {fileInfo.name}
                </span>
              </div>
            )}
            {fileInfo.size && (
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="text-gray-900 font-medium">{(fileInfo.size / 1024).toFixed(2)} KB</span>
              </div>
            )}
            {processingTime && (
              <div className="flex justify-between">
                <span className="text-gray-600">Processing:</span>
                <span className="text-gray-900 font-medium">{(processingTime / 1000).toFixed(1)}s</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Metadata Tags */}
      {metadata?.tags && metadata.tags.length > 0 && (
        <div className="card">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Get template content
  let templateContent;
  switch(documentType) {
    // Technical Documentation
    case 'api_docs':
    case 'api_reference':
      templateContent = <ApiDocsTemplate data={data} />;
      break;
    case 'setup_guide':
    case 'tutorial':
    case 'quickstart':
    case 'deployment_guide':
      templateContent = <SetupGuideTemplate data={data} />;
      break;
    case 'config':
    case 'technical_spec':
      templateContent = <ConfigTemplate data={data} />;
      break;
    case 'user_manual':
    case 'admin_guide':
    case 'troubleshooting':
      templateContent = <UserManualTemplate data={data} />;
      break;
    
    // Medical Documents
    case 'medical_report':
    case 'prescription':
    case 'discharge_summary':
    case 'vaccination_certificate':
      templateContent = <MedicalReportTemplate data={data} />;
      break;
    
    // Financial Documents
    case 'financial_report':
    case 'bank_statement':
    case 'salary_slip':
    case 'tax_return':
    case 'investment_record':
      templateContent = <FinancialTemplate data={data} />;
      break;
    
    // Insurance Documents
    case 'insurance_policy':
    case 'insurance_claim':
    case 'premium_receipt':
      templateContent = <InsuranceTemplate data={data} />;
      break;
    
    // Identity Documents
    case 'identity_document':
    case 'passport':
    case 'drivers_license':
    case 'national_id':
    case 'birth_certificate':
      templateContent = <IdentityTemplate data={data} />;
      break;
    
    // Property & Legal Documents
    case 'property_deed':
    case 'rental_agreement':
    case 'sale_agreement':
    case 'legal':
    case 'contract':
      templateContent = <PropertyTemplate data={data} />;
      break;
    
    // Educational Documents
    case 'educational_certificate':
    case 'degree':
    case 'transcript':
    case 'training_certificate':
      templateContent = <EducationalTemplate data={data} />;
      break;
    
    // Employment Documents
    case 'employment_contract':
    case 'offer_letter':
    case 'experience_letter':
    case 'resume':
      templateContent = <EmploymentTemplate data={data} />;
      break;
    
    // Business Documents
    case 'invoice':
    case 'receipt':
    case 'business_license':
    case 'meeting_notes':
      templateContent = <InvoiceTemplate data={data} />;
      break;
    
    // Reports & Papers
    case 'business_report':
    case 'research_paper':
    case 'whitepaper':
    case 'report':
      templateContent = <ReportTemplate data={data} />;
      break;
    
    // General & Fallback
    case 'general':
    default:
      templateContent = (
        <div className="w-full">
          {uiType === 'form' && <FormRenderer schema={schema} onAction={handleAction} />}
          {uiType === 'wizard' && <WizardRenderer schema={schema} onAction={handleAction} />}
          {uiType === 'dashboard' && <DashboardRenderer schema={schema} />}
          {uiType === 'viewer' && <ViewerRenderer schema={schema} />}
          {!['form', 'wizard', 'dashboard', 'viewer'].includes(uiType) && <DashboardRenderer schema={schema} />}
        </div>
      );
  }

  // Two-column layout with sidebar and content
  return (
    <div className="w-full">
      {/* Download PDF Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="btn btn-primary flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
        </button>
      </div>

      {/* Content to be exported to PDF */}
      <div ref={contentRef} className="bg-white rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {templateContent}
          </div>
        </div>
      </div>
    </div>
  );
}
