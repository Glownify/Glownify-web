import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bell, CheckCircle, AlertCircle, Clock, Filter, Search } from 'lucide-react';
import useMobile from '../../hooks/useMobile';

const ManageNotificationsPage = () => {
  const isMobile = useMobile();
  const { user } = useSelector((state) => state.auth || {});
  
  const [notifications] = useState([
    {
      _id: 'notif_1',
      title: 'New Salon Registration',
      message: 'Glamour Salon has registered and is pending approval',
      type: 'info',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      action: 'Review Application'
    },
    {
      _id: 'notif_2',
      title: 'Subscription Payment Received',
      message: 'Premium Plan subscription payment from Beauty Pro Salon',
      type: 'success',
      timestamp: '2024-01-15T09:15:00Z',
      read: true,
      action: 'View Details'
    },
    {
      _id: 'notif_3',
      title: 'System Alert',
      message: 'Database backup completed successfully',
      type: 'warning',
      timestamp: '2024-01-15T08:00:00Z',
      read: true,
      action: 'View Logs'
    },
    {
      _id: 'notif_4',
      title: 'User Report',
      message: 'Multiple user accounts flagged for suspicious activity',
      type: 'error',
      timestamp: '2024-01-14T16:45:00Z',
      read: false,
      action: 'Investigate'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || notif.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'warning': return <AlertCircle className="text-amber-500" size={20} />;
      case 'error': return <AlertCircle className="text-rose-500" size={20} />;
      default: return <Bell className="text-slate-400" size={20} />;
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 border-emerald-100';
      case 'warning': return 'bg-amber-50 border-amber-100';
      case 'error': return 'bg-rose-50 border-rose-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
        <div className="mb-8">
          <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Communication Hub</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mt-1">Notifications</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">System alerts and updates</p>
        </div>

        {/* Search */}
        <div className="bg-white h-12 rounded-2xl border border-slate-100 flex items-center px-4 shadow-sm mb-6">
          <Search size={16} className="text-slate-300 mr-3" />
          <input 
            type="text" 
            placeholder="Search notifications..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-700 outline-none w-full" 
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'success', 'warning', 'error'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filterType === type 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4 mb-20">
          {filteredNotifications.map(notif => (
            <div key={notif._id} className={`bg-white rounded-2xl p-5 border ${getNotificationBg(notif.type)} ${!notif.read ? 'border-l-4' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getNotificationIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-sm text-slate-800">{notif.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400">
                      {formatTimestamp(notif.timestamp)}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium text-slate-600 mb-3">{notif.message}</p>
                  <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest">
                    {notif.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DESKTOP VIEW
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-rose-600">Communication Hub</span>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Notifications</h1>
          <p className="text-slate-500 max-w-2xl font-medium mt-2">
            Monitor system alerts, user activities, and important updates across the platform
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
              <Filter size={18} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <Bell className="text-slate-400" size={18} />
              <span className="text-[11px] font-black text-slate-700">
                {notifications.filter(n => !n.read).length} Unread
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search notifications by title or message..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 bg-transparent pl-11 pr-4 text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 transition-all placeholder:text-slate-300 border border-transparent focus:border-slate-100" 
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'success', 'warning', 'error'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  filterType === type 
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredNotifications.map(notif => (
          <div key={notif._id} className={`bg-white rounded-[2.5rem] p-8 border transition-all hover:shadow-lg ${getNotificationBg(notif.type)} ${!notif.read ? 'border-l-4' : ''}`}>
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                notif.type === 'success' ? 'bg-emerald-50' :
                notif.type === 'warning' ? 'bg-amber-50' :
                notif.type === 'error' ? 'bg-rose-50' : 'bg-slate-50'
              }`}>
                {getNotificationIcon(notif.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">{notif.title}</h3>
                  <div className="flex items-center gap-3">
                    {!notif.read && (
                      <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    )}
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      {formatTimestamp(notif.timestamp)}
                    </span>
                  </div>
                </div>
                
                <p className="text-[14px] font-medium text-slate-600 mb-6 leading-relaxed">{notif.message}</p>
                
                <button className="text-[11px] font-black text-rose-600 uppercase tracking-widest hover:text-rose-700 transition-colors">
                  {notif.action} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNotificationsPage;
