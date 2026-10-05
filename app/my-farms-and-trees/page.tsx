"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useModals } from "@/components/AppShell";

interface TreeItem {
  id: string;
  variety: string;
  varietyLocal: string;
  plot: string;
  row: string;
  plantingYear: number;
  age: number;
  stage: string;
  stageLocal: string;
  canopy: string;
  moisture: string;
  health: "optimal" | "watch";
  fruitEstimate: number;
  temp: string;
  lastCare: string;
  gps: string;
}

const mockTrees: TreeItem[] = [
  {
    id: "RTN-HAP-0422",
    variety: "Ratnagiri Alphonso (Hapus)",
    varietyLocal: "हापूस (वेंगुर्ला-४)",
    plot: "Plot A: Pawas South",
    row: "Row 14 • Tree #22",
    plantingYear: 2014,
    age: 12,
    stage: "Marble to Egg Size",
    stageLocal: "फळ वाटाणा ते सुपारी",
    canopy: "6.8 m",
    moisture: "38%",
    health: "optimal",
    fruitEstimate: 210,
    temp: "28.2°C",
    lastCare: "Potassium 0:0:50 foliar spray (3 days ago)",
    gps: "16.9842° N, 73.3120° E",
  },
  {
    id: "RTN-HAP-0423",
    variety: "Ratnagiri Alphonso (Hapus)",
    varietyLocal: "हापूस (वेंगुर्ला-४)",
    plot: "Plot A: Pawas South",
    row: "Row 14 • Tree #23",
    plantingYear: 2014,
    age: 12,
    stage: "Marble to Egg Size",
    stageLocal: "फळ वाटाणा ते सुपारी",
    canopy: "7.1 m",
    moisture: "36%",
    health: "optimal",
    fruitEstimate: 185,
    temp: "28.5°C",
    lastCare: "Boron 20% spray drench",
    gps: "16.9843° N, 73.3122° E",
  },
  {
    id: "RTN-HAP-0424",
    variety: "Ratnagiri Alphonso (Hapus)",
    varietyLocal: "हापूस (वेंगुर्ला-४)",
    plot: "Plot A: Pawas South",
    row: "Row 14 • Tree #24",
    plantingYear: 2016,
    age: 10,
    stage: "Early Fruit Set",
    stageLocal: "नुकतीच फळधारणा",
    canopy: "5.4 m",
    moisture: "28%",
    health: "watch",
    fruitEstimate: 120,
    temp: "29.8°C",
    lastCare: "Drip emitter check & flushing",
    gps: "16.9844° N, 73.3124° E",
  },
  {
    id: "RTN-KSR-0105",
    variety: "Kesar Mango",
    varietyLocal: "केशर (जुनागड क्लोन)",
    plot: "Plot B: Hillside Plateau",
    row: "Row 06 • Tree #05",
    plantingYear: 2017,
    age: 9,
    stage: "Egg Size (Rapid Bulk)",
    stageLocal: "अंड्याचा आकार (वेगाने वाढ)",
    canopy: "5.8 m",
    moisture: "40%",
    health: "optimal",
    fruitEstimate: 240,
    temp: "27.9°C",
    lastCare: "Neem oil organic wash",
    gps: "16.9912° N, 73.3089° E",
  },
  {
    id: "RTN-HAP-0889",
    variety: "Ratnagiri Alphonso (Hapus)",
    varietyLocal: "हापूस (देवगड खुंट)",
    plot: "Plot B: Hillside Plateau",
    row: "Row 18 • Tree #12",
    plantingYear: 2012,
    age: 14,
    stage: "Marble to Egg Size",
    stageLocal: "फळ वाटाणा ते सुपारी",
    canopy: "8.2 m",
    moisture: "37%",
    health: "optimal",
    fruitEstimate: 310,
    temp: "28.1°C",
    lastCare: "Sub-canopy mulching complete",
    gps: "16.9918° N, 73.3095° E",
  },
  {
    id: "RTN-HAP-1102",
    variety: "Ratnagiri Alphonso (Hapus)",
    varietyLocal: "हापूस (वेंगुर्ला-४)",
    plot: "Plot C: Well Valley",
    row: "Row 03 • Tree #08",
    plantingYear: 2019,
    age: 7,
    stage: "Vegetative & Flowering",
    stageLocal: "पालवी व मोहर",
    canopy: "4.6 m",
    moisture: "32%",
    health: "watch",
    fruitEstimate: 75,
    temp: "29.1°C",
    lastCare: "Micro-nutrient zinc booster",
    gps: "16.9801° N, 73.3150° E",
  },
];

export default function MyFarmsAndTreesPage() {
  const { language } = useLanguage();
  const { openCareNote } = useModals();

  const [activePlot, setActivePlot] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTree, setSelectedTree] = useState<TreeItem>(mockTrees[0]);
  const [exportNotice, setExportNotice] = useState(false);
  const [tagModal, setTagModal] = useState(false);

  const filteredTrees = mockTrees.filter((tree) => {
    const matchesPlot =
      activePlot === "all" ||
      (activePlot === "plot_a" && tree.plot.includes("Plot A")) ||
      (activePlot === "plot_b" && tree.plot.includes("Plot B")) ||
      (activePlot === "plot_c" && tree.plot.includes("Plot C"));

    const matchesSearch =
      tree.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tree.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tree.row.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPlot && matchesSearch;
  });

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-outline-variant/40">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-outline font-label-md text-xs">
            <span>Home</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">My Farms & Trees</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            {language === "mr" ? "आंबा बागांचे क्षेत्र व झाडांची गणना" : "Orchard Plots & Tree Census"}
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant max-w-3xl leading-relaxed">
            {language === "mr"
              ? "रत्नागिरी जीआय-टॅग प्रमाणित हापूस व केशर बागांचे भूमापन, झाडांचे आरोग्य, वय नोंदणी व जिओ-टॅगिंग डिजिटल रजिस्टर."
              : "Detailed cadastral survey, tree health tracking, age census, and geo-tagged digital registry for Ratnagiri GI-Tagged Alphonso & Kesar orchards."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            onClick={handleExport}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-label-lg text-xs flex items-center gap-1 transition-all active:scale-95 shadow-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">
              {exportNotice ? "done" : "description"}
            </span>
            <span>
              {exportNotice
                ? (language === "mr" ? "७/१२ उतारा डाउनलोड झाला!" : "Land 7/12 Downloaded!")
                : (language === "mr" ? "७/१२ उतारा व वृक्ष नोंदणी वही" : "Export Land 7/12 & Tree Registry")}
            </span>
          </button>

          <button
            onClick={() => setTagModal(true)}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-xs flex items-center gap-1 transition-all active:scale-95 shadow-sm font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>{language === "mr" ? "नवीन झाडे नोंदणी (QR/RFID)" : "Tag New Batch (QR/RFID)"}</span>
          </button>

          <button
            onClick={openCareNote}
            type="button"
            className="min-h-[44px] px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs flex items-center gap-1 transition-all active:scale-95 shadow-md font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>{language === "mr" ? "+ नवीन शेत नोंदवा" : "+ Add New Plot"}</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">
                Total Registered Trees
              </span>
              <div className="font-numeric-metric text-3xl text-primary font-bold my-1">
                1,240 <span className="text-sm font-normal text-on-surface-variant">Trees</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">forest</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>1,110 Alphonso • 130 Kesar</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px]">
              98% Geo-tagged
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">
                Total Orchard Land
              </span>
              <div className="font-numeric-metric text-3xl text-primary font-bold my-1">
                14.5 <span className="text-sm font-normal text-on-surface-variant">Acres</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">crop_free</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>58 Gunthas • 3 designated plots</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px]">
              100% Micro-Drip
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">
                Tree Health Index
              </span>
              <div className="font-numeric-metric text-3xl text-primary font-bold my-1">
                96% <span className="text-sm font-normal text-on-surface-variant">Optimal</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">ecg_heart</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>1,192 Healthy • 48 Care</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold text-[10px]">
              48 Under Watch
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-md text-xs text-outline uppercase font-semibold">
                Projected Harvest Yield
              </span>
              <div className="font-numeric-metric text-3xl text-secondary font-bold my-1">
                ~1,180 <span className="text-sm font-normal text-on-surface-variant">Crates</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
          <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant">
            <span>~14,160 kg export target</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px]">
              Fruit Enlargement
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Tree Registry & Geo-Telemetry Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
        {/* Left Column: Plot Tabs, Search, and Registry Table (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-space-md">
          {/* Plot Selector Tabs & Search Filter */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-space-sm">
            <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-container-high pb-space-sm">
              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActivePlot("all")}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                    activePlot === "all"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  All Plots (1,240 Trees)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlot("plot_a")}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                    activePlot === "plot_a"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  Plot A: Pawas South (6.2 Ac)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlot("plot_b")}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                    activePlot === "plot_b"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  Plot B: Hillside Plateau (5.1 Ac)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlot("plot_c")}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                    activePlot === "plot_c"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  Plot C: Well Valley (3.2 Ac)
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search Tag, Row, Variety..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low border border-outline-variant/40 rounded-xl text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Tree Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                    <th className="p-3 rounded-l-xl">Tree Tag ID</th>
                    <th className="p-3">Variety (जात)</th>
                    <th className="p-3">Plot & Row</th>
                    <th className="p-3">Age / Planting</th>
                    <th className="p-3">Phenology Stage</th>
                    <th className="p-3">Moisture</th>
                    <th className="p-3">Health</th>
                    <th className="p-3 rounded-r-xl text-center">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high text-xs text-on-surface">
                  {filteredTrees.map((tree) => {
                    const isSelected = selectedTree.id === tree.id;
                    return (
                      <tr
                        key={tree.id}
                        onClick={() => setSelectedTree(tree)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-primary-fixed/20 font-semibold"
                            : "hover:bg-surface-container-low"
                        }`}
                      >
                        <td className="p-3 font-mono font-bold text-primary flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            qr_code_2
                          </span>
                          {tree.id}
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-on-surface">{tree.variety}</div>
                          <div className="text-[11px] text-outline">{tree.varietyLocal}</div>
                        </td>
                        <td className="p-3">
                          <div>{tree.plot.split(":")[0]}</div>
                          <div className="text-[11px] text-outline">{tree.row}</div>
                        </td>
                        <td className="p-3 font-semibold">
                          {tree.age} yrs ({tree.plantingYear})
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-[11px] font-semibold">
                            {tree.stage}
                          </span>
                        </td>
                        <td className="p-3 font-mono">{tree.moisture}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              tree.health === "optimal"
                                ? "bg-primary-fixed text-primary"
                                : "bg-error-container text-on-error-container"
                            }`}
                          >
                            {tree.health === "optimal" ? "Optimal ✓" : "Watch ⚠️"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTree(tree);
                            }}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-primary text-on-primary shadow-sm"
                                : "bg-surface-container text-outline hover:text-primary"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Geo-Tagged Tree Telemetry Inspector Panel (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-md">
          {/* Selected Tree Inspector Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-md border-2 border-primary/30 flex flex-col gap-space-md relative overflow-hidden">
            <div className="flex items-start justify-between pb-space-xs border-b border-surface-container-high">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                  Geo-Tagged Tree Telemetry
                </span>
                <span className="font-headline-md text-xl text-primary font-bold">
                  {selectedTree.id}
                </span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {selectedTree.variety}
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  selectedTree.health === "optimal"
                    ? "bg-primary-fixed text-primary"
                    : "bg-error-container text-on-error-container"
                }`}
              >
                {selectedTree.health === "optimal" ? "Healthy (निरोगी)" : "Care Needed"}
              </span>
            </div>

            {/* Tree Photo / Macro Preview */}
            <div className="relative h-44 w-full rounded-xl overflow-hidden shadow-inner border border-outline-variant/20">
              <img
                alt="Selected Mango Tree"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WT-nySD0pwav1OXm0mM-Q9ozHRSFHWn-wwBDj4FMX6R03ZskuQRM65GKY3MNhwL7gaXTmtdZW-7biya35NHYVmwTbpPIi0e4MQTxN0z51FOVCzqKuw0_olFIpFZsDadX7U4oEEycfSAAPdp_yS7xztHrCedlklDSJoDG2YLTnDWYOeoe6j6QgY75ZHM9qBARw9JILgES-qeixBnngLF7MTHuKLQKO0jP7PJGfYyI2e6cVOcrs8tEvR6KA"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-white font-mono text-[10px]">
                GPS: {selectedTree.gps}
              </div>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                <span className="text-[11px] text-outline font-semibold">Fruit Count Estimate</span>
                <span className="font-numeric-metric text-xl text-primary font-bold mt-0.5">
                  ~{selectedTree.fruitEstimate} <span className="text-xs font-normal">mangoes</span>
                </span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                <span className="text-[11px] text-outline font-semibold">Canopy Diameter</span>
                <span className="font-numeric-metric text-xl text-primary font-bold mt-0.5">
                  {selectedTree.canopy}
                </span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                <span className="text-[11px] text-outline font-semibold">Soil Rootzone Moisture</span>
                <span className="font-numeric-metric text-xl text-secondary font-bold mt-0.5">
                  {selectedTree.moisture}
                </span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                <span className="text-[11px] text-outline font-semibold">Ground Sensor Temp</span>
                <span className="font-numeric-metric text-xl text-on-surface font-bold mt-0.5">
                  {selectedTree.temp}
                </span>
              </div>
            </div>

            {/* Recent Care History */}
            <div className="p-3 rounded-xl bg-surface-container text-xs text-on-surface flex flex-col gap-1">
              <span className="font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">history</span>
                Recent SOP Care:
              </span>
              <p className="text-on-surface-variant">{selectedTree.lastCare}</p>
            </div>

            {/* Actions for this tree */}
            <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-high">
              <button
                type="button"
                onClick={openCareNote}
                className="w-full min-h-[44px] rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Log Tree Inspection Note</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Starting 45-minute micro-drip fertigation pulse for ${selectedTree.id}`)}
                className="w-full min-h-[40px] rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-label-md text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
                <span>Order Fertigation Pulse Run</span>
              </button>
            </div>
          </div>

          {/* Government Land Verification & GI Card */}
          <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
              <span className="font-title-md text-xs">Govt. Land 7/12 & GI Certification</span>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Ratnagiri Hapus GI Tag Registration #GI-MH-RTN-2021 verified with Maharashtra State Horticulture Dept.
            </p>
            <div className="pt-2 text-[11px] text-outline border-t border-surface-container-high flex justify-between">
              <span>Cadastral Survey Gat: 142/2</span>
              <span className="font-bold text-primary">Status: Legally Cleared</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR/RFID Tagging Modal */}
      {tagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-6 max-w-md w-full flex flex-col gap-4 border border-outline-variant/40">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <h3 className="font-headline-md text-lg font-bold text-primary">
                Tag New Tree Batch (QR / RFID)
              </h3>
              <button
                onClick={() => setTagModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Scan weather-resistant metal barcode tags using mobile camera or enter batch sequence for Plot A.
            </p>
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col items-center justify-center gap-2 border-2 border-dashed border-primary/30">
              <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
                qr_code_scanner
              </span>
              <span className="text-xs font-bold text-primary">Point scanner at tree collar tag</span>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-surface-container-high">
              <button
                onClick={() => setTagModal(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Tagged 20 new trees in Plot A!");
                  setTagModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm"
              >
                Confirm Batch (20 Trees)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
