import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useJobs } from "../context/JobContext";
import StatsGrid from "../components/StatsGrid";
import PipelineBar from "../components/PipelineBar";
import JobCard from "../components/JobCard";
import AddJobModal from "../components/AddJobModal";

const STATUS_OPTIONS = ["All", "Applied", "Interview", "Selected", "Rejected"];

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { jobs, stats, addJob, updateStatus, deleteJob } = useJobs();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  function handleLogout() {
    logout();
    navigate("/auth");
  }

  const filtered = useMemo(() => {
    let list = [...jobs];
    if (filterStatus !== "All") list = list.filter((j) => j.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.company.toLowerCase().includes(q) ||
          j.role.toLowerCase().includes(q) ||
          (j.location || "").toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [jobs, search, filterStatus]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 h-14 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5 font-semibold text-base text-gray-900 dark:text-gray-100">
          <div
            className="flex items-center justify-center rounded-lg bg-brand-600 text-white"
            style={{ width: 30, height: 30 }}
          >
            <i className="ti ti-briefcase text-sm"></i>
          </div>
          Job Tracker
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div
              className="flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 text-xs font-semibold"
              style={{ width: 28, height: 28 }}
            >
              {currentUser[0].toUpperCase()}
            </div>
            <span className="hidden sm:block dark:text-gray-200">{currentUser}</span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border-0 bg-transparent cursor-pointer"
            title={theme === "light" ? "Dark mode" : "Light mode"}
          >
            <i className={`ti ${theme === "light" ? "ti-sun" : "ti-moon"} text-sm`}></i>
          </button>
          <button onClick={handleLogout} className="btn text-xs px-3 py-1.5 gap-1">
            <i className="ti ti-logout text-xs"></i>
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5">
        <StatsGrid stats={stats} />
        {jobs.length > 0 && <PipelineBar jobs={jobs} stats={stats} />}

        <div className="flex gap-2.5 mb-3 flex-wrap">
          <div className="relative flex-1 min-w-44">
            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm pointer-events-none"></i>
            <input
              className="input-field pl-8"
              type="text"
              placeholder="Search company, role, or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input-field"
            style={{ width: "auto", minWidth: 140 }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All statuses" : s}
              </option>
            ))}
          </select>
          <button onClick={() => setShowModal(true)} className="btn btn-primary gap-1.5 whitespace-nowrap">
            <i className="ti ti-plus text-sm"></i>
            Add job
          </button>
        </div>

        {jobs.length > 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            {filtered.length} {filtered.length === 1 ? "application" : "applications"}
            {filterStatus !== "All" || search ? " matching filters" : " total"}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="card p-14 text-center">
            <i className="ti ti-inbox text-4xl text-gray-300 dark:text-gray-600 block mb-3"></i>
            <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1.5">
              {jobs.length === 0 ? "No applications yet" : "No results found"}
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
              {jobs.length === 0
                ? "Add your first job application to get started."
                : "Try adjusting your search or filters."}
            </p>
            {jobs.length === 0 && (
              <button onClick={() => setShowModal(true)} className="btn btn-primary px-6">
                Add your first job
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onStatusChange={updateStatus}
                onDelete={deleteJob}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && <AddJobModal onClose={() => setShowModal(false)} onAdd={addJob} />}
    </div>
  );
}