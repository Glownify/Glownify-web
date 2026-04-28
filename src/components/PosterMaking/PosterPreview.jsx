import React, { forwardRef } from 'react';

const PosterPreview = forwardRef(({ template, data }, ref) => {
  const { salonName, offerText, description, phone, backgroundUrl } = data;
  
  // Use custom background if provided, otherwise use template background
  const backgroundImage = backgroundUrl || template.background;
  
  // Get field configurations from template
  const fields = template.fields || {};
  
  return (
    <div className="flex flex-col items-center">
      {/* Mobile Phone Mockup */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-[280px] h-[560px] bg-slate-900 rounded-[40px] p-3 shadow-2xl">
          {/* Screen */}
          <div 
            ref={ref}
            className="w-full h-full rounded-[32px] overflow-hidden relative bg-slate-100"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              fontFamily: template.fontFamily || 'inherit'
            }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-20" />
            
            {/* Poster Content Overlay */}
            <div className="absolute inset-0 flex flex-col p-6 pt-12">
              {/* Salon Name */}
              {fields.salonName && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${fields.salonName.x}%`,
                    top: `${fields.salonName.y}%`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: fields.salonName.textAlign,
                    fontSize: `${fields.salonName.fontSize * 0.6}px`,
                    fontWeight: fields.salonName.fontWeight,
                    color: template.fontColor,
                    fontFamily: template.fontFamily,
                    letterSpacing: fields.salonName.letterSpacing || 'normal',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    width: '80%',
                    wordWrap: 'break-word',
                    lineHeight: '1.2'
                  }}
                >
                  {salonName || 'Your Salon Name'}
                </div>
              )}
              
              {/* Offer Text */}
              {fields.offerText && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${fields.offerText.x}%`,
                    top: `${fields.offerText.y}%`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: fields.offerText.textAlign,
                    fontSize: `${fields.offerText.fontSize * 0.6}px`,
                    fontWeight: fields.offerText.fontWeight,
                    color: template.fontColor,
                    fontFamily: template.fontFamily,
                    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    width: '85%',
                    wordWrap: 'break-word',
                    lineHeight: '1.1'
                  }}
                >
                  {offerText || '40% OFF'}
                </div>
              )}
              
              {/* Description */}
              {fields.description && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${fields.description.x}%`,
                    top: `${fields.description.y}%`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: fields.description.textAlign,
                    fontSize: `${fields.description.fontSize * 0.6}px`,
                    fontWeight: fields.description.fontWeight,
                    color: template.fontColor,
                    fontFamily: template.fontFamily,
                    textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    width: '80%',
                    wordWrap: 'break-word',
                    lineHeight: '1.4'
                  }}
                >
                  {description || 'On all hair styling services this week'}
                </div>
              )}
              
              {/* Phone */}
              {fields.phone && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${fields.phone.x}%`,
                    top: `${fields.phone.y}%`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: fields.phone.textAlign,
                    fontSize: `${fields.phone.fontSize * 0.6}px`,
                    fontWeight: fields.phone.fontWeight,
                    color: template.fontColor,
                    fontFamily: "'Inter', sans-serif",
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    width: '80%',
                    wordWrap: 'break-word'
                  }}
                >
                  {phone ? `📞 ${phone}` : '📞 Call to book'}
                </div>
              )}
            </div>
            
            {/* Bottom bar indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-300/50 rounded-full" />
          </div>
        </div>
        
        {/* Reflection effect */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-black/10 blur-xl rounded-full" />
      </div>
      
      {/* Preview Label */}
      <p className="mt-4 text-sm text-slate-500 font-medium">
        Live Preview
      </p>
      <p className="text-xs text-slate-400">
        Updates in real-time
      </p>
    </div>
  );
});

export default PosterPreview;
