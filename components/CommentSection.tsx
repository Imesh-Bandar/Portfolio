'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useComments } from '@/lib/hooks/useRealTimeData';

interface CommentSectionProps {
  projectId: string;
}

export default function CommentSection({ projectId }: CommentSectionProps) {
  const { comments, loading, refresh } = useComments(projectId);
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          ...formData
        })
      });

      if (res.ok) {
        toast.success('Comment submitted for approval!');
        setFormData({ author: '', email: '', content: '' });
        // Refresh comments immediately after submission
        refresh();
      } else {
        toast.error('Failed to submit comment');
      }
    } catch (error) {
      toast.error('Error submitting comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-theme-primary flex items-center gap-2">
          <FiMessageSquare /> Comments ({comments.length})
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <FiRefreshCw className="w-4 h-4 text-theme-secondary" />
            </motion.div>
          )}
        </h3>
        <button
          onClick={() => refresh()}
          className="text-sm text-theme-secondary hover:text-theme-primary transition-colors flex items-center gap-1"
          title="Refresh comments"
        >
          <FiRefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Comment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-theme-card/10 border-2 border-theme rounded-xl p-6"
      >
        <h4 className="text-lg font-semibold text-theme-primary mb-4">
          Leave a Comment
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-theme-secondary" />
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-theme bg-transparent text-theme-primary placeholder-theme-secondary focus:border-accent-color focus:outline-none"
              />
            </div>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-theme-secondary" />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-theme bg-transparent text-theme-primary placeholder-theme-secondary focus:border-accent-color focus:outline-none"
              />
            </div>
          </div>
          <textarea
            placeholder="Write your comment..."
            required
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border-2 border-theme bg-transparent text-theme-primary placeholder-theme-secondary focus:border-accent-color focus:outline-none resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-theme px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <FiSend />
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-theme-card/5 border border-theme rounded-lg p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-theme-secondary flex items-center justify-center text-theme-primary font-bold">
                {comment.author[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-theme-primary">{comment.author}</h5>
                  <span className="text-sm text-theme-secondary">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-theme-secondary">{comment.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 text-theme-secondary">
          <FiMessageSquare className="mx-auto text-4xl mb-2 opacity-50" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}
