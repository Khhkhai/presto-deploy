import { Input } from "./Input";
import { FileInput, type FileInputHandle } from "./FileInput";
import React from "react";

type ImageSourceInputProps = {
    imageSourceType: 'file' | 'url'; setImageSourceType: (_imageSource: 'file' | 'url') => void;
    url: string; setUrl: (_url: string) => void;
    imageFile: File | null; setImageFile: (_imageFile: File | null) => void;
};

export const ImageSourceInput = React.forwardRef<FileInputHandle, ImageSourceInputProps>((props, ref) => {
  return (
    <>
      <div className="tabs tabs-boxed">
        <button
          type="button"
          className={`tab ${props.imageSourceType === 'file' ? 'tab-active' : ''}`}
          onClick={() => props.setImageSourceType('file')}
        >
            Upload File
        </button>
        <button
          type="button"
          className={`tab ${props.imageSourceType === 'url' ? 'tab-active' : ''}`}
          onClick={() => props.setImageSourceType('url')}
        >
            From URL
        </button>
      </div>

      {props.imageSourceType === 'file' ? (
        <FileInput
          ref={ref}
          id="image"
          label=""
          type="file"
          onChange={props.setImageFile}
          accept="image/png, image/jpeg"
          required={props.imageSourceType === 'file'}
        />
      ) : (
        <Input
          id="url"
          label=""
          type="text"
          value={props.url}
          onChange={props.setUrl}
          required={props.imageSourceType === 'url'}
        />
      )}
    </>
  );
});

ImageSourceInput.displayName = "ImageSourceInput";
