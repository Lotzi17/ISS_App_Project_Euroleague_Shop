import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    if (token && username) {
      setUser({ token, username, role, userId: Number(userId) });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await loginApi(username, password);
    const { token, username: uname, role, userId } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', uname);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    setUser({ token, username: uname, role, userId });
    return role;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const isAdmin = () => user?.role === 'ADMIN';
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
