import React, { createContext, useContext, useState } from "react";
import { Modal } from "./components/Modal";

type ErrorModalContextType = {
  showError: (message: string) => void;
};

const ErrorModalContext = createContext<ErrorModalContextType | null>(null);

export const ErrorModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const showError = (message: string) => {
    setErrorMessage(message);
    setIsOpen(true);
  };

  return (
    // global var
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Error" showClose={true}>
        <p>{errorMessage}</p>
      </Modal>
    </ErrorModalContext.Provider>
  );
};

export const useErrorModal = () => {
  const errorModal = useContext(ErrorModalContext);
  if (!errorModal) throw new Error("useErrorModal must be used within ErrorModalProvider");
  return errorModal;
};