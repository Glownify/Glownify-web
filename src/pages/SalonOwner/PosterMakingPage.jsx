import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import TemplateCard from '../../components/PosterMaking/TemplateCard';
import PosterPreview from '../../components/PosterMaking/PosterPreview';
import EditorPanel from '../../components/PosterMaking/EditorPanel';
import { templates, getTemplateById } from '../../data/templates';
import { parseQueryParams, saveToLocalStorage, loadFromLocalStorage } from '../../utils/posterUtils';

const PosterMakingPage = () => {
  const [searchParams] = useSearchParams();
  const posterRef = useRef(null);
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('Templates');
  const tabs = ['Overview', 'Analytics', 'Templates', 'History'];
  
  // Selected template
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  
  // Form data
  const [posterData, setPosterData] = useState({
    salonName: '',
    offerText: '',
    description: '',
    phone: '',
    backgroundUrl: null
  });
  
  // Load data on mount
  useEffect(() => {
    // First check URL params
    const urlData = parseQueryParams();
    
    if (urlData.templateId) {
      const template = getTemplateById(urlData.templateId);
      setSelectedTemplate(template);
    }
    
    // Set data from URL or localStorage
    const savedData = loadFromLocalStorage();
    
    setPosterData({
      salonName: urlData.salonName || savedData?.salonName || '',
      offerText: urlData.offerText || savedData?.offerText || '',
      description: urlData.description || savedData?.description || '',
      phone: urlData.phone || savedData?.phone || '',
      backgroundUrl: urlData.backgroundUrl || savedData?.backgroundUrl || null
    });
  }, [searchParams]);
  
  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Reset background to template default when switching
    setPosterData(prev => ({ ...prev, backgroundUrl: null }));
  };
  
  // Handle data changes
  const handleDataChange = (newData) => {
    setPosterData(newData);
  };
  
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Page Header */}
      <div className="px-8 py-6 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Poster Making</h1>
            <p className="text-sm text-slate-500 mt-1">
              Create stunning promotional posters for your salon
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-8">
        {activeTab === 'Templates' && (
          <div className="grid grid-cols-12 gap-8">
            {/* Templates Grid - Left Side */}
            <div className="col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Choose a Template
                  </h2>
                  <span className="text-sm text-slate-500">
                    {templates.length} templates available
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate.id === template.id}
                      onSelect={handleTemplateSelect}
                    />
                  ))}
                </div>
              </div>
              
              {/* Tips Section */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Pro Tips</h4>
                    <ul className="mt-1 text-sm text-blue-600 space-y-1">
                      <li>• Use high-contrast text for better readability</li>
                      <li>• Keep your offer text short and punchy</li>
                      <li>• Always include a clear call-to-action</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preview and Editor - Right Side */}
            <div className="col-span-5 space-y-6">
              {/* Live Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Live Preview
                </h2>
                <PosterPreview
                  ref={posterRef}
                  template={selectedTemplate}
                  data={posterData}
                />
              </div>
              
              {/* Editor Panel */}
              <EditorPanel
                template={selectedTemplate}
                data={posterData}
                onDataChange={handleDataChange}
                posterRef={posterRef}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'Overview' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Overview Coming Soon</h3>
            <p className="text-slate-500 mt-2">Track your poster performance and analytics here.</p>
          </div>
        )}
        
        {activeTab === 'Analytics' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">Analytics Coming Soon</h3>
            <p className="text-slate-500 mt-2">View download stats and engagement metrics.</p>
          </div>
        )}
        
        {activeTab === 'History' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">History Coming Soon</h3>
            <p className="text-slate-500 mt-2">Access your previously created posters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterMakingPage;
