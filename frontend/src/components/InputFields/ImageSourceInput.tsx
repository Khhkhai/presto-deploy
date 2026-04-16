import { Input } from "./Input";
import { FileInput, type FileInputHandle } from "./FileInput";
import React from "react";

type ImageSourceInputProps = {
    imageSourceType: 'file' | 'url'; setImageSourceType: (_imageSource: 'file' | 'url') => void;
    url: string; setUrl: (_url: string) => void;
    imageFile: File | null; setImageFile: (_imageFile: File | null) => void;
};

export const ImageSourceInput = React.forwardRef<FileInputHandle, ImageSourceInputProps>(
  (props, ref) => {
    const { imageSourceType, setImageSourceType, setImageFile, url, setUrl } = props;

    return (
      <>
        <div className="tabs tabs-boxed">
          <button
            type="button"
            className={`tab ${imageSourceType === 'file' ? 'tab-active' : ''}`}
            onClick={() => setImageSourceType('file')}
          >
            Upload File
          </button>
          <button
            type="button"
            className={`tab ${imageSourceType === 'url' ? 'tab-active' : ''}`}
            onClick={() => setImageSourceType('url')}
          >
            From URL
          </button>
        </div>

        {imageSourceType === 'file' ? (
          <FileInput
            ref={ref}
            id="image"
            label=""
            type="file"
            onChange={setImageFile}
            accept="image/png, image/jpeg"
            required={imageSourceType === 'file'}
          />
        ) : (
          <Input
            id="url"
            label=""
            type="text"
            value={url}
            onChange={setUrl}
            required={imageSourceType === 'url'}
          />
        )}
      </>
    );
  });

ImageSourceInput.displayName = "ImageSourceInput";
