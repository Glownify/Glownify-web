import axiosInstance from "./axiosInstance";

export const getNearbySalons = async ({ lat, lng, category, radius = 50, page = 1, limit = 10 }) => {
    const res = await axiosInstance.get(`/salons/nearby`, {
        params: {
            lat,
            lng,
            category,
            radius,
            page,
            limit,
        },
    });

    return res.data;
};

// ─── New API: Salon details with lat/lng ────────────────────────────────────
export const getSalonById = async ({ salonId, lat, lng }) => {
    const res = await axiosInstance.get(`/salons/${salonId}`, {
        params: { lat, lng },
    });
    return res.data; // { success, message, salon }
};

// ─── New API: Salon reviews with pagination ─────────────────────────────────
export const getSalonReviews = async ({ salonId, page = 1, limit = 5 }) => {
    const res = await axiosInstance.get(`/reviews/salon/${salonId}`, {
        params: { page, limit },
    });
    return res.data; // { success, page, totalPages, count, summary, reviews }
};