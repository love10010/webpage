"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useAuth } from "@/lib/context/AuthContext";

export default function MyProfilePage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"land" | "cert" | "banking">("land");
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [kisanDownloaded, setKisanDownloaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [farmerData, setFarmerData] = useState({
    name: "",
    nameLocal: "",
    phone: "",
    email: "",
    address: "",
    kisanId: "",
    aadhaarMasked: "",
    giTag: "",
    apedaRcmc: "",
  });

  useEffect(() => {
    if (!user) return;
    setFarmerData((current) => ({
      ...current,
      name: user.name,
      phone: user.phone || "",
      email: user.email,
    }));
  }, [user]);

  const handleShareBadge = () => {
    navigator.clipboard.writeText(`Farmer profile: ${farmerData.name}`);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2500);
  };

  const handleDownloadKisanId = () => {
    setKisanDownloaded(true);
    setTimeout(() => setKisanDownloaded(false), 2500);
  };

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Top Status & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40">
        <div className="flex items-center gap-space-xs font-label-md text-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>Home</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-bold">
            {language === "mr" ? "माझे प्रोफाईल व शेतकरी दस्तऐवज" : "My Profile & KYC Ledger"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
            <span>MahaDBT & UIDAI Linked</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
            <span>e-Kisan: {farmerData.kisanId}</span>
          </span>
        </div>
      </div>

      {/* Primary Profile Banner & Executive Credentials */}
      <section className="relative bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 p-space-lg overflow-hidden">
        <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-space-lg">
            {/* Farmer Photo */}
            <div className="relative shrink-0">
              <div
                aria-label={`${farmerData.name || "Farmer"} profile`}
                className="w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center bg-surface-container text-primary text-3xl font-bold border-2 border-primary-fixed"
              >
                {farmerData.name.charAt(0).toUpperCase() || "F"}
              </div>
              <div
                className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                title="MahaDBT Verified Exporter"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
            </div>

            {/* Name & Credentials */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                  {farmerData.name}
                </h1>
                {farmerData.nameLocal && (
                  <span className="text-sm font-semibold text-secondary">
                    ({farmerData.nameLocal})
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-xs font-semibold border border-outline-variant/30">
                  Gat 142/2A • Pawas Estate
                </span>
              </div>

              <p className="font-title-md text-xs text-on-surface-variant font-medium max-w-2xl leading-relaxed">
                Lead Orchardist & Certified GI Mango Exporter | Konkan Alphonso Growers Association (कोकण हापूस आंबा उत्पादक संघ)
              </p>

              {/* Badges Cluster */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-primary text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">workspace_premium</span>
                  GI Registered #GI-MH-RTN-2021
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-fixed text-on-secondary-container text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  APEDA RCMC Valid 2028
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">eco</span>
                  Soil Health: Grade A
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                  Aadhaar Bio-KYC Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full xl:w-auto shrink-0">
            <button
              onClick={handleDownloadKisanId}
              type="button"
              className="flex-1 sm:flex-initial min-h-[44px] px-space-md rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-label-lg text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">
                {kisanDownloaded ? "check" : "badge"}
              </span>
              <span>{kisanDownloaded ? "ID Downloaded!" : "Download Kisan Card"}</span>
            </button>

            <button
              onClick={handleShareBadge}
              type="button"
              className="flex-1 sm:flex-initial min-h-[44px] px-space-md rounded-xl bg-secondary hover:brightness-105 text-on-secondary font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copiedBadge ? "done" : "qr_code_scanner"}
              </span>
              <span>{copiedBadge ? "Traceability Copied! ✓" : "Share GI Badge"}</span>
            </button>

            <button
              onClick={() => setEditMode(!editMode)}
              type="button"
              className="min-h-[44px] px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              <span>{editMode ? "Close Editor" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mt-space-lg pt-space-md bg-surface-container-low/70 rounded-xl p-space-md border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="font-label-md text-xs text-on-surface-variant">Total Orchard Canopy</span>
            <span className="font-numeric-metric text-2xl text-primary font-bold mt-0.5">
              14.5 <span className="text-sm font-normal">Acres</span>
            </span>
            <span className="text-[11px] text-outline">58 Gunthas • 3 Parcels</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-xs text-on-surface-variant">Registered Trees</span>
            <span className="font-numeric-metric text-2xl text-primary font-bold mt-0.5">
              1,240 <span className="text-sm font-normal">Trees</span>
            </span>
            <span className="text-[11px] text-outline">98% Geo-tagged & chipped</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-xs text-on-surface-variant">APMC Mandi License</span>
            <span className="font-numeric-metric text-xl text-secondary font-bold mt-0.5">
              #RTN-APMC-942
            </span>
            <span className="text-[11px] text-outline">Direct Auction Clearing</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-xs text-on-surface-variant">Export Consignments</span>
            <span className="font-numeric-metric text-2xl text-tertiary font-bold mt-0.5">
              14 <span className="text-sm font-normal">Air Shipments</span>
            </span>
            <span className="text-[11px] text-outline">Dubai, UK, Singapore</span>
          </div>
        </div>
      </section>

      {/* Edit Form Drawer / Banner if triggered */}
      {editMode && (
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm border-2 border-primary/30 p-space-lg animate-in fade-in">
          <h3 className="font-title-lg text-sm font-bold text-primary mb-3">
            Edit Farmer Registration Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md text-xs">
            <div>
              <label className="font-bold text-on-surface block mb-1">Full Legal Name</label>
              <input
                type="text"
                value={farmerData.name}
                onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                className="w-full p-2 border border-outline-variant rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-on-surface block mb-1">Phone Number (SMS & WhatsApp)</label>
              <input
                type="text"
                value={farmerData.phone}
                onChange={(e) => setFarmerData({ ...farmerData, phone: e.target.value })}
                className="w-full p-2 border border-outline-variant rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-on-surface block mb-1">Postal Address</label>
              <input
                type="text"
                value={farmerData.address}
                onChange={(e) => setFarmerData({ ...farmerData, address: e.target.value })}
                className="w-full p-2 border border-outline-variant rounded-xl"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-surface-container-high">
            <button onClick={() => setEditMode(false)} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm">
              Save Changes
            </button>
          </div>
        </section>
      )}

      {/* 3 Detail Tabs: Land Cadastral 7/12, Certifications, Banking & DBT */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-surface-container-high">
          <button
            onClick={() => setActiveTab("land")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "land"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">landscape</span>
            <span>Land Cadastral & 7/12 Records</span>
          </button>

          <button
            onClick={() => setActiveTab("cert")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "cert"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Agricultural GI & APEDA Compliance</span>
          </button>

          <button
            onClick={() => setActiveTab("banking")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "banking"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">account_balance</span>
            <span>Banking, DBT & Subsidies</span>
          </button>
        </div>

        {/* TAB 1: LAND CADASTRAL */}
        {activeTab === "land" && (
          <div className="flex flex-col gap-space-md text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">Gat No. 142/2A</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px]">Active</span>
                  </div>
                  <p className="text-on-surface-variant mt-1">Pawas South Orchard (6.2 Acres / 24.8 Gunthas)</p>
                  <div className="mt-2 text-[11px] text-outline">
                    <div>Ferfar No: 8492 (2011 Partition)</div>
                    <div>Owner: {farmerData.name || "Not provided"}</div>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container text-primary font-bold flex items-center justify-between">
                  <span>680 Alphonso Trees</span>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </div>
              </div>

              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">Gat No. 142/2B</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px]">Active</span>
                  </div>
                  <p className="text-on-surface-variant mt-1">Hillside Plateau (5.1 Acres / 20.4 Gunthas)</p>
                  <div className="mt-2 text-[11px] text-outline">
                    <div>Ferfar No: 9110 (2016 Inheritance)</div>
                    <div>Soil: Laterite Red Rock Clay Loam</div>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container text-primary font-bold flex items-center justify-between">
                  <span>350 Alphonso + Kesar Trees</span>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </div>
              </div>

              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">Gat No. 143</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px]">Active</span>
                  </div>
                  <p className="text-on-surface-variant mt-1">Well Valley Nursery (3.2 Acres / 12.8 Gunthas)</p>
                  <div className="mt-2 text-[11px] text-outline">
                    <div>Ferfar No: 7701 (Open Well & Pump House)</div>
                    <div>Water Right: 100% Perennial Flow</div>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-surface-container text-primary font-bold flex items-center justify-between">
                  <span>210 Young Grafted Clones</span>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATIONS */}
        {activeTab === "cert" && (
          <div className="flex flex-col gap-space-sm text-xs">
            <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
              <div className="flex items-start gap-space-md">
                <span className="material-symbols-outlined text-3xl text-secondary">workspace_premium</span>
                <div className="flex flex-col">
                  <span className="font-title-md text-sm font-bold text-primary">
                    Geographical Indication (GI) Certificate #GI-MH-RTN-2021
                  </span>
                  <p className="text-on-surface-variant">
                    Authorised user of registered GI &quot;Ratnagiri Alphonso (हापूस)&quot; under the Geographical Indications of Goods Act, 1999.
                  </p>
                  <span className="text-[11px] text-outline mt-0.5">Valid Till: 31 December 2031</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-bold text-xs self-start md:self-auto">
                Government Verified ✓
              </span>
            </div>

            <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
              <div className="flex items-start gap-space-md">
                <span className="material-symbols-outlined text-3xl text-primary">shield_with_heart</span>
                <div className="flex flex-col">
                  <span className="font-title-md text-sm font-bold text-primary">
                    APEDA GlobalGAP & Phytosanitary Clearance
                  </span>
                  <p className="text-on-surface-variant">
                    RCMC #APEDA/RCMC/HORT/2022/99120 approved for fresh table mango air-cargo consignments to GCC & European Union.
                  </p>
                  <span className="text-[11px] text-outline mt-0.5">Hot Water Treatment (VHT) facility clearance at Vashi Packhouse</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs self-start md:self-auto">
                Export Cleared ✓
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: BANKING & DBT */}
        {activeTab === "banking" && (
          <div className="flex flex-col gap-space-sm text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                <span className="font-title-md text-sm font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  Primary Direct Benefit Account
                </span>
                <div className="space-y-1 text-on-surface-variant">
                  <div>Bank: Bank of Maharashtra (Ratnagiri Main Branch)</div>
                  <div>Account: **** **** 4812 (Current Agro Account)</div>
                  <div>IFSC Code: MAHB0000042</div>
                  <div className="text-primary font-bold pt-1">Aadhaar Linked & NPCI Direct Benefit Transfer Cleared ✓</div>
                </div>
              </div>

              <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                <span className="font-title-md text-sm font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  MahaDBT Subsidy Ledger (2025-26)
                </span>
                <div className="space-y-1 text-on-surface-variant">
                  <div>Micro-Drip Irrigated Subsidy: ₹1,42,000 (Credited Dec 2025)</div>
                  <div>PM-Kisan Installments: 16th Installment Credited (Feb 2026)</div>
                  <div>Fruit Crop Weather Insurance (PMFBY): Policy #MH-PMFBY-2026 Active</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
