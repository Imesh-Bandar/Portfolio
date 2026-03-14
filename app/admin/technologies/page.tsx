'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit, FiTrash2, FiUpload, FiX, FiInfo } from 'react-icons/fi';
import Image from 'next/image';
import { getTechLogoUrl, getAvailableTechNames, hasTechLogo } from '@/lib/utils/techLogos';

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '', category: '', iconUrl: '', description: '', color: '', order: 0, isActive: true
  });
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => { fetchTechnologies(); }, []);

  const fetchTechnologies = async () => {
    const res = await fetch('/api/technologies');
    setTechnologies(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/technologies/${editingId}` : '/api/technologies';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      toast.success(`Technology ${editingId ? 'updated' : 'created'}`);
      resetForm();
      fetchTechnologies();
    }
  };

  const handleEdit = (tech: any) => {
    setFormData({ ...tech });
    setEditingId(tech._id);
    setPreviewUrl(tech.iconUrl || '');
    setShowForm(true);
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData({ ...formData, iconUrl: data.url });
        setPreviewUrl(data.url);
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const file = files[0];
      await uploadFile(file);
    }
  };

  const clearImage = () => {
    setFormData({ ...formData, iconUrl: '' });
    setPreviewUrl('');
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', iconUrl: '', description: '', color: '', order: 0, isActive: true });
    setEditingId(null);
    setShowForm(false);
    setPreviewUrl('');
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name });

    // Auto-suggest logo if available
    if (name.length > 1 && hasTechLogo(name)) {
      const logoUrl = getTechLogoUrl(name);
      if (logoUrl && !formData.iconUrl) {
        setPreviewUrl(logoUrl);
      }
    }

    // Show suggestions
    if (name.length > 0) {
      const availableNames = getAvailableTechNames();
      const filtered = availableNames.filter(n =>
        n.toLowerCase().includes(name.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (techName: string) => {
    setFormData({ ...formData, name: techName });
    const logoUrl = getTechLogoUrl(techName);
    if (logoUrl) {
      setFormData({ ...formData, name: techName, iconUrl: logoUrl });
      setPreviewUrl(logoUrl);
    }
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this technology?')) return;
    const res = await fetch(`/api/technologies/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { toast.success('Deleted'); fetchTechnologies(); }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Technologies</h1>
        <button type="button" onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <FiPlus className="inline mr-2" />{showForm ? 'Cancel' : 'Add Technology'}
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name (e.g., React, Python) *"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => formData.name && setSuggestions(getAvailableTechNames().filter(n => n.toLowerCase().includes(formData.name.toLowerCase())).slice(0, 5))}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => selectSuggestion(suggestion)}
                        className="w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center gap-2"
                      >
                        <span>{suggestion}</span>
                        <span className="text-xs text-green-600">✓ Has official logo</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input type="text" placeholder="Category *" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="text" placeholder="Color (hex)" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="number" placeholder="Order" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="px-3 py-2 border rounded-md" />
            </div>

            {hasTechLogo(formData.name) && !previewUrl && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <FiInfo className="text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-900 font-medium">Official logo available!</p>
                  <p className="text-blue-700">We found an official logo for {formData.name}. It will be used automatically.</p>
                </div>
              </div>
            )}

            {/* Icon Upload Section */}
            <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}>
              <label className="block text-sm font-medium mb-2">Technology Icon</label>
              {previewUrl ? (
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 border rounded-lg overflow-hidden bg-gray-50">
                    <Image src={previewUrl} alt="Preview" fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 truncate">{formData.iconUrl}</p>
                  </div>
                  <button type="button" onClick={clearImage} className="p-2 text-red-600 hover:bg-red-50 rounded" aria-label="Remove image">
                    <FiX size={20} />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg transition-all ${
                    isDragging ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-200'
                  }`}
                >
                  <label className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 p-6 rounded-lg transition">
                    <FiUpload size={32} className={isDragging ? 'text-blue-500' : 'text-gray-400'} />
                    <span className="text-sm text-gray-600 mb-1 font-medium mt-2">
                      {isDragging ? 'Drop icon here' : 'Drag & drop icon here'}
                    </span>
                    <span className="text-xs text-gray-400 mb-2">or click to browse</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded">PNG, JPG, SVG up to 5MB</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                  </label>
                </div>
              )}
              {uploading && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-sm text-blue-600 whitespace-nowrap">Uploading...</p>
                </div>
              )}
            </div>

            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-md" rows={2} />
            <label className="flex items-center">
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="mr-2" />Active
            </label>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{editingId ? 'Update' : 'Create'}</button>
              {showForm && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Cancel</button>}
            </div>
          </form>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {technologies.map((tech) => (
          <div key={tech._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="flex flex-col gap-3">
              {tech.iconUrl && (
                <div className="relative w-full h-16 bg-gray-50 rounded-lg overflow-hidden">
                  <Image src={tech.iconUrl} alt={tech.name} fill className="object-contain p-2" />
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.category}</p>
                  {tech.color && <div className="w-6 h-6 rounded mt-1" style={{backgroundColor: tech.color}}></div>}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(tech)} className="text-indigo-600 hover:text-indigo-800" aria-label="Edit technology"><FiEdit /></button>
                  <button type="button" onClick={() => handleDelete(tech._id)} className="text-red-600 hover:text-red-800" aria-label="Delete technology"><FiTrash2 /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {technologies.length === 0 && <div className="text-center py-8 text-gray-500 bg-white rounded-lg">No technologies found</div>}
    </div>
  );
}
