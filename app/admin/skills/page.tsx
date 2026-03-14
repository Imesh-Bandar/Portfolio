'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '', category: '', level: 'Intermediate', percentage: 50, iconUrl: '',
    description: '', order: 0, isActive: true
  });

  const fetchSkills = async () => {
    const res = await fetch('/api/skills');
    setSkills(await res.json());
  };

  useEffect(() => { fetchSkills(); }, [fetchSkills]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/skills/${editingId}` : '/api/skills';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      toast.success(`Skill ${editingId ? 'updated' : 'created'}`);
      setFormData({ name: '', category: '', level: 'Intermediate', percentage: 50, iconUrl: '', description: '', order: 0, isActive: true });
      setEditingId(null);
      setShowForm(false);
      fetchSkills();
    }
  };

  const handleEdit = (skill: any) => {
    setFormData({ ...skill });
    setEditingId(skill._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { toast.success('Deleted'); fetchSkills(); }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Skills</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <FiPlus className="inline mr-2" />{showForm ? 'Cancel' : 'Add Skill'}
        </button>
      </div>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="text" placeholder="Category *" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="px-3 py-2 border rounded-md" />
              <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="px-3 py-2 border rounded-md">
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
              </select>
              <input type="number" placeholder="Percentage" min="0" max="100" value={formData.percentage} onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) })} className="px-3 py-2 border rounded-md" />
              <input type="url" placeholder="Icon URL" value={formData.iconUrl} onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })} className="px-3 py-2 border rounded-md" />
              <input type="number" placeholder="Order" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="px-3 py-2 border rounded-md" />
            </div>
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-md" rows={2} />
            <label className="flex items-center">
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="mr-2" />Active
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">{editingId ? 'Update' : 'Create'}</button>
          </form>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.category} - {skill.level}</p>
                {skill.percentage && <p className="text-sm text-gray-500">{skill.percentage}%</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(skill)} className="text-indigo-600"><FiEdit /></button>
                <button onClick={() => handleDelete(skill._id)} className="text-red-600"><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {skills.length === 0 && <div className="text-center py-8 text-gray-500 bg-white rounded-lg">No skills found</div>}
    </div>
  );
}
