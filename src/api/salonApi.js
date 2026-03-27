import axiosInstance from "./axiosInstance";

export const getNearbySalons = async ({ lat, lng, category }) => {
    const res = await axiosInstance.get(
        `/salons/nearby?lat=${lat}&lng=${lng}&radius=50&category=${category}`
    );

    return res.data;
};