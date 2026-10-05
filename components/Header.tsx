"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useAuth } from "@/lib/context/AuthContext";

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  onOpenWhatsAppModal?: () => void;
}

export default function Header({
  onToggleMobileSidebar,
  onOpenWhatsAppModal,
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { logout, user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOrchardMenu, setShowOrchardMenu] = useState(false);
  const [selectedOrchard, setSelectedOrchard] = useState("");

  const orchards = user?.farmName
    ? [{ name: user.farmName, details: "" }]
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-primary z-50 shadow-[0_1px_8px_rgba(0,0,0,0.12)] px-4 md:px-8 border-b border-primary-container/40">
      <div className="h-20 w-full flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Logo + Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-on-primary hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">menu</span>
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo image from Stitch */}
            <img
              alt="Smart Mango Farm Portal Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary-fixed/40 shadow-sm shrink-0 group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UbPFtyefNtZY6G6eGDkiYjQlaoueBJmJToLPkJq9j8wI5wvuGkCIkb2FBZeHzyo3RMlRcclkQsQt3WePS9IHxEmLSF3twYdx19v5IOOsrK4UF9bY_O3mdLKK2MsT_zPXjZ-IjJdJGLarT8pysDJNSoeQXelnP0-6YpNpiW_o-kWkNCYBt3_w2O_WCQspDT6ySu4g2bIc_255mDvhKUYEQ9YX_EwDndV8pcjIY93CgVXivh94CndTsAsyU"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-title-lg text-title-lg text-on-primary tracking-tight font-bold truncate">
                {t("app_title")}
              </span>
              <span className="font-label-md text-label-md text-primary-fixed-dim truncate">
                {language === "en" ? "स्मार्ट आंबा बाग पोर्टल" : "Konkan Precision Horticulture"}
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Active Orchard and Harvest Season Indicators */}
        <div className="hidden xl:flex items-center gap-3 flex-1 justify-center max-w-2xl relative">
          <div className="relative">
            <button
              onClick={() => setShowOrchardMenu(!showOrchardMenu)}
              className="flex items-center gap-2 bg-primary-container hover:bg-primary-container/80 px-4 py-1.5 rounded-xl text-on-primary shadow-inner border border-primary-fixed/20 transition-all text-left"
            >
              <span className="material-symbols-outlined text-secondary-fixed text-[20px]">nature_people</span>
              <div className="flex flex-col">
                <span className="font-label-md text-[11px] text-primary-fixed-dim uppercase tracking-wider font-semibold">
                  {t("active_orchard")}
                </span>
                <span className="font-label-lg text-label-md text-on-primary font-bold">
                  {selectedOrchard || user?.farmName || t("orchard_name")}
                </span>
              </div>
              <span className="material-symbols-outlined text-primary-fixed-dim text-[18px] ml-1">
                expand_more
              </span>
            </button>

            {showOrchardMenu && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-2 z-50 text-on-surface animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-xs font-bold text-outline uppercase tracking-wider">
                  Select Active Parcel
                </div>
                {orchards.map((orchard, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOrchard(orchard.name);
                      setShowOrchardMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-surface-container-low flex flex-col transition-colors"
                  >
                    <span className="font-title-md text-sm font-semibold text-primary">{orchard.name}</span>
                    <span className="font-label-md text-xs text-on-surface-variant">{orchard.details}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-primary-container px-4 py-1.5 rounded-xl text-on-primary shadow-inner border border-primary-fixed/20">
            <span className="material-symbols-outlined text-secondary-container text-[20px]">event_available</span>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-[11px] text-primary-fixed-dim uppercase tracking-wider font-semibold">
                {t("harvest_cycle")}
              </span>
              <span className="font-label-lg text-label-md text-on-primary font-bold">
                {t("season_active")}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Language switchers, sync badge, notifications, profile */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Trilingual Toggle Buttons */}
          <div className="flex items-center bg-primary-container/90 border border-primary-fixed/20 p-0.5 rounded-full shadow-inner">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full font-label-md text-xs transition-all font-semibold ${
                language === "en"
                  ? "bg-secondary text-on-secondary shadow-sm"
                  : "text-on-primary hover:text-secondary-fixed"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage("mr")}
              className={`px-2.5 py-1 rounded-full font-label-md text-xs transition-all font-semibold ${
                language === "mr"
                  ? "bg-secondary text-on-secondary shadow-sm"
                  : "text-on-primary hover:text-secondary-fixed"
              }`}
            >
              मराठी
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={`px-2.5 py-1 rounded-full font-label-md text-xs transition-all font-semibold ${
                language === "hi"
                  ? "bg-secondary text-on-secondary shadow-sm"
                  : "text-on-primary hover:text-secondary-fixed"
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Telemetry online badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-primary-fixed font-label-md text-xs border border-primary-fixed/20">
            <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">cloud_done</span>
            <span>{t("synced_online")}</span>
          </div>

          {/* Notifications button & dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-primary-container text-on-primary hover:bg-surface-container-highest hover:text-on-surface transition-colors flex items-center justify-center border border-primary-fixed/20"
              title="3 Alerts"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-md text-[11px] flex items-center justify-center font-bold shadow-sm">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 p-4 z-50 text-on-surface animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                  <span className="font-title-md text-sm font-bold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">crisis_alert</span>
                    {language === "mr" ? "बागेतील तत्काळ सूचना (३)" : "Orchard Critical Alerts (3)"}
                  </span>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-outline hover:text-on-surface"
                  >
                    {language === "mr" ? "सर्व वाचले" : "Mark read"}
                  </button>
                </div>
                <div className="flex flex-col gap-2.5 pt-3">
                  <div className="p-2.5 rounded-xl bg-error-container/40 border border-error/20 flex items-start gap-2">
                    <span className="material-symbols-outlined text-error text-[20px] mt-0.5">warning</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-xs font-bold text-on-error-container">
                        Anthracnose Humidity Alert
                      </span>
                      <span className="font-label-md text-[11px] text-on-surface-variant">
                        High nighttime humidity (84%). Schedule Copper Oxychloride wash.
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-secondary-fixed/40 border border-secondary/20 flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">agriculture</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-xs font-bold text-on-secondary-fixed-variant">
                        Machinery In-Transit (CHC Pawas)
                      </span>
                      <span className="font-label-md text-[11px] text-on-surface-variant">
                        Swaraj 4WD Tractor + 400L Blower dispatched. Arrival ~7:00 AM.
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">groups</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-xs font-bold text-primary">
                        Harvest Squad Checked-In
                      </span>
                      <span className="font-label-md text-[11px] text-on-surface-variant">
                        Santosh Gurav & 17 workers checked in at Block B.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Farmer Profile Pill */}
          <Link
            href="/my-profile"
            className="flex items-center gap-2 pl-1 group p-1 rounded-full hover:bg-primary-container/80 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold shrink-0">
              {user?.name?.charAt(0).toUpperCase() || "F"}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="font-label-lg text-sm text-on-primary leading-tight font-bold group-hover:text-secondary-fixed transition-colors">
                {user?.name || t("farmer_name")}
              </span>
              <span className="font-label-md text-[11px] text-secondary-fixed leading-none">
                {t("farmer_role")}
              </span>
            </div>
          </Link>

          {/* Logout button */}
          {user && (
            <button
              onClick={logout}
              aria-label="Sign out"
              title="Sign out"
              className="p-2 rounded-xl text-on-primary hover:bg-error/20 hover:text-error-container transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
