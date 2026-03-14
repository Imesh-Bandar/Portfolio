'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';
import ImageUpload from '@/components/admin/ImageUpload';

interface About {
  _id?: string;
  title: string;
  description1: string;
  description2: string;
  imageUrl: string;
  isActive: boolean;
}

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<About>({
    title: 'About Me',
    description1: '',
    description2: '',
    imageUrl: '',
    isActive: true,
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await fetch('/api/about');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormData(data);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch about data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('About section updated successfully');
        const data = await response.json();
        setFormData(data);
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2E2622]">About Section</h1>
      </div>

      <div className="bg-white/50 backdrop-blur-sm shadow rounded-lg p-6 border border-[#5F5F60]/30">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#2E2622]">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#5F5F60]/30 shadow-sm focus:border-[#4C4D4E] focus:ring-[#4C4D4E] px-3 py-2 border bg-white/50"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#2E2622]">First Paragraph</label>
              <textarea
                required
                value={formData.description1}
                onChange={(e) => setFormData({ ...formData, description1: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-[#5F5F60]/30 shadow-sm focus:border-[#4C4D4E] focus:ring-[#4C4D4E] px-3 py-2 border bg-white/50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#2E2622]">Second Paragraph</label>
              <textarea
                required
                value={formData.description2}
                onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-[#5F5F60]/30 shadow-sm focus:border-[#4C4D4E] focus:ring-[#4C4D4E] px-3 py-2 border bg-white/50"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                label="Profile Image (Shown next to text)"
                required={false}
                token={token || ''}
              />
            </div>

            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-[#4C4D4E] focus:ring-[#4C4D4E] border-[#5F5F60]/30 rounded"
              />
              <label className="ml-2 block text-sm text-[#2E2622]">Active (Show on portfolio)</label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#C1BFBE] bg-[#0C0C08] hover:bg-[#4C4D4E] disabled:opacity-50"
            >
              <FiSave className="mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
