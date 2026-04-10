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