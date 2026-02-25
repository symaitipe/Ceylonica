import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi } from './auth.service';
import { getToken, setToken, removeToken, decodeToken } from './auth.utils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
      } else {
        removeToken();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await loginApi(credentials);
    setToken(response.token);
    const decoded = decodeToken(response.token);
    setUser(decoded);
    return response;
  };

  const register = async (userData) => {
    const response = await registerApi(userData);
    return response;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
