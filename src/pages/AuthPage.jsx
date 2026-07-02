import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (tab === "signup") {
      const result = signup(username, password, confirm);
      if (result.error) { setError(result.error); return; }
      navigate("/welcome");
    } else {
      const result = login(username, password);
      if (result.error) { setError(result.error); return; }
      navigate("/dashboard");
    }
  }

  function handleTabSwitch(newTab) {
    setTab(newTab);
    setError("");
    setPassword("");
    setConfirm("");
    setShowPassword(false);
    setShowConfirm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center rounded-2xl bg-brand-600 mb-3"
            style={{ width: 52, height: 52 }}
          >
            <i className="ti ti-briefcase text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Job Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track every application in one place</p>
        </div>

        <div className="card p-6 dark:border-gray-700">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-5">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTabSwitch(t)}
                className={`flex-1 py-1.5 text-sm rounded-md transition-all duration-150 border-0 ${
                  tab === t
                    ? "bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 font-medium shadow-sm ring-1 ring-gray-200 dark:ring-gray-600"
                    : "bg-transparent text-gray-500 dark:text-gray-400 font-normal hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {t === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="mb-4 px-3 py-2 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Username</label>
              <input
                className="input-field"
                type="text"
                placeholder="e.g. alex_dev"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="relative mb-3">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  className="input-field pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={tab === "signup" ? "new-password" : "current-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  tabIndex={-1}
                >
                  <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`}></i>
                </button>
              </div>
            </div>
{tab === "signup" && (
              <div className="relative mb-5">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    className="input-field pr-10"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    tabIndex={-1}
                  >
                    <i className={`ti ${showConfirm ? "ti-eye-off" : "ti-eye"}`}></i>
                  </button>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full justify-center py-2.5 text-sm">
              {tab === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}