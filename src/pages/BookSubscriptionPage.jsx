import React from "react";
import {
  Check,
  HelpCircle,
  Plus,
  Lock,
  ShieldCheck,
  Headphones,
  Globe,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookSubscriptionPage = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      button: "Select Plan",
      dark: true,
      features: [
        "Salon & Home Booking",
        "Unlimited Bookings",
        "Online Payments",
        "Service Listings",
        "Staff Management",
        "Customer Reviews",
        "Custom Offers & Coupons",
      ],
    },
    {
      name: "Most Popular",
      price: "₹1499",
      button: "Start Free Trial",
      highlight: true,
      features: [
        "Salon & Home Booking",
        "Unlimited Bookings",
        "Online Payments",
        "Staff Management",
        "Customer Reviews",
        "Analytics & Reports",
        "Custom Offers & Coupons",
      ],
    },
    {
      name: "Premium",
      price: "₹2499",
      button: "Select Plan",
      dark: true,
      features: [
        "All Growth Features",
        "Featured Listing",
        "Advanced Analytics",
        "Custom Offers",
        "Multiple Branches",
        "Dedicated Manager",
        "Multiple Branches",
      ],
    },
  ];

  const faqs = [
    "Can I cancel anytime?",
    "Is my data secure?",
    "Can I upgrade later?",
    "What if I don’t get bookings?",
  ];
  return (
    <div>
      <div className="bg-[#f4f6ff] min-h-screen px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Choose a Subscription Plan
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Grow your salon business with online bookings, payments &
              customers
            </p>

            {/* TOGGLE */}
            <div className="flex justify-center mt-5">
              <div className="bg-gray-200 rounded-full px-1 py-1 flex text-xs">
                <span className="bg-white px-4 py-1 rounded-full font-medium">
                  Monthly
                </span>
                <span className="px-4 py-1 text-gray-600">
                  Yearly{" "}
                  <span className="text-green-600 font-semibold">20%</span>
                </span>
              </div>
            </div>
          </div>

          {/* PLANS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-xl shadow-xl p-6 flex flex-col ${
                  plan.highlight ? "border-2 border-blue-600 scale-[1.02]" : ""
                }`}
              >
                {/* BADGE */}
                {plan.highlight && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded rotate-12">
                    ★
                  </span>
                )}

                {/* HEADER */}
                <div
                  className={`-mx-6 -mt-6 mb-5 py-4 text-center font-semibold text-white rounded-t-xl ${
                    plan.highlight
                      ? "bg-linear-to-b from-[#0a4ab3] to-[#052861]"
                      : "bg-linear-to-b from-[#2f4574] to-[#1f2f52]"
                  }`}
                >
                  {plan.name}
                </div>

                {/* PRICE */}
                <div className="text-center mt-5">
                  <p className="text-3xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-sm text-gray-500"> / month</span>
                  </p>
                </div>

                {/* FEATURES */}
                <ul className="mt-6 space-y-3 text-sm text-gray-700 flex-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* BUTTON */}
                <button
                  onClick={(e) => navigate("/paymentsubscriptionpage")}
                  className={`mt-6 py-2 rounded-md text-sm font-medium text-white cursor-pointer ${
                    plan.highlight
                      ? "bg-linear-to-r from-green-900 to-green-700"
                      : "bg-linear-to-b from-[#2f4574] to-[#1f2f52] text-white"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6  mt-10 border-grey-200 m-4">
            <div className=" top-0 -mx-6 -mt-6 bg-linear-to-r from-[#0a4ab3] to-[#052861] text-white text-center rounded-lg py-3 text-sm font-medium shadow">
              All Plans Include All Features. Try Growth Plan 7 Days Free
            </div>

            <p className="text-center text-sm text-gray-700 mt-4">
              Monthly | Quarterly{" "}
              <span className="font-medium">(Save 10%)</span> | Yearly{" "}
              <span className="font-medium">(Save 20%)</span>
            </p>

            <div className="flex items-center justify-center gap-6 mt-5">
              <div className="flex-1 h-px bg-gray-300 max-w-30" />

              <button className="bg-linear-to-r from-green-900 to-green-700 text-white px-10 py-2.5 rounded-md text-sm font-semibold shadow-md">
                Get Started Now
              </button>

              <div className="flex-1 h-px bg-gray-300 max-w-30" />
            </div>
          </div>

          {/* FAQ + FOOTER WRAPPER */}
          <div className="mt-14 flex justify-center px-2 sm:px-4">
            {/* WIDTH CONTROLLED CONTAINER */}
            <div className="w-full max-w-7xl lg:max-w-6xl">
              <div className="bg-linear-to-b from-white to-[#f5f7ff] rounded-xl shadow-sm border border-gray-200 px-5 sm:px-6 py-8">
                {/* FAQ HEADER */}
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-[#152650] whitespace-nowrap">
                    Frequently Asked Questions
                  </h2>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* FAQ LIST */}
                <div className="space-y-4">
                  {faqs.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-300 pb-3"
                    >
                      <div className="flex items-center gap-3 text-[#152650] text-lg font-semibold">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full fill-[#091d50] bg-[#042c6d] text-white text-xs font-bold">
                          ?
                        </span>
                        {item}
                      </div>
                      <Plus className="w-5 h-5 text-[#0a4ab3]" />
                    </div>
                  ))}
                </div>

                {/* FOOTER ICON ROW */}
                <div className="mt-10 pt-6  border-gray-300">
                  <div className="flex flex-wrap justify-center gap-8 text-lg text-[#14317a] font-semibold">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-12 h-12" />
                      Secure Payments
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="w-12 h-12" />
                      24x7 Support
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-12 h-12" />
                      Built for Salons Worldwide
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-12 h-12 fill-yellow-500 stroke-0" />

                      <div className="leading-tight">
                        <div className="text-xl font-semibold text-[#152650]">
                          Fast & 
                        </div>
                        <div className="text-sm  text-[#152650] ">
                          Reliable Platform
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSubscriptionPage;
