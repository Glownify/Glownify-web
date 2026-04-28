import React, { useRef, useState } from 'react';
import { backgroundOptions } from '../../data/templates';
import { downloadPoster, generateShareableURL, validatePosterData, saveToLocalStorage, getCharacterCount } from '../../utils/posterUtils';
import toast from 'react-hot-toast';

const EditorPanel = ({ template, data, onDataChange, posterRef }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleInputChange = (field, value) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
    
    // Auto-save to localStorage
    saveToLocalStorage({ ...newData, templateId: template.id });
  };
  
  const handleBackgroundSelect = (url) => {
    handleInputChange('backgroundUrl', url);
  };
  
  const handleDownload = async () => {
    console.log('Download clicked!');
    console.log('posterRef.current:', posterRef.current);
    
    if (!posterRef.current) {
      toast.error('Preview not ready - ref is null');
      console.error('posterRef.current is null');
      return;
    }
    
    // Validate
    const validation = validatePosterData(data);
    console.log('Validation:', validation);
    
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }
    
    setIsDownloading(true);
    
    try {
      const filename = `poster-${template.id}-${Date.now()}.png`;
      console.log('Starting download with element:', posterRef.current);
      const success = await downloadPoster(posterRef.current, filename);
      
      if (success) {
        toast.success('Poster downloaded successfully!');
      } else {
        toast.error('Failed to download poster');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Error: ' + error.message);
    }
    
    setIsDownloading(false);
  };
  
  const handleShare = () => {
    const url = generateShareableURL({ ...data, templateId: template.id });
    navigator.clipboard.writeText(window.location.origin + url);
    toast.success('Shareable link copied to clipboard!');
  };
  
  // Character counts
  const salonCount = getCharacterCount(data.salonName, 50);
  const offerCount = getCharacterCount(data.offerText, 100);
  const descCount = getCharacterCount(data.description, 200);
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'content'
              ? 'text-rose-500 border-b-2 border-rose-500 bg-rose-50/50'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('background')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'background'
              ? 'text-rose-500 border-b-2 border-rose-500 bg-rose-50/50'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Background
        </button>
      </div>
      
      <div className="p-5">
        {activeTab === 'content' ? (
          <div className="space-y-4">
            {/* Salon Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Salon Name
                <span className={`ml-2 text-xs ${salonCount.isOver ? 'text-red-500' : 'text-slate-400'}`}>
                  {salonCount.current}/{salonCount.max}
                </span>
              </label>
              <input
                type="text"
                value={data.salonName}
                onChange={(e) => handleInputChange('salonName', e.target.value)}
                placeholder="Enter salon name"
                maxLength={50}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
              />
            </div>
            
            {/* Offer Text */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Offer Text
                <span className={`ml-2 text-xs ${offerCount.isOver ? 'text-red-500' : 'text-slate-400'}`}>
                  {offerCount.current}/{offerCount.max}
                </span>
              </label>
              <input
                type="text"
                value={data.offerText}
                onChange={(e) => handleInputChange('offerText', e.target.value)}
                placeholder="e.g., 40% OFF"
                maxLength={100}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">
                Main headline for your poster
              </p>
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
                <span className={`ml-2 text-xs ${descCount.isOver ? 'text-red-500' : 'text-slate-400'}`}>
                  {descCount.current}/{descCount.max}
                </span>
              </label>
              <textarea
                value={data.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your offer..."
                maxLength={200}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm resize-none"
              />
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Select a background image for your poster:
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => handleBackgroundSelect(bg.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    data.backgroundUrl === bg.url
                      ? 'border-rose-500 ring-2 ring-rose-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={bg.thumbnail}
                    alt="Background option"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('bg-gradient-to-br', 'from-rose-100', 'to-slate-200');
                    }}
                  />
                  
                  {data.backgroundUrl === bg.url && (
                    <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {data.backgroundUrl && (
              <button
                onClick={() => handleBackgroundSelect(null)}
                className="text-sm text-rose-500 hover:text-rose-600 font-medium"
              >
                Reset to template default
              </button>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full py-3 px-4 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Preview & Download
              </>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="w-full py-3 px-4 bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
