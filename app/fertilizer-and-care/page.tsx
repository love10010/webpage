"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useModals } from "@/components/AppShell";

interface SprayScheduleItem {
  id: number;
  week: string;
  stage: string;
  stageLocal: string;
  chemical: string;
  dosage: string;
  target: string;
  targetLocal: string;
  status: "completed" | "active" | "upcoming";
  scheduledDate: string;
}

const mockSchedule: SprayScheduleItem[] = [
  {
    id: 1,
    week: "Week 09",
    stage: "Mustard to Pea Size",
    stageLocal: "मोहर ते मोहरी आकार",
    chemical: "Imidacloprid 17.8% SL + Mancozeb 75% WP",
    dosage: "0.3 ml/L + 2.0 g/L",
    target: "Mango Hopper & Blossom Blight",
    targetLocal: "तुडतुडे व भुरी रोग प्रतिबंध",
    status: "completed",
    scheduledDate: "02 Mar 2026",
  },
  {
    id: 2,
    week: "Week 11",
    stage: "Pea to Marble Size",
    stageLocal: "वाटाणा ते गोटी आकार",
    chemical: "Neem Oil 10,000 PPM + Micronutrient Combo",
    dosage: "2.5 ml/L + 1.5 g/L",
    target: "Thrips & Fruit Drop Prevention",
    targetLocal: "फुलकिडे व लहान फळगळ नियंत्रण",
    status: "completed",
    scheduledDate: "14 Mar 2026",
  },
  {
    id: 3,
    week: "Week 12 (Current)",
    stage: "Marble to Egg Size Development",
    stageLocal: "फळ वाटाणा ते सुपारी/अंडे टप्पा",
    chemical: "Potassium Schoenite (0:0:50) + Boron 20%",
    dosage: "5.0 g/L + 1.0 g/L",
    target: "Spongy Tissue Prevention & Fruit Weight",
    targetLocal: "साका रोग प्रतिबंध व फळांचे वजन वाढवणे",
    status: "active",
    scheduledDate: "Today (22 Mar 2026)",
  },
  {
    id: 4,
    week: "Week 14",
    stage: "Egg Size (Rapid Bulking)",
    stageLocal: "अंडे आकार (वेगाने वाढ)",
    chemical: "Gibberellic Acid (GA3) + Calcium Nitrate",
    dosage: "20 PPM + 4.0 g/L",
    target: "Peel Strength & Sunburn Shield",
    targetLocal: "सालीची लवचिकता व उन्हापासून संरक्षण",
    status: "upcoming",
    scheduledDate: "05 Apr 2026",
  },
  {
    id: 5,
    week: "Week 16",
    stage: "Pre-Harvest Wash (30 Days prior)",
    stageLocal: "तोडणीपूर्व शेवटचा डोस",
    chemical: "Copper Oxychloride 50% WP (Sanitizer)",
    dosage: "2.5 g/L",
    target: "Post-Harvest Anthracnose & Stem End Rot",
    targetLocal: "काळा करपा व देठ कुजणे प्रतिबंध",
    status: "upcoming",
    scheduledDate: "18 Apr 2026",
  },
];

export default function FertilizerAndCarePage() {
  const { language } = useLanguage();
  const { openCareNote } = useModals();

  const [scheduleModal, setScheduleModal] = useState(false);
  const [stockModal, setStockModal] = useState(false);
  const [scheduleItems, setScheduleItems] = useState(mockSchedule);

  const completeActiveRun = () => {
    setScheduleItems(
      scheduleItems.map((item) =>
        item.status === "active" ? { ...item, status: "completed" } : item
      )
    );
    alert("Week 12 Potassium Foliar Spray marked as completed! Inventory stock updated.");
  };

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-xs">
            <span>Home</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Fertilizer & Care</span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
              Fertilizer & Spraying Schedule
            </h1>
            <span className="font-title-md text-secondary font-bold">
              (खते व फवारणी नियोजन)
            </span>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant max-w-3xl leading-relaxed">
            Align chemical sprays, micronutrient drenches, and fertigation cycles with IMD / local microclimate forecasts to prevent rain wash-off, drift, and fruit sunburn.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            onClick={() => setScheduleModal(true)}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Schedule New Spray</span>
          </button>
          <button
            onClick={completeActiveRun}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
            <span>Log Completed Run</span>
          </button>
          <button
            onClick={() => setStockModal(true)}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>Chemical Stock</span>
          </button>
        </div>
      </div>

      {/* Active Phenology & SOP Spotlight Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden p-space-lg">
        {/* Media Aspect: Tractor Mist Sprayer In Orchard */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[260px] flex flex-col justify-end p-space-md shadow-inner border border-outline-variant/20">
          <img
            alt="Tractor Mist Sprayer in Orchard"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida/AEtjO1U6B1lDW-75YGS1YDtrwfdEW7yZX9WWCxqwbO2LLFcu8wSAKpzJh3Zdx_NCoLw5DojXfguUPuheZBqzC-USX7w6MO8rB9diqqvoRCkS5yGuRXZ1APtBJ0AVwaWD7plGnIoiPm3MoBH1mOQEHIsvx9gD1zw0jk0-0cWYJbwPpcaW5nIEJqeYc_hNupWL46JtAa3-DP8XYOvgEo5AK_8xzFpYLoTwelDX7_gX7NCNr8qy74CzqCm6CDA-v0M"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
          <div className="relative z-10 flex flex-col gap-1 text-on-primary">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
                Active Spray Operation
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-semibold">
                Plot A • Pawas Sector
              </span>
            </div>
            <span className="font-headline-md text-xl font-bold leading-tight text-white">
              Potassium Schoenite + Boron 20% Drench
            </span>
            <p className="font-body-md text-xs text-primary-fixed-dim line-clamp-2">
              Targeting fruit nut drop prevention and stem strengthening for 680 Alphonso trees.
            </p>
          </div>
        </div>

        {/* Stage & Compliance Telemetry */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-high">
            <div>
              <div className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">psychiatry</span>
                <span>Current Phenological Stage</span>
              </div>
              <div className="font-headline-md text-xl text-on-surface flex items-center gap-2 mt-0.5 font-bold">
                <span>Marble to Egg Size Development</span>
                <span className="font-title-md text-sm text-secondary font-semibold">
                  (फळ वाटाणा ते सुपारी टप्पा)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
              <span>CIB&RC & APEDA Export GI-139 Cleared</span>
            </div>
          </div>

          {/* 3 Quick Stage Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-1 border border-outline-variant/30">
              <span className="text-[11px] text-outline font-semibold">Avg Fruit Retention</span>
              <div className="flex items-baseline gap-1">
                <span className="font-numeric-metric text-2xl text-primary font-bold">8.4</span>
                <span className="text-xs text-on-surface-variant">fruits / cluster</span>
              </div>
              <span className="text-tertiary text-xs font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14% vs 2025
              </span>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-1 border border-outline-variant/30">
              <span className="text-[11px] text-outline font-semibold">Sub-canopy Moisture</span>
              <div className="flex items-baseline gap-1">
                <span className="font-numeric-metric text-2xl text-primary font-bold">38%</span>
                <span className="text-xs text-on-surface-variant">1.24 dS/m EC</span>
              </div>
              <span className="text-secondary text-xs font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">water_drop</span> Fertigation on
              </span>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-1 border border-outline-variant/30">
              <span className="text-[11px] text-outline font-semibold">Hopper / Thrips Index</span>
              <div className="flex items-baseline gap-1">
                <span className="font-numeric-metric text-2xl text-tertiary font-bold">Low</span>
                <span className="text-xs text-on-surface-variant">0.3 nymph/leaf</span>
              </div>
              <span className="text-tertiary text-xs font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">check</span> Safe under threshold
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-on-surface-variant text-xs pt-1">
            <span>Next Water Pulse: Tonight 10:00 PM (2 hrs Drip line #1 & #2)</span>
            <span className="font-bold text-primary">Dr. Balasaheb Sawant KKV SOP Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Grid: SOP Spray Schedule Timeline + Weather Window */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
        {/* Left Column: 16-Week Season SOP Schedule (8 Cols) */}
        <div className="xl:col-span-8 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-space-md">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
            <div>
              <h2 className="font-title-lg text-title-lg text-primary font-bold">
                16-Week Mango Care SOP Protocol
              </h2>
              <p className="font-label-md text-xs text-outline">
                कोकण कृषी विद्यापीठ (DBSKKV) प्रमाणित फवारणी व खत वेळापत्रक
              </p>
            </div>
            <span className="text-xs text-primary font-bold">Season: 2026</span>
          </div>

          <div className="flex flex-col gap-space-sm">
            {scheduleItems.map((item) => (
              <div
                key={item.id}
                className={`p-space-md rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md ${
                  item.status === "active"
                    ? "bg-primary-fixed/20 border-primary ring-2 ring-primary/20 shadow-sm"
                    : item.status === "completed"
                    ? "bg-surface-container-low/60 border-outline-variant/20 opacity-80"
                    : "bg-surface-container-lowest border-outline-variant/30"
                }`}
              >
                <div className="flex items-start gap-space-md">
                  <div
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold text-xs shrink-0 ${
                      item.status === "active"
                        ? "bg-primary text-on-primary shadow-sm"
                        : item.status === "completed"
                        ? "bg-tertiary-fixed text-primary"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    <span>{item.week.split(" ")[1]}</span>
                    <span className="text-[10px] font-normal uppercase">Wk</span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-title-md text-sm font-bold text-primary">
                        {item.stage}
                      </span>
                      <span className="text-xs text-outline font-normal">
                        ({item.stageLocal})
                      </span>
                    </div>

                    <div className="font-mono text-xs font-bold text-on-surface mt-1">
                      {item.chemical} • <span className="text-secondary">{item.dosage}</span>
                    </div>

                    <div className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-[14px]">shield</span>
                      <span>Target: {item.target} ({item.targetLocal})</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-1 pt-2 md:pt-0 border-t md:border-t-0 border-surface-container-high">
                  <span className="text-[11px] text-outline font-semibold">
                    {item.scheduledDate}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.status === "active"
                        ? "bg-secondary text-on-secondary"
                        : item.status === "completed"
                        ? "bg-primary-fixed text-primary"
                        : "bg-surface-container text-outline"
                    }`}
                  >
                    {item.status === "active"
                      ? "Active Today"
                      : item.status === "completed"
                      ? "Completed ✓"
                      : "Upcoming"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Weather-Calibrated Spray Window + Chemical Stock (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md">
          {/* Weather Spray Window */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-space-md">
            <div>
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Micro-Climate Timing
              </span>
              <h3 className="font-title-lg text-base font-bold text-primary">
                Spray Window Calculator
              </h3>
              <p className="text-xs text-on-surface-variant">
                Avoid chemical drift & phytotoxicity sunburn
              </p>
            </div>

            <div className="p-3 rounded-xl bg-primary-fixed/30 border border-primary/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-primary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
                  Recommended Morning Window:
                </span>
                <span>06:00 AM – 09:30 AM</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Wind speed &lt;8 km/h and leaf temperature &lt;26°C guarantees 94% droplet absorption without evaporation loss.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1 text-xs">
              <span className="font-bold text-error flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Avoid Spraying (11:30 AM – 03:30 PM):
              </span>
              <p className="text-on-surface-variant text-[11px]">
                High noon UV index and 32°C heat causes lenticel spotting and leaf burn with copper/sulphur mixes.
              </p>
            </div>

            <button
              onClick={openCareNote}
              type="button"
              className="w-full min-h-[44px] rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add_task</span>
              <span>Schedule Next Spray Alert</span>
            </button>
          </div>

          {/* Chemical Stock Inventory Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
              <h3 className="font-title-lg text-sm font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">inventory_2</span>
                On-Farm Chemical Stock
              </h3>
              <button onClick={() => setStockModal(true)} className="text-xs text-primary font-bold hover:underline">
                View All
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-1 text-xs">
              {[
                { name: "SOP 0:0:50 (Potassium Sulphate)", qty: "12 Bags (300 kg)", status: "Adequate" },
                { name: "Boron 20% Soluble", qty: "8 Kg", status: "Adequate" },
                { name: "Copper Oxychloride 50% WP", qty: "15 Kg", status: "Adequate" },
                { name: "Neem Oil 10,000 PPM", qty: "4 Litres", status: "Low Stock ⚠️" },
              ].map((stock, sidx) => (
                <div key={sidx} className="p-2 rounded-xl bg-surface-container-low flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-on-surface text-xs">{stock.name}</div>
                    <div className="text-[11px] text-outline">{stock.qty}</div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      stock.status.includes("Low")
                        ? "bg-error-container text-on-error-container"
                        : "bg-primary-fixed text-primary"
                    }`}
                  >
                    {stock.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Spray Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-6 max-w-lg w-full flex flex-col gap-4 border border-outline-variant/40">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <h3 className="font-headline-md text-lg font-bold text-primary">
                Schedule New Spray Cycle
              </h3>
              <button onClick={() => setScheduleModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Chemical / Micronutrient Formulation</label>
                <input type="text" defaultValue="Potassium Schoenite 0:0:50 + Micronutrients" className="w-full p-2 border border-outline-variant rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Target Block</label>
                  <select className="w-full p-2 border border-outline-variant rounded-xl bg-surface-container-lowest">
                    <option>Plot A: Pawas South</option>
                    <option>Plot B: Hillside Plateau</option>
                    <option>Plot C: Well Valley</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-on-surface block mb-1">Date</label>
                  <input type="date" defaultValue="2026-03-24" className="w-full p-2 border border-outline-variant rounded-xl" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button onClick={() => setScheduleModal(false)} className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Spray Cycle scheduled! Added to farm reminders.");
                  setScheduleModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm"
              >
                Schedule Spray
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Modal */}
      {stockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-6 max-w-xl w-full flex flex-col gap-4 border border-outline-variant/40">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <h3 className="font-headline-md text-lg font-bold text-primary">
                Chemical & Fertilizer Inventory Ledger
              </h3>
              <button onClick={() => setStockModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant font-bold">
                    <th className="p-2">Chemical Product</th>
                    <th className="p-2">Batch / Expiry</th>
                    <th className="p-2">Balance Stock</th>
                    <th className="p-2">Unit Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  <tr>
                    <td className="p-2 font-bold">SOP 0:0:50 (Potash)</td>
                    <td className="p-2 font-mono">B-4402 / Nov 2027</td>
                    <td className="p-2 text-primary font-bold">12 Bags</td>
                    <td className="p-2">₹1,850 / bag</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Boron 20% (Mahadhan)</td>
                    <td className="p-2 font-mono">B-1088 / Aug 2027</td>
                    <td className="p-2 text-primary font-bold">8 Kg</td>
                    <td className="p-2">₹420 / kg</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Copper Oxychloride 50%</td>
                    <td className="p-2 font-mono">B-9912 / Dec 2027</td>
                    <td className="p-2 text-primary font-bold">15 Kg</td>
                    <td className="p-2">₹540 / kg</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Neem Oil 10,000 PPM</td>
                    <td className="p-2 font-mono">B-3101 / Oct 2026</td>
                    <td className="p-2 text-error font-bold">4 L (Low)</td>
                    <td className="p-2">₹680 / L</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button onClick={() => setStockModal(false)} className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
