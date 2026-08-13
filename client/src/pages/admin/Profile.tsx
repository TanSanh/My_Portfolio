import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Save,
  Loader2,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { authService, AdminProfile } from "../../services/authService";

export const Profile = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await authService.getProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        email: data.email,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");

    try {
      const updated = await authService.updateProfile({
        email: formData.email,
        name: formData.name,
      });
      setProfile(updated);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      setSuccess("");
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Validate password strength
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)
    ) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }

    setChangingPassword(true);
    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSuccess("Password changed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      setPasswordError(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your admin account settings
        </p>
      </motion.div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm"
        >
          <CheckCircle className="w-4 h-4" />
          {success}
        </motion.div>
      )}

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-white/5"
      >
        <div className="bg-[#0a0a1a] rounded-xl p-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {profile?.name}
              </h2>
              <p className="text-gray-400 text-sm">{profile?.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Change Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-white/5"
      >
        <div className="bg-[#0a0a1a] rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Change Password
          </h3>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Error Message */}
            {passwordError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {passwordError}
              </div>
            )}

            {/* Current Password */}
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full pl-10 pr-12 py-3 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full pl-10 pr-12 py-3 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Min 8 characters, including uppercase, lowercase, and number
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={changingPassword}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
              >
                {changingPassword ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Changing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-white/5"
      >
        <div className="bg-[#0a0a1a] rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Account Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-400 text-sm">Account created</span>
              <span className="text-white text-sm">
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-400 text-sm">Role</span>
              <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                Admin
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
