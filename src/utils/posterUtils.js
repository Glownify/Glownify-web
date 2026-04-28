import html2canvas from 'html2canvas';

// Local Storage Functions
export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem('posterDraft', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('posterDraft');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.removeItem('posterDraft');
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// URL Query Parameter Functions
export const generateShareableURL = (data) => {
  const params = new URLSearchParams();
  
  if (data.templateId) params.set('template', data.templateId);
  if (data.salonName) params.set('name', encodeURIComponent(data.salonName));
  if (data.offerText) params.set('offer', encodeURIComponent(data.offerText));
  if (data.description) params.set('desc', encodeURIComponent(data.description));
  if (data.phone) params.set('phone', encodeURIComponent(data.phone));
  if (data.backgroundUrl) params.set('bg', encodeURIComponent(data.backgroundUrl));
  
  return `${window.location.pathname}?${params.toString()}`;
};

export const parseQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  
  return {
    templateId: params.get('template') || null,
    salonName: params.get('name') ? decodeURIComponent(params.get('name')) : '',
    offerText: params.get('offer') ? decodeURIComponent(params.get('offer')) : '',
    description: params.get('desc') ? decodeURIComponent(params.get('desc')) : '',
    phone: params.get('phone') ? decodeURIComponent(params.get('phone')) : '',
    backgroundUrl: params.get('bg') ? decodeURIComponent(params.get('bg')) : null
  };
};

// Download Poster Function
export const downloadPoster = async (element, filename = 'poster.png') => {
  try {
    if (!element) {
      throw new Error('Element not found for download');
    }
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      removeContainer: true
    });
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    
    return true;
  } catch (error) {
    console.error('Error downloading poster:', error);
    return false;
  }
};

// Validate poster data
export const validatePosterData = (data) => {
  const errors = [];
  
  if (!data.salonName?.trim()) {
    errors.push('Salon name is required');
  }
  
  if (!data.offerText?.trim()) {
    errors.push('Offer text is required');
  }
  
  if (data.phone && !/^[\d\s\-\+\(\)]{10,}$/.test(data.phone)) {
    errors.push('Please enter a valid phone number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Character count helper
export const getCharacterCount = (text, maxLength) => ({
  current: text?.length || 0,
  max: maxLength,
  remaining: maxLength - (text?.length || 0),
  isOver: (text?.length || 0) > maxLength
});

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // Basic formatting - can be expanded based on requirements
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};
