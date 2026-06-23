import { useContext, useState } from "react";
import { JobContext } from "../context/JobContext";

export default function JobForm() {
  const { addJob } = useContext(JobContext);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const submit = (e) => {
    e.preventDefault();

    addJob({
      id: Date.now(),
      company,
      role,
      status,
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm sm:max-w-md mx-auto bg-white shadow p-4 sm:p-6 rounded"
    >
      <input
        className="border w-full p-2 mb-4"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="border w-full p-2 mb-4"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        className="border w-full p-2 mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Selected</option>
      </select>

      <button className="bg-blue-600 text-white w-full py-2 rounded">
        Add Job
      </button>
    </form>
  );
}