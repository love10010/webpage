"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useModals } from "@/components/AppShell";

interface Activity {
  id: number;
  time: string;
  category: "urgent" | "spray" | "drip" | "harvest";
  title: string;
  description: string;
  block: string;
  assignee: string;
  completed: boolean;
}

const initialActivities: Activity[] = [
  {
    id: 1,
    time: "Today • 07:00 AM",
    category: "urgent",
    title: "Pre-harvest Potassium Foliar Spray (0:0:50)",
    description: "350 trees in Block B to prevent spongy tissue development before sunrise heat.",
    block: "Block B (Hillside)",
    assignee: "Santosh Gurav + 2 spray technicians",
    completed: false,
  },
  {
    id: 2,
    time: "Today • 11:30 AM",
    category: "urgent",
    title: "Deploy 40 Pheromone Fruit Fly Traps",
    description: "Install yellow delta sticky traps with Methyl Eugenol lure along orchard borders.",
    block: "Plot A Perimeter",
    assignee: "Anand Mhatre (Pest Control)",
    completed: false,
  },
  {
    id: 3,
    time: "Today • 04:00 PM",
    category: "drip",
    title: "Backwash & Clean Inline Drip Disc Filters",
    description: "Check 35 PSI pressure difference at Well Valley pump manifold station #2.",
    block: "Plot C (Well Valley)",
    assignee: "Dattaram Kadam",
    completed: false,
  },
  {
    id: 4,
    time: "Tonight • 10:00 PM",
    category: "drip",
    title: "Night Drip Pulse Fertigation (2.5 hrs)",
    description: "Automated pump cycle feeding water-soluble micronutrients directly to rootzone.",
    block: "Plot A & B",
    assignee: "Automated Field Gateway",
    completed: false,
  },
  {
    id: 5,
    time: "Tomorrow • 06:00 AM",
    category: "harvest",
    title: "Alphonso Zhela Harvest Flush (120 Crates)",
    description: "Selective harvest of mature green fruit with 1-cm pedicel stem retention.",
    block: "Plot A (Pawas South)",
    assignee: "12 Harvesters (Tukaram Squad)",
    completed: false,
  },
  {
    id: 6,
    time: "Tomorrow • 02:00 PM",
    category: "harvest",
    title: "Vashi APMC Mandi Loading & Gate Pass",
    description: "Verify APEDA inspection stamps, packing straw, and wooden crate seals.",
    block: "Packhouse A Shed",
    assignee: "Logistics Team",
    completed: false,
  },
];

export default function ActivityAndRemindersPage() {
  const { language } = useLanguage();
  const { openCareNote, openWhatsApp } = useModals();

  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [filter, setFilter] = useState("all");
  const [scheduleModal, setScheduleModal] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const toggleComplete = (id: number) => {
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const filteredActivities = activities.filter((a) => {
    if (filter === "all") return true;
    if (filter === "urgent") return a.category === "urgent";
    if (filter === "drip") return a.category === "drip";
    if (filter === "harvest") return a.category === "harvest";
    return true;
  });

  const urgentCount = activities.filter((a) => !a.completed && a.category === "urgent").length;
  const completedCount = activities.filter((a) => a.completed).length;

  const handleBroadcastAlert = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 3000);
  };

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-xs">
            <span>Home</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Activity & Reminders</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            {language === "mr"
              ? "बागेतील कामे व स्मरणपत्रे"
              : "Orchard Operations & Activity Reminders"}
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant max-w-3xl leading-relaxed">
            {language === "mr"
              ? "नियोजित शेती कामे, कीड चेतावणी, पाणी डोस व मुकादमांसाठी स्वयंचलित व्हॉट्सॲप सूचना."
              : "Scheduled agronomic SOP tasks, critical pest alerts, irrigation cycles, and automated WhatsApp reminder triggers for Ratnagiri GI Hapus Estate."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            onClick={() => alert("Downloading ICS/PDF Calendar...")}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Calendar (.ICS)</span>
          </button>
          <button
            onClick={openWhatsApp}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Sync WhatsApp & SMS</span>
          </button>
          <button
            onClick={() => setScheduleModal(true)}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>+ Schedule Custom Activity</span>
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">Today's Critical Tasks</span>
              <div className="font-numeric-metric text-3xl text-error font-bold my-1">
                {urgentCount} Urgent
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">crisis_alert</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>2 Sprays, 1 Drip Run</span>
            <span className="font-semibold text-primary">Plot A & B</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">Tasks Completed</span>
              <div className="font-numeric-metric text-3xl text-primary font-bold my-1">
                {completedCount} Done
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>100% SOP Compliance</span>
            <span className="text-outline">Gat 142/2</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">Active Phenology Stage</span>
              <div className="font-numeric-metric text-2xl text-secondary font-bold my-1">
                Fruit Enlargement
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">nature</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>Marble to Egg (Day 42/75)</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px]">
              Active
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">Next Automated Alert</span>
              <div className="font-numeric-metric text-xl text-primary font-bold my-1">
                Tomorrow 06:30 AM
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">notifications_active</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>Labor Mukkadam SMS & WA</span>
            <span className="text-primary font-semibold">14 Recipients</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Scheduled Operations Timeline + WhatsApp Broadcast Hub */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
        {/* Left Column: Operations Timeline (8 Cols) */}
        <div className="xl:col-span-8 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-high">
            <div>
              <h2 className="font-title-lg text-title-lg text-primary font-bold">
                Upcoming & Scheduled Operations Timeline
              </h2>
              <p className="font-label-md text-xs text-outline">
                Precision agronomy tasks calibrated to Ratnagiri weather & soil sensors
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold">
              {filteredActivities.length} Operations in View
            </span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "all", label: `All Operations (${activities.length})` },
              { id: "urgent", label: "Urgent & Critical (2)" },
              { id: "drip", label: "Irrigation & Drip (2)" },
              { id: "harvest", label: "Harvest & Packing (2)" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === f.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Timeline Cards */}
          <div className="flex flex-col gap-space-sm">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className={`p-space-md rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-md ${
                  act.completed
                    ? "bg-surface-container-low/60 border-outline-variant/20 opacity-60 line-through"
                    : "bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30"
                }`}
              >
                <div className="flex items-start gap-space-md">
                  <input
                    type="checkbox"
                    checked={act.completed}
                    onChange={() => toggleComplete(act.id)}
                    className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer mt-1 shrink-0"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-secondary">{act.time}</span>
                      <span className="text-[11px] text-outline">• {act.block}</span>
                    </div>
                    <span className="font-title-md text-sm font-bold text-on-surface mt-0.5">
                      {act.title}
                    </span>
                    <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
                      {act.description}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-outline font-semibold">
                      <span className="material-symbols-outlined text-[14px]">person</span>
                      <span>Assignee: {act.assignee}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleComplete(act.id)}
                  className={`min-h-[40px] px-space-md rounded-xl font-label-md text-xs font-bold shrink-0 transition-all active:scale-95 ${
                    act.completed
                      ? "bg-surface-container text-outline"
                      : "bg-primary-fixed text-primary hover:bg-primary hover:text-on-primary shadow-sm"
                  }`}
                >
                  {act.completed ? "Reopen" : "Mark Done ✓"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: WhatsApp Automated Broadcast Hub (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md border-2 border-primary/30 flex flex-col gap-space-md">
            <div>
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Automated Dispatcher
              </span>
              <h3 className="font-title-lg text-base font-bold text-primary">
                WhatsApp & SMS Field Broadcast
              </h3>
              <p className="text-xs text-on-surface-variant">
                Notify laborers, pesticide sprayers, and APMC drivers instantly.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5 text-xs">
              <div className="font-mono font-bold text-primary flex items-center justify-between">
                <span>Next Scheduled Broadcast:</span>
                <span className="text-secondary">Tomorrow 06:30 AM</span>
              </div>
              <p className="text-on-surface-variant text-[11px] italic bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/20">
                &ldquo;सुप्रभात! आज सकाळी ७:०० वाजता ब्लॉक B मध्ये पोटॅशियम फवारणी सुरू होईल. सर्व मजुरांनी मास्क व साधने सोबत आणावीत.&rdquo;
              </p>
              <div className="text-[11px] text-outline flex items-center justify-between pt-1">
                <span>Recipients: 14 Mukkadams</span>
                <span className="text-primary font-bold">Marathi & Hindi</span>
              </div>
            </div>

            <button
              onClick={handleBroadcastAlert}
              type="button"
              className="w-full min-h-[44px] rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {alertSent ? "done" : "send"}
              </span>
              <span>
                {alertSent ? "Broadcast Sent to 14 Numbers! ✓" : "Send Urgent Broadcast Now"}
              </span>
            </button>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-2">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">alarm_on</span>
              Daily Voice Call Advisory (Kisan Call Center)
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every morning at 06:00 AM, our automated voice agent calls registered orchard supervisors with weather forecasts and chemical ratios in Marathi.
            </p>
            <span className="text-[11px] text-on-surface-variant font-bold">Voice call integration is not configured.</span>
          </div>
        </div>
      </div>

      {/* Schedule Custom Activity Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-6 max-w-md w-full flex flex-col gap-4 border border-outline-variant/40">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <h3 className="font-headline-md text-lg font-bold text-primary">
                Schedule Custom Farm Operation
              </h3>
              <button onClick={() => setScheduleModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Activity Title</label>
                <input type="text" placeholder="e.g. Grass cutting & mulching" className="w-full p-2 border border-outline-variant rounded-xl" />
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
                  <label className="font-bold text-on-surface block mb-1">Time</label>
                  <input type="text" defaultValue="Tomorrow 08:00 AM" className="w-full p-2 border border-outline-variant rounded-xl" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button onClick={() => setScheduleModal(false)} className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Custom operation added to timeline!");
                  setScheduleModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
