"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[48%] relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #003629 0%, #1b4d3e 50%, #0b4f36 100%)" }}
      >
        {/* Background decorative circles */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #feba38, transparent)" }}
        />
        <div
          className="absolute bottom-10 -right-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #9ed1bd, transparent)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #feba38, transparent)" }}
        />

        {/* Top logo area */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "#feba38" }}
            >
              <span className="material-symbols-outlined text-[22px]" style={{ color: "#003629" }}>
                park
              </span>
            </div>
            <div>
              <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "var(--font-epilogue)" }}>
                AgriGrove Portal
              </p>
              <p className="text-xs" style={{ color: "#9ed1bd" }}>
                Konkan Hapus Orchards
              </p>
            </div>
          </div>
        </div>

        {/* Center hero text */}
        <div className="relative z-10 px-10 flex flex-col gap-6">
          <h1
            className="text-4xl font-bold text-white leading-snug"
            style={{ fontFamily: "var(--font-epilogue)" }}
          >
            Precision farming<br />
            <span style={{ color: "#feba38" }}>for Alphonso</span><br />
            orchards
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#9ed1bd" }}>
            Keep your orchard information and seasonal work organized in one place.
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: "#f4fbf1" }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#003629" }}
            >
              <span className="material-symbols-outlined text-[20px] text-white">park</span>
            </div>
            <p className="font-bold" style={{ color: "#003629", fontFamily: "var(--font-epilogue)" }}>
              AgriGrove Portal
            </p>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#003629", fontFamily: "var(--font-epilogue)" }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "#404945" }}>
              Sign in to access your orchard dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="text-sm font-semibold"
                style={{ color: "#161d17" }}
              >
                Email address
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]"
                  style={{ color: "#707974" }}
                >
                  mail
                </span>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #c0c9c3",
                    color: "#161d17",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#c0c9c3")}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-sm font-semibold"
                  style={{ color: "#161d17" }}
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]"
                  style={{ color: "#707974" }}
                >
                  lock
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #c0c9c3",
                    color: "#161d17",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#c0c9c3")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#707974" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: "#ffdad6", color: "#93000a" }}
              >
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all mt-1 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
              style={{ background: "#003629", color: "#ffffff" }}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Authentication notice */}
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl mb-5"
            style={{ background: "#e9f0e5", border: "1px solid #c0c9c3" }}
          >
            <span className="material-symbols-outlined text-[18px] mt-0.5" style={{ color: "#003629" }}>
              info
            </span>
            <p className="text-xs" style={{ color: "#404945" }}>
              Create a preview account before signing in. Account data stays in this browser and is not securely protected or synced.
            </p>
          </div>

          <p className="text-sm text-center" style={{ color: "#404945" }}>
            New to AgriGrove?{" "}
            <Link href="/register" className="font-semibold hover:underline" style={{ color: "#003629" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
