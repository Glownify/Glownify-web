import React from "react";
import { useOutletContext } from "react-router-dom";
import { Star, ChevronRight, ThumbsUp } from "lucide-react";

const SalonReviews = () => {
  const { saloonDetails } = useOutletContext();

  // Use real reviews if available, otherwise show sample reviews
  const reviews = saloonDetails?.reviews || [
    {
      name: "Pooja S",
      rating: 5,
      comment: "Great service and very clean! The staff was very professional and friendly. Will definitely visit again.",
      date: "2 days ago",
      avatar: null,
    },
    {
      name: "Amit K",
      rating: 4,
      comment: "Loved the facial, will book again! The ambiance was wonderful and relaxing.",
      date: "1 week ago",
      avatar: null,
    },
    {
      name: "Rahul M",
      rating: 5,
      comment: "Amazing haircut experience! The stylist understood exactly what I wanted.",
      date: "2 weeks ago",
      avatar: null,
    },
    {
      name: "Anita D",
      rating: 4,
      comment: "Very professional staff. The salon is well-maintained and hygienic.",
      date: "3 weeks ago",
      avatar: null,
    },
  ];

  const avgRating = saloonDetails?.rating ||
    (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const avatarColors = [
    "bg-pink-100 text-pink-600",
    "bg-blue-100 text-blue-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-600",
    "bg-purple-100 text-purple-600",
    "bg-cyan-100 text-cyan-600",
  ];

  return (
    <div className="space-y-6">
      {/* Overall Rating Card */}
      <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-orange-50 rounded-2xl p-6 border border-pink-100">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-black text-gray-900">{avgRating}</div>
            <div className="flex gap-0.5 mt-1 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(Number(avgRating))
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200 fill-gray-200"
                    }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {saloonDetails?.reviewCount || reviews.length} reviews
            </p>
          </div>

          {/* Rating Bars */}
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-3">{rating}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <div className="flex-1 h-2 bg-gray-200/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${avatarColors[index % avatarColors.length]
                  }`}
              >
                <span className="text-sm font-bold">
                  {review.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-800">
                    {review.name}
                  </span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${star <= review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200 fill-gray-200"
                        }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  "{review.comment}"
                </p>

                {/* Helpful button */}
                <button className="flex items-center gap-1.5 mt-2 text-xs text-gray-400 hover:text-rose-500 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful
                </button>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalonReviews;
