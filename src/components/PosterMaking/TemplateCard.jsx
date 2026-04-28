import React from 'react';

const TemplateCard = ({ template, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(template)}
      className={`
        relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200
        ${isSelected 
          ? 'ring-2 ring-rose-500 shadow-lg shadow-rose-100' 
          : 'hover:shadow-md border border-slate-200'
        }
      `}
    >
      {/* Thumbnail */}
      <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
        {template.thumbnail ? (
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback/Preview */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50 to-slate-100"
          style={{ display: template.thumbnail ? 'none' : 'flex' }}
        >
          <div className="text-center p-4">
            <div 
              className="w-full h-full absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url(${template.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <span className="relative z-10 text-xs font-medium text-slate-500 uppercase tracking-wider">
              {template.category}
            </span>
          </div>
        </div>
        
        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-3 bg-white">
        <h4 className="font-semibold text-sm text-slate-800 truncate">
          {template.name}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          {template.category}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;
