"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 w-full max-w-xl max-h-[90vh] overflow-y-auto p-space-lg flex flex-col gap-space-md"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between border-b border-surface-container-high pb-space-sm">
          <div className="flex flex-col">
            <h3 className="font-headline-md text-headline-md text-primary leading-tight">{title}</h3>
            {subtitle && <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="py-space-xs">{children}</div>
      </div>
    </div>
  );
}

// 1. WhatsApp Report Modal
export function WhatsAppModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const reportText = `🥭 *स्मार्ट आंबा बाग दैनिक अहवाल (Smart Mango Farm Daily Report)*
📍 *रत्नागिरी हापूस बाग (Ratnagiri Hapus Estate - 14.5 Acres)*
📅 तारीख: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}

🌳 *बागेची स्थिती (Orchard Status):*
• एकूण झाडे: 1,240 (हापूस 1,110 | केशर 130)
• चालू टप्पा: गोटी ते अंड्याचा आकार (Fruit Enlargement - 96% निरोगी)
• तापमान व आर्द्रता: 31°C, 78% RH (हवामान पोषक)

💰 *मोसम आर्थिक आढावा (Financial Snapshot):*
• चालू जमा उत्पन्न: ₹18,45,000 (14,200 kg विक्री)
• एकूण खर्च: ₹5,12,400 (मजुरी 48%, खते 26%, फवारणी 16%)
• निव्वळ नफा (Net Profit): +₹13,32,600 (मार्जिन 72.3%)

🚜 *आजचे काम (Today's Operations):*
• ब्लॉक B: पोटॅशियम फवारणी (SOP 0:0:50) चालू
• शेतावर हजर मजूर: 18 (12 झेला तोडणी, 6 पॅकिंग)

🔗 तपशीलवार डॅशबोर्ड पहा: https://mangofarm.agrigrove.in/dashboard`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(reportText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={language === "mr" ? "दैनिक व्हॉट्सॲप अहवाल पाठवा" : "Daily WhatsApp Orchard Report"}
      subtitle={language === "mr" ? "बागेचा अचूक अहवाल थेट शेतकरी गट किंवा मुकादमांना पाठवा" : "Share verified GI orchard status with cooperatives, buyers or farm supervisors"}
    >
      <div className="flex flex-col gap-space-md">
        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
          {reportText}
        </div>
        <div className="flex items-center gap-space-sm pt-space-xs">
          <button
            onClick={copyToClipboard}
            className="flex-1 min-h-[48px] rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">{copied ? "done" : "content_copy"}</span>
            <span>{copied ? (language === "mr" ? "कॉपी झाले! ✓" : "Copied! ✓") : (language === "mr" ? "अहवाल कॉपी करा" : "Copy Report Text")}</span>
          </button>
          <button
            onClick={openWhatsApp}
            className="flex-1 min-h-[48px] rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-md transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>{language === "mr" ? "थेट व्हॉट्सॲप उघडा" : "Open WhatsApp"}</span>
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

// 2. Record Expense Modal
export function RecordExpenseModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const [category, setCategory] = useState("labour");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [plot, setPlot] = useState("Plot A (Pawas South)");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={language === "mr" ? "नवीन खर्च नोंदवा" : "Record Orchard Expense"}
      subtitle={language === "mr" ? "मजुरी, खते, कीटकनाशके किंवा वाहतूक खर्च नोंदवा" : "Log labor wages, chemicals, machinery diesel or packing material"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        {saved ? (
          <div className="p-space-lg rounded-xl bg-primary-fixed/30 text-primary flex flex-col items-center justify-center gap-2 text-center py-8">
            <span className="material-symbols-outlined text-4xl text-primary">verified</span>
            <span className="font-title-lg text-title-lg font-bold">
              {language === "mr" ? "खर्च यशस्वीरीत्या नोंदवला गेला!" : "Expense Recorded Successfully!"}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant">
              {language === "mr" ? "डॅशबोर्डवरील ताळेबंद अद्ययावत झाला आहे." : "Orchard season financial ledger updated."}
            </span>
          </div>
        ) : (
          <>
            <div>
              <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                {language === "mr" ? "खर्चाचा प्रकार / वर्ग" : "Expense Category"}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="labour">{language === "mr" ? "मजुरी व तोडणी कामगार (Labour & Harvest Squads)" : "Labour & Harvest Squads (मजुरी)"}</option>
                <option value="fertilizer">{language === "mr" ? "खते व सूक्ष्म पोषक घटक (Fertilizer & Micronutrients)" : "Fertilizer & Micronutrients (खते)"}</option>
                <option value="machinery">{language === "mr" ? "ट्रॅक्टर व फवारणी यंत्र भाडे (Machinery & Fuel)" : "Machinery Rental & Fuel (यंत्र भाडे)"}</option>
                <option value="packaging">{language === "mr" ? "लाकडी पेट्या व पॅकिंग (Crates & Packaging)" : "Wooden Crates & Packaging (पेट्या)"}</option>
                <option value="irrigation">{language === "mr" ? "ठिबक सिंचन व पंप दुरुस्ती (Drip & Irrigation)" : "Drip & Irrigation Maintenance"}</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "रक्कम (₹)" : "Amount (₹)"}
                </label>
                <input
                  type="number"
                  required
                  placeholder="उदा. 4500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-bold text-lg"
                />
              </div>
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "शेत / विभाग (Plot)" : "Orchard Block / Plot"}
                </label>
                <select
                  value={plot}
                  onChange={(e) => setPlot(e.target.value)}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Plot A (Pawas South)">Plot A: Pawas South (6.2 Ac)</option>
                  <option value="Plot B (Hillside Plateau)">Plot B: Hillside Plateau (5.1 Ac)</option>
                  <option value="Plot C (Well Valley)">Plot C: Well Valley (3.2 Ac)</option>
                  <option value="Entire Estate">Entire Ratnagiri Estate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                {language === "mr" ? "तपशील / पावती टिप्पणी" : "Description / Receipt Memo"}
              </label>
              <input
                type="text"
                placeholder={language === "mr" ? "उदा. संतोष मुकादम पथक 10 मजूर रोज" : "e.g., 5 bags SOP 0:0:50 foliar potash drench"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container-high">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[48px] px-space-lg rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg"
              >
                {language === "mr" ? "रद्द करा" : "Cancel"}
              </button>
              <button
                type="submit"
                className="min-h-[48px] px-space-xl rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all active:scale-95"
              >
                {language === "mr" ? "खर्च सेव्ह करा" : "Save Expense"}
              </button>
            </div>
          </>
        )}
      </form>
    </BaseModal>
  );
}

// 3. Record Harvest Modal
export function RecordHarvestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const [variety, setVariety] = useState("Ratnagiri Hapus");
  const [crates, setCrates] = useState("");
  const [rate, setRate] = useState("145");
  const [buyer, setBuyer] = useState("Vashi APMC Mandi");
  const [saved, setSaved] = useState(false);

  const totalCalculated = (Number(crates) || 0) * 12 * (Number(rate) || 0); // 12 kg per crate approx

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={language === "mr" ? "तोडणी व विक्री नोंदवा" : "Record Mango Harvest / Sale"}
      subtitle={language === "mr" ? "तोडलेल्या पेट्या, किलो, भाव व व्यापारी पावती नोंदवा" : "Log crates harvested, mandi market price & export consignment"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        {saved ? (
          <div className="p-space-lg rounded-xl bg-secondary-fixed/50 text-secondary flex flex-col items-center justify-center gap-2 text-center py-8">
            <span className="material-symbols-outlined text-4xl text-secondary">verified</span>
            <span className="font-title-lg text-title-lg font-bold">
              {language === "mr" ? "विक्री यशस्वीरीत्या नोंदवली गेली!" : "Sale Logged Successfully!"}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant">
              {language === "mr" ? "बागेच्या जमा खात्यात भर पडली आहे." : "Gross revenue updated in season ledger."}
            </span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "आंब्याची जात (Variety)" : "Mango Variety"}
                </label>
                <select
                  value={variety}
                  onChange={(e) => {
                    setVariety(e.target.value);
                    if (e.target.value === "Kesar") setRate("110");
                    else setRate("145");
                  }}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Ratnagiri Hapus">Ratnagiri Alphonso (हापूस - GI Tagged)</option>
                  <option value="Kesar">Kesar Mango (केशर)</option>
                  <option value="Payari">Payari (पायरी)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "एकूण पेट्या (Crates)" : "Crates Picked"}
                </label>
                <input
                  type="number"
                  required
                  placeholder="उदा. 45"
                  value={crates}
                  onChange={(e) => setCrates(e.target.value)}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-bold text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "दर प्रति किलो (₹ / kg)" : "Market Rate (₹ / kg)"}
                </label>
                <input
                  type="number"
                  required
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                />
              </div>
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "बाजार / खरेदीदार (Buyer)" : "Buyer / Mandi Market"}
                </label>
                <select
                  value={buyer}
                  onChange={(e) => setBuyer(e.target.value)}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Vashi APMC Mandi">Vashi APMC Mandi (Navi Mumbai)</option>
                  <option value="Gulf Export Consignment">Gulf Air-Cargo Export (Dubai APEDA)</option>
                  <option value="Crawford Market Mumbai">Crawford Market (Mumbai Direct)</option>
                  <option value="Pune Gultekdi Market">Pune Gultekdi Market</option>
                  <option value="Local Gate Direct Sale">Farm Gate Direct Sale</option>
                </select>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-secondary-fixed/30 border border-secondary/20 flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-secondary-fixed-variant uppercase font-semibold">
                  {language === "mr" ? "अंदाजित एकूण विक्री रक्कम" : "Estimated Gross Sale Value"}
                </span>
                <p className="font-label-md text-label-md text-outline">
                  ~{(Number(crates) || 0) * 12} kg mangoes @ ₹{rate}/kg
                </p>
              </div>
              <div className="font-headline-md text-headline-md text-secondary font-bold">
                ₹{totalCalculated.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container-high">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[48px] px-space-lg rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg"
              >
                {language === "mr" ? "रद्द करा" : "Cancel"}
              </button>
              <button
                type="submit"
                className="min-h-[48px] px-space-xl rounded-xl bg-secondary hover:brightness-110 text-on-secondary font-label-lg text-label-lg font-bold shadow-md transition-all active:scale-95"
              >
                {language === "mr" ? "विक्री नोंद सेव्ह करा" : "Record Sale"}
              </button>
            </div>
          </>
        )}
      </form>
    </BaseModal>
  );
}

// 4. Add Care Note Modal
export function AddCareNoteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const [noteType, setNoteType] = useState("spray");
  const [plot, setPlot] = useState("Plot A");
  const [details, setDetails] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={language === "mr" ? "झाडांची काळजी व तपासणी नोंद" : "Add Tree Care & Field Note"}
      subtitle={language === "mr" ? "फवारणी, पाणी डोस किंवा किडींचा प्रादुर्भाव नोंदवा" : "Log pest alerts, drip schedules or phenological milestones"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
        {saved ? (
          <div className="p-space-lg rounded-xl bg-primary-fixed/30 text-primary flex flex-col items-center justify-center gap-2 text-center py-8">
            <span className="material-symbols-outlined text-4xl text-primary">verified</span>
            <span className="font-title-lg text-title-lg font-bold">
              {language === "mr" ? "काळजी नोंद सेव्ह झाली!" : "Field Note Logged!"}
            </span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "नोंदीचा प्रकार" : "Care Note Type"}
                </label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="spray">Foliar Chemical Spray (फवारणी)</option>
                  <option value="irrigation">Micro-Drip Fertigation (ठिबक खत)</option>
                  <option value="pest">Pest / Disease Sighting (कीड / करपा रोग)</option>
                  <option value="traps">Fruit Fly Pheromone Traps (कामगंध सापळे)</option>
                  <option value="pruning">Canopy Pruning (छाटणी)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                  {language === "mr" ? "शेत विभाग" : "Plot / Tree Block"}
                </label>
                <select
                  value={plot}
                  onChange={(e) => setPlot(e.target.value)}
                  className="w-full min-h-[48px] px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Plot A">Plot A: Pawas South (680 Trees)</option>
                  <option value="Plot B">Plot B: Hillside Plateau (350 Trees)</option>
                  <option value="Plot C">Plot C: Well Valley (210 Trees)</option>
                  <option value="Individual">Individual Geo-Tagged Tree</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-label-lg text-label-lg text-on-surface mb-1">
                {language === "mr" ? "निरीक्षण / सूचना तपशील" : "Agronomic Observation & Action"}
              </label>
              <textarea
                rows={3}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={language === "mr" ? "उदा. झाड क्र. RTN-0422 वर फळगळ रोखण्यासाठी बोरॉन 20% फवारले." : "e.g., Applied Boron 20% drench; hopper nymph count under control."}
                className="w-full p-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container-high">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[48px] px-space-lg rounded-xl bg-surface-container text-on-surface-variant font-label-lg text-label-lg"
              >
                {language === "mr" ? "रद्द करा" : "Cancel"}
              </button>
              <button
                type="submit"
                className="min-h-[48px] px-space-xl rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all active:scale-95"
              >
                {language === "mr" ? "नोंद जोडा" : "Save Note"}
              </button>
            </div>
          </>
        )}
      </form>
    </BaseModal>
  );
}
