import { useState } from "react";

const today = new Date().toISOString().slice(0, 10);

const INITIAL = {
  company: "", role: "", location: "",
  date: today, link: "", status: "Applied", notes: "",
};

export default function AddJobModal({ onClose, onAdd }) {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");

  function set(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.");
      return;
    }
    onAdd({ ...form });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Add application</h2>
          <button onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border-0 bg-transparent cursor-pointer">
            <i className="ti ti-x text-base"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="px-5 py-4">
          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Company *</label>
              <input className="input-field" placeholder="e.g. Stripe"
                value={form.company} onChange={(e) => set("company", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Role *</label>
              <input className="input-field" placeholder="e.g. Frontend Engineer"
                value={form.role} onChange={(e) => set("role", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Location</label>
              <input className="input-field" placeholder="e.g. Remote"
                value={form.location} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Date applied</label>
              <input className="input-field" type="date"
                value={form.date} onChange={(e) => set("date", e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Job link</label>
            <input className="input-field" placeholder="https://..."
              value={form.link} onChange={(e) => set("link", e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
            <select className="input-field" value={form.status}
              onChange={(e) => set("status", e.target.value)}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Notes</label>
            <textarea className="input-field" rows={3} style={{ resize: "vertical" }}
              placeholder="Any details you want to remember..."
              value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </div>
          <div className="flex gap-2.5 justify-end">
            <button type="button" onClick={onClose} className="btn">Cancel</button>
            <button type="submit" className="btn btn-primary">Add job</button>
          </div>
        </form>
      </div>
    </div>
  );
}