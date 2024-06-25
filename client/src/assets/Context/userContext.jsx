import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook to use the context
export function useUser() {
  return useContext(UserContext);
}

// Create the provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define any additional state or functions related to the user context

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    // Add any other values or functions you want to expose
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
