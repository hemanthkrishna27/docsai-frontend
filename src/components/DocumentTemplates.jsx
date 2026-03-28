import React, { useState } from 'react';
import { 
  FileText, Code, Database, Settings, BookOpen, FileCheck, Building2,
  ChevronRight, Download, Share2, Copy, Check, ExternalLink, Play,
  Terminal, Globe, Lock, CheckCircle, AlertCircle, Clock, TrendingUp,
  BarChart3, PieChart, DollarSign, Users, Package, Shield, Zap,
  Heart, Activity, Pill, Stethoscope, Syringe, Cross, ClipboardList,
  CreditCard, Receipt, Wallet, Building, Landmark, TrendingDown,
  FileSignature, Home, Scale, GraduationCap, Award, BookOpenCheck,
  Briefcase, UserCheck, Badge, Banknote, Calendar, Mail
} from 'lucide-react';

// API Documentation Template
export function ApiDocsTemplate({ data }) {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  // Safety check
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* API Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-4">
          <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl">
            <Code className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">{data.documentTitle}</h1>
            <p className="text-xs text-blue-100 mt-1 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="bg-white bg-opacity-20 rounded-lg px-3 sm:px-4 py-2">
            <div className="text-xs sm:text-sm text-blue-100">Version</div>
            <div className="text-lg sm:text-xl font-bold">v2.0</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg px-3 sm:px-4 py-2">
            <div className="text-xs sm:text-sm text-blue-100">Endpoints</div>
            <div className="text-lg sm:text-xl font-bold">{data.schema.sections?.length || '—'}</div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-blue-600" />
            {section.title}
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {section.items?.map((endpoint, i) => (
              <div key={i} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold ${endpoint.badge === 'GET' ? 'bg-green-100 text-green-700' :
                      endpoint.badge === 'POST' ? 'bg-blue-100 text-blue-700' :
                      endpoint.badge === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                      endpoint.badge === 'DELETE' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'}`}>
                      {endpoint.badge || 'API'}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">{endpoint.title}</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(endpoint.value, i)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copiedEndpoint === i ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 mb-3">
                  <code className="text-green-400 font-mono text-sm break-all">{endpoint.value}</code>
                </div>
                <p className="text-xs text-gray-700 mb-3 text-justify">{endpoint.description}</p>
                {endpoint.details && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-xs text-gray-700 text-justify">{endpoint.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Financial Report Template
export function ReportTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Report Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-emerald-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{data.documentTitle}</h1>
              <p className="text-xs text-gray-700 mt-2 text-justify line-clamp-3">{data.summary}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        {data.schema.hero?.stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            {data.schema.hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-2xl text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-gray-200">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-gray-200">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <PieChart className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {section.items?.map((item, i) => (
              <div key={i} className="bg-gradient-to-r from-gray-50 to-white border-l-4 border-emerald-500 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* If value exists, show title as label and value as main content */}
                    {item.value ? (
                      <>
                        <div className="text-xl font-semibold text-gray-700 mb-1">{item.title}</div>
                        <div className="text-sm text-gray-900 mb-2 text-justify">{item.value}</div>
                        {item.description && (
                          <p className="text-xs text-gray-700 text-justify">{item.description}</p>
                        )}
                      </>
                    ) : (
                      /* Otherwise, show title as main heading */
                      <>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-xs text-gray-700 mb-3 text-justify">{item.description}</p>
                      </>
                    )}
                  </div>
                  {item.progress && (
                    <div className="ml-4">
                      <div className="w-24 h-24 rounded-full border-8 border-emerald-200 flex items-center justify-center">
                        <span className="text-2xl font-bold text-emerald-600">{item.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>
                {item.details && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-700 text-justify">{item.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Setup Guide/Tutorial Template
export function SetupGuideTemplate({ data }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const toggleStep = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Guide Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">{data.documentTitle}</h1>
            <p className="text-xs text-purple-100 mt-2 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 bg-white bg-opacity-20 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-bold">{completedSteps.size} / {data.schema.sections?.[0]?.items?.length || 0}</span>
          </div>
          <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.size / (data.schema.sections?.[0]?.items?.length || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h3>
          <div className="space-y-4">
            {section.items?.map((step, i) => {
              const stepId = `${idx}-${i}`;
              const isCompleted = completedSteps.has(stepId);
              
              return (
                <div key={i} className={`border-2 rounded-xl p-6 transition-all ${isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-purple-400'}`}>
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleStep(stepId)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-purple-500'}`}
                    >
                      {isCompleted ? <Check className="w-5 h-5 text-white" /> : <span className="font-bold text-gray-400">{i + 1}</span>}
                    </button>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-700 mb-3 text-justify">{step.description}</p>
                      {step.value && (
                        <div className="bg-gray-900 rounded-lg p-4 mt-3">
                          <code className="text-green-400 font-mono text-sm">{step.value}</code>
                        </div>
                      )}
                      {step.details && (
                        <div className="mt-3 bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                          <p className="text-xs text-gray-700 text-justify">{step.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Configuration/Technical Spec Template
export function ConfigTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Config Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl flex-shrink-0">
            <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">{data.documentTitle}</h1>
            <p className="text-xs text-slate-300 mt-2 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
      </div>

      {/* Configuration Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card border-2 border-slate-200">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-slate-200">
            <Database className="w-8 h-8 text-slate-600" />
            <h3 className="text-3xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {section.items?.map((config, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-slate-400 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-lg font-bold text-slate-900 bg-slate-200 px-3 py-1 rounded">{config.title}</code>
                      {config.badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded">{config.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 text-justify">{config.description}</p>
                  </div>
                </div>
                {config.value && (
                  <div className="bg-slate-900 rounded-lg p-4 mt-3">
                    <code className="text-green-400 font-mono text-sm break-all">{config.value}</code>
                  </div>
                )}
                {config.details && (
                  <div className="mt-3 text-sm text-slate-600 bg-white border border-slate-200 p-3 rounded">
                    {config.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// User Manual Template
export function UserManualTemplate({ data }) {
  const [activeSection, setActiveSection] = useState(0);
  
  if (!data || !data.schema || !data.schema.sections) {
    return <div className="card">No data available to display</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Table of Contents */}
      <div className="lg:col-span-1">
        <div className="card sticky top-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contents
          </h3>
          <nav className="space-y-2">
            {data.schema.sections?.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeSection === idx ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Manual Content */}
      <div className="lg:col-span-3 space-y-4 sm:space-y-6">
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="flex items-center gap-2 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl flex-shrink-0">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{data.documentTitle}</h1>
              <p className="text-xs text-gray-700 mt-1 text-justify line-clamp-2">{data.summary}</p>
            </div>
          </div>
        </div>

        {data.schema.sections?.map((section, idx) => (
          <div key={idx} className={activeSection === idx ? 'block' : 'hidden'}>
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <div className="space-y-6">
                {section.items?.map((item, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed mb-4 text-justify">{item.description}</p>
                    {item.details && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                        <p className="text-xs text-gray-700 text-justify">{item.details}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Legal Document Template
export function LegalTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Legal Header */}
      <div className="card border-2 border-gray-300">
        <div className="flex items-center gap-2 sm:gap-4 mb-4 pb-4 border-b-2 border-gray-200">
          <div className="p-2 sm:p-3 bg-gray-800 rounded-lg sm:rounded-xl flex-shrink-0">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{data.documentTitle}</h1>
            <p className="text-xs text-gray-700 mt-1 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 rounded">
          <p className="text-xs text-gray-700 text-justify">
            <strong>Legal Notice:</strong> This is a legally binding document. Please read carefully.
          </p>
        </div>
      </div>

      {/* Legal Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
            {idx + 1}. {section.title}
          </h3>
          <div className="space-y-4">
            {section.items?.map((clause, i) => (
              <div key={i} className="pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  {idx + 1}.{i + 1} {clause.title}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed text-justify">{clause.description}</p>
                {clause.details && (
                  <p className="text-xs text-gray-700 mt-2 italic text-justify">{clause.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Medical Report Template (🏥 Health-focused design)
export function MedicalReportTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Medical Header */}
      <div className="bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-red-600 rounded-lg sm:rounded-xl flex-shrink-0">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{data.documentTitle}</h1>
            <p className="text-xm text-gray-700 mt-2 text-justify line-clamp-2 ">{data.summary}</p>
          </div>
        </div>
        
        {/* Patient Vitals/Stats */}
        {data.schema.hero?.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {data.schema.hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-red-200">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-semibold text-gray-700">{stat.label}</span>
                </div>
                <div className="text-lg font-bold text-red-700">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medical Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-red-100">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-red-100">
            <div className="p-2 bg-red-100 rounded-lg">
              <Stethoscope className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {section.items?.map((item, i) => (
              <div key={i} className="bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500 rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 rounded">{item.badge}</span>
                      )}
                    </div>
                    {item.value && (
                      <div className="text-xm text-gray-900 mb-2 text-justify">{item.value}</div>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-700 text-justify">{item.description}</p>
                    )}
                    {item.details && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-xs text-gray-700 text-justify">{item.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Financial Document Template (💰 Banking/Finance design)
export function FinancialTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Financial Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl flex-shrink-0">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{data.documentTitle}</h1>
            <p className="text-xs text-green-100 mt-2 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
        
        {/* Financial Summary */}
        {data.schema.hero?.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {data.schema.hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Banknote className="w-4 h-4" />
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-green-200">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-green-200">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="space-y-3">
            {section.items?.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-bold text-gray-900">{item.title}</h4>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        item.badge === 'Credit' || item.badge === 'Deposit' ? 'bg-green-100 text-green-700' : 
                        item.badge === 'Debit' || item.badge === 'Withdrawal' ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>{item.badge}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{item.description}</p>
                  {item.details && (
                    <p className="text-xs text-gray-600 mt-1">{item.details}</p>
                  )}
                </div>
                {item.value && (
                  <div className="text-right ml-4">
                    <div className={`text-xl font-bold ${
                      item.value.startsWith('+') || item.value.startsWith('$') ? 'text-green-700' : 
                      item.value.startsWith('-') ? 'text-red-700' : 'text-gray-900'
                    }`}>{item.value}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Insurance Policy Template (🛡️ Coverage-focused design)
export function InsuranceTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Insurance Header */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl flex-shrink-0">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{data.documentTitle}</h1>
            <p className="text-xs text-blue-100 mt-2 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
        
        {/* Coverage Stats */}
        {data.schema.hero?.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {data.schema.hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-3">
                <span className="text-xs font-medium block mb-1">{stat.label}</span>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Policy Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-blue-200">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {section.items?.map((item, i) => (
              <div key={i} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                    {item.value && (
                      <div className="text-base font-semibold text-blue-700 mb-2">{item.value}</div>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-700 text-justify">{item.description}</p>
                    )}
                    {item.details && (
                      <p className="text-xs text-gray-600 mt-2 italic">{item.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Identity Document Template (🆔 ID/Verification design)
export function IdentityTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ID Card Style Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-xl flex-shrink-0">
            <Badge className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-white opacity-80 mb-1">OFFICIAL DOCUMENT</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{data.documentTitle}</h1>
            <p className="text-xs text-white opacity-90">{data.summary}</p>
          </div>
        </div>

        {/* ID Details Grid */}
        {data.schema.hero?.stats && (
          <div className="bg-white bg-opacity-10 rounded-lg p-4 mt-4 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4">
              {data.schema.hero.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-xs font-medium opacity-80">{stat.label}</div>
                  <div className="text-base font-bold mt-1">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Identity Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-indigo-200">{section.title}</h3>
          <div className="space-y-3">
            {section.items?.map((item, i) => (
              <div key={i} className="flex items-start p-4 bg-indigo-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-indigo-900 mb-1">{item.title}</div>
                  <div className="text-base font-bold text-gray-900">{item.value || item.description}</div>
                  {item.value && item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                  {item.details && (
                    <p className="text-xs text-gray-600 mt-2">{item.details}</p>
                  )}
                </div>
                {item.badge && (
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">{item.badge}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Property/Legal Document Template (🏠 Real estate design)
export function PropertyTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Property Header */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-amber-600 rounded-lg sm:rounded-xl flex-shrink-0">
            <Home className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{data.documentTitle}</h1>
            <p className="text-xs text-gray-700 mt-2 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
        
        {data.schema.hero?.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {data.schema.hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-amber-200">
                <span className="text-xs font-semibold text-gray-700 block mb-1">{stat.label}</span>
                <div className="text-lg font-bold text-amber-700">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Property Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-amber-200">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-amber-200">
            <Scale className="w-6 h-6 text-amber-600" />
            <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="space-y-4">
            {section.items?.map((item, i) => (
              <div key={i} className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                {item.value && (
                  <div className="text-base font-semibold text-amber-900 mb-2">{item.value}</div>
                )}
                {item.description && (
                  <p className="text-sm text-gray-700 text-justify leading-relaxed">{item.description}</p>
                )}
                {item.details && (
                  <div className="mt-3 p-3 bg-white border border-amber-200 rounded text-xs text-gray-700">
                    {item.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Educational Certificate Template (🎓 Academic design)
export function EducationalTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Academic Header */}
      <div className="bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 border-4 border-violet-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200 rounded-full -ml-12 -mb-12 opacity-50"></div>
        
        <div className="relative">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-violet-600 rounded-full">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">{data.documentTitle}</h1>
          <p className="text-sm text-center text-gray-700 max-w-2xl mx-auto">{data.summary}</p>
          
          {data.schema.hero?.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {data.schema.hero.stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 text-center shadow-sm border border-violet-200">
                  <div className="text-xs font-semibold text-violet-700 mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Academic Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-violet-200">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-violet-200">
            <Award className="w-6 h-6 text-violet-600" />
            <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items?.map((item, i) => (
              <div key={i} className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-violet-100 rounded-lg flex-shrink-0">
                    <BookOpenCheck className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                    {item.value && (
                      <div className="text-lg font-semibold text-violet-700 mb-2">{item.value}</div>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-700">{item.description}</p>
                    )}
                    {item.badge && (
                      <span className="inline-block mt-2 px-2 py-1 bg-violet-600 text-white text-xs font-bold rounded">{item.badge}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Employment Document Template (💼 Professional design)
export function EmploymentTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl flex-shrink-0">
            <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{data.documentTitle}</h1>
            <p className="text-xs text-gray-300 mt-2 text-justify line-clamp-2">{data.summary}</p>
          </div>
        </div>
        
        {data.schema.hero?.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {data.schema.hero.stats.map((stat, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-3">
                <span className="text-xs font-medium block mb-1">{stat.label}</span>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Employment Sections */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card bg-white border-2 border-slate-200">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-slate-200">
            <UserCheck className="w-6 h-6 text-slate-700" />
            <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="space-y-4">
            {section.items?.map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 border-l-4 border-slate-700 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                    {item.value && (
                      <div className="text-base font-semibold text-slate-700 mb-2">{item.value}</div>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-700 text-justify">{item.description}</p>
                    )}
                    {item.details && (
                      <p className="text-xs text-gray-600 mt-2">{item.details}</p>
                    )}
                  </div>
                  {item.badge && (
                    <span className="px-3 py-1 bg-slate-700 text-white text-xs font-bold rounded ml-3">{item.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Business Invoice Template (📄 Invoice/Receipt design)
export function InvoiceTemplate({ data }) {
  if (!data || !data.schema) {
    return <div className="card">No data available to display</div>;
  }
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Invoice Header */}
      <div className="card border-2 border-gray-300">
        <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-gray-300">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.documentTitle}</h1>
            <p className="text-sm text-gray-700">{data.summary}</p>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <Receipt className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {data.schema.hero?.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.schema.hero.stats.map((stat, idx) => (
              <div key={idx} className="p-3 bg-gray-100 rounded-lg">
                <div className="text-xs font-semibold text-gray-600 mb-1">{stat.label}</div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Items */}
      {data.schema.sections?.map((section, idx) => (
        <div key={idx} className="card border-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="text-left p-3 text-sm font-bold text-gray-900">Item</th>
                  <th className="text-right p-3 text-sm font-bold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody>
                {section.items?.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      {item.description && (
                        <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="font-bold text-gray-900">{item.value}</div>
                      {item.badge && (
                        <span className="inline-block mt-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">{item.badge}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
