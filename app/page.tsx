"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useModals } from "@/components/AppShell";

export default function DashboardPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { openWhatsApp, openExpense, openHarvest, openCareNote } = useModals();

  // Interactive task completion state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      tag: "TODAY",
      tagLocal: "आज",
      tagBg: "bg-secondary-fixed text-on-secondary-fixed",
      title: "Pre-harvest Potassium Foliar Spray",
      subtitle: "Block B (350 trees) • SOP 0:0:50 spray to prevent spongy tissue",
      operator: "Santosh Gurav",
      duration: "4.5 hrs",
      done: false,
    },
    {
      id: 2,
      tag: "CRITICAL",
      tagLocal: "तातडीचे",
      tagBg: "bg-error-container text-on-error-container",
      title: "Deploy 40 Pheromone Fruit Fly Traps",
      subtitle: "Plot A perimeter • Methyl Eugenol lure refresh before harvest flush",
      operator: "Anand Mhatre (Pest Tech)",
      duration: "2.0 hrs",
      done: false,
    },
    {
      id: 3,
      tag: "TOMORROW",
      tagLocal: "उद्या",
      tagBg: "bg-surface-container text-on-surface-variant",
      title: "Clean Irrigation Inline Drip Filters",
      subtitle: "Well Valley Pump Station #2 • 35 PSI flush backwash",
      operator: "Dattaram Kadam",
      duration: "1.5 hrs",
      done: false,
    },
  ]);

  const [apmcExported, setApmcExported] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleExportApmc = () => {
    setApmcExported(true);
    setTimeout(() => setApmcExported(false), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* 1. TOP GREETING & ORCHARD LIVE BANNER */}
      <section className="w-full rounded-2xl shadow-md relative overflow-hidden text-white min-h-[230px] flex flex-col justify-between p-space-lg border border-primary-container">
        {/* Background Image of Konkan Alphonso Mango Orchard Ratnagiri */}
        <img
          alt="Konkan Alphonso Mango Orchard Ratnagiri"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          src="https://lh3.googleusercontent.com/aida/AEtjO1V6xQakMCk6_tPkOKP05cnw7qSlIbd0dYpLjpwUd_kPp_b60LOj1hDFCN_wo4rl0KkbKXcGydXTTCPysL3igvC4WPDH5Ak2csnbhl3XcAz5tEGhv04CvQXw0uiVY9esiMjCozBLafUPhjDLGCjQF-p-07pndUKJXHxoS1OjUTAxVuokg3oXZ6Rl6cG4gK3oDOUjqh3GgiGYjqu1Ywe7NzwoaASEZUqWYDumSetEum4zcL5CW6SLHink7io"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002117]/95 via-[#003629]/85 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="px-3 py-1 rounded-full bg-primary-fixed/25 backdrop-blur-md border border-primary-fixed/30 text-primary-fixed font-label-md text-xs flex items-center gap-1 shadow-sm font-semibold">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
                <span>GI-Tagged Alphonso #MH-RTN-2024</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 font-label-md text-xs">
                Gat No. 142/2 • Pawas Road, Ratnagiri
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-label-md text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
                {language === "mr" ? "हंगाम २०२६ चालू" : "2026 Harvest Active"}
              </span>
            </div>

            <div className="flex items-baseline gap-space-sm mt-1">
              <h1 className="font-headline-xl text-headline-xl text-white tracking-tight drop-shadow-sm font-bold">
                {language === "mr"
                  ? `नमस्कार, ${user?.name || "शेतकरी"}!`
                  : `Namaste, ${user?.name || "Farmer"}!`}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-x-space-lg gap-y-1 text-white/90 font-body-md text-sm pt-1">
              <div className="flex items-center gap-space-xs text-secondary-fixed font-bold">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px]">wb_sunny</span>
                <span>31°C Sunny, High Humidity (78%)</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-space-xs text-white/90">
                <span className="material-symbols-outlined text-primary-fixed text-[18px]">eco</span>
                <span>
                  {language === "mr"
                    ? "फळ गोटी ते अंड्याच्या आकारासाठी आदर्श हवामान"
                    : "Optimal micro-climate for fruit setting & marble-size growth"}
                </span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-space-xs text-white/70">
                <span className="material-symbols-outlined text-[16px]">sensors</span>
                <span>Live Telemetry Active (12m ago)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-md shrink-0 relative z-10">
            <button
              onClick={openWhatsApp}
              type="button"
              className="min-h-[48px] px-space-lg bg-[#25D366] hover:bg-[#20bd5a] text-white active:scale-95 transition-all rounded-xl font-label-lg text-sm flex items-center justify-center gap-space-xs shadow-md font-bold border border-white/20"
            >
              <span className="material-symbols-outlined text-[22px]">send</span>
              <div className="flex flex-col text-left">
                <span className="leading-none text-white">Share Daily WhatsApp Report</span>
                <span className="text-[11px] font-normal opacity-90 leading-tight text-white">
                  दैनिक अहवाल व्हॉट्सॲपवर पाठवा
                </span>
              </div>
            </button>

            <button
              onClick={handleExportApmc}
              type="button"
              className="min-h-[48px] px-space-md bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all active:scale-95 rounded-xl font-label-lg text-sm flex items-center gap-space-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[20px]">
                {apmcExported ? "check" : "print"}
              </span>
              <span>
                {apmcExported
                  ? (language === "mr" ? "पावती तयार झाली!" : "Slip Downloaded!")
                  : (language === "mr" ? "APMC पावती डाउनलोड" : "Export APMC Slip")}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. 5 PRIMARY BIG KPI SUMMARY CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md">
        {/* Card 1: Total Mango Trees */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-outline uppercase tracking-wider font-semibold">
                Total Mango Trees
              </span>
              <span className="font-label-md text-xs text-primary font-bold">
                एकूण आंबा झाडे
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors border border-outline-variant/30">
              <span className="material-symbols-outlined text-[22px]">forest</span>
            </div>
          </div>
          <div className="my-space-md">
            <div className="font-numeric-metric text-numeric-metric text-primary leading-none">
              1,240 <span className="font-title-lg text-title-lg font-normal text-on-surface-variant">Trees</span>
            </div>
            <div className="mt-space-sm flex items-center gap-space-xs">
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed/40 text-primary font-label-md text-xs font-bold flex items-center gap-1 border border-primary/20">
                <span className="material-symbols-outlined text-[14px]">ecg_heart</span> 96% Healthy
              </span>
              <span className="font-label-md text-xs text-outline">Avg: 11 Yrs</span>
            </div>
          </div>
          <div className="pt-space-xs text-on-surface-variant font-body-md text-xs border-t border-surface-container-high">
            1,110 Alphonso (हापूस) • 130 Kesar
          </div>
        </div>

        {/* Card 2: Active Orchard Area */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-outline uppercase tracking-wider font-semibold">
                Active Orchard Area
              </span>
              <span className="font-label-md text-xs text-primary font-bold">
                बागेचे एकूण क्षेत्र
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors border border-outline-variant/30">
              <span className="material-symbols-outlined text-[22px]">crop_free</span>
            </div>
          </div>
          <div className="my-space-md">
            <div className="font-numeric-metric text-numeric-metric text-primary leading-none">
              14.5 <span className="font-title-lg text-title-lg font-normal text-on-surface-variant">Acres</span>
            </div>
            <div className="mt-space-sm flex items-center gap-space-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-md text-xs border border-outline-variant/30 font-semibold">
                58 Gunthas Spread
              </span>
            </div>
          </div>
          <div className="pt-space-xs text-on-surface-variant font-body-md text-xs flex items-center gap-1 border-t border-surface-container-high">
            <span className="material-symbols-outlined text-primary text-[16px]">water_drop</span>
            <span>Well + 100% Drip Line Network</span>
          </div>
        </div>

        {/* Card 3: Season Revenue */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-outline uppercase tracking-wider font-semibold">
                Season Revenue (2026)
              </span>
              <span className="font-label-md text-xs text-secondary font-bold">
                एकूण जमा उत्पन्न
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/40 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors border border-secondary/20">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
          </div>
          <div className="my-space-md">
            <div className="font-numeric-metric text-numeric-metric text-on-surface leading-none">
              ₹18,45,000
            </div>
            <div className="mt-space-sm flex items-center gap-space-xs">
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-xs font-bold border border-secondary/20">
                +18.4% vs 2025
              </span>
            </div>
          </div>
          <div className="pt-space-xs text-on-surface-variant font-body-md text-xs border-t border-surface-container-high truncate">
            14,200 kg sold (Vashi APMC + Direct Gulf)
          </div>
        </div>

        {/* Card 4: Season Expenses */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-outline uppercase tracking-wider font-semibold">
                Season Expenses
              </span>
              <span className="font-label-md text-xs text-outline font-bold">
                चालू मोसमाचा खर्च
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-outline group-hover:bg-outline group-hover:text-surface transition-colors border border-outline-variant/30">
              <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            </div>
          </div>
          <div className="my-space-md">
            <div className="font-numeric-metric text-numeric-metric text-on-surface leading-none">
              ₹5,12,400
            </div>
            <div className="mt-space-sm flex items-center gap-space-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-xs border border-outline-variant/30">
                27.7% of gross revenue
              </span>
            </div>
          </div>
          <div className="pt-space-xs text-on-surface-variant font-body-md text-xs border-t border-surface-container-high truncate">
            Labour 48% • Fertilizer 26% • Mach. 16%
          </div>
        </div>

        {/* Card 5: Net Profit Surplus */}
        <div className="bg-primary text-on-primary p-space-md rounded-2xl shadow-md border border-primary-fixed/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-secondary-fixed/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-primary-fixed-dim uppercase tracking-wider font-semibold">
                Net Profit (शुद्ध नफा)
              </span>
              <span className="font-label-md text-xs text-primary-fixed font-bold">
                YTD Margin: 72.3%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-container text-secondary-fixed flex items-center justify-center shadow-inner border border-primary-fixed/20">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
          </div>
          <div className="my-space-md relative z-10">
            <div className="font-numeric-metric text-numeric-metric text-secondary-fixed leading-none">
              + ₹13,32,600
            </div>
            <div className="mt-space-xs inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
              PROFIT SURPLUS
            </div>
          </div>
          <div className="relative z-10 pt-space-xs font-body-md text-xs text-primary-fixed leading-tight border-t border-primary-container">
            <span className="font-bold text-white">✅ Shabaash!</span> ₹13.32L profit earned this season.
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTION BUTTONS (Tactile 52px Touch Targets) */}
      <section className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-title-md text-title-md text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">bolt</span>
            {language === "mr" ? "त्वरित शेती कृती (Quick Farm Actions)" : "Quick Farm Actions (त्वरित कृती)"}
          </span>
          <span className="font-label-md text-xs text-outline">Press or tap to log directly</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-space-md">
          {/* Action 1: Record Expense */}
          <button
            onClick={openExpense}
            type="button"
            className="min-h-[52px] px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container text-primary rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] flex items-center gap-space-sm text-left border border-outline-variant/30"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-sm text-on-surface leading-tight font-bold">
                + Record Expense
              </span>
              <span className="font-label-md text-xs text-outline truncate">
                खर्च नोंदवा
              </span>
            </div>
          </button>

          {/* Action 2: Record Harvest */}
          <button
            onClick={openHarvest}
            type="button"
            className="min-h-[52px] px-space-md py-space-sm bg-secondary text-on-secondary hover:brightness-110 rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] flex items-center gap-space-sm text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-sm leading-tight text-white font-bold">
                + Record Harvest / Sale
              </span>
              <span className="font-label-md text-xs text-secondary-fixed truncate">
                आंबा विक्री नोंदवा
              </span>
            </div>
          </button>

          {/* Action 3: Add Care Note */}
          <button
            onClick={openCareNote}
            type="button"
            className="min-h-[52px] px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container text-primary rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] flex items-center gap-space-sm text-left border border-outline-variant/30"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">edit_note</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-sm text-on-surface leading-tight font-bold">
                + Add Care Note
              </span>
              <span className="font-label-md text-xs text-outline truncate">
                झाडांची देखभाल नोंद
              </span>
            </div>
          </button>

          {/* Action 4: Hire Workers */}
          <Link
            href="/hire-workers"
            className="min-h-[52px] px-space-md py-space-sm bg-primary text-on-primary hover:bg-primary-container rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] flex items-center gap-space-sm text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-container text-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">group_add</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-sm leading-tight text-white font-bold">
                👨‍🌾 Hire Workers Now
              </span>
              <span className="font-label-md text-xs text-primary-fixed-dim truncate">
                मजूर बुक करा
              </span>
            </div>
          </Link>

          {/* Action 5: Rent Machines */}
          <Link
            href="/rent-machines"
            className="min-h-[52px] px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container text-primary rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] flex items-center gap-space-sm text-left col-span-2 md:col-span-1 border border-outline-variant/30"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-high text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">agriculture</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-sm text-on-surface leading-tight font-bold">
                🚜 Book Sprayer / Tractor
              </span>
              <span className="font-label-md text-xs text-outline truncate">
                फवारणी यंत्र भाड्याने घ्या
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. VISUAL ANALYTICS SECTION (BENTO GRID - Cashflow, Expenses, Yield) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
        {/* 1. Cashflow Comparison */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-space-sm">
            <div>
              <div className="font-title-lg text-title-lg text-primary font-bold">
                Cashflow: Income vs Expenses
              </div>
              <p className="font-label-md text-xs text-outline">
                6-Month Season Curve (Nov 2025 – Apr 2026)
              </p>
            </div>
            <div className="flex items-center gap-space-sm font-label-md text-xs">
              <span className="flex items-center gap-1 text-primary font-semibold">
                <span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Income
              </span>
              <span className="flex items-center gap-1 text-secondary font-semibold">
                <span className="w-3 h-3 rounded-sm bg-secondary inline-block" /> Expense
              </span>
            </div>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="w-full h-56 pt-space-sm flex items-end justify-between gap-2">
            {[
              { month: "Nov", inc: "₹0.8L", incH: "15%", expH: "38%", current: false },
              { month: "Dec", inc: "₹1.2L", incH: "22%", expH: "45%", current: false },
              { month: "Jan", inc: "₹2.4L", incH: "35%", expH: "30%", current: false },
              { month: "Feb", inc: "₹4.1L", incH: "58%", expH: "28%", current: false },
              { month: "Mar (Now)", inc: "₹6.9L", incH: "88%", expH: "35%", current: true },
              { month: "Apr (Proj)", inc: "₹3.0L", incH: "44%", expH: "18%", current: false, proj: true },
            ].map((col, idx) => (
              <div
                key={idx}
                className={`flex-1 flex flex-col items-center gap-1 h-full justify-end ${
                  col.current ? "bg-surface-container-low/70 rounded-xl p-1 shadow-inner border border-primary/20" : ""
                }`}
              >
                <span className={`text-[11px] font-bold ${col.current ? "text-primary scale-110" : "text-outline"}`}>
                  {col.inc}
                </span>
                <div className="w-full flex items-end justify-center gap-1 h-40">
                  <div
                    className={`w-1/2 rounded-t transition-all ${
                      col.proj ? "bg-primary/70 border-t-2 border-dashed border-primary" : "bg-primary"
                    }`}
                    style={{ height: col.incH }}
                    title={`Income: ${col.inc}`}
                  />
                  <div
                    className="w-1/2 bg-secondary rounded-t transition-all"
                    style={{ height: col.expH }}
                    title={`Expense`}
                  />
                </div>
                <span className={`font-label-md text-xs ${col.current ? "font-bold text-primary" : "text-outline"}`}>
                  {col.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-space-md p-space-sm rounded-xl bg-surface-container flex items-center justify-between text-on-surface">
            <span className="font-body-md text-xs">March Harvest Peak: Highest margins recorded</span>
            <span className="font-label-lg text-sm text-primary font-bold">₹5.3 Lakhs Net</span>
          </div>
        </div>

        {/* 2. Expense Breakdown */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <div className="font-title-lg text-title-lg text-primary font-bold">Expense Breakdown</div>
              <span className="font-label-md text-xs text-outline">खर्चाचे वर्गीकरण</span>
            </div>
            <p className="font-label-md text-xs text-on-surface-variant mb-space-md">
              Total Season Spend: ₹5,12,400
            </p>

            <div className="flex flex-col gap-space-md">
              {/* Labour */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs">
                  <span className="text-on-surface font-bold">Labour & Harvesting Squads (मजुरी)</span>
                  <span className="text-primary font-bold">₹2,46,000 (48%)</span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: "48%" }} />
                </div>
              </div>

              {/* Fertilizer & Care */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs">
                  <span className="text-on-surface font-bold">Fertilizer, Neem & Micronutrients</span>
                  <span className="text-secondary font-bold">₹1,33,200 (26%)</span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all" style={{ width: "26%" }} />
                </div>
              </div>

              {/* Machinery */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs">
                  <span className="text-on-surface font-bold">Machinery Rental & Fuel (ट्रॅक्टर फवारणी)</span>
                  <span className="text-primary-container font-bold">₹82,000 (16%)</span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full transition-all" style={{ width: "16%" }} />
                </div>
              </div>

              {/* Crates & Packaging */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-md text-xs">
                  <span className="text-on-surface font-bold">Wooden Crates & Foam Packaging</span>
                  <span className="text-outline font-bold">₹51,200 (10%)</span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-outline rounded-full transition-all" style={{ width: "10%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-md text-xs border-t border-surface-container-high">
            <span>Average Cost per Mango Tree:</span>
            <span className="font-bold text-on-surface">₹413 / tree</span>
          </div>
        </div>

        {/* 3. Yield & Harvest by Variety */}
        <div className="lg:col-span-3 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <div className="font-title-lg text-title-lg text-primary font-bold">Variety Harvest Yield</div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-label-md text-xs font-semibold">
                2026 Batch
              </span>
            </div>
            <p className="font-label-md text-xs text-outline mb-space-md">जातीनुसार तोडणी व सरासरी दर</p>

            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-space-md shadow-sm border border-outline-variant/20">
              <img
                alt="Authentic Alphonso Mangoes on Tree"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WT-nySD0pwav1OXm0mM-Q9ozHRSFHWn-wwBDj4FMX6R03ZskuQRM65GKY3MNhwL7gaXTmtdZW-7biya35NHYVmwTbpPIi0e4MQTxN0z51FOVCzqKuw0_olFIpFZsDadX7U4oEEycfSAAPdp_yS7xztHrCedlklDSJoDG2YLTnDWYOeoe6j6QgY75ZHM9qBARw9JILgES-qeixBnngLF7MTHuKLQKO0jP7PJGfYyI2e6cVOcrs8tEvR6KA"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white font-label-md text-[11px] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-secondary-fixed">verified</span>
                GI Certified Ratnagiri
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-sm border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-sm text-primary font-bold">Ratnagiri Hapus</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-xs font-bold">
                  हापूस
                </span>
              </div>
              <div className="mt-space-xs flex items-baseline justify-between">
                <div>
                  <span className="font-numeric-metric text-2xl text-primary font-bold">11,800</span>{" "}
                  <span className="font-label-md text-xs text-on-surface-variant font-semibold">kg</span>
                </div>
                <div className="text-right">
                  <div className="font-label-lg text-sm font-bold text-secondary">₹145 / kg</div>
                  <div className="font-label-md text-[11px] text-outline">APMC avg rate</div>
                </div>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-sm text-primary font-bold">Kesar Mango</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-xs font-bold">
                  केशर
                </span>
              </div>
              <div className="mt-space-xs flex items-baseline justify-between">
                <div>
                  <span className="font-numeric-metric text-2xl text-primary font-bold">2,400</span>{" "}
                  <span className="font-label-md text-xs text-on-surface-variant font-semibold">kg</span>
                </div>
                <div className="text-right">
                  <div className="font-label-lg text-sm font-bold text-secondary">₹110 / kg</div>
                  <div className="font-label-md text-[11px] text-outline">Local Mandi avg</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-space-xs text-center border-t border-surface-container-high">
            <Link
              href="/my-farms-and-trees"
              className="font-label-lg text-xs text-primary hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>View All Batch Weights</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TWO-COLUMN OPERATIONS & FIELD WIDGET */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        {/* Left: Upcoming Tasks & Orchard Alerts (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div>
                  <h2 className="font-title-lg text-title-lg text-primary font-bold">
                    Upcoming Tasks & Orchard Alerts
                  </h2>
                  <p className="font-label-md text-xs text-outline">
                    नियोजित बागेतील कामे आणि सूचना
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-xs font-bold">
                {tasks.filter((t) => !t.done).length} Pending Today
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-space-md rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-md ${
                    task.done
                      ? "bg-surface-container-low opacity-60 border-outline-variant/20 line-through"
                      : "bg-surface-container-low hover:bg-surface-container border-outline-variant/30"
                  }`}
                >
                  <div className="flex items-start gap-space-md">
                    <div className={`px-2.5 py-1.5 rounded-lg font-label-md text-xs font-bold shrink-0 text-center ${task.tagBg}`}>
                      {task.tag}
                      <br />
                      <span className="text-[10px] font-normal">{task.tagLocal}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-title-md text-sm font-bold text-on-surface ${task.done ? "line-through text-outline" : ""}`}>
                        {task.title}
                      </span>
                      <p className="font-body-md text-xs text-on-surface-variant">
                        {task.subtitle}
                      </p>
                      <div className="flex items-center gap-space-sm mt-1 text-[11px] text-outline">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                          {task.operator}
                        </span>
                        <span>•</span>
                        <span>Est: {task.duration}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className={`min-h-[44px] px-space-md rounded-xl font-label-md text-xs font-bold shrink-0 flex items-center justify-center gap-1 transition-all active:scale-95 ${
                      task.done
                        ? "bg-surface-container-high text-outline"
                        : "bg-primary text-on-primary hover:bg-primary-container shadow-sm"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {task.done ? "undo" : "check_circle"}
                    </span>
                    <span>{task.done ? "Undo" : "Mark Done (पूर्ण झाले)"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-space-md pt-space-sm border-t border-surface-container-high flex items-center justify-between">
            <Link
              href="/activity-and-reminders"
              className="font-label-lg text-xs text-primary hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>Open 30-Day Ag-Calendar</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
            <span className="text-xs text-outline">Updated 14 mins ago via Field IoT Gateway</span>
          </div>
        </div>

        {/* Right: Weather & Microclimate Radar (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">thermostat</span>
                </div>
                <div>
                  <h2 className="font-title-lg text-title-lg text-primary font-bold">
                    Weather & Microclimate Radar
                  </h2>
                  <p className="font-label-md text-xs text-outline">
                    रत्नागिरी किनारी सूक्ष्म हवामान अंदाज
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed/40 text-primary font-label-md text-xs font-bold">
                IMD Ratnagiri API
              </span>
            </div>

            {/* Current Weather Card */}
            <div className="p-space-md rounded-xl bg-gradient-to-br from-primary-container to-primary text-white mb-space-md relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <span className="text-xs text-primary-fixed-dim uppercase tracking-wider font-semibold">
                    Current Temperature (पठार माथा)
                  </span>
                  <div className="font-numeric-metric text-4xl text-white font-bold my-1">
                    31.4°C
                  </div>
                  <span className="text-xs text-secondary-fixed font-bold">
                    Relative Humidity: 78% (Dry Afternoon Forecast)
                  </span>
                </div>
                <span className="material-symbols-outlined text-6xl text-secondary-container">
                  wb_sunny
                </span>
              </div>
              <div className="mt-space-sm pt-space-xs border-t border-primary/50 text-[11px] text-primary-fixed flex items-center justify-between">
                <span>Wind: 14 km/h West (Sea Breeze)</span>
                <span>Dew Point: 22°C</span>
              </div>
            </div>

            {/* Disease Risk Meter */}
            <div className="flex flex-col gap-space-xs mb-space-md">
              <span className="font-label-md text-xs font-bold text-on-surface">
                Disease & Pest Threat Index (रोगांची संभाव्यता)
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center text-center">
                  <span className="text-[10px] text-outline font-semibold">Anthracnose (करपा)</span>
                  <span className="font-bold text-xs text-error mt-0.5">High (74%)</span>
                  <span className="text-[9px] text-on-surface-variant">Due to night fog</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center text-center">
                  <span className="text-[10px] text-outline font-semibold">Powdery Mildew</span>
                  <span className="font-bold text-xs text-secondary mt-0.5">Moderate (38%)</span>
                  <span className="text-[9px] text-on-surface-variant">Fruit set safe</span>
                </div>
                <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center text-center">
                  <span className="text-[10px] text-outline font-semibold">Mango Hopper (तुडतुडे)</span>
                  <span className="font-bold text-xs text-primary mt-0.5">Low (12%)</span>
                  <span className="text-[9px] text-on-surface-variant">Controlled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-sm border-t border-surface-container-high">
            <Link
              href="/fertilizer-and-care"
              className="w-full min-h-[44px] rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-label-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Chemical Spraying & Fertigation Guide</span>
              <span className="material-symbols-outlined text-[16px]">science</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. RECENT HARVEST SALES LOG TABLE */}
      <section className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div>
            <h2 className="font-title-lg text-title-lg text-primary font-bold">
              Recent Harvest Consignments & Mandi Sales
            </h2>
            <p className="font-label-md text-xs text-outline">
              चालू आठवड्यातील आंबा आवक, प्रतवारी व बाजार भाव नोंद
            </p>
          </div>
          <button
            onClick={openHarvest}
            className="min-h-[40px] px-space-md bg-secondary hover:brightness-105 text-on-secondary rounded-xl font-label-md text-xs font-bold flex items-center gap-1 self-start sm:self-auto shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Record New Consignment</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-on-primary text-xs font-semibold">
                <th className="p-3 rounded-l-xl">Batch / Gate Pass</th>
                <th className="p-3">Variety (जात)</th>
                <th className="p-3">Harvest Plot</th>
                <th className="p-3">Quantity (Crates/Kg)</th>
                <th className="p-3">Destination Mandi</th>
                <th className="p-3">Realized Rate</th>
                <th className="p-3">Total Value</th>
                <th className="p-3 rounded-r-xl text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high text-xs text-on-surface">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-3 font-mono font-bold text-primary">#RTN-2026-B08</td>
                <td className="p-3 font-semibold">Alphonso (Grade A &gt;250g)</td>
                <td className="p-3">Plot A (Pawas South)</td>
                <td className="p-3">120 Crates (1,440 kg)</td>
                <td className="p-3">Vashi APMC Navi Mumbai</td>
                <td className="p-3 font-bold text-secondary">₹160 / kg</td>
                <td className="p-3 font-bold text-primary">₹2,30,400</td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px]">
                    Settled ✓
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-3 font-mono font-bold text-primary">#RTN-2026-B07</td>
                <td className="p-3 font-semibold">Alphonso GI Export (Hot Water Treated)</td>
                <td className="p-3">Plot B (Plateau)</td>
                <td className="p-3">80 Crates (960 kg)</td>
                <td className="p-3">Dubai Gulf Consignment (APEDA)</td>
                <td className="p-3 font-bold text-secondary">₹210 / kg</td>
                <td className="p-3 font-bold text-primary">₹2,01,600</td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px]">
                    In-Transit ✈️
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-3 font-mono font-bold text-primary">#RTN-2026-B06</td>
                <td className="p-3 font-semibold">Kesar Premium</td>
                <td className="p-3">Plot C (Well Valley)</td>
                <td className="p-3">95 Crates (1,140 kg)</td>
                <td className="p-3">Crawford Market Mumbai</td>
                <td className="p-3 font-bold text-secondary">₹115 / kg</td>
                <td className="p-3 font-bold text-primary">₹1,31,100</td>
                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px]">
                    Settled ✓
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
