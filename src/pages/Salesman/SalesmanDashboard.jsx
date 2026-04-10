import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Wallet,
  TrendingUp,
  Share2,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../../redux/slice/salesmanSlice";

const SalesmanDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const dashboardData = useSelector((state) => state.salesman.dashboardData);
  const loading = useSelector((state) => state.salesman.loading);
  const error = useSelector((state) => state.salesman.error);

  React.useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  console.log("Logged in Salesman:", dashboardData);
  const stats = [
    {
      title: "Total Salons",
      value: dashboardData?.summary?.totalSalons ?? 0,
      change: "Registered Salons",
      icon: <Users className="text-blue-600" size={24} />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Independent Professionals",
      value: dashboardData?.summary?.totalIndependentProfessionals ?? 0,
      change: "Active Professionals",
      icon: <Share2 className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50",
    },
    {
      title: "Commission Rate",
      value: `${dashboardData?.summary?.commissionRate ?? 0}%`,
      change: "Current Rate",
      icon: <TrendingUp className="text-indigo-600" size={24} />,
      bgColor: "bg-indigo-50",
    },
    {
      title: "Total Earnings",
      value: `₹${dashboardData?.summary?.totalEarnings?.toLocaleString() ?? 0}`,
      change: "Lifetime Earnings",
      icon: <Wallet className="text-emerald-600" size={24} />,
      bgColor: "bg-emerald-50",
    },
  ];

  const target = 24; // example monthly target
  const achieved = dashboardData?.summary?.totalSalons ?? 0;
  const percentage = Math.min(Math.round((achieved / target) * 100), 100);

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
               <span>Sales Partner Dashboard</span>
               <span className="w-1 h-1 rounded-full bg-slate-200"></span>
               <span>Analytics</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Welcome Back! <span className="animate-pulse">👋</span>
            </h1>
          </div>
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] text-white px-8 py-3.5 rounded-2xl font-bold text-[15px] transition-all shadow-xl shadow-purple-200 hover:-translate-y-1 active:scale-95">
            <Plus size={20} className="stroke-[3]" />
            <span>New Referral</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[40px] border border-purple-100/20 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-white shadow-sm ring-1 ring-slate-50 group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(stat.icon, { className: "text-[#8B5CF6]", size: 24 })}
                </div>
                <button className="text-slate-300 hover:text-[#8B5CF6]">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-tight">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                  {stat.value}
                </h3>
                <p
                  className={`text-[11px] mt-2 font-black uppercase tracking-tighter ${index === 2 ? "text-emerald-500" : "text-[#8B5CF6]"
                    }`}
                >
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Onboarded Salons */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-900">
                Recently Onboarded Salons
              </h2>
              <button 
                onClick={() => navigate("/salesman/my-saloons")}
                className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Salon Name</th>
                    <th className="px-6 py-4">Plan Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Onboarded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dashboardData?.recentSalons?.length ? (
                    dashboardData.recentSalons.map((salon, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          {salon.salonName}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {salon.planName}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${salon.status === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : salon.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {salon.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-500 text-sm">
                          {new Date(salon.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-slate-400"
                      >
                        No recent salons found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Referral Link & Promotion Card */}
          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Invite & Earn</h3>
                <p className="text-indigo-100 text-sm mb-6">
                  Share your unique link and get commission for every salon
                  onboarded.
                </p>

                <div className="bg-indigo-500/30 border border-indigo-400/30 rounded-xl p-3 flex items-center justify-between mb-4">
                  <span className="text-xs truncate mr-2 font-mono">
                    SALES-REF-2024-XP
                  </span>
                  <button className="bg-white text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
                <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors">
                  Generate New Link
                </button>
              </div>
              {/* Abstract Background Shape */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50"></div>
            </div>

            {/* Target Card
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Monthly Target</h3>
                <span className="text-indigo-600 font-bold">75%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mb-4">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Onboard <span className="text-slate-900 font-bold">8 more salons</span> by the end of the month to unlock a 5% commission bonus!
              </p>
              <button className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-sm group">
                View Bonus Structure <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

export default SalesmanDashboard;
