import { useContext, useState } from "react";

import { JobContext } from "../context/JobContext";

import JobCard from "../components/JobCard";
import SearchFilter from "../components/SearchFilter";
import Stats from "../components/Stats";

export default function Dashboard() {
  const { jobs } = useContext(JobContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || job.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:p-6 md:p-8">

      <Stats jobs={jobs} />

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="grid md:grid-cols-3 gap-5">

        {filteredJobs.length === 0 ? (
          <h1>No Jobs Found</h1>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        )}

      </div>
    </div>
  );
}