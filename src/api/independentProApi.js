import axiosInstance from "./axiosInstance";

// for Home Screen to get Home (Nearby)  independent pro with lat, lng and category
export const getHomeIndependentProfessionals = async ({ lat, lng, category }) => {
    return axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/independent-pro/home`,
        {
            params: {
                lat,
                lng,
                radius: 50,
                category, // men / women
            },
        }
    );
};