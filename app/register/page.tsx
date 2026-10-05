"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth, RegisterData } from "@/lib/context/AuthContext";

const steps = ["Personal Info", "Farm Details", "Set Password"];

export default function RegisterPage() {
  const { register } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    farmName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const update = (field: keyof RegisterData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setError("");
    if (step === 0) {
      if (!formData.name.trim()) return setError("Please enter your full name.");
      if (!formData.email.trim() || !formData.email.includes("@"))
        return setError("Please enter a valid email address.");
      if (!formData.phone.trim() || formData.phone.length < 10)
        return setError("Please enter a valid 10-digit phone number.");
    }
    if (step === 1) {
      if (!formData.farmName.trim()) return setError("Please enter your farm or orchard name.");
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (formData.password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (!agreedToTerms) {
      return setError("Please confirm you understand this is a local preview account.");
    }
    setIsLoading(true);
    const result = await register(formData);
    if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = {
    background: "#ffffff",
    border: "1.5px solid #c0c9c3",
    color: "#161d17",
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[48%] relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #003629 0%, #1b4d3e 50%, #0b4f36 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #feba38, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #9ed1bd, transparent)" }}
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#feba38" }}
            >
              <span className="material-symbols-outlined text-[22px]" style={{ color: "#003629" }}>
                park
              </span>
            </div>
            <div>
              <p
                className="text-white font-bold text-base leading-tight"
                style={{ fontFamily: "var(--font-epilogue)" }}
              >
                AgriGrove Portal
              </p>
              <p className="text-xs" style={{ color: "#9ed1bd" }}>
                Konkan Hapus Orchards
              </p>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 px-10 flex flex-col gap-8">
          <div>
            <h1
              className="text-4xl font-bold text-white leading-snug mb-3"
              style={{ fontFamily: "var(--font-epilogue)" }}
            >
              Organize your<br />
              <span style={{ color: "#feba38" }}>mango orchard</span><br />
              in one place
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#9ed1bd" }}>
              Keep your farm details and seasonal work together in one workspace.
            </p>
          </div>

          {/* Feature list */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "analytics", text: "Orchard information and seasonal planning" },
              { icon: "groups", text: "Worker and activity organization" },
              { icon: "agriculture", text: "Equipment planning" },
              { icon: "verified", text: "Farm document organization" },
            ].map((feat) => (
              <div key={feat.icon} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(254,186,56,0.15)" }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: "#feba38" }}
                  >
                    {feat.icon}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#9ed1bd" }}>
                  {feat.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10 p-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(158,209,189,0.15)",
              color: "#9ed1bd",
              border: "1px solid rgba(158,209,189,0.2)",
            }}
          >
            <span className="material-symbols-outlined text-[14px]">shield</span>
            Preview accounts are stored only in this browser.
          </div>
        </div>
      </div>

      {/* Right Panel — Register Form */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-12"
        style={{ background: "#f4fbf1" }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#003629" }}
            >
              <span className="material-symbols-outlined text-[20px] text-white">park</span>
            </div>
            <p
              className="font-bold"
              style={{ color: "#003629", fontFamily: "var(--font-epilogue)" }}
            >
              AgriGrove Portal
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2
              className="text-3xl font-bold mb-1"
              style={{ color: "#003629", fontFamily: "var(--font-epilogue)" }}
            >
              Create account
            </h2>
            <p className="text-sm" style={{ color: "#404945" }}>
              Set up a preview account
            </p>
          </div>

          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl mb-5"
            style={{ background: "#e9f0e5", border: "1px solid #c0c9c3" }}
          >
            <span className="material-symbols-outlined text-[18px] mt-0.5" style={{ color: "#003629" }}>
              info
            </span>
            <p className="text-xs" style={{ color: "#404945" }}>
              Preview only: account details stay in this browser and are not protected or synced. Do not enter sensitive information.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-7">
            {steps.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      background: i <= step ? "#003629" : "#dde5da",
                      color: i <= step ? "#feba38" : "#707974",
                    }}
                  >
                    {i < step ? (
                      <span className="material-symbols-outlined text-[14px] text-white">check</span>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className="text-[10px] font-semibold hidden sm:block"
                    style={{ color: i <= step ? "#003629" : "#707974" }}
                  >
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mb-3 transition-all"
                    style={{ background: i < step ? "#003629" : "#dde5da" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Step 0: Personal Info */}
            {step === 0 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-name" className="text-sm font-semibold" style={{ color: "#161d17" }}>
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]" style={{ color: "#707974" }}>
                      person
                    </span>
                    <input
                      id="reg-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name"
                      className={`${inputClass} pl-10`}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#c0c9c3")}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-email" className="text-sm font-semibold" style={{ color: "#161d17" }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]" style={{ color: "#707974" }}>
                      mail
                    </span>
                    <input
                      id="reg-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className={`${inputClass} pl-10`}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#c0c9c3")}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-phone" className="text-sm font-semibold" style={{ color: "#161d17" }}>
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]" style={{ color: "#707974" }}>
                      phone
                    </span>
                    <input
                      id="reg-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`${inputClass} pl-10`}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#c0c9c3")}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Farm Details */}
            {step === 1 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-farmname" className="text-sm font-semibold" style={{ color: "#161d17" }}>
                    Farm / Orchard Name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]" style={{ color: "#707974" }}>
                      park
                    </span>
                    <input
                      id="reg-farmname"
                      type="text"
                      required
                      value={formData.farmName}
                      onChange={(e) => update("farmName", e.target.value)}
                      placeholder="Your farm or orchard name"
                      className={`${inputClass} pl-10`}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#c0c9c3")}
                    />
                  </div>
                </div>

                <div
                  className="rounded-2xl p-4 flex flex-col gap-3"
                  style={{ background: "#e9f0e5", border: "1px solid #c0c9c3" }}
                >
                  <p className="text-xs font-semibold" style={{ color: "#003629" }}>
                    Why we ask this
                  </p>
                  <p className="text-xs" style={{ color: "#404945" }}>
                    Your farm name appears on GI export certificates, WhatsApp reports, and harvest records
                    generated by the portal.
                  </p>
                </div>
              </>
            )}

            {/* Step 2: Set Password */}
            {step === 2 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-password" className="text-sm font-semibold" style={{ color: "#161d17" }}>
                    Create Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]" style={{ color: "#707974" }}>
                      lock
                    </span>
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Min. 6 characters"
                      className={`${inputClass} pl-10 pr-11`}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#c0c9c3")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#707974" }}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>

                  {/* Password strength */}
                  {formData.password && (
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4].map((level) => {
                        const strength = Math.min(
                          Math.floor(formData.password.length / 3),
                          4
                        );
                        return (
                          <div
                            key={level}
                            className="h-1 flex-1 rounded-full transition-all"
                            style={{
                              background:
                                level <= strength
                                  ? strength <= 1
                                    ? "#ba1a1a"
                                    : strength <= 2
                                    ? "#feba38"
                                    : "#003629"
                                  : "#dde5da",
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-confirm" className="text-sm font-semibold" style={{ color: "#161d17" }}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]" style={{ color: "#707974" }}>
                      lock_reset
                    </span>
                    <input
                      id="reg-confirm"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className={`${inputClass} pl-10 pr-11`}
                      style={{
                        ...inputStyle,
                        borderColor:
                          confirmPassword && confirmPassword !== formData.password
                            ? "#ba1a1a"
                            : confirmPassword && confirmPassword === formData.password
                            ? "#003629"
                            : "#c0c9c3",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#003629")}
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          confirmPassword && confirmPassword !== formData.password
                            ? "#ba1a1a"
                            : "#c0c9c3")
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#707974" }}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showConfirm ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <label htmlFor="reg-terms" className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="reg-terms"
                    className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "#404945" }}>
                    I understand this is a local preview account and is not securely protected or synced.
                  </span>
                </label>
              </>
            )}

            {/* Error message */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: "#ffdad6", color: "#93000a" }}
              >
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Navigation buttons */}
            <div className={`flex gap-3 mt-1 ${step === 0 ? "justify-end" : "justify-between"}`}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => { setError(""); setStep((s) => s - 1); }}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#e9f0e5", color: "#003629" }}
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back
                </button>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
                  style={{ background: "#003629", color: "#ffffff" }}
                >
                  Continue
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  id="register-submit-btn"
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                  style={{ background: "#003629", color: "#ffffff" }}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                      Create Account
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Login link */}
          <p className="text-sm text-center mt-6" style={{ color: "#404945" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold hover:underline"
              style={{ color: "#003629" }}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
