import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Award,
  Briefcase,
  Check,
  Copy,
  Wallet,
  Mail,
  MapPin,
  Phone,
  QrCode,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const SalesExecutiveProfilePage = () => {
  const [copied, setCopied] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-indigo-200" />
          <p className="font-medium text-slate-500">
            Authenticating Executive Session...
          </p>
        </div>
      </div>
    );
  }

  const { roleDetails: details } = user;

  return (
    <div className="px-0 py-4 sm:px-2 sm:py-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[2.5rem] sm:p-8">
          <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-slate-50 sm:right-[-80px] sm:top-[-80px] sm:h-48 sm:w-48" />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center self-center rounded-3xl bg-[#2D1B4E] text-3xl font-black uppercase text-white shadow-xl sm:h-28 sm:w-28 sm:text-4xl md:self-auto">
              {user.name?.charAt(0)}
            </div>

            <div className="min-w-0 flex-1 space-y-2 text-center md:text-left">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <h1 className="break-words text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {user.name}
                </h1>
                <span className="mx-auto w-fit rounded-lg border border-slate-200 bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600 md:mx-0">
                  {user.role.replace("_", " ")}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500 md:justify-start">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" /> Account{" "}
                  {user.status}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={16} className="text-[#8B5CF6]" /> Executive Grade
                </span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <button className="flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#8B5CF6]/10 transition-all hover:bg-[#7C3AED]">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-[#2D1B4E] p-6 text-white shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
                  Executive Referral ID
                </p>
                <QrCode size={18} className="text-[#8B5CF6]" />
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                <code className="min-w-0 break-all font-mono text-base font-bold text-white sm:text-lg">
                  {details?.referralId}
                </code>
                <button
                  onClick={() => handleCopy(details?.referralId)}
                  className="rounded-xl p-2 transition-colors hover:bg-white/10"
                >
                  {copied ? (
                    <Check size={20} className="text-emerald-400" />
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
              <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-tighter text-slate-300">
                Use this code for partner onboarding
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-slate-400">
                Contact Registry
              </h3>
              <div className="space-y-5">
                <InfoRow
                  icon={<Mail size={20} />}
                  label="Email Address"
                  value={user.email}
                  truncate
                />
                <InfoRow icon={<Phone size={20} />} label="Phone Number" value={user.phone} />
                <InfoRow icon={<MapPin size={20} />} label="Assigned City ID" value={details?.city} />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatTile
                title="Total Earnings"
                value={`₹ ${details?.totalEarnings || 0}`}
                accent="text-emerald-50/50 group-hover:text-emerald-50"
                icon={<Wallet size={100} />}
                footer={
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <TrendingUp size={14} /> Paid to date
                  </div>
                }
              />

              <StatTile
                title="Commission Rate"
                value={`${details?.commissionRate || 0}%`}
                accent="text-indigo-50/50 group-hover:text-indigo-50"
                icon={<Award size={100} />}
                footer={
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#8B5CF6]">
                    <Check size={14} /> Standard Executive Rate
                  </div>
                }
              />
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-2 border-b border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Account Metadata
                </h3>
                <code className="text-[10px] font-mono text-slate-400">
                  ID: {user._id.slice(-8)}
                </code>
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
                <MetaBlock
                  label="Account Creation"
                  value={new Date(user.createdAt).toLocaleString()}
                />
                <MetaBlock
                  label="Last Profile Sync"
                  value={new Date(user.updatedAt).toLocaleString()}
                />
                <div className="sm:col-span-2">
                  <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">
                    Role Detail Reference
                  </p>
                  <code className="block break-all rounded-xl border border-slate-100 bg-slate-50 p-3 text-[11px] text-slate-500">
                    {details?._id}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="py-4 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400 sm:py-6 sm:tracking-[0.4em]">
          Sales Executive Network Secure Terminal
        </p>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value, truncate = false }) => (
  <div className="flex items-center gap-4">
    <div className="rounded-xl bg-slate-50 p-3 text-slate-400">{icon}</div>
    <div className={truncate ? "min-w-0 overflow-hidden" : ""}>
      <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
      <p className={`text-sm font-bold text-slate-900 ${truncate ? "truncate" : ""}`}>
        {value || "N/A"}
      </p>
    </div>
  </div>
);

const StatTile = ({ title, value, icon, accent, footer }) => (
  <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <div className={`absolute -bottom-4 -right-4 transition-colors ${accent}`}>
      {icon}
    </div>
    <div className="relative z-10">
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <h4 className="break-words text-3xl font-black text-slate-900 sm:text-4xl">
        {value}
      </h4>
      {footer}
    </div>
  </div>
);

const MetaBlock = ({ label, value }) => (
  <div>
    <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">{label}</p>
    <p className="break-words text-sm font-bold text-slate-700">{value}</p>
  </div>
);

export default SalesExecutiveProfilePage;
