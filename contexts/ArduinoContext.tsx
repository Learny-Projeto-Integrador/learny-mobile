import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ArduinoContextType = {
  arduinoOnline: boolean;
  setArduinoOnline: (value: boolean) => void;
};

const ArduinoContext = createContext<ArduinoContextType>({
  arduinoOnline: false,
  setArduinoOnline: () => {},
});

export const ArduinoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [arduinoOnline, setArduinoOnline] = useState(false);

  useEffect(() => {
    const loadArduinoStatus = async () => {
      const value = await AsyncStorage.getItem("arduino");
      setArduinoOnline(value === "true");
    };

    loadArduinoStatus();
  }, []);

  return (
    <ArduinoContext.Provider value={{ arduinoOnline, setArduinoOnline }}>
      {children}
    </ArduinoContext.Provider>
  );
};

export const useArduino = () => useContext(ArduinoContext);
