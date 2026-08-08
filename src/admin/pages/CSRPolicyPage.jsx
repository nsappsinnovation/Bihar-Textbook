import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Save, Plus, Trash2, RotateCcw, Download, ExternalLink, FileDown,
  FileText, Users, Layers, IndianRupee, Settings2,
  Target, LineChart, Info, BookMarked, ScrollText
} from 'lucide-react';
import {
  csrPolicyDefaults, csrPolicyContents, romanize, loadCsrPolicy, CSR_STORAGE_KEY
} from '../../data/csrPolicyData';

const sectionIcons = {
  1: FileText, 2: ScrollText, 3: Users, 4: Layers, 5: IndianRupee,
  6: Settings2, 7: Target, 8: LineChart, 9: Info, 10: BookMarked
};

/* ---------- Layout primitives ---------- */

const Section = ({ no, title, hint, children }) => {
  const Icon = sectionIcons[no] || FileText;
  return (
    <div id={`csr-admin-${no}`} className="space-y-4 scroll-mt-28">
      <div className="flex items-center gap-3 px-2">
        <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
          {no}
        </span>
        <div>
          <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
            <Icon className="w-4 h-4 text-blue-600" />
            {title}
          </h3>
          {hint && <p className="text-[11px] text-gray-400 font-medium mt-0.5">{hint}</p>}
        </div>
      </div>
      <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm space-y-5">
        {children}
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div className="space-y-2">
    {label && (
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 block">
        {label}
      </label>
    )}
    {children}
  </div>
);

const textareaClass =
  'w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-700 leading-relaxed outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all resize-y';

const inputClass =
  'w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all';

/* Repeatable list of paragraph entries with add / remove */
const ListEditor = ({ items, marker, onChange, onAdd, onRemove, addLabel, rows = 3 }) => (
  <div className="space-y-3">
    {items.map((value, idx) => (
      <div key={idx} className="flex gap-3 items-start">
        <span className="shrink-0 min-w-[38px] h-9 px-2 rounded-xl bg-gray-100 border border-gray-200 text-[11px] font-black text-gray-500 flex items-center justify-center mt-1">
          {marker === 'roman' ? `(${romanize(idx)})` : idx + 1}
        </span>
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(idx, e.target.value)}
          className={textareaClass}
        />
        <button
          onClick={() => onRemove(idx)}
          title="Remove entry"
          className="shrink-0 p-2.5 mt-1 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}
    <button
      onClick={onAdd}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-300 text-[12px] font-bold text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
    >
      <Plus className="w-4 h-4" />
      {addLabel}
    </button>
  </div>
);

export default function CSRPolicyPage({ addToast }) {
  const [formData, setFormData] = useState(loadCsrPolicy);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(loadCsrPolicy()));

  const isDirty = JSON.stringify(formData) !== savedSnapshot;

  const handleSave = () => {
    localStorage.setItem(CSR_STORAGE_KEY, JSON.stringify(formData));
    setSavedSnapshot(JSON.stringify(formData));
    addToast?.('CSR Policy Updated Successfully', 'success');
    window.dispatchEvent(new Event('websiteDataUpdated'));
  };

  const handleReset = () => {
    setFormData(csrPolicyDefaults);
    addToast?.('Reverted to the original policy document text', 'info');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Generic helpers for the string-array sections */
  const updateItem = (listName, idx, value) =>
    setFormData((prev) => ({
      ...prev,
      [listName]: prev[listName].map((item, i) => (i === idx ? value : item))
    }));

  const addItem = (listName, blank = '') =>
    setFormData((prev) => ({ ...prev, [listName]: [...prev[listName], blank] }));

  const removeItem = (listName, idx) =>
    setFormData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== idx)
    }));

  /* Miscellaneous entries are { label, text } pairs */
  const updateMisc = (idx, key, value) =>
    setFormData((prev) => ({
      ...prev,
      miscellaneousItems: prev.miscellaneousItems.map((item, i) =>
        i === idx ? { ...item, [key]: value } : item
      )
    }));

  const listProps = (listName, { marker = 'roman', addLabel, rows } = {}) => ({
    items: formData[listName],
    marker,
    rows,
    addLabel,
    onChange: (idx, value) => updateItem(listName, idx, value),
    onAdd: () => addItem(listName),
    onRemove: (idx) => removeItem(listName, idx)
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20 scrollbar-hide"
    >
      {/* Header Sticky Bar */}
      <div className="sticky top-0 z-20 bg-[#F8FAFC]/95 backdrop-blur-md pt-4 pb-3 border-b border-gray-100 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              CSR Policy Hub
              {isDirty && (
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Unsaved
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Edit the ten sections of the official Corporate Social Responsibility Policy
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/csr-policy"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Live</span>
            </a>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isDirty
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{isDirty ? 'Save Changes' : 'Saved'}</span>
            </button>
          </div>
        </div>

        {/* Quick jump to a section */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {csrPolicyContents.map(({ no, topic }) => (
            <button
              key={no}
              onClick={() =>
                document.getElementById(`csr-admin-${no}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-[11px] font-bold text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              <span className="text-gray-300 font-black">{String(no).padStart(2, '0')}</span>
              <span className="whitespace-nowrap max-w-[180px] truncate">{topic}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Document header */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Document Title">
            <input name="documentTitle" value={formData.documentTitle} onChange={handleChange} className={inputClass} />
          </Field>
          <Field label="Organisation">
            <input name="organisation" value={formData.organisation} onChange={handleChange} className={inputClass} />
          </Field>
        </div>

        {/* Downloadable PDF */}
        <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-44 h-44 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <FileDown className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-[15px] font-black text-white">Downloadable Policy PDF</h3>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">
                    Shown as the primary download button across the public page
                  </p>
                </div>
              </div>
              <a
                href={formData.pdfUrl}
                download={formData.pdfFileName}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[12px] font-black hover:bg-white/20 transition-colors shrink-0"
              >
                <Download className="w-4 h-4" />
                Test Download
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3 space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 block">
                  File Path or URL
                </label>
                <input
                  name="pdfUrl"
                  value={formData.pdfUrl}
                  onChange={handleChange}
                  placeholder="/csr-policy.pdf"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white placeholder-slate-500 outline-none focus:border-blue-400 focus:bg-white/10 transition-all"
                />
                <p className="text-[11px] text-slate-500 font-medium ml-1">
                  Place the file in the site's <span className="text-slate-300 font-bold">public/</span> folder, or paste a full https:// link.
                </p>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 block">
                  Saved As (File Name)
                </label>
                <input
                  name="pdfFileName"
                  value={formData.pdfFileName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white placeholder-slate-500 outline-none focus:border-blue-400 focus:bg-white/10 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 block">
                  Size Label
                </label>
                <input
                  name="pdfSizeLabel"
                  value={formData.pdfSizeLabel}
                  onChange={handleChange}
                  placeholder="5.1 MB"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white placeholder-slate-500 outline-none focus:border-blue-400 focus:bg-white/10 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 1. Introduction & Background */}
        <Section no={1} title="Introduction & Background" hint="Opening paragraphs of the policy">
          <ListEditor
            {...listProps('introParagraphs', {
              marker: 'number',
              addLabel: 'Add paragraph',
              rows: 5
            })}
          />
        </Section>

        {/* 2. CSR Vision & Policy Statement */}
        <Section
          no={2}
          title="CSR Vision & Policy Statement"
          hint="Objectives of this CSR Policy"
        >
          <Field label="Introductory Line">
            <textarea name="objectivesIntro" value={formData.objectivesIntro} onChange={handleChange} rows={3} className={textareaClass} />
          </Field>
          <Field label="Objectives (bulleted on the website)">
            <ListEditor {...listProps('objectives', { marker: 'number', addLabel: 'Add objective', rows: 4 })} />
          </Field>
        </Section>

        {/* 3. CSR Committee */}
        <Section no={3} title="CSR Committee Composition and Responsibility">
          <textarea name="committeeText" value={formData.committeeText} onChange={handleChange} rows={4} className={textareaClass} />
        </Section>

        {/* 4. Scope & Applicability */}
        <Section no={4} title="Scope & Applicability">
          <textarea name="scopeText" value={formData.scopeText} onChange={handleChange} rows={2} className={textareaClass} />
        </Section>

        {/* 5. CSR Budget */}
        <Section no={5} title="CSR Budget" hint="Numbered (i), (ii), … on the website">
          <ListEditor {...listProps('budgetItems', { addLabel: 'Add clause', rows: 4 })} />
        </Section>

        {/* 6. Implementation */}
        <Section no={6} title="Implementation" hint="Numbered (i), (ii), … on the website">
          <ListEditor {...listProps('implementationItems', { addLabel: 'Add clause', rows: 4 })} />
        </Section>

        {/* 7. Activities / Focus Areas */}
        <Section no={7} title="Activities / Focus Areas" hint="Key thrust areas">
          <Field label="Introductory Line">
            <textarea name="activitiesIntro" value={formData.activitiesIntro} onChange={handleChange} rows={2} className={textareaClass} />
          </Field>
          <Field label="Focus Areas">
            <ListEditor {...listProps('activities', { addLabel: 'Add focus area', rows: 4 })} />
          </Field>
        </Section>

        {/* 8. Monitoring */}
        <Section no={8} title="Monitoring" hint="Monitoring process clauses">
          <ListEditor {...listProps('monitoringItems', { addLabel: 'Add clause', rows: 4 })} />
        </Section>

        {/* 9. Miscellaneous */}
        <Section no={9} title="Miscellaneous Information" hint="Each entry has a bold label and body text">
          <div className="space-y-3">
            {formData.miscellaneousItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="shrink-0 min-w-[38px] h-9 px-2 rounded-xl bg-gray-100 border border-gray-200 text-[11px] font-black text-gray-500 flex items-center justify-center mt-1">
                  ({romanize(idx)})
                </span>
                <div className="flex-1 space-y-2">
                  <input
                    value={item.label}
                    onChange={(e) => updateMisc(idx, 'label', e.target.value)}
                    placeholder="Label e.g. Dissemination"
                    className={inputClass}
                  />
                  <textarea
                    rows={4}
                    value={item.text}
                    onChange={(e) => updateMisc(idx, 'text', e.target.value)}
                    className={textareaClass}
                  />
                </div>
                <button
                  onClick={() => removeItem('miscellaneousItems', idx)}
                  title="Remove entry"
                  className="shrink-0 p-2.5 mt-1 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem('miscellaneousItems', { label: '', text: '' })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-300 text-[12px] font-bold text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add entry
            </button>
          </div>
        </Section>

        {/* 10. Annexure */}
        <Section no={10} title="Annexure" hint="Listed in the document's table of contents">
          <input name="annexureTitle" value={formData.annexureTitle} onChange={handleChange} className={inputClass} />
        </Section>

      </div>
    </motion.div>
  );
}