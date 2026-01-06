import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubscriptions } from "../../redux/slice/saloonownerSlice";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subscriptions } = useSelector((state) => state.saloonowner);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    dispatch(fetchAllSubscriptions());
  }, [dispatch]);

  const handleContinue = () => {
    if (!selectedPlan) {
      alert("Please select a subscription plan");
      return;
    }

    console.log("Selected Plan:", selectedPlan);
    // 👉 navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choose Your Subscription Plan
        </h2>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions?.map((plan) => {
            const isSelected = selectedPlan?._id === plan._id;

            return (
              <div
                key={plan._id}
                onClick={() => setSelectedPlan(plan)}
                className={`cursor-pointer rounded-xl border p-6 transition-all duration-200
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 shadow-lg"
                      : "border-gray-200 bg-white hover:shadow-md"
                  }`}
              >
                {/* Plan name */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {" "}
                    / {plan.durationInDays} days
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-green-600 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Selected badge */}
                {isSelected && (
                  <div className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() =>
              navigate("/salon-owner/dashboard", {
                state: { skipSubscriptionCheck: true },
              })
            }
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleContinue}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
