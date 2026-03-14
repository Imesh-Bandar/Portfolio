'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiUsers, FiTag } from 'react-icons/fi';
import CommentSection from '@/components/CommentSection';
import toast from 'react-hot-toast';

interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  isGroupProject: boolean;
  teamMembers?: string[];
  featured: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id as string);
    }
  }, [params.id]);

  const fetchProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) {
        throw new Error('Project not found');
      }
      const data = await res.json();
      setProject(data);
    } catch (error) {
      toast.error('Failed to load project');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-theme"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-theme-primary mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="btn-theme px-6 py-3 rounded-lg"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg border-b border-theme/20">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-theme-primary hover:text-accent-color transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium flex items-center gap-1">
                  <FiTag className="w-4 h-4" />
                  Featured
                </span>
              )}
              {project.isGroupProject && (
                <span className="px-3 py-1 rounded-full bg-theme-secondary text-theme-primary text-sm font-medium flex items-center gap-1">
                  <FiUsers className="w-4 h-4" />
                  Group Project
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-theme-secondary mb-6">
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                <span>
                  {new Date(project.startDate).toLocaleDateString()}
                  {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-theme px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiGithub className="w-5 h-5" />
                  View Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-theme px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Project Image */}
          {project.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 rounded-xl overflow-hidden border-2 border-theme"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-theme-card/10 border-2 border-theme rounded-xl p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-theme-primary mb-4">About This Project</h2>
            <p className="text-theme-secondary text-lg leading-relaxed whitespace-pre-line">
              {project.longDescription || project.description}
            </p>
          </motion.div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-theme-card/10 border-2 border-theme rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-theme-primary mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg bg-theme-secondary/50 text-theme-primary font-medium border border-theme"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Members */}
          {project.isGroupProject && project.teamMembers && project.teamMembers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-theme-card/10 border-2 border-theme rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-theme-primary mb-4 flex items-center gap-2">
                <FiUsers /> Team Members
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg bg-theme-secondary/30 text-theme-primary border border-theme"
                  >
                    {member}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Comment Section - Available for all projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-theme-card/10 border-2 border-theme rounded-xl p-6 md:p-8"
          >
            <CommentSection projectId={project._id} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
