// Template data for Poster Making tool
export const templates = [
  {
    id: "luxe-glow",
    name: "Luxe Glow Theme",
    category: "Premium",
    thumbnail: "/images/template1-thumb.jpg",
    background: "/images/template1.jpg",
    fontColor: "#FFFFFF",
    fontFamily: "'Playfair Display', serif",
    fields: {
      salonName: { x: 50, y: 15, fontSize: 28, fontWeight: "bold", textAlign: "center" },
      offerText: { x: 50, y: 40, fontSize: 48, fontWeight: "bold", textAlign: "center" },
      description: { x: 50, y: 60, fontSize: 16, fontWeight: "normal", textAlign: "center" },
      phone: { x: 50, y: 85, fontSize: 14, fontWeight: "normal", textAlign: "center" }
    }
  },
  {
    id: "modern-chic",
    name: "Modern Chic",
    category: "Trendy",
    thumbnail: "/images/template2-thumb.jpg",
    background: "/images/template2.jpg",
    fontColor: "#1a1a1a",
    fontFamily: "'Inter', sans-serif",
    fields: {
      salonName: { x: 10, y: 10, fontSize: 24, fontWeight: "bold", textAlign: "left" },
      offerText: { x: 50, y: 50, fontSize: 42, fontWeight: "black", textAlign: "center" },
      description: { x: 50, y: 70, fontSize: 14, fontWeight: "normal", textAlign: "center" },
      phone: { x: 50, y: 88, fontSize: 12, fontWeight: "medium", textAlign: "center" }
    }
  },
  {
    id: "elegant-rose",
    name: "Elegant Rose",
    category: "Classic",
    thumbnail: "/images/template3-thumb.jpg",
    background: "/images/template3.jpg",
    fontColor: "#8B4D6B",
    fontFamily: "'Cormorant Garamond', serif",
    fields: {
      salonName: { x: 50, y: 12, fontSize: 26, fontWeight: "600", textAlign: "center" },
      offerText: { x: 50, y: 45, fontSize: 44, fontWeight: "700", textAlign: "center" },
      description: { x: 50, y: 65, fontSize: 15, fontWeight: "400", textAlign: "center" },
      phone: { x: 50, y: 86, fontSize: 13, fontWeight: "500", textAlign: "center" }
    }
  },
  {
    id: "bold-promo",
    name: "Bold Promo",
    category: "Sales",
    thumbnail: "/images/template4-thumb.jpg",
    background: "/images/template4.jpg",
    fontColor: "#FFFFFF",
    fontFamily: "'Montserrat', sans-serif",
    fields: {
      salonName: { x: 50, y: 18, fontSize: 22, fontWeight: "600", textAlign: "center" },
      offerText: { x: 50, y: 48, fontSize: 56, fontWeight: "900", textAlign: "center" },
      description: { x: 50, y: 72, fontSize: 14, fontWeight: "500", textAlign: "center" },
      phone: { x: 50, y: 90, fontSize: 13, fontWeight: "600", textAlign: "center" }
    }
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "Minimal",
    thumbnail: "/images/template5-thumb.jpg",
    background: "/images/template5.jpg",
    fontColor: "#2D3748",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fields: {
      salonName: { x: 50, y: 20, fontSize: 20, fontWeight: "300", textAlign: "center", letterSpacing: "4px" },
      offerText: { x: 50, y: 50, fontSize: 36, fontWeight: "200", textAlign: "center" },
      description: { x: 50, y: 70, fontSize: 13, fontWeight: "300", textAlign: "center" },
      phone: { x: 50, y: 88, fontSize: 11, fontWeight: "400", textAlign: "center" }
    }
  },
  {
    id: "festive-glam",
    name: "Festive Glam",
    category: "Seasonal",
    thumbnail: "/images/template6-thumb.jpg",
    background: "/images/template6.jpg",
    fontColor: "#FFD700",
    fontFamily: "'Great Vibes', cursive",
    fields: {
      salonName: { x: 50, y: 15, fontSize: 32, fontWeight: "normal", textAlign: "center" },
      offerText: { x: 50, y: 45, fontSize: 52, fontWeight: "bold", textAlign: "center" },
      description: { x: 50, y: 68, fontSize: 16, fontWeight: "normal", textAlign: "center" },
      phone: { x: 50, y: 88, fontSize: 14, fontWeight: "normal", textAlign: "center" }
    }
  }
];

// Background options for custom selection
export const backgroundOptions = [
  { id: "bg1", url: "/images/template1.jpg", thumbnail: "/images/template1-thumb.jpg" },
  { id: "bg2", url: "/images/template2.jpg", thumbnail: "/images/template2-thumb.jpg" },
  { id: "bg3", url: "/images/template3.jpg", thumbnail: "/images/template3-thumb.jpg" },
  { id: "bg4", url: "/images/template4.jpg", thumbnail: "/images/template4-thumb.jpg" },
  { id: "bg5", url: "/images/template5.jpg", thumbnail: "/images/template5-thumb.jpg" },
  { id: "bg6", url: "/images/template6.jpg", thumbnail: "/images/template6-thumb.jpg" }
];

// Get template by ID
export const getTemplateById = (id) => templates.find(t => t.id === id) || templates[0];

// Get all template categories
export const getCategories = () => [...new Set(templates.map(t => t.category))];
