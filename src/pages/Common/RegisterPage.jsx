import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF, FaMicrosoft } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerPromise = dispatch(register(formData)).unwrap();

      await toast.promise(registerPromise, {
        loading: "Creating account...",
        success: (res) =>
          res?.message || "Registration successful! Please log in.",
        error: (err) => err?.message || "Registration failed",
      });

      navigate("/login");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
      });
    } catch (error) {
      // Error already handled by toast.promise
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className=" pb-12 px-4 sm:px-6 lg:px-8">
      {/* Reduced top margin since navbar is present */}
      <div className="max-w-md mx-auto mt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community today.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone
              </label>
              <input
                name="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="123-456-7890"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
            <div className=" flex items-center justify-center bg-[#faf9f7] px-4">
              <div className="w-full max-w-md">
                <h2 className="text-center text-xl font-semibold mb-6">
                  Sign up to your account
                </h2>

                {/* Google */}
                <button className="social-btn">
                  <FcGoogle size={20} />
                  Sign up with Google
                </button>
                <button className="social-btn">
                  <FaApple size={20} />
                  Sign up with Apple
                </button>

                <button className="social-btn">
                  <FaFacebookF size={18} className="text-[#1877F2]" />
                  Sign up with Facebook
                </button>

                <button className="social-btn">
                  <FaMicrosoft size={18} />
                  Sign up with Microsoft
                </button>

                <button className="social-btn">
                  <MdEmail size={20} />
                  Sign up with Email
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
