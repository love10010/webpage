"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useModals } from "@/components/AppShell";

interface Squad {
  id: string;
  mukkadam: string;
  location: string;
  squadSize: number;
  ratePerDay: number;
  rating: number;
  verified: boolean;
  specialty: string;
  specialtyLocal: string;
  toolsIncluded: string;
  photo: string;
  phone: string;
}

const mockSquads: Squad[] = [
  {
    id: "SQ-01",
    mukkadam: "Santosh Gurav (मुकादम)",
    location: "Pawas Village (4 km away)",
    squadSize: 12,
    ratePerDay: 550,
    rating: 4.9,
    verified: true,
    specialty: "Expert Zhela Bamboo Ring-Net Harvesting",
    specialtyLocal: "बांबू झेला काठी व जाळीने तोडणी तज्ज्ञ",
    toolsIncluded: "12 Zhela Poles + Cotton Nets + Safety Helmets",
    photo: "https://lh3.googleusercontent.com/aida/AEtjO1X96SasFQrplG1a7opsk90GDZ_cRkTGXvoOcgZk_yaSo3ETvPrtZdC_72yjiMNjMf_XIckiUpLosINH2cb1r1_Vd0ywzt3cTE_iq_tbo37ClYWIF4yNDInw_Km4XrM-0eHTgJrdyWbrVSwFcIUBrMazpk01nrOT-mU3NKe1SSGl1JLXY-Yzgyr9WD5ppBn5kI2Jbe2MEOhmkgl0AqxMzw3KGZEYmucr-pBMbJ-KYvbkQztrsMRWkMFmtg",
    phone: "+91 98234 44102",
  },
  {
    id: "SQ-02",
    mukkadam: "Tukaram Jadhav (मुकादम)",
    location: "Lanja Taluka (12 km away)",
    squadSize: 15,
    ratePerDay: 500,
    rating: 4.8,
    verified: true,
    specialty: "High-Speed Crate Packing & Paddy Straw Sorting",
    specialtyLocal: "पेट्या पॅकिंग व भात पेंढा अस्तर",
    toolsIncluded: "Crate sealers + grading scales",
    photo: "https://lh3.googleusercontent.com/aida/AEtjO1V3ytGkltickxv-YOK4dkZ5FOf6ME9IPIPhzsKrWDQ-oJPq6HFcPot4pFSqbGuRhahVCkGV222iQV-9kO-S8rNKuxnr4uEABuWTxGad4Tw2xM3bqe7ksAAd_Tsr_uY_xO1XPSaLW11ISZCIgMQPsyIOVPqIpzrPFRkoII8niJVvAS70W2e_cpbHxuJv3caJx1UAS16KZSsdIQxZEtXLAXL351oQiO79ioOggJWCyZllTx6o8GdYXeAs5Bg",
    phone: "+91 94220 89112",
  },
  {
    id: "SQ-03",
    mukkadam: "Anand Mhatre (मुकादम)",
    location: "Devgad Border (18 km away)",
    squadSize: 8,
    ratePerDay: 600,
    rating: 4.9,
    verified: true,
    specialty: "HTP Sprayer Operators & Pruning Specialists",
    specialtyLocal: "फवारणी व फांदी छाटणी तज्ज्ञ",
    toolsIncluded: "Protective Suits + Dual Lance HTP Nozzles",
    photo: "https://lh3.googleusercontent.com/aida/AEtjO1WaAGofjUbVzptj5okYC9YvTOQ2eBgHGri7JL2Hqcucs9K09YcdodDTyq91byM3aLEVAm_4Q5bBbJ1IcHqxDtLVx2zjTa9y0ishtMxyRMMa0A_hkdV7gv2iRMOIJjniXOY8ioeNOj_pRkSLJuoEIh2fIR3S9OXxTYfCmJgfX5WWuhM__jeUSdULN3t3tnrZ20SJagadOKWXLewjc2esPFIkocCcf7EgqxeIgR4anqDUM49-tIK-3W9fEVs",
    phone: "+91 97631 55099",
  },
];

interface MusterWorker {
  id: number;
  name: string;
  role: string;
  block: string;
  checkIn: string;
  dailyWage: number;
  present: boolean;
}

export default function HireWorkersPage() {
  const { language } = useLanguage();
  const { openWhatsApp } = useModals();

  const [activeTab, setActiveTab] = useState<"squads" | "muster">("squads");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookedSquad, setBookedSquad] = useState<Squad | null>(null);
  const [postModal, setPostModal] = useState(false);

  // Muster Roll State
  const [workers, setWorkers] = useState<MusterWorker[]>([
    { id: 1, name: "Santosh Gurav", role: "Mukkadam Lead", block: "Block B", checkIn: "06:45 AM", dailyWage: 650, present: true },
    { id: 2, name: "Prashant Patil", role: "Zhela Harvester", block: "Block B", checkIn: "07:00 AM", dailyWage: 550, present: true },
    { id: 3, name: "Ganesh Surve", role: "Zhela Harvester", block: "Block B", checkIn: "07:00 AM", dailyWage: 550, present: true },
    { id: 4, name: "Sanjay Mane", role: "Crate Carrier", block: "Block B", checkIn: "07:15 AM", dailyWage: 480, present: true },
    { id: 5, name: "Ramesh Kadam", role: "Grading & Sap Wiping", block: "Packhouse A", checkIn: "07:30 AM", dailyWage: 500, present: true },
    { id: 6, name: "Suresh Powar", role: "Box Packer (Straw)", block: "Packhouse A", checkIn: "07:30 AM", dailyWage: 500, present: true },
    { id: 7, name: "Mahesh Tambe", role: "Sprayer Operator", block: "Block A", checkIn: "06:30 AM", dailyWage: 600, present: true },
    { id: 8, name: "Dattaram Shinde", role: "Drip Line Attendant", block: "Well Valley", checkIn: "08:00 AM", dailyWage: 450, present: true },
  ]);

  const togglePresence = (id: number) => {
    setWorkers(workers.map((w) => (w.id === id ? { ...w, present: !w.present } : w)));
  };

  const presentCount = workers.filter((w) => w.present).length;
  const totalDailyWage = workers
    .filter((w) => w.present)
    .reduce((sum, w) => sum + w.dailyWage, 0);

  const filteredSquads = mockSquads.filter((squad) => {
    const matchesSearch =
      squad.mukkadam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-xs">
            <span>Dashboard</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Labor & Workforce Management</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            {language === "mr"
              ? "आंबा तोडणी व मशागत मजूर नियुक्ती"
              : "Hire Mango Farm Workers & Harvest Squads"}
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant max-w-3xl leading-relaxed">
            {language === "mr"
              ? "कोकणातील अनुभवी आंबा तोडणी पथके (झेला तोडणी मजूर, प्रतवारीकार, पॅकिंग व फवारणी तज्ज्ञ) दैनंदिन हजेरी आणि थेट वेतनासह बुक करा."
              : "Book verified Konkan harvesting squads (Zhela pickers, graders, crate packers, spray operators) with daily wage tracking & attendance."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            onClick={() => setPostModal(true)}
            type="button"
            className="min-h-[44px] px-space-lg rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>{language === "mr" ? "+ नवीन मजूर मागणी नोंदवा" : "+ Post New Requirement"}</span>
          </button>
          <button
            onClick={openWhatsApp}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-secondary hover:brightness-105 text-on-secondary font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>{language === "mr" ? "थेट व्हॉट्सॲप संपर्क" : "Squad Dispatch"}</span>
          </button>
        </div>
      </div>

      {/* Metric Telemetry Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
              Active Workers Today
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/30 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">engineering</span>
            </div>
          </div>
          <div className="my-space-sm flex items-baseline gap-2">
            <span className="font-numeric-metric text-3xl text-primary font-bold">18</span>
            <span className="font-label-lg text-xs text-on-surface-variant">Workers on Field</span>
          </div>
          <div className="flex items-center gap-1 font-label-md text-xs text-primary pt-2 border-t border-surface-container-high">
            <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
            <span>12 Zhela pickers, 6 packers at Block B</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
              Verified Squads Nearby
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
          </div>
          <div className="my-space-sm flex items-baseline gap-2">
            <span className="font-numeric-metric text-3xl text-secondary font-bold">7</span>
            <span className="font-label-lg text-xs text-on-surface-variant">Squads Ready</span>
          </div>
          <div className="flex items-center gap-1 font-label-md text-xs text-on-surface-variant pt-2 border-t border-surface-container-high">
            <span className="material-symbols-outlined text-[16px] text-secondary">near_me</span>
            <span>Chiplun, Pawas, Lanja, Devgad</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
              Daily Wage Benchmark
            </span>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
          </div>
          <div className="my-space-sm flex items-baseline gap-2">
            <span className="font-numeric-metric text-2xl text-tertiary font-bold">₹450 - ₹650</span>
            <span className="text-xs text-on-surface-variant">/ day</span>
          </div>
          <div className="flex items-center gap-1 font-label-md text-xs text-on-surface-variant pt-2 border-t border-surface-container-high">
            <span className="material-symbols-outlined text-[16px] text-primary">handyman</span>
            <span>Includes poles, tool-kits & lunch</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-surface-variant uppercase font-semibold">
              Labor Spend (MTD)
            </span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
            </div>
          </div>
          <div className="my-space-sm flex items-baseline gap-2">
            <span className="font-numeric-metric text-3xl text-on-surface font-bold">₹78,400</span>
            <span className="text-xs text-primary font-bold">31.8%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: "31.8%" }} />
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2">
            <span>Budget: ₹2,46,000</span>
            <span className="text-tertiary font-bold">On Track ✓</span>
          </div>
        </div>
      </section>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm bg-surface-container-lowest p-space-xs rounded-2xl shadow-sm border border-outline-variant/40">
        <div className="inline-flex p-1 bg-surface-container rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("squads")}
            className={`min-h-[40px] px-space-md rounded-xl font-label-lg text-xs transition-all flex items-center gap-1.5 font-bold ${
              activeTab === "squads"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">groups</span>
            <span>Verified Harvesting Squads</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("muster")}
            className={`min-h-[40px] px-space-md rounded-xl font-label-lg text-xs transition-all flex items-center gap-1.5 font-bold ${
              activeTab === "muster"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span>Today's Farm Muster Roll</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold">
              {presentCount} Present
            </span>
          </button>
        </div>

        <div className="relative sm:w-72 px-2">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by Mukkadam, taluka..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* VIEW 1: SQUADS */}
      {activeTab === "squads" && (
        <div className="flex flex-col gap-space-md">
          {/* Skill Filter Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            {[
              { id: "all", icon: "🎋", title: "Zhela Mango Pickers", desc: "Prevents sap burn & fruit bruising" },
              { id: "graders", icon: "⚖️", title: "Graders & Sizers", desc: "APMC sorting (Grade A, B, Export)" },
              { id: "packers", icon: "📦", title: "Crate Packers", desc: "Paddy straw foam cushioning" },
              { id: "sprayers", icon: "🚜", title: "Spray Operators", desc: "High-pressure boom & HTP spray" },
            ].map((skill) => (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(skill.id)}
                className={`p-space-md rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedSkill === skill.id
                    ? "bg-surface-container-lowest border-primary shadow-md"
                    : "bg-surface-container-lowest border-outline-variant/30 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{skill.icon}</span>
                  {selectedSkill === skill.id && (
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  )}
                </div>
                <div>
                  <div className="font-title-md text-sm font-bold text-primary">{skill.title}</div>
                  <div className="text-[11px] text-on-surface-variant line-clamp-1">{skill.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Squad Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
            {filteredSquads.map((squad) => (
              <div
                key={squad.id}
                className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 p-space-lg flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-start gap-space-md">
                  <img
                    alt={squad.mukkadam}
                    src={squad.photo}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-fixed shadow-sm shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-md text-base font-bold text-primary truncate">
                        {squad.mukkadam}
                      </span>
                      {squad.verified && (
                        <span className="material-symbols-outlined text-secondary text-[18px]" title="Verified Contractor">
                          verified
                        </span>
                      )}
                    </div>
                    <span className="font-label-md text-xs text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {squad.location}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs font-bold text-amber-600">★ {squad.rating}</span>
                      <span className="text-[11px] text-outline">• {squad.squadSize} Experienced Workers</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-outline-variant/30 text-xs">
                  <span className="font-bold text-primary">{squad.specialty}</span>
                  <span className="text-on-surface-variant">{squad.specialtyLocal}</span>
                  <div className="pt-1 mt-1 border-t border-surface-container text-[11px] text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">build</span>
                    <span>Tools: {squad.toolsIncluded}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-high">
                  <div>
                    <span className="font-numeric-metric text-xl text-primary font-bold">
                      ₹{squad.ratePerDay}
                    </span>
                    <span className="text-[11px] text-outline"> / person / day</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${squad.phone}`}
                      className="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors"
                      title="Call Mukkadam"
                    >
                      <span className="material-symbols-outlined text-[20px]">phone</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setBookedSquad(squad)}
                      className="min-h-[40px] px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs font-bold shadow-sm transition-all active:scale-95"
                    >
                      Book Squad
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: TODAY'S FARM MUSTER ROLL */}
      {activeTab === "muster" && (
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 p-space-lg flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container-high">
            <div>
              <h2 className="font-title-lg text-title-lg text-primary font-bold">
                Today's Daily Farm Muster Roll (दैनिक हजेरी पत्रक)
              </h2>
              <p className="font-label-md text-xs text-outline">
                Block B Harvesting & Packhouse A Operations • {presentCount} / {workers.length} workers present
              </p>
            </div>
            <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30">
              <div className="flex flex-col">
                <span className="text-[11px] text-outline font-semibold">Today's Total Daily Payout:</span>
                <span className="font-numeric-metric text-xl text-primary font-bold">
                  ₹{totalDailyWage.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert(`Direct UPI Wage payout approved for ${presentCount} workers!`)}
                className="px-4 py-2 rounded-xl bg-secondary hover:brightness-105 text-on-secondary text-xs font-bold shadow-sm transition-all"
              >
                Approve Wage Payout
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3 rounded-l-xl">Attendance</th>
                  <th className="p-3">Worker Name</th>
                  <th className="p-3">Role / Skill</th>
                  <th className="p-3">Assigned Block</th>
                  <th className="p-3">Check-In</th>
                  <th className="p-3">Daily Wage (₹)</th>
                  <th className="p-3 rounded-r-xl text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high text-on-surface">
                {workers.map((worker) => (
                  <tr
                    key={worker.id}
                    className={`transition-colors ${worker.present ? "hover:bg-surface-container-low" : "opacity-40 line-through bg-surface-container-lowest"}`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={worker.present}
                        onChange={() => togglePresence(worker.id)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                      />
                    </td>
                    <td className="p-3 font-bold text-primary">{worker.name}</td>
                    <td className="p-3">{worker.role}</td>
                    <td className="p-3">{worker.block}</td>
                    <td className="p-3 font-mono">{worker.checkIn}</td>
                    <td className="p-3 font-bold">₹{worker.dailyWage}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          worker.present
                            ? "bg-primary-fixed text-primary"
                            : "bg-surface-container text-outline"
                        }`}
                      >
                        {worker.present ? "Present (हजर)" : "Absent"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Book Squad Modal */}
      {bookedSquad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-6 max-w-lg w-full flex flex-col gap-4 border border-outline-variant/40">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <div>
                <h3 className="font-headline-md text-lg font-bold text-primary">
                  Book Harvesting Squad
                </h3>
                <p className="text-xs text-on-surface-variant">{bookedSquad.mukkadam}</p>
              </div>
              <button
                onClick={() => setBookedSquad(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1 text-xs">
              <div className="flex justify-between">
                <span>Squad Strength:</span>
                <span className="font-bold">{bookedSquad.squadSize} Skilled Workers</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Wage Benchmark:</span>
                <span className="font-bold">₹{bookedSquad.ratePerDay} / person</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-sm pt-1 border-t border-surface-container">
                <span>Estimated Daily Squad Wage:</span>
                <span>₹{(bookedSquad.squadSize * bookedSquad.ratePerDay).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface">Target Orchard Block</label>
              <select className="p-2.5 rounded-xl border border-outline-variant text-xs bg-surface-container-lowest">
                <option>Plot A: Pawas South (Alphonso First Flush)</option>
                <option>Plot B: Hillside Plateau (Alphonso Main Harvest)</option>
                <option>Plot C: Well Valley (Kesar Harvest)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button
                onClick={() => setBookedSquad(null)}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Confirmed Booking with ${bookedSquad.mukkadam}! Dispatch receipt sent via SMS & WhatsApp.`);
                  setBookedSquad(null);
                }}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm"
              >
                Confirm Booking & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Requirement Modal */}
      {postModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-6 max-w-md w-full flex flex-col gap-4 border border-outline-variant/40">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <h3 className="font-headline-md text-lg font-bold text-primary">
                Post Labor Requirement
              </h3>
              <button
                onClick={() => setPostModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Broadcast urgent labor request to all certified Mukkadam contractors across Ratnagiri & Devgad.
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface">Workers Needed</label>
              <input type="number" defaultValue={10} className="p-2 rounded-xl border border-outline-variant text-xs" />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button onClick={() => setPostModal(false)} className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Requirement Broadcasted to 14 Contractors!");
                  setPostModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm"
              >
                Broadcast Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
