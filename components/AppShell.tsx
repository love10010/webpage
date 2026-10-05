"use client";

import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  WhatsAppModal,
  RecordExpenseModal,
  RecordHarvestModal,
  AddCareNoteModal,
} from "./Modals";
import { useAuth } from "@/lib/context/AuthContext";

interface ModalContextType {
  openWhatsApp: () => void;
  openExpense: () => void;
  openHarvest: () => void;
  openCareNote: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openWhatsApp: () => {},
  openExpense: () => {},
  openHarvest: () => {},
  openCareNote: () => {},
});

export const useModals = () => useContext(ModalContext);

const AUTH_ROUTES = ["/login", "/register"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isHarvestOpen, setIsHarvestOpen] = useState(false);
  const [isCareNoteOpen, setIsCareNoteOpen] = useState(false);

  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const modalActions: ModalContextType = {
    openWhatsApp: () => setIsWhatsAppOpen(true),
    openExpense: () => setIsExpenseOpen(true),
    openHarvest: () => setIsHarvestOpen(true),
    openCareNote: () => setIsCareNoteOpen(true),
  };

  // Show spinner while resolving auth from localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f4fbf1" }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "#003629" }}
          >
            <span className="material-symbols-outlined text-[24px] text-white">park</span>
          </div>
          <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" style={{ borderTopColor: "#003629", borderColor: "#c0c9c3" }} />
        </div>
      </div>
    );
  }

  // Auth pages (login/register) — render without shell
  if (AUTH_ROUTES.includes(pathname) || !user) {
    return <>{children}</>;
  }

  return (
    <ModalContext.Provider value={modalActions}>
      <div className="min-h-screen bg-surface flex flex-col">
        {/* Fixed Top Header */}
        <Header
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
        />

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
            onOpenWhatsAppModal={() => setIsWhatsAppOpen(true)}
          />

          {/* Main Viewport Content */}
          <div className="w-full md:pl-72 pt-20 flex-1 min-h-[calc(100vh-5rem)]">
            <main className="w-full p-4 md:p-8 max-w-[1520px] mx-auto pb-16">
              {children}
            </main>
          </div>
        </div>

        {/* Global Modals */}
        <WhatsAppModal
          isOpen={isWhatsAppOpen}
          onClose={() => setIsWhatsAppOpen(false)}
        />
        <RecordExpenseModal
          isOpen={isExpenseOpen}
          onClose={() => setIsExpenseOpen(false)}
        />
        <RecordHarvestModal
          isOpen={isHarvestOpen}
          onClose={() => setIsHarvestOpen(false)}
        />
        <AddCareNoteModal
          isOpen={isCareNoteOpen}
          onClose={() => setIsCareNoteOpen(false)}
        />
      </div>
    </ModalContext.Provider>
  );
}
