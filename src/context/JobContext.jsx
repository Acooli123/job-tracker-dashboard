import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";

const JobContext = createContext(null);

function jobReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload, id: Date.now() }];
    case "UPDATE_STATUS":
      return state.map((j) =>
        j.id === action.id ? { ...j, status: action.status } : j
      );
    case "DELETE":
      return state.filter((j) => j.id !== action.id);
    case "RESET":
      return action.payload ?? [];
    default:
      return state;
  }
}

export function JobProvider({ children }) {
  const { currentUser } = useAuth();
  const [jobs, dispatch] = useReducer(jobReducer, []);

  useEffect(() => {
    if (!currentUser) return;
    try {
      const saved = localStorage.getItem(`job-tracker-jobs-${currentUser}`);
      if (saved) dispatch({ type: "RESET", payload: JSON.parse(saved) });
    } catch (e) {
      console.error("Failed to load jobs", e);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    localStorage.setItem(`job-tracker-jobs-${currentUser}`, JSON.stringify(jobs));
  }, [jobs, currentUser]);

  function addJob(job) { dispatch({ type: "ADD", payload: job }); }
  function updateStatus(id, status) { dispatch({ type: "UPDATE_STATUS", id, status }); }
  function deleteJob(id) { dispatch({ type: "DELETE", id }); }
  function resetJobs() { dispatch({ type: "RESET" }); }

  const stats = {
    total:       jobs.length,
    applied:     jobs.filter((j) => j.status === "Applied").length,
    interview:   jobs.filter((j) => j.status === "Interview").length,
    selected:    jobs.filter((j) => j.status === "Selected").length,
    rejected:    jobs.filter((j) => j.status === "Rejected").length,
    successRate: jobs.length
      ? Math.round((jobs.filter((j) => j.status === "Selected").length / jobs.length) * 100)
      : 0,
  };

  return (
    <JobContext.Provider value={{ jobs, stats, addJob, updateStatus, deleteJob, resetJobs }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobContext);
}