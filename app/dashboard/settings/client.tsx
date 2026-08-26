"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ImageUpload from "@/components/ui/image-upload";
import Loading from "@/components/ui/loading";
import { Shield, User, Key, Check } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  image: z.string().optional().or(z.literal("")),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function SettingsClient() {
  const { data: session, update: updateSession } = useSession();
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    setValue: setProfileValue,
    watch: watchProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const watchedProfile = watchProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        if (data.success && data.data) {
          setProfileValue("name", data.data.name || "");
          setProfileValue("image", data.data.image || "");
          setProfile(data.data);
        }
      } catch (err) {
        console.error("Failed to load user profile details:", err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [setProfileValue]);

  const onUpdateProfile = async (data: ProfileForm) => {
    setIsUpdatingProfile(true);
    setProfileError(null);
    setProfileSuccess(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (resData.success) {
        setProfileSuccess(true);
        // Force refresh session tokens
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: data.name,
            image: data.image,
          },
        });
        setTimeout(() => setProfileSuccess(false), 3000);
      } else {
        setProfileError(resData.error?.message || "Failed to update profile info");
      }
    } catch (err) {
      setProfileError("An unexpected error occurred.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onUpdatePassword = async (data: PasswordForm) => {
    setIsUpdatingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setPasswordSuccess(true);
        resetPasswordForm();
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(resData.error?.message || "Incorrect current password");
      }
    } catch (err) {
      setPasswordError("An unexpected error occurred.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (profileLoading) {
    return <Loading variant="fullscreen" message="Loading settings..." />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-10 animate-fade-in relative z-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Manage your account profile details and security configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Navigation tips list */}
        <div className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-indigo-600 font-bold text-sm">
            <Shield className="w-5 h-5 shrink-0" />
            <span>Account Security</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Keep your account details up to date. Make sure to choose a strong password that is not used elsewhere.
          </p>
          <div className="border-t border-gray-100 pt-4">
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Plan Status</div>
            <div className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset bg-indigo-50 text-indigo-700 ring-indigo-600/10">
              {profile?.subscription || "FREE"} Plan
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
            </div>

            {profileError && (
              <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-150 rounded-xl p-3">
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="mb-4 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-150 rounded-xl p-3 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Profile Photo</label>
                <ImageUpload
                  value={watchedProfile.image || ""}
                  onChange={(url) => setProfileValue("image", url)}
                  placeholder="Upload profile image"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-2">Display Name</label>
                <input
                  {...registerProfile("name")}
                  type="text"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="Enter your name"
                />
                {profileErrors.name && (
                  <p className="mt-1 text-xs text-red-600 font-semibold">{profileErrors.name.message}</p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl text-xs hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isUpdatingProfile ? "Saving..." : "Save Information"}
                </button>
              </div>
            </form>
          </div>

          {/* Password Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <Key className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
            </div>

            {passwordError && (
              <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-150 rounded-xl p-3">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-4 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-150 rounded-xl p-3 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Password changed successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmitPassword(onUpdatePassword)} className="space-y-5">
              <div>
                <label htmlFor="currentPassword" className="block text-xs font-bold text-slate-700 mb-2">Current Password</label>
                <input
                  {...registerPassword("currentPassword")}
                  type="password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="Enter current password"
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-xs text-red-600 font-semibold">{passwordErrors.currentPassword.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-xs font-bold text-slate-700 mb-2">New Password</label>
                <input
                  {...registerPassword("newPassword")}
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="At least 6 characters"
                />
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-xs text-red-600 font-semibold">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 mb-2">Confirm New Password</label>
                <input
                  {...registerPassword("confirmPassword")}
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all text-sm text-slate-800"
                  placeholder="Confirm new password"
                />
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 font-semibold">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl text-xs hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md shadow-indigo-600/10 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isUpdatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
