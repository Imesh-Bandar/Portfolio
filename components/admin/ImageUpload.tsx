'use client';

import { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  token: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Image',
  required = false,
  token
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || '');

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setPreviewUrl(data.url);
        onChange(data.url);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  };

  const clearImage = async () => {
    if (previewUrl && previewUrl.startsWith('/uploads/')) {
      try {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ url: previewUrl })
        });
        toast.success("Image deleted successfully");
      } catch (error) {
        console.error('Failed to delete image:', error);
      }
    }
    setPreviewUrl('');
    onChange('');
  };

  return (
    <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
      isDragging ? 'border-[#2E2622] bg-[#C1BFBE]/20' : 'border-[#5F5F60]/30'
    }`}>
      <label className="block text-sm font-medium mb-2 text-[#0C0C08]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {previewUrl ? (
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-32 border-2 border-[#4C4D4E] rounded-lg overflow-hidden bg-white shrink-0">
            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#4C4D4E] truncate mb-2">{previewUrl}</p>
            <button
              type="button"
              onClick={clearImage}
              className="px-3 py-1 text-sm text-white bg-[#2E2622] hover:bg-[#4C4D4E] rounded border border-[#4C4D4E] transition"
            >
              <FiX className="inline mr-1" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg transition-all ${
            isDragging ? 'border-[#2E2622] bg-[#C1BFBE]/30 scale-105' : 'border-[#5F5F60]/20'
          }`}
        >
          <label className="flex flex-col items-center justify-center cursor-pointer hover:bg-[#C1BFBE]/10 p-8 rounded-lg transition">
            <FiUpload size={40} className={isDragging ? 'text-[#2E2622]' : 'text-[#5F5F60]'} />
            <span className="text-sm text-[#2E2622] mb-1 font-medium mt-3">
              {isDragging ? 'Drop image here' : 'Drag & drop image here'}
            </span>
            <span className="text-xs text-[#5F5F60] mb-3">or click to browse</span>
            <span className="text-xs text-[#4C4D4E] bg-[#C1BFBE]/30 px-3 py-1 rounded">
              PNG, JPG, GIF, WEBP up to 10MB
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
              required={required && !previewUrl}
            />
          </label>
        </div>
      )}

      {uploading && (
        <div className="mt-3 flex items-center gap-2">
          <div className="w-full bg-[#C1BFBE] rounded-full h-2 overflow-hidden">
            <div className="bg-[#2E2622] h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
          <p className="text-sm text-[#2E2622] whitespace-nowrap font-medium">Uploading...</p>
        </div>
      )}
    </div>
  );
}
