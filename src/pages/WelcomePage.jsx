import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FEATURES = ["Track applications", "Monitor status", "Search & filter", "View statistics"];

export default function WelcomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div
          className="inline-flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/50 mb-6"
          style={{ width: 80, height: 80, fontSize: 36 }}
        >
          👋
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Welcome, {currentUser}!
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          Your job tracker is ready. Start adding applications and stay on top of every opportunity.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {FEATURES.map((f) => (
            <span
              key={f}
              className="text-xs px-3.5 py-1.5 bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 rounded-full border border-brand-100 dark:border-brand-700"
            >
              {f}
            </span>
          ))}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-primary px-10 py-3 text-base"
        >
          Start tracking jobs
        </button>
      </div>
    </div>
  );
}