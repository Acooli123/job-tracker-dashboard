const STAT_DEFS = [
  { key: "total",       label: "Total",        icon: "ti-list",           bg: "bg-brand-50 dark:bg-brand-900/40",  text: "text-brand-600 dark:text-brand-400"  },
  { key: "applied",     label: "Applied",      icon: "ti-send",           bg: "bg-brand-50 dark:bg-brand-900/40",  text: "text-brand-600 dark:text-brand-400"  },
  { key: "interview",   label: "Interview",    icon: "ti-calendar-event", bg: "bg-amber-50 dark:bg-amber-900/40",  text: "text-amber-700 dark:text-amber-400"  },
  { key: "selected",    label: "Selected",     icon: "ti-circle-check",   bg: "bg-green-50 dark:bg-green-900/40",  text: "text-green-700 dark:text-green-400"  },
  { key: "rejected",    label: "Rejected",     icon: "ti-circle-x",       bg: "bg-red-50 dark:bg-red-900/40",    text: "text-red-700 dark:text-red-400"    },
  { key: "successRate", label: "Success rate", icon: "ti-chart-pie",      bg: "bg-purple-50 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-400" },
];

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-5">
      {STAT_DEFS.map(({ key, label, icon, bg, text }) => (
        <div key={key} className="card p-3.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${bg}`}>
            <i className={`ti ${icon} ${text} text-base`}></i>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {key === "successRate" ? `${stats[key]}%` : stats[key]}
          </p>
        </div>
      ))}
    </div>
  );
}