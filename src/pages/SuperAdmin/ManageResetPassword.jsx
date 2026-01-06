import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../redux/slice/superadminSlice";
import { toast } from "react-hot-toast";

const ManageResetPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superadmin);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const newPassword = e.target.newPassword.value;

    try {
      await toast.promise(
        dispatch(ResetPassword({ email, newPassword })).unwrap(),
        {
          loading: "Resetting password...",
          success: (res) =>
            res?.message || "Password reset successfully",
          error: (err) =>
            err?.message || "Failed to reset password",
        }
      );

      e.target.reset(); // reset ONLY on success
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Manage Reset Password
        </h1>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg disabled:opacity-70"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageResetPassword;
