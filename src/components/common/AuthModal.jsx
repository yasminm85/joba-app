import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuthContext } from "@/context/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  const { 
    authMode, 
    setAuthMode, 
    handleManualAuth,
    signInWithGoogle,
    submitting,
    errorMsg,
    setErrorMsg,
    successMsg,
    setSuccessMsg 
  } = useAuthContext();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseModal = () => {
    if (!submitting) {
      onClose();
      setErrorMsg(null);
      setSuccessMsg(null);
      setFormData({ name: '', email: '', password: '' });
    }
  };

  const switchMode = (mode) => {
    setAuthMode(mode);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
          className="absolute inset-0 bg-[#2D2321]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white border border-black/5 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden text-[#2D2321] z-10"
        >
          <button
            disabled={submitting}
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-[#2D2321]">
              {authMode === "login" && "Login"}
              {authMode === "register" && "Register New Account"}
              {authMode === "forgot" && "Reset Password"}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {authMode === "login" && "Input your email and password"}
              {authMode === "register" && "Register to Joba"}
              {authMode === "forgot" && "Reset Your Password"}
            </p>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600 flex items-start gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 border border-green-100 rounded-2xl text-xs font-semibold text-green-600 flex items-start gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleManualAuth} className="space-y-4">
            {authMode === "register" && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={submitting}
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-[#FF84BA] focus:bg-white rounded-2xl text-xs font-medium outline-none transition-all"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Email</label>
              <input
                type="email"
                name="email"
                required
                disabled={submitting}
                placeholder="jade@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-[#FF84BA] focus:bg-white rounded-2xl text-xs font-medium outline-none transition-all"
              />
            </div>

            {authMode !== "forgot" && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Password</label>
                  {authMode === "login" && (
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => switchMode("forgot")}
                      className="text-[10px] font-bold text-[#FF84BA] hover:underline cursor-pointer disabled:opacity-50"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  disabled={submitting}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 focus:border-[#FF84BA] focus:bg-white rounded-2xl text-xs font-medium outline-none transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#FF84BA] hover:bg-[#FF84BA]/95 active:scale-98 disabled:opacity-50 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>
                  {authMode === "login" && "Login"}
                  {authMode === "register" && "Register"}
                  {authMode === "forgot" && "Send link reset password"}
                </span>
              )}
            </button>
          </form>

          {authMode !== "forgot" && (
            <>
              <div className="relative my-5 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100" />
                </div>
                <span className="relative bg-white px-3 text-[9px] font-bold capitalize text-gray-400">Or login with</span>
              </div>

              <button
                type="button"
                disabled={submitting}
                onClick={signInWithGoogle}
                className="w-full py-3.5 bg-white hover:bg-gray-50 border border-black/5 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.97 1 12 1 7.37 1 3.4 3.63 1.45 7.46l3.82 2.96C6.22 7.15 8.9 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.46h6.44c-.28 1.47-1.11 2.72-2.35 3.56l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.51z" />
                  <path fill="#FBBC05" d="M5.27 14.78a7.17 7.17 0 010-4.46L1.45 7.46a11.97 11.97 0 000 9.08l3.82-2.96z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-3.7 1.08-3.1 0-5.78-2.11-6.73-5.38l-3.82 2.96C3.4 20.37 7.37 23 12 23z" />
                </svg>
                <span>Google Sign-In</span>
              </button>
            </>
          )}

          <div className="text-center mt-6">
            {authMode === "login" && (
              <p className="text-[11px] text-gray-500 font-medium">
                Don't have an account?{" "}
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => switchMode("register")}
                  className="font-bold text-[#FF84BA] hover:underline cursor-pointer disabled:opacity-50"
                >
                  Register Now
                </button>
              </p>
            )}

            {authMode === "register" && (
              <p className="text-[11px] text-gray-500 font-medium">
                Have an account?{" "}
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => switchMode("login")}
                  className="font-bold text-[#FF84BA] hover:underline cursor-pointer disabled:opacity-50"
                >
                  Login here
                </button>
              </p>
            )}

            {authMode === "forgot" && (
              <p className="text-[11px] text-gray-500 font-medium">
                Back to{" "}
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => switchMode("login")}
                  className="font-bold text-[#FF84BA] hover:underline cursor-pointer disabled:opacity-50"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}