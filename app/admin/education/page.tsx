'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function EducationPage() {
  const [education, setEducation] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    degree: '', institution: '', location: '', startDate: '', endDate: '',
    isOngoing: false, grade: '', description: '', order: 0, isActive: true
  });

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    const res = await fetch('/api/education');
    setEducation(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/education/${editingId}` : '/api/education';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      toast.success(`Education ${editingId ? 'updated' : 'created'}`);
      setFormData({ degree: '', institution: '', location: '', startDate: '', endDate: '', isOngoing: false, grade: '', description: '', order: 0, isActive: true });
      setEditingId(null);
      setShowForm(false);
      fetchEducation();
    }
  };

  const handleEdit = (edu: any) => {
    setFormData({ ...edu, startDate: edu.startDate.split('T')[0], endDate: edu.endDate ? edu.endDate.split('T')[0] : '' });
    setEditingId(edu._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education?')) return;
    const res = await fetch(`/api/education/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { toast.success('Deleted'); fetchEducation(); }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Education</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <FiPlus className="inline mr-2" />{showForm ? 'Cancel' : 'Add Education'}
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Degree *" required value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="text" placeholder="Institution *" required value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="text" placeholder="Grade" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="date" placeholder="Start Date *" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="date" placeholder="End Date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="px-3 py-2 border rounded-md" disabled={formData.isOngoing} />
            </div>
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-md" rows={2} />
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="checkbox" checked={formData.isOngoing} onChange={(e) => setFormData({ ...formData, isOngoing: e.target.checked })} className="mr-2" />Ongoing
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="mr-2" />Active
              </label>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">{editingId ? 'Update' : 'Create'}</button>
          </form>
        </div>
      )}
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {new Date(edu.startDate).getFullYear()} - {edu.isOngoing ? 'Present' : new Date(edu.endDate).getFullYear()}
                  {edu.location && ` • ${edu.location}`}
                </p>
                {edu.grade && <p className="text-sm text-gray-600 mt-1">Grade: {edu.grade}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(edu)} className="text-indigo-600"><FiEdit className="h-5 w-5" /></button>
                <button onClick={() => handleDelete(edu._id)} className="text-red-600"><FiTrash2 className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {education.length === 0 && <div className="text-center py-8 text-gray-500 bg-white rounded-lg">No education found</div>}
    </div>
  );
}
