import { createContext, useEffect, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs")) || [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};