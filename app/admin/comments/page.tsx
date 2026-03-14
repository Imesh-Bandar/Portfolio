'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import toast from 'react-hot-toast';
import AdminCard from '@/components/admin/AdminCard';
import AdminTable from '@/components/admin/AdminTable';
import AdminButton from '@/components/admin/AdminButton';
import { FiCheck, FiX, FiEye, FiTrash2 } from 'react-icons/fi';

interface Comment {
  _id: string;
  projectId: { title: string };
  author: string;
  email: string;
  content: string;
  isApproved: boolean;
  isPublished: boolean;
  createdAt: string;
}

export default function CommentsPage() {
  const { token } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setComments(data);
    } catch (error) {
      toast.error('Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isApproved: true })
      });

      if (res.ok) {
        toast.success('Comment approved!');
        fetchComments();
      }
    } catch (error) {
      toast.error('Failed to approve comment');
    }
  };

  const handlePublish = async (id: string, isPublished: boolean) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isPublished })
      });

      if (res.ok) {
        toast.success(isPublished ? 'Comment published!' : 'Comment unpublished!');
        fetchComments();
      }
    } catch (error) {
      toast.error('Failed to update comment');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        toast.success('Comment deleted!');
        fetchComments();
      }
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  const columns = [
    {
      key: 'author',
      label: 'Author',
      render: (value: string, row: Comment) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      )
    },
    {
      key: 'content',
      label: 'Comment',
      render: (value: string) => (
        <div className="max-w-md truncate">{value}</div>
      )
    },
    {
      key: 'isApproved',
      label: 'Status',
      render: (value: boolean, row: Comment) => (
        <div className="space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {value ? 'Approved' : 'Pending'}
          </span>
          {row.isPublished && (
            <span className="block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Published
            </span>
          )}
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (value: string) => (
        <span className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminCard
        title="Comment Management"
        description="Approve and manage project comments"
      >
        <AdminTable
          columns={columns}
          data={comments}
          actions={(row) => (
            <div className="flex gap-2">
              {!row.isApproved && (
                <AdminButton
                  size="sm"
                  variant="success"
                  icon={<FiCheck />}
                  onClick={() => handleApprove(row._id)}
                >
                  Approve
                </AdminButton>
              )}
              {row.isApproved && (
                <AdminButton
                  size="sm"
                  variant={row.isPublished ? 'secondary' : 'primary'}
                  icon={<FiEye />}
                  onClick={() => handlePublish(row._id, !row.isPublished)}
                >
                  {row.isPublished ? 'Unpublish' : 'Publish'}
                </AdminButton>
              )}
              <AdminButton
                size="sm"
                variant="danger"
                icon={<FiTrash2 />}
                onClick={() => handleDelete(row._id)}
              >
                Delete
              </AdminButton>
            </div>
          )}
          emptyMessage="No comments yet"
        />
      </AdminCard>
    </div>
  );
}
