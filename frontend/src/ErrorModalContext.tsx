import React, { useState } from "react";
import { Modal } from "./components/Modal";
import { ErrorModalContext } from "./utils/useErrorModal"

export const ErrorModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const showError = (message: string) => {
    setErrorMessage(message);
    setIsOpen(true);
  };

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Error" showClose={true}>
        <p>{errorMessage}</p>
      </Modal>
    </ErrorModalContext.Provider>
  );
};

