const STATUSES = ["Applied", "Interview", "Selected", "Rejected"];

const STATUS_STYLE = {
  Applied:   { bar: "bg-blue-200 dark:bg-blue-600",   dot: "bg-blue-200 border-blue-300 dark:bg-blue-600 dark:border-blue-500"   },
  Interview: { bar: "bg-amber-200 dark:bg-amber-600",  dot: "bg-amber-200 border-amber-300 dark:bg-amber-600 dark:border-amber-500"  },
  Selected:  { bar: "bg-green-200 dark:bg-green-600", dot: "bg-green-200 border-green-300 dark:bg-green-600 dark:border-green-500"  },
  Rejected:  { bar: "bg-red-200 dark:bg-red-600",    dot: "bg-red-200 border-red-300 dark:bg-red-600 dark:border-red-500"      },
};

export default function PipelineBar({ jobs, stats }) {
  const total = jobs.length || 1;
  const counts = {
    Applied:   stats.applied,
    Interview: stats.interview,
    Selected:  stats.selected,
    Rejected:  stats.rejected,
  };

  return (
    <div className="card px-5 py-4 mb-5">
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2.5">Pipeline overview</p>
      <div className="flex h-2.5 rounded-full overflow-hidden mb-3">
        {STATUSES.map((s) => {
          const w = Math.round((counts[s] / total) * 100);
          if (!w) return null;
          return (
            <div
              key={s}
              style={{ width: `${w}%` }}
              className={`${STATUS_STYLE[s].bar} border-r-2 border-gray-50 dark:border-gray-700 last:border-0 last:dark:border-0`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        {STATUSES.map((s) => (
          <div key={s} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <div className={`w-2.5 h-2.5 rounded-sm border ${STATUS_STYLE[s].dot}`}></div>
            {s} · {counts[s]}
          </div>
        ))}
      </div>
    </div>
  );
}