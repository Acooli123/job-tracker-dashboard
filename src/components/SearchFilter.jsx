export default function SearchFilter({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
      <input
        placeholder="Search..."
        className="border p-2 flex-1 w-full sm:w-auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 w-full sm:w-auto"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Selected</option>
      </select>
    </div>
  );
}