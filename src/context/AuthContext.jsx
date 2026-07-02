import { createContext, useContext, useState, useEffect } from "react";

const USER_STORE_KEY = "job-tracker-users";

function loadUsers() {
  try {
    const data = localStorage.getItem(USER_STORE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USER_STORE_KEY, JSON.stringify(users));
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers());
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  function signup(username, password, confirm) {
    const name = username.trim();
    if (!name || !password) return { error: "Username and password are required." };
    if (password.length < 4) return { error: "Password must be at least 4 characters." };
    if (password !== confirm) return { error: "Passwords don't match." };
    if (users[name]) return { error: "That username is taken. Try another." };
    const newUsers = { ...users, [name]: password };
    setUsers(newUsers);
    setCurrentUser(name);
    return { ok: true };
  }

  function login(username, password) {
    const name = username.trim();
    if (!name || !password) return { error: "Username and password are required." };
    if (!users[name] || users[name] !== password)
      return { error: "Username or password is incorrect." };
    setCurrentUser(name);
    return { ok: true };
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}