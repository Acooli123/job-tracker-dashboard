export default function Stats({ jobs }) {
  const applied = jobs.filter(j => j.status==="Applied").length;
  const interview = jobs.filter(j=>j.status==="Interview").length;
  const rejected = jobs.filter(j=>j.status==="Rejected").length;
  const selected = jobs.filter(j=>j.status==="Selected").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">

      <div className="bg-blue-100 p-5 rounded">
        Applied
        <h2 className="text-3xl">{applied}</h2>
      </div>

      <div className="bg-yellow-100 p-5 rounded">
        Interview
        <h2 className="text-3xl">{interview}</h2>
      </div>

      <div className="bg-red-100 p-5 rounded">
        Rejected
        <h2 className="text-3xl">{rejected}</h2>
      </div>

      <div className="bg-green-100 p-5 rounded">
        Selected
        <h2 className="text-3xl">{selected}</h2>
      </div>

    </div>
  );
}