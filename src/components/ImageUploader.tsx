import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { MoodboardImage } from '../types';

interface ImageUploaderProps {
  images: MoodboardImage[];
  setImages: (images: MoodboardImage[]) => void;
}

export default function ImageUploader({ images, setImages }: ImageUploaderProps) {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadError(null);
      
      // Validate file types
      const validFiles = acceptedFiles.filter(
        file => file.type.startsWith('image/')
      );
      
      if (validFiles.length !== acceptedFiles.length) {
        setUploadError('Only image files are allowed');
        return;
      }
      
      // Preview images
      const newImages = validFiles.map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        url: URL.createObjectURL(file),
        file: file,
      }));
      
      setImages([...images, ...newImages]);
    },
    [images, setImages]
  );

  const removeImage = (id: string) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    noClick: false,
    noKeyboard: false,
    preventDropOnDocument: true
  });

  return (
    <div className="w-full space-y-5">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 shadow-md'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-base text-gray-700 font-medium">
            {isDragActive
              ? 'Drop the images here...'
              : 'Drag & drop images here, or click to select files'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Supported formats: JPG, PNG, GIF, WEBP (max 5MB)
          </p>
        </div>
      </div>

      {uploadError && (
        <p className="text-sm text-red-500 p-3 bg-red-50 rounded-lg">{uploadError}</p>
      )}

      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Uploaded Images ({images.length})</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map(image => (
              <div key={image.id} className="relative rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-all">
                <div className="w-full h-32 relative">
                  <Image
                    src={image.url}
                    alt="Moodboard image"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <button
                  className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-80"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                  type="button"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 