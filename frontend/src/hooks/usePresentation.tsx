import { useState, useRef } from "react";
import { getPresentation, updatePresentationField, deletePresentation } from "../api/store";
import { fileToDataUrl } from "../utils/file";
import { useNavigate } from "react-router-dom";
import { useErrorModal } from "../utils/useErrorModal";
import type { FileInputHandle } from "../components/InputFields/FileInput";
import type { RefObject } from "react";
import type { PresentationType } from "../data";
import axios from "axios";

export const usePresentation = (id: string) => {
  const navigate = useNavigate();
  const { showError } = useErrorModal();
  const [presentation, setPresentation] = useState<PresentationType | null>(null);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const load = async () => {
    const data = await getPresentation(id);
    setPresentation(data);
    return data;
  };

  const handleDelete = async () => {
    try {
      await deletePresentation(id);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data?.error || "Something went wrong");
      } else {
        showError("Unexpected error");
      }
    }
  };

  const handleTitle = async (onSuccess: () => void) => {
    try {
      await updatePresentationField(id, "name", name);
      setName('');
      await load();
      onSuccess();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data?.error || "Something went wrong");
      } else {
        showError("Unexpected error");
      }
    }
  };

  const handleThumbnail = async (onSuccess: () => void, fileInputRef: RefObject<FileInputHandle | null>) => {
    try {
      let thumbnailBase64: string | null = null;
      if (thumbnail) {
        thumbnailBase64 = await fileToDataUrl(thumbnail) as string;
      }
      await updatePresentationField(id, "thumbnail", thumbnailBase64);
      setThumbnail(null);
      fileInputRef.current?.reset();
      await load();
      onSuccess();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data?.error || "Something went wrong");
      } else {
        showError("Unexpected error");
      }
    }
  };

  return {
    presentation, load,
    name, setName,
    thumbnail, setThumbnail,
    fileInputRef,
    handleDelete, handleTitle, handleThumbnail,
  };
};