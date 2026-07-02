const STATUS_STYLE = {
  Applied:   "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Interview: "bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  Selected:  "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
  Rejected:  "bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border whitespace-nowrap ${STATUS_STYLE[status]}`}>
      {status}
    </span>
  );
}