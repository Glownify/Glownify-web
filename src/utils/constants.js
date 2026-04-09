/**
 * Shared constants for the Glownify application.
 */

// --- Billing & Invoice ---
export const TIP_OPTIONS = [20, 50, 100, 200];
export const DISCOUNT_AMOUNT = 280;
export const DISCOUNT_LABEL = 'First Visit';

// --- Customer Mock Data ---
export const MOCK_CUSTOMER = {
  name: "Ayesha Khan",
  initials: "AK",
  avatarColor: "#fff1f2",
  invoiceNo: "8829",
  date: "Oct 24, 2023",
  time: "10:30 AM"
};

// --- Services Mock Data ---
export const MOCK_SERVICES = [
  {
    _id: "s1", id: 1, 
    name: "Classic Haircut",
    description: "A clean, classic haircut styled to your preference.",
    durationMins: 30, duration: "30 mins",
    price: 350,
    status: "ACTIVE",
    category: { _id: "c1", name: "Hair Care", gender: "UNISEX" },
    gender: "UNISEX",
    serviceMode: "Salon",
    discountPercent: 10,
    addOns: [
      { id: "a1", _id: "a1", name: "Hair Wash", price: 100, isRecommended: true, duration: 10 },
      { id: "a2", _id: "a2", name: "Blow Dry", price: 150, isRecommended: false, duration: 15 },
    ],
  },
  {
    _id: "s2", id: 2,
    name: "Botanical Scalp Therapy",
    description: "A restorative treatment using organic oils to rejuvenate follicles.",
    durationMins: 60, duration: "60 mins",
    price: 1200,
    status: "ACTIVE",
    category: { _id: "c2", name: "Skin Therapy", gender: "WOMEN" },
    gender: "WOMEN",
    serviceMode: "Both",
    discountPercent: 15,
    addOns: [
      { id: "a3", _id: "a3", name: "Extra Massage", price: 200, isRecommended: true, duration: 20 },
    ],
  },
  {
    _id: "s3", id: 3,
    name: "Beard Shaping",
    description: "Precision beard trim and shaping with hot towel finish.",
    durationMins: 20, duration: "20 mins",
    price: 200,
    status: "INACTIVE",
    category: { _id: "c3", name: "Beard Grooming", gender: "MEN" },
    gender: "MEN",
    serviceMode: "Salon",
    discountPercent: 0,
    addOns: [],
  },
];

export const EMPTY_SERVICE_FORM = {
  name: "", 
  category: "", 
  price: "", 
  durationMins: "30",
  discountPercent: "0", 
  description: "", 
  serviceMode: "salon", 
  addOns: [],
};

// --- Genders & Modes ---
export const GENDER_TYPES = ["MEN", "WOMEN", "UNISEX"];
export const SERVICE_MODES = ["Salon", "Home", "Both"];

// --- Super Admin Mock Data ---
export const SUPERADMIN_CHART_DATA = [
  { name: "Jan", revenue: 20000, subscriptions: 12000 },
  { name: "Feb", revenue: 25000, subscriptions: 15000 },
  { name: "Mar", revenue: 22000, subscriptions: 14000 },
  { name: "Apr", revenue: 30000, subscriptions: 18000 },
  { name: "May", revenue: 35000, subscriptions: 21000 },
  { name: "Jun", revenue: 45000, subscriptions: 25000 },
  { name: "Jul", revenue: 42000, subscriptions: 23000 },
  { name: "Aug", revenue: 48000, subscriptions: 26000 },
  { name: "Sep", revenue: 55000, subscriptions: 30000 },
  { name: "Oct", revenue: 60000, subscriptions: 32000 },
  { name: "Nov", revenue: 75000, subscriptions: 38000 },
  { name: "Dec", revenue: 85000, subscriptions: 42000 },
];

export const MOCK_BOOKINGS = [
    { id: 1, customerName: "Amit K.", service: "Hair Color", duration: "1 hr", date: "May 12, 11:00 AM", amount: 2500, status: "pending", avatar: "https://i.pravatar.cc/150?u=amit2" },
    { id: 2, customerName: "Mehak S.", service: "Full Body Massage", duration: "1.5 hr", date: "May 12, 11:00 AM", amount: 2000, status: "pending", avatar: "https://i.pravatar.cc/150?u=mehak" },
    { id: 3, customerName: "Riya", service: "Bridal Makeup", duration: "2 hr", date: "May 12, 11:00 AM", amount: 5000, status: "pending", avatar: "https://i.pravatar.cc/150?u=riya" },
];

export const MOCK_REVIEWS = [
    { id: 1, name: "Neha T.", rating: 5, date: "May 11", initials: "NT", avatarColor: "#fecdd3", text: "Amazing experience! The staff was very professional and friendly." },
];

export const STATE_REVENUE_DATA = [
  { name: "Maharashtra", value: 320480, color: "#8B5CF6" },
  { name: "Karnataka", value: 240000, color: "#D946EF" },
  { name: "Uttar Pradesh", value: 281620, color: "#6366F1" },
  { name: "Gujarat", value: 180000, color: "#10B981" },
];

export const GROWTH_RATE_DATA = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 30 },
  { day: 'Wed', value: 50 },
  { day: 'Thu', value: 70 },
  { day: 'Fri', value: 90 },
];
