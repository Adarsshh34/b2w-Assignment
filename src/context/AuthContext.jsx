import React, { createContext, useState, useContext, useEffect } from "react";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const registerSeller = (sellerData) => {
    const existingUser = users.find((u) => u.email === sellerData.email);
    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    const newSeller = {
      id: users.length + 1,
      ...sellerData,
      role: "seller",
      isRegistered: sellerData.paymentConfirmed || false,
    };

    setUsers([...users, newSeller]);
    return { success: true, user: newSeller };
  };

  const registerBuyer = (buyerData) => {
    // Check if email already exists
    const existingUser = users.find((u) => u.email === buyerData.email);
    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    const newBuyer = {
      id: users.length + 1,
      ...buyerData,
      role: "buyer",
    };

    setUsers([...users, newBuyer]);
    return { success: true, user: newBuyer };
  };

  const isAuthenticated = () => {
    return currentUser !== null;
  };

  const hasRole = (role) => {
    return currentUser && currentUser.role === role;
  };

  const value = {
    currentUser,
    users,
    login,
    logout,
    registerSeller,
    registerBuyer,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
