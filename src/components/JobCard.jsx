export default function JobCard({ job }) {
  return (
    <div className="border rounded-lg p-3 sm:p-4 shadow">
      <h2 className="text-lg sm:text-xl font-bold">
        {job.company}
      </h2>

      <p className="text-sm sm:text-base">{job.role}</p>

      <span className="text-blue-600 font-semibold text-sm sm:text-base">
        {job.status}
      </span>
    </div>
  );
}