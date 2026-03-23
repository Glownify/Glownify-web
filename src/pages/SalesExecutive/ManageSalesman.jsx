import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  Award,
  Calendar,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import {
  createSalesman,
  fetchAllSalesman,
} from "../../redux/slice/salesexecutiveSlice";

const ManageSalesman = () => {
  const dispatch = useDispatch();
  const { salesman = [], loading } = useSelector((state) => state.salesexecutive);
  const user = useSelector((state) => state.auth.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    commissionRate: "",
  });

  useEffect(() => {
    dispatch(fetchAllSalesman());
  }, [dispatch]);

  const filteredSalesman = salesman.filter(
    (item) =>
      item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.referralId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.roleDetails?.city) {
      toast.error("City not found for logged-in user");
      return;
    }

    const payload = {
      ...formData,
      city: user.roleDetails.city,
      commissionRate: Number(formData.commissionRate),
    };

    try {
      const createPromise = dispatch(createSalesman(payload)).unwrap();

      await toast.promise(createPromise, {
        loading: "Creating salesman...",
        success: (res) => res?.message || "Salesman created successfully!",
        error: (err) =>
          err?.message || err?.error || "Failed to create salesman",
      });

      setOpenCreate(false);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        commissionRate: "",
      });
    } catch (error) {
      console.error("Create Salesman Error:", error);
    }
  };

  if (loading && salesman.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-10">
        <div className="mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-indigo-600" />
        <p className="font-medium text-slate-500">Loading salesman data...</p>
      </div>
    );
  }

  return (
    <div className="py-2 sm:py-4">
      <div className="mx-auto w-full">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Salesman Management
            </h1>
            <p className="mt-1 text-slate-500">
              Manage and track performance of your field agents.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 md:w-auto sm:flex-row">
            <div className="group relative w-full md:w-72">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#8B5CF6]"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-[#8B5CF6] focus:outline-none focus:ring-4 focus:ring-[#8B5CF6]/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setOpenCreate(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8B5CF6] px-5 py-3 font-bold text-white shadow-lg shadow-[#8B5CF6]/20 transition-all hover:bg-[#7C3AED] hover:shadow-xl"
            >
              <Plus size={18} />
              Create Salesman
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredSalesman.map((item) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:rounded-[32px] sm:p-6"
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-xl font-bold text-[#8B5CF6] transition-all duration-300 group-hover:bg-[#8B5CF6] group-hover:text-white">
                    {item.user?.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words text-lg font-bold leading-tight text-slate-900">
                      {item.user?.name}
                    </h3>
                    <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Mail size={12} /> {item.user?.email}
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-300 transition-colors hover:text-slate-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Earnings
                  </p>
                  <p className="text-lg font-black text-slate-900">
                    Rs{item.totalEarnings?.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Commission
                  </p>
                  <p className="text-lg font-black text-[#8B5CF6]">
                    {item.commissionRate}%
                  </p>
                </div>
              </div>

              <div className="mb-6 px-1">
                <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  <span>Performance Tier</span>
                  <span>{item.commissionRate}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#8B5CF6] transition-all duration-500"
                    style={{ width: `${item.commissionRate}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-50 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-2">
                  <Award size={14} className="text-indigo-400" />
                  <span className="break-all text-xs font-mono font-bold text-[#8B5CF6]">
                    {item.referralId}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} />
                  <span className="text-xs font-medium">
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSalesman.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-10 text-center sm:rounded-[32px] sm:p-20">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No agents found</h3>
            <p className="mt-2 text-slate-500">
              No results match your current search criteria.
            </p>
          </div>
        )}

        {openCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl animate-in fade-in zoom-in sm:rounded-[32px] sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Create Salesman
                </h2>
                <button
                  onClick={() => setOpenCreate(false)}
                  className="text-xl leading-none text-slate-400 hover:text-slate-700"
                >
                  x
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
                <input
                  name="mobile"
                  placeholder="Phone"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
                <input
                  name="commissionRate"
                  type="number"
                  placeholder="Commission Rate (%)"
                  value={formData.commissionRate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setOpenCreate(false)}
                    className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-indigo-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSalesman;
