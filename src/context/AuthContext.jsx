"use client";

import React, { createContext, useContext, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const authLoading = status === "loading";
  const user = session?.user || null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsModalOpen(true);
  };

  const signInWithGoogle = async () => {
    try {
      setErrorMsg(null);
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        throw new Error(result.error);
      }
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setErrorMsg("Gagal melakukan login dengan Google.");
    }
  };

  const handleManualAuth = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    try {
      if (authMode === "login") {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) throw new Error(result.error);
        setIsModalOpen(false);
      } else if (authMode === "register") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed Register.");

        setSuccessMsg(data.message);
        setAuthMode("login");
      } else if (authMode === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed send link reset password");

        setSuccessMsg("Check email to reset password");
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMsg(null);
          setAuthMode("login");
        }, 3000);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isModalOpen,
        setIsModalOpen,
        authMode,
        setAuthMode,
        submitting,
        errorMsg,
        setErrorMsg,
        successMsg,
        setSuccessMsg,
        openAuth,
        handleManualAuth,
        logout,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}