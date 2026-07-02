import { useState } from "react";
import StatusBadge from "./StatusBadge";

const ALL_STATUSES = ["Applied", "Interview", "Selected", "Rejected"];

const MOVE_TO_STYLE = {
  Applied:   "bg-blue-50   text-blue-700   border-blue-200   hover:bg-blue-100",
  Interview: "bg-amber-50  text-amber-700  border-amber-200  hover:bg-amber-100",
  Selected:  "bg-green-50  text-green-700  border-green-200  hover:bg-green-100",
  Rejected:  "bg-red-50    text-red-700    border-red-200    hover:bg-red-100",
};

export default function JobCard({ job, onStatusChange, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card px-4 py-3.5">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-gray-900 truncate">{job.role}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {job.company}{job.location ? ` · ${job.location}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <StatusBadge status={job.status} />
          <span className="text-xs text-gray-400 hidden sm:block">{job.date}</span>
          {job.link && (
            <a href={job.link} target="_blank" rel="noreferrer"
              className="text-gray-400 hover:text-gray-600 text-base leading-none">
              <i className="ti ti-external-link"></i>
            </a>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 border-0 bg-transparent cursor-pointer"
          >
            <i className={`ti ${open ? "ti-chevron-up" : "ti-chevron-down"} text-sm`}></i>
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          {job.notes && (
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{job.notes}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Move to:</span>
            {ALL_STATUSES.filter((s) => s !== job.status).map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(job.id, s)}
                className={`text-xs px-3 py-1 rounded-full border font-medium cursor-pointer transition-colors ${MOVE_TO_STYLE[s]}`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => onDelete(job.id)}
              className="btn btn-danger text-xs px-3 py-1 gap-1 ml-auto"
            >
              <i className="ti ti-trash text-xs"></i>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}