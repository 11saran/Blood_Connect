// app/CampContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for the camp data
const CampContext = createContext();

// Create a provider component
export const CampProvider = ({ children }) => {
  const [camps, setCamps] = useState([]); // State to hold camp details

  // Function to add a camp
  const addCamp = (newCamp) => {
    setCamps((prevCamps) => [...prevCamps, newCamp]);
  };

  // Make camp data and functions available to children components
  return (
    <CampContext.Provider value={{ camps, addCamp }}>
      {children}
    </CampContext.Provider>
  );
};

// Create a custom hook to use the CampContext
export const useCamp = () => {
  return useContext(CampContext);
};
