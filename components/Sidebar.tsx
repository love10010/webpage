"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenWhatsAppModal?: () => void;
}

export default function Sidebar({
  isMobileOpen,
  onCloseMobile,
  onOpenWhatsAppModal,
}: SidebarProps) {
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const navItems = [
    {
      label: t("nav_dashboard"),
      path: "/",
      icon: "analytics",
      badge: null,
    },
    {
      label: t("nav_farms"),
      path: "/my-farms-and-trees",
      icon: "park",
      badge: null,
    },
    {
      label: t("nav_workers"),
      path: "/hire-workers",
      icon: "groups",
      badge: null,
    },
    {
      label: t("nav_machines"),
      path: "/rent-machines",
      icon: "agriculture",
      badge: null,
    },
    {
      label: t("nav_care"),
      path: "/fertilizer-and-care",
      icon: "compost",
      badge: null,
    },
    {
      label: t("nav_activity"),
      path: "/activity-and-reminders",
      icon: "notifications_active",
      badge: null,
    },
    {
      label: t("nav_profile"),
      path: "/my-profile",
      icon: "account_circle",
      badge: null,
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-y-auto">
      {/* Top Navigation */}
      <div className="p-space-md flex flex-col gap-space-sm">
        <div className="px-space-md py-space-xs text-xs font-bold text-outline uppercase tracking-wider">
          {language === "mr" ? "बागेची व्यवस्थापन कामे" : "Farm Operations"}
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-space-md min-h-[48px] rounded-xl transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-space-md">
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      isActive ? "text-secondary-fixed" : "text-outline"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-label-lg text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Support & Actions */}
      <div className="p-space-md border-t border-surface-container-high bg-surface-container flex flex-col gap-space-sm">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col gap-1.5">
          <div className="flex items-center gap-space-xs text-primary font-bold">
            <span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span>
            <span className="font-title-md text-sm">{t("kisan_mitra_title")}</span>
          </div>
          <p className="font-label-md text-xs text-on-surface-variant">
            {t("kisan_mitra_sub")}
          </p>
          <a
            href="tel:18001801551"
            className="font-headline-md text-sm text-primary hover:underline font-bold tracking-wide"
          >
            {t("kisan_phone")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onCloseMobile) onCloseMobile();
            if (onOpenWhatsAppModal) onOpenWhatsAppModal();
          }}
          className="min-h-[48px] w-full px-space-md bg-secondary hover:brightness-105 text-on-secondary rounded-xl font-label-lg text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
          <span>{t("share_whatsapp")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-20 bottom-0 w-72 bg-surface-container-low z-40 flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Menu */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 max-w-[85vw] h-full bg-surface-container-low shadow-2xl flex flex-col z-10 pt-4">
            <div className="flex items-center justify-between px-4 pb-2 border-b border-surface-container-high">
              <span className="font-title-lg text-sm font-bold text-primary">
                {t("app_title")}
              </span>
              <button
                onClick={onCloseMobile}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
