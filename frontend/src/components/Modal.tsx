import React, { useEffect, useRef } from "react";
import { Button } from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const Modal = (props: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [props.open]);

  return (
    <>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{props.title}</h3>
          <div className="py-4">{props.children}</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <Button type="button" onClick={props.onClose}>close</Button>
        </form>
      </dialog>
    </>
  );
};