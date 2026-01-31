import React, { useState } from "react";
import { HelpCircle, Plus, CreditCard, XCircle } from "lucide-react";
import { Check, ShieldCheck, Headphones, Globe, Zap } from "lucide-react";
import { FiCreditCard } from "react-icons/fi";
import { MdSubscriptions } from "react-icons/md";

const PaymentSubscriptionPage = () => {
  const [billing, setBilling] = useState("monthly");
  const [active, setActive] = useState("subscription");

  const features = [
    "Salon & Home Booking",
    "Unlimited Bookings",
    "Online Payments",
    "Service Listings",
    "Staff Management",
    "Customer Reviews",
    "Analytics & Reports",
    "Custom Offers & Coupons",
    "Multiple Branches",
  ];

  const faqs = [
    "Can I cancel anytime?",
    "Is my data secure?",
    "Can I upgrade later?",
    "What if I don’t get bookings?",
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#1f2a44]">
            Subscription Summary
          </h1>
          <p className="text-gray-500 mt-2">
            Review your plan and make a secure payment
          </p>
        </div>

        {/* <div className="w-full flex items-center py-4">
         
          <div className="flex-1 h-px bg-gray-300" />

         
          <div className="mx-6 flex items-center gap-2 bg-gray-100 p-1 rounded-full shadow-sm">
           
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500 text-white text-sm font-medium">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Subscription
            </div>

           
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-gray-400 text-sm font-medium">
              <span className="w-2 h-2 border border-gray-300 rounded-full"></span>
              Payment
            </div>
          </div>

         
          <div className="flex-1 h-px bg-gray-300" />
        </div> */}

        <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT PLAN CARD */}
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
            {/* 🔵 TOP HEADER STRIP */}
            <div className="relative bg-gradient-to-b from-[#2c4aa3] to-[#1f3a8a] px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-white text-center">
                Growth Plan
              </h2>

              {/* 🟡 Yellow Diagonal Ribbon */}
              <div className="absolute top-3 right-[-38px] rotate-45 bg-yellow-400 text-black text-[11px] font-bold px-10 py-1 shadow-md">
                ★ ★ ★
              </div>
            </div>

            {/* ⚪ CONTENT BODY */}
            <div className="p-6 text-[#1f2937]">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">₹1499</span>
                <span className="text-sm text-gray-500">/ month</span>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                Best for growing salons with unlimited bookings & online
                payments.
              </p>

              <ul className="mt-5 space-y-3">
                {features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check size={18} className="text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT BILLING CARD */}
          <div className="rounded-xl bg-[#f9fafc] shadow-lg border border-[#e5e9f2]">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-[#e5e9f2]">
                <h3 className="font-semibold text-[15px] text-[#1f2a44]">
                  Billing Cycle
                </h3>
                <button className="text-[13px] text-blue-600 hover:underline">
                  Change Plan
                </button>
              </div>

              {/* Toggle */}
              <div className="mt-4 inline-flex bg-[#eef1f7] rounded-lg p-1">
                <button className="px-5 py-1.5 rounded-md bg-blue-600 text-white text-[13px] shadow">
                  Monthly
                </button>
                <button className="px-5 py-1.5 rounded-md text-[#6b7280] text-[13px]">
                  Yearly
                </button>
              </div>
              <div className="w-full h-px bg-gray-300 my-2"></div>

              {/* Total Plan */}
              <div className="mt-6 border-b border-[#e5e9f2] pb-4">
                <p className="text-[14px] font-semibold text-[#1f2a44]">
                  Total Plan:
                </p>
                <div className="w-full h-px bg-gray-300 my-2"></div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-[13px] text-[#6b7280]">
                    First 7 Days:{" "}
                    <span className="font-semibold text-[#1f2a44]">₹0</span>
                    <span className="text-[#9ca3af]"> (7 Days Free Trial)</span>
                  </p>

                  <p className="text-lg font-bold text-[#1f2a44]">
                    ₹1499
                    <span className="text-sm font-normal text-[#6b7280]">
                      {" "}
                      /mo
                    </span>
                  </p>
                </div>
              </div>

              {/* Commitment */}
              <div className="flex items-center gap-2 text-[13px] text-[#4b5563] mt-4">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-600 text-xs">
                  ✓
                </span>
                No Commitment. Cancel Anytime.
              </div>

              {/* Cost Breakdown */}
              <div className="mt-4 rounded-lg border border-[#e5e9f2] bg-white">
                <div className="flex justify-between px-2 py-2 text-[13px] ">
                  <span>Plan Cost</span>
                  <span className="font-semibold">₹1499</span>
                </div>
                <div className="w-full h-px bg-gray-300 my-2"></div>

                <div className="flex justify-between px-2 py-2 text-[13px] ">
                  <span>First 7 Days Free</span>
                  <span className="font-semibold text-green-600">-₹1499</span>
                </div>
                <div className="w-full h-px bg-gray-300 my-2"></div>

                <div className="flex justify-between px-4 py-3 text-[14px] font-semibold">
                  <span>Today's Total:</span>
                  <span className="text-[#1f2a44]">
                    ₹0{" "}
                    <span className="text-[12px] font-normal text-[#6b7280]">
                      Free Trial (7 Days)
                    </span>
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button className="mt-6 w-full bg-gradient-to-b from-[#729c32] to-[#144401] text-white py-3 rounded-lg font-semibold shadow hover:opacity-95 transition">
                Proceed to Payment →
              </button>

              {/* Footer Note */}
              <p className="text-[11px] text-[#6b7280] mt-3 text-center">
                Yes, I understand I will be charged ₹1499/month after the trial.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ + TRUST BAR WRAPPER */}

        <div className="w-full py-10">
          <div className="max-w-6xl mx-auto space-y-6 px-2 sm:px-0">
            {/* FAQ BOX */}
            <div className="bg-white rounded-2xl shadow-lg px-6 sm:px-8 py-6">
              {/* Heading */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-[#152650] whitespace-nowrap">
                  Frequently Asked Questions
                </h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* FAQ Items */}
              <div className="divide-y divide-gray-300">
                {faqs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-3 text-[#152650] font-semibold text-sm sm:text-base">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full fill-[#091d50] bg-[#042c6d] text-white text-xs font-bold">
                        ?
                      </span>
                      {item}
                    </div>
                    <Plus className="w-5 h-5 text-blue-700" />
                  </div>
                ))}
              </div>
            </div>

            {/* TRUST + INFO SECTION */}
            <div className="w-full mt-6">
              <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg px-6 sm:px-8 py-5">
                {/* TOP ROW */}
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[#2f3e63] text-md font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#eef2ff] flex items-center justify-center">
                      <ShieldCheck size={24} />
                    </div>
                    Secure Payments
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#eef2ff] flex items-center justify-center">
                      <Headphones size={24} />
                    </div>
                    24×7 Support
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#eef2ff] flex items-center justify-center">
                      <Globe size={24} />
                    </div>
                    Built for Salons Worldwide
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="my-4 h-px bg-gray-200"></div>

                {/* BOTTOM ROW */}
                <div className="flex flex-wrap justify-center items-center gap-4 gap-y-3 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-gray-400" />
                    All payments are processed via trusted and secure gateways.
                  </div>

                  <div className="flex items-center gap-2 text-lg font-semibold text-[#152650]">
                    <XCircle size={14} />
                    Cancel Anytime
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

export default PaymentSubscriptionPage;
