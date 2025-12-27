import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardData } from '../../redux/slice/salesexecutiveSlice';
import { Users, DollarSign, Percent, Store, ArrowUpRight, MoreVertical } from 'lucide-react';

const SalesExecutiveDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData, loading, error } = useSelector((state) => state.salesexecutive);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) return <div className="flex items-center justify-center h-screen font-medium text-gray-500">Loading Intelligence...</div>;
  if (error) return <div className="p-6 text-red-500 font-semibold bg-red-50 border border-red-100 rounded-xl">Error: {error}</div>;
  if (!dashboardData) return null;

  const { summary, salesmen } = dashboardData;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 text-slate-900">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Executive Overview</h1>
          <p className="text-slate-500 mt-1">Monitor your network performance and earnings in real-time.</p>
        </div>
        
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Salesmen" value={summary.totalSalesmen} icon={<Users className="text-blue-600" />} bgColor="bg-blue-50" />
        <StatCard title="Partner Salons" value={summary.totalSalons} icon={<Store className="text-purple-600" />} bgColor="bg-purple-50" />
        <StatCard title="Total Earnings" value={`$${summary.totalEarnings.toLocaleString()}`} icon={<DollarSign className="text-emerald-600" />} bgColor="bg-emerald-50" />
        <StatCard title="Avg. Commission" value={`${summary.commissionRate}%`} icon={<Percent className="text-orange-600" />} bgColor="bg-orange-50" />
      </div>

      {/* --- Detailed Table Section --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Sales Network</h2>
          <div className="flex gap-2">
             <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider">
               {salesmen?.length} Active Members
             </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b">Member</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b">Referral Code</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b text-right">Commission</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {salesmen?.map((person) => (
                <tr key={person.salesmanId} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-linear-to-tr from-slate-200 to-slate-100 flex items-center justify-center font-bold text-slate-600 uppercase">
                        {person.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">{person.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded font-mono text-slate-600 border border-slate-200/50">
                      {person.referralId}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                      person.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
                      : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${person.status === 'active' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                      {person.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-700">
                    {person.commissionRate}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between">
    <div>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${bgColor}`}>
      {icon}
    </div>
  </div>
);

export default SalesExecutiveDashboard;