export const formatSalonData = (salons = []) => {
    return salons.map((salon) => ({
        _id: salon._id,
        shopName: salon.shopName,
        galleryImages: [salon.image],
        rating: salon.avgRating,
        reviewCount: salon.totalRatings,
        distance: salon.distanceInMeters
            ? (salon.distanceInMeters / 1000).toFixed(1)
            : null,
        categories: salon.popularServices?.map((s) => s.name) || [],
    }));
};