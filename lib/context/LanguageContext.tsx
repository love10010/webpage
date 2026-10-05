"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "mr" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    app_title: "Smart Mango Farm Portal",
    app_subtitle: "स्मार्ट आंबा बाग पोर्टल",
    app_tagline: "Konkan Precision Horticulture",
    active_orchard: "Active Orchard",
    orchard_name: "No orchard selected",
    orchard_details: "",
    harvest_cycle: "Harvest Cycle",
    season_active: "Not configured",
    synced_online: "Not connected",
    farmer_name: "Farmer",
    farmer_role: "Farm account",
    kisan_mitra_title: "Kisan Mitra Support",
    kisan_mitra_sub: "Toll-Free Helpline (24x7)",
    kisan_phone: "1800-180-1551",
    share_whatsapp: "Share WhatsApp Report",
    nav_dashboard: "Dashboard",
    nav_farms: "My Farms & Trees",
    nav_workers: "Hire Workers",
    nav_machines: "Rent Machines",
    nav_care: "Fertilizer & Care",
    nav_activity: "Activity & Reminders",
    nav_profile: "My Profile",
    quick_actions: "Quick Farm Actions",
    record_expense: "Record Expense",
    record_harvest: "Record Harvest / Sale",
    add_care_note: "Add Care Note",
    hire_workers_now: "Hire Workers Now",
    book_machinery: "Book Sprayer / Tractor",
    view_all: "View All",
    close: "Close",
    submit: "Submit",
    cancel: "Cancel",
  },
  mr: {
    app_title: "स्मार्ट आंबा बाग पोर्टल",
    app_subtitle: "Smart Mango Farm Portal",
    app_tagline: "कोकण आधुनिक फलोत्पादन",
    active_orchard: "सध्याची बाग",
    orchard_name: "बाग निवडलेली नाही",
    orchard_details: "",
    harvest_cycle: "हंगाम चक्र",
    season_active: "कॉन्फिगर केलेले नाही",
    synced_online: "जोडलेले नाही",
    farmer_name: "शेतकरी",
    farmer_role: "बागायतदार व जीआय निर्यातदार",
    kisan_mitra_title: "किसान मित्र साहाय्यता केंद्र",
    kisan_mitra_sub: "टोल-फ्री २४x७ हेल्पलाइन",
    kisan_phone: "१८००-१८०-१५५१",
    share_whatsapp: "व्हॉट्सॲप अहवाल पाठवा",
    nav_dashboard: "डॅशबोर्ड",
    nav_farms: "माझी शेती व झाडे",
    nav_workers: "मजूर नियुक्ती",
    nav_machines: "यंत्रसामग्री भाडे",
    nav_care: "खते व फवारणी",
    nav_activity: "कामे व स्मरणपत्रे",
    nav_profile: "माझे प्रोफाईल",
    quick_actions: "त्वरित शेती कृती",
    record_expense: "खर्च नोंदवा",
    record_harvest: "आंबा विक्री नोंदवा",
    add_care_note: "झाडांची काळजी नोंद",
    hire_workers_now: "मजूर बुक करा",
    book_machinery: "फवारणी यंत्र / ट्रॅक्टर भाड्याने घ्या",
    view_all: "सर्व पहा",
    close: "बंद करा",
    submit: "जमा करा",
    cancel: "रद्द करा",
  },
  hi: {
    app_title: "स्मार्ट आम बाग पोर्टल",
    app_subtitle: "Smart Mango Farm Portal",
    app_tagline: "कोंकण आधुनिक बागवानी",
    active_orchard: "सक्रिय बाग",
    orchard_name: "कोई बाग नहीं चुनी गई",
    orchard_details: "",
    harvest_cycle: "फसल चक्र",
    season_active: "कॉन्फ़िगर नहीं है",
    synced_online: "कनेक्ट नहीं है",
    farmer_name: "किसान",
    farmer_role: "बाग मालिक व जीआई निर्यातक",
    kisan_mitra_title: "किसान मित्र सहायता केंद्र",
    kisan_mitra_sub: "टोल-फ्री 24x7 हेल्पलाइन",
    kisan_phone: "1800-180-1551",
    share_whatsapp: "व्हाट्सएप रिपोर्ट शेयर करें",
    nav_dashboard: "डैशबोर्ड",
    nav_farms: "मेरे खेत और पेड़",
    nav_workers: "मजदूर बुकिंग",
    nav_machines: "मशीनरी किराया",
    nav_care: "उर्वरक और देखभाल",
    nav_activity: "गतिविधि और रिमाइंडर",
    nav_profile: "मेरा प्रोफाइल",
    quick_actions: "त्वरित कृषि कार्य",
    record_expense: "खर्च दर्ज करें",
    record_harvest: "फसल / बिक्री दर्ज करें",
    add_care_note: "देखभाल नोट जोड़ें",
    hire_workers_now: "मजदूर अभी बुक करें",
    book_machinery: "स्प्रेयर / ट्रैक्टर बुक करें",
    view_all: "सभी देखें",
    close: "बंद करें",
    submit: "जमा करें",
    cancel: "रद्द करें",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("mango_portal_lang") as Language;
    if (saved && (saved === "en" || saved === "mr" || saved === "hi")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("mango_portal_lang", lang);
  };

  const t = (key: string, fallback?: string): string => {
    const val = translations[language]?.[key];
    if (val) return val;
    return fallback || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
