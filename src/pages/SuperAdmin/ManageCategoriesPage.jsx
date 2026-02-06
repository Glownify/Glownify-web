import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
} from "../../redux/slice/superadminSlice";
import {
  Layers,
  Tag,
  ChevronRight,
  Info,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const TABS = ["men", "women", "unisex"];

const ManageCategoriesPage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("men");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
    gender: "men",
    icon: "",
  });

  const {
    categories = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.superadmin || {});

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter(
    (cat) => cat.gender === activeTab
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const actionPromise = isEditMode
      ? dispatch(
          updateCategory({
            categoryId: editingCategoryId,
            categoryData: categoryData,
          })
        ).unwrap()
      : dispatch(addCategory(categoryData)).unwrap();

    await toast.promise(actionPromise, {
      loading: isEditMode ? "Updating category..." : "Creating category...",
      success: (res) =>
        res?.message ||
        (isEditMode
          ? "Category updated successfully!"
          : "Category created successfully!"),
      error: (err) =>
        err?.message ||
        err?.error ||
        "Operation failed. Please try again.",
    });

    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingCategoryId(null);
    setCategoryData({ name: "", gender: "men", icon: "" });

    // Optional refresh if slice doesn't auto-update
    dispatch(fetchAllCategories());
  } catch (error) {
    console.error("Category submit error:", error);
  }
};


  const handleEditCategory = (category) => {
    setIsEditMode(true);
    setEditingCategoryId(category._id);
    setCategoryData({
      name: category.name,
      gender: category.gender,
      icon: category.icon || "",
    });
    setIsModalOpen(true);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Categories
          </h1>
          <p className="text-slate-500">
            Organize service categories by gender
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95"
        >
          <Layers size={18} />
          Create Category
        </button>
      </div>

      {error && (
  <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
    {error.message || error}
  </div>
)}


      {/* Modern Tabs */}
      <div className="inline-flex p-1 bg-slate-200/50 rounded-2xl mb-8 border border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="group bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt=""
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <Tag className="text-slate-400" size={20} />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{category.name}</h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {category.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleEditCategory(category)}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition"
            >
              <Info size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* --- CREATE CATEGORY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {isEditMode ? "Update Category" : "New Category"}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={categoryData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Haircut, Facial..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-slate-700"
                />
              </div>

              {/* Gender Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Gender Category
                </label>
                <select
                  name="gender"
                  value={categoryData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 appearance-none bg-no-repeat bg-position-[right_1rem_center] bg-size-[1em_1em]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="men">Male</option>
                  <option value="women">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              {/* Icon Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Category Icon
                </label>
                <input
                  type="text"
                  name="icon"
                  required
                  value={categoryData.icon}
                  onChange={handleInputChange}
                  placeholder="Icon URL"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300 text-slate-700"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {isEditMode ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategoriesPage;
