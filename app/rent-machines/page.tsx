"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useModals } from "@/components/AppShell";

interface Machine {
  id: string;
  name: string;
  nameLocal: string;
  category: "sprayers" | "tractors" | "grading" | "pruners" | "trolleys";
  hub: string;
  distance: string;
  hourlyRate: number;
  dailyRate: number;
  rating: number;
  deliveryTime: string;
  image: string;
  specs: string[];
}

const mockMachines: Machine[] = [
  {
    id: "MCH-01",
    name: "Swaraj 4WD Narrow Orchard Tractor + 400L Blower",
    nameLocal: "स्वराज मिनी ट्रॅक्टर + ४००L ब्लोअर फवारणी यंत्र",
    category: "tractors",
    hub: "CHC Pawas Agro Hub",
    distance: "3.5 km away",
    hourlyRate: 650,
    dailyRate: 4200,
    rating: 4.9,
    deliveryTime: "45 mins",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1XBcYWmmyBi6AMZ7jFzEordNbKRT_PpQkMsz2VALBS29DQZtZsR8DcG7ac-EtVqK54ZfNGpN7m0v2AryiYczfbzmY-oMQZ17Uiyg53szF4uaeeaB_w0i-2l-sEua0ENy5plLw5l71IrnuAT_fSaGh7YQJmABCPvWR1Cc0sGb9_TwCYU6_UCneJ9UtiEQcuCkwSOAspEpJghyCsFbHrfwECXrKNNHWDS8uWjMVS2nDZ9BQidQXUadUflFFw",
    specs: ["25 HP 4WD narrow chassis (3.2 ft)", "Italian high-pressure mist nozzles", "PTO driven high-speed turbine fan"],
  },
  {
    id: "MCH-02",
    name: "Mitra Air-Blast Tractor Mounted Boom Sprayer",
    nameLocal: "मित्रा एअर-ब्लास्ट मिस्ट फवारणी युनिट",
    category: "sprayers",
    hub: "Ratnagiri MIDC Cooperative Hub",
    distance: "7.0 km away",
    hourlyRate: 480,
    dailyRate: 3200,
    rating: 4.8,
    deliveryTime: "60 mins",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1U6B1lDW-75YGS1YDtrwfdEW7yZX9WWCxqwbO2LLFcu8wSAKpzJh3Zdx_NCoLw5DojXfguUPuheZBqzC-USX7w6MO8rB9diqqvoRCkS5yGuRXZ1APtBJ0AVwaWD7plGnIoiPm3MoBH1mOQEHIsvx9gD1zw0jk0-0cWYJbwPpcaW5nIEJqeYc_hNupWL46JtAa3-DP8XYOvgEo5AK_8xzFpYLoTwelDX7_gX7NCNr8qy74CzqCm6CDA-v0M",
    specs: ["400L tank capacity", "Adjustable canopy spray angle", "Ideal for dense foliage canopy penetrations"],
  },
  {
    id: "MCH-03",
    name: "Automated Mango Weight Grading & Sizing Machine",
    nameLocal: "आंबा इलेक्ट्रॉनिक वजन प्रतवारी व कन्वेयर यंत्र",
    category: "grading",
    hub: "Pawas Packhouse Common Facility",
    distance: "4.2 km away",
    hourlyRate: 850,
    dailyRate: 5800,
    rating: 4.9,
    deliveryTime: "Packhouse Slot",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1XpuoIog8AQGlqXrAPheX6Iu0FgGlaDzJ7A0k-va0NlDM3BU5V8JLPr0LIdMjhaICb5mPmrKNiR1jScBOD2ThEhIwpA3NmDKeGsOc-g4M-okWgh34mUZkTlRms2cpmIxRFWgEo2-vuckhDdQu4Mrdw0bqe8EglIfOdM4NqzPmLLFp1wVL6oxcLpH7SktC6uUjTbYxH-wwPuzEp95tux4NB870XjAB9AYz-GPTsGk1eTJuMN4wHDjolgMNY",
    specs: ["3.5 Tons / hour throughput", "4 electronic sorting grades (180g-350g+)", "Anti-bruise padded conveyor cups"],
  },
  {
    id: "MCH-04",
    name: "Honda GX 160 Portable HTP High-Pressure Sprayer",
    nameLocal: "होंडा पोर्टेबल एचटीपी पॉवर स्प्रेअर (२०० मी. नळी)",
    category: "sprayers",
    hub: "Lanja Krishi CHC",
    distance: "11 km away",
    hourlyRate: 220,
    dailyRate: 1400,
    rating: 4.7,
    deliveryTime: "40 mins",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1WaAGofjUbVzptj5okYC9YvTOQ2eBgHGri7JL2Hqcucs9K09YcdodDTyq91byM3aLEVAm_4Q5bBbJ1IcHqxDtLVx2zjTa9y0ishtMxyRMMa0A_hkdV7gv2iRMOIJjniXOY8ioeNOj_pRkSLJuoEIh2fIR3S9OXxTYfCmJgfX5WWuhM__jeUSdULN3t3tnrZ20SJagadOKWXLewjc2esPFIkocCcf7EgqxeIgR4anqDUM49-tIK-3W9fEVs",
    specs: ["200m flexible braided hose", "Brass spray gun with ceramic discs", "5.5 HP low-emission 4-stroke engine"],
  },
];

export default function RentMachinesPage() {
  const { language } = useLanguage();
  const { openWhatsApp } = useModals();

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMachineId, setSelectedMachineId] = useState("MCH-01");
  const [durationDays, setDurationDays] = useState(1);
  const [includeOperator, setIncludeOperator] = useState(true);
  const [includeFuel, setIncludeFuel] = useState(true);
  const [targetBlock, setTargetBlock] = useState("Plot B: Hillside Plateau");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const selectedMachine = mockMachines.find((m) => m.id === selectedMachineId) || mockMachines[0];

  const baseRental = selectedMachine.dailyRate * durationDays;
  const operatorFee = includeOperator ? 350 * durationDays : 0;
  const fuelFee = includeFuel ? 850 * durationDays : 0;
  const flatDelivery = 250;
  const totalCost = baseRental + operatorFee + fuelFee + flatDelivery;

  const filteredMachines = mockMachines.filter((m) => {
    if (activeCategory === "all") return true;
    return m.category === activeCategory;
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      alert(`Booking confirmed for ${selectedMachine.name}! Digital dispatch memo sent to CHC.`);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-xs">
            <span>Home</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Rent Machines</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            {language === "mr" ? "कृषी यंत्रसामग्री भाडे केंद्र" : "Rent Precision Orchard Machinery"}
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant max-w-3xl leading-relaxed">
            {language === "mr"
              ? "आंबा बागेसाठी विशेष फवारणी यंत्रे, मिनी ट्रॅक्टर, मँगो ग्रेडर आणि प्रूनर्स शासनमान्य कस्टम हायरिंग केंद्रांमधून (CHC) वाजवी दरात भाड्याने मिळवा."
              : "Book specialized Konkan orchard sprayers, narrow-track tractors, mango graders, and pruning gear from certified Custom Hiring Centers (CHC)."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold shadow-sm">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>MahaDBT 50% Subsidy Linked</span>
          </div>
          <button
            onClick={openWhatsApp}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>{language === "mr" ? "CHC केंद्र संपर्क" : "Contact CHC Desk"}</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-outline uppercase font-semibold">Available Equipment</span>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/30 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">agriculture</span>
            </div>
          </div>
          <div className="my-space-sm">
            <span className="font-numeric-metric text-3xl text-primary font-bold">12 Units</span>
          </div>
          <div className="pt-2 border-t border-surface-container-high text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-[14px]">near_me</span>
            <span>Within 25 km radius</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-outline uppercase font-semibold">Active Booking</span>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
          </div>
          <div className="my-space-sm">
            <span className="font-numeric-metric text-2xl text-secondary font-bold">24 March (Sun)</span>
          </div>
          <div className="pt-2 border-t border-surface-container-high text-xs text-on-surface-variant">
            Swaraj 4WD Blower • Block B
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-outline uppercase font-semibold">Verified CHC Hubs</span>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
          </div>
          <div className="my-space-sm">
            <span className="font-numeric-metric text-3xl text-tertiary font-bold">4 Hubs</span>
          </div>
          <div className="pt-2 border-t border-surface-container-high text-xs text-on-surface-variant">
            Pawas, Ratnagiri, Lanja, Devgad
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-outline uppercase font-semibold">Fast Delivery SLA</span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">speed</span>
            </div>
          </div>
          <div className="my-space-sm">
            <span className="font-numeric-metric text-3xl text-primary font-bold">45 Mins</span>
          </div>
          <div className="pt-2 border-t border-surface-container-high text-xs text-on-surface-variant">
            Mobile breakdown backup
          </div>
        </div>
      </section>

      {/* Main Grid: Machine Catalog + Cost Estimator */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
        {/* Left Column: Machinery Catalog & Filter (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-space-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-surface-container-lowest p-2 rounded-2xl border border-outline-variant/40">
            {[
              { id: "all", label: "All Equipment (12)" },
              { id: "tractors", label: "Narrow 4WD Tractors" },
              { id: "sprayers", label: "Orchard Sprayers" },
              { id: "grading", label: "Post-Harvest Grading" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {filteredMachines.map((m) => {
              const isSelected = selectedMachineId === m.id;
              return (
                <div
                  key={m.id}
                  className={`bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border transition-all flex flex-col justify-between gap-space-sm ${
                    isSelected ? "border-primary ring-2 ring-primary/20" : "border-outline-variant/40 hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3 border border-outline-variant/20 shadow-inner">
                      <img alt={m.name} src={m.image} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                        {m.deliveryTime} delivery
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-secondary text-on-secondary text-[10px] font-bold">
                        ★ {m.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-outline font-semibold">{m.hub}</span>
                      <span className="text-[11px] text-primary font-bold">{m.distance}</span>
                    </div>

                    <h3 className="font-title-md text-sm font-bold text-on-surface mt-1 leading-snug">
                      {m.name}
                    </h3>
                    <p className="text-[11px] text-outline">{m.nameLocal}</p>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {m.specs.map((spec, sidx) => (
                        <span key={sidx} className="px-2 py-0.5 rounded-md bg-surface-container text-[10px] text-on-surface-variant font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-container-high flex items-center justify-between">
                    <div>
                      <span className="font-numeric-metric text-lg text-primary font-bold">
                        ₹{m.dailyRate}
                      </span>
                      <span className="text-[11px] text-outline"> / day (₹{m.hourlyRate}/hr)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMachineId(m.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                        isSelected
                          ? "bg-secondary text-on-secondary shadow-sm"
                          : "bg-surface-container hover:bg-surface-container-high text-primary"
                      }`}
                    >
                      {isSelected ? "Selected ✓" : "Select for Quote"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Biosafety & Sanitization Protocol Notice */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <span className="material-symbols-outlined text-secondary text-[18px]">sanitizer</span>
              <span>Orchard Biosafety Protocol (करपा रोग प्रतिबंध हमी)</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              All CHC sprayers, blowers, and pruning blades undergo mandatory Copper Oxychloride wash sanitization before entering your orchard gate to protect against Colletotrichum anthracnose blight.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Rental Cost & Delivery Estimator Calculator (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md sticky top-24">
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md border-2 border-primary/30 flex flex-col gap-space-md">
            <div>
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Cost & Delivery Estimator
              </span>
              <h2 className="font-headline-md text-lg text-primary font-bold leading-tight">
                Instant Transparent Quote
              </h2>
              <p className="text-xs text-on-surface-variant">
                Calibrated for Ratnagiri Hapus Estate
              </p>
            </div>

            <form onSubmit={handleBooking} className="flex flex-col gap-space-sm">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Selected Machinery
                </label>
                <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs font-bold text-primary flex items-center justify-between">
                  <span className="truncate">{selectedMachine.name}</span>
                  <span className="font-mono text-secondary">₹{selectedMachine.dailyRate}/d</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Delivery Block</label>
                  <select
                    value={targetBlock}
                    onChange={(e) => setTargetBlock(e.target.value)}
                    className="w-full p-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs"
                  >
                    <option>Plot A: Pawas South</option>
                    <option>Plot B: Hillside Plateau</option>
                    <option>Plot C: Well Valley</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-high">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={includeOperator}
                    onChange={(e) => setIncludeOperator(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>Include Certified Machine Operator (+₹350/day)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={includeFuel}
                    onChange={(e) => setIncludeFuel(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span>Include Agricultural Diesel Tank (+₹850/day)</span>
                </label>
              </div>

              {/* Cost Summary Breakdown */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span>Equipment Base ({durationDays} days):</span>
                  <span>₹{baseRental.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Field Transit & Delivery (Flat):</span>
                  <span>₹{flatDelivery}</span>
                </div>
                {includeOperator && (
                  <div className="flex justify-between">
                    <span>Operator Charges:</span>
                    <span>₹{operatorFee.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {includeFuel && (
                  <div className="flex justify-between">
                    <span>Diesel Fuel Allowance:</span>
                    <span>₹{fuelFee.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="pt-2 mt-1 border-t border-surface-container flex justify-between items-baseline text-sm font-bold text-primary">
                  <span>Estimated Total:</span>
                  <span className="font-numeric-metric text-xl text-secondary">
                    ₹{totalCost.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={bookingConfirmed}
                className="w-full min-h-[48px] rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 mt-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {bookingConfirmed ? "verified" : "local_shipping"}
                </span>
                <span>
                  {bookingConfirmed
                    ? "Confirming with CHC Pawas..."
                    : "Confirm Booking & Dispatch WhatsApp Receipt"}
                </span>
              </button>
            </form>
          </div>

          {/* Active Booking Dispatch Card */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Active Booking Dispatch
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                Prep Ready
              </span>
            </div>
            <p className="text-xs text-on-surface font-semibold">
              Swaraj 4WD Narrow Tractor + 400L Blower scheduled for Block B (350 Trees). Delivery Sunday, 24 March at 07:00 AM.
            </p>
            <div className="p-2 rounded-lg bg-surface-container text-xs text-primary font-mono flex items-center justify-between">
              <span>Driver: Santosh Gurav</span>
              <span>+91 98234 44102</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
