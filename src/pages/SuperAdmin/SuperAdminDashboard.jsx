import React from 'react';
import { 
  Users, Store, CreditCard, IndianRupee, 
  Plus, Eye, TrendingUp, AlertCircle 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// Mock Data for Charts
const barData = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 65 },
  { name: 'Apr', value: 58 },
  { name: 'May', value: 78 },
  { name: 'Jun', value: 92 },
];

const pieData = [
  { name: 'Rajesh Kumar', value: 27, color: '#8b5cf6' },
  { name: 'Priya Sharma', value: 23, color: '#ec4899' },
  { name: 'Amit Patel', value: 19, color: '#3b82f6' },
  { name: 'Sneha Reddy', value: 17, color: '#10b981' },
  { name: 'Others', value: 15, color: '#f59e0b' },
];

const SuperAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-700">
      
      {/* 1. Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Sales Persons" value="24" trend="+12%" icon={<Users size={24}/>} color="bg-purple-600" />
        <StatCard title="Total Salons Registered" value="156" trend="+23%" icon={<Store size={24}/>} color="bg-pink-500" />
        <StatCard title="Total Subscriptions Sold" value="342" trend="+18%" icon={<CreditCard size={24}/>} color="bg-blue-500" />
        <StatCard title="Total Revenue Received" value="₹8.4L" trend="+31%" icon={<IndianRupee size={24}/>} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column: Management & Charts */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* 2. Sales Team Management Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Sales Team Management</h2>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <Plus size={18} /> Register New Sales Person
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-400 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Referral ID</th>
                    <th className="px-6 py-4 font-semibold">Sales Person</th>
                    <th className="px-6 py-4 font-semibold text-center">Salons</th>
                    <th className="px-6 py-4 font-semibold">Commission</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <TableRow id="SP-2025-001" name="Rajesh Kumar" salons="15" comm="₹45,000" color="purple" />
                  <TableRow id="SP-2025-002" name="Priya Sharma" salons="12" comm="₹38,000" color="pink" />
                  <TableRow id="SP-2025-003" name="Amit Patel" salons="10" comm="₹32,000" color="blue" />
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
              <h3 className="font-bold mb-4">Subscriptions Sold per Month</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={barData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
              <h3 className="font-bold mb-4 text-center">Revenue Distribution</h3>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Top Performer */}
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
              <TrendingUp size={20} /> Top Performer
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" alt="avatar" />
              </div>
              <div>
                <p className="font-bold text-lg">Priya Verma</p>
                <p className="text-xs text-gray-500">SP-2025-002</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Salons Registered</span><span className="font-bold">18</span></div>
              <div className="flex justify-between"><span>Subscriptions Sold</span><span className="font-bold">15</span></div>
              <div className="flex justify-between text-emerald-700 font-bold pt-2 border-t border-emerald-200">
                <span>Commission Earned</span><span>₹ 82,500</span>
              </div>
            </div>
          </div>

          {/* Low Performance Alert */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
              <AlertCircle size={20} /> Low Performance Alert
            </div>
            <div className="space-y-3">
              <AlertItem name="Amit Patel" sub="9 salons" />
              <AlertItem name="Vikram Singh" sub="6 salons" />
            </div>
          </div>

          {/* Pending Commission */}
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
             <h3 className="font-bold text-amber-900 mb-1">Pending Commission</h3>
             <p className="text-xs text-amber-700 mb-4">Awaiting approval</p>
             <div className="space-y-4">
               <PendingItem name="Rahul Sharma" id="SP-2025-001" amount="45,000" />
               <PendingItem name="Priya Verma" id="SP-2025-002" amount="82,500" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Components for Cleanliness ---

const StatCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between">
    <div>
      <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-green-500 text-sm font-bold flex items-center gap-1">
        <TrendingUp size={14} /> {trend}
      </p>
    </div>
    <div className={`${color} text-white p-3 rounded-xl h-fit shadow-lg shadow-${color}/20`}>
      {icon}
    </div>
  </div>
);

const TableRow = ({ id, name, salons, comm, color }) => (
  <tr className="hover:bg-gray-50 transition">
    <td className="px-6 py-4 text-purple-600 font-medium">{id}</td>
    <td className="px-6 py-4 font-bold">{name}</td>
    <td className="px-6 py-4 text-center">
      <span className={`bg-${color}-100 text-${color}-600 px-3 py-1 rounded-full text-xs font-bold`}>{salons}</span>
    </td>
    <td className="px-6 py-4 font-bold text-green-600">{comm}</td>
    <td className="px-6 py-4">
      <button className="text-purple-600 flex items-center gap-1 font-semibold text-sm hover:underline">
        <Eye size={16} /> View
      </button>
    </td>
  </tr>
);

const AlertItem = ({ name, sub }) => (
  <div className="bg-white p-3 rounded-xl flex justify-between items-center shadow-sm">
    <div>
      <p className="font-bold text-sm">{name}</p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
    <button className="border border-purple-200 text-purple-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-purple-50">Alert</button>
  </div>
);

const PendingItem = ({ name, id, amount }) => (
  <div className="flex justify-between items-start">
    <div>
      <p className="font-bold text-sm">{name}</p>
      <p className="text-xs text-gray-500">{id}</p>
    </div>
    <p className="font-bold">₹ {amount}</p>
  </div>
);

export default SuperAdminDashboard;