// src/api/categoryApi.js
import axiosInstance from "./axiosInstance";

// export const getCategories = async (gender) => {
//     const response = await axiosInstance.get("/categories", {
//         params: { gender },
//     });

//     return response.data;
// };

let cache = {};

export const getCategories = async (gender) => {
    try {
        if (cache[gender]) return cache[gender];

        const res = await axiosInstance.get(`/categories`, {
            params: { gender },
        });

        cache[gender] = res.data;

        return res.data;
    } catch (err) {
        console.error("Category API error:", err);
        return { categories: [] }; // ✅ fallback safe
    }
};