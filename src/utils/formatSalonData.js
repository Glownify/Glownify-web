export const formatSalonData = (salons) => {
    if (!Array.isArray(salons)) return [];
    return salons
        .filter(salon => !!salon) // skip null/undefined
        .map((salon) => ({
            _id: salon._id,
            shopName: salon.shopName || "Unknown Salon",
            galleryImages: salon.galleryImages || (salon.image ? [salon.image] : []),
            targetGender: salon.targetGender,
            rating: salon.avgRating || 0,
            reviewCount: salon.totalRatings || 0,
            distance: salon.distanceInMeters
                ? (salon.distanceInMeters / 1000).toFixed(1)
                : null,
            popularServices: salon.popularServices || [],
        }));
};