'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiMapPin, FiLink, FiGithub, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';
import { getTechLogoUrl } from '@/lib/utils/techLogos';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  type: 'project' | 'skill' | 'education' | 'experience' | 'certification' | 'blog' | 'gallery' | 'technology';
}

export default function DetailModal({ isOpen, onClose, item, type }: DetailModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0C0C08]/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#2E2622] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-[#5F5F60]/30"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#2E2622] text-white p-6 border-b-2 border-[#4C4D4E] rounded-t-2xl flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#C1BFBE]">
                    {item.title || item.name || item.degree || item.company || item.issuer}
                  </h2>
                  {(item.company || item.institution || item.issuer || item.category) && (
                    <p className="text-[#5F5F60] mt-1">
                      {item.company || item.institution || item.issuer || item.category}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#4C4D4E] rounded-lg transition"
                  aria-label="Close modal"
                >
                  <FiX size={24} className="text-[#C1BFBE]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Image/Logo */}
                {(item.imageUrl || item.iconUrl) && (
                  <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-[#5F5F60]/20">
                    <Image
                      src={type === 'technology' ? getTechLogoUrl(item.name, item.iconUrl) : (item.imageUrl || item.iconUrl)}
                      alt={item.title || item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Date Range */}
                {(item.startDate || item.date || item.eventDate || item.publishedAt) && (
                  <div className="flex items-center gap-2 text-[#5F5F60]">
                    <FiCalendar />
                    <span>
                      {item.startDate && `${new Date(item.startDate).toLocaleDateString()}`}
                      {item.endDate && item.endDate !== 'Present' && ` - ${new Date(item.endDate).toLocaleDateString()}`}
                      {item.endDate === 'Present' && ' - Present'}
                      {item.date && new Date(item.date).toLocaleDateString()}
                      {item.eventDate && new Date(item.eventDate).toLocaleDateString()}
                      {item.publishedAt && new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Location */}
                {item.location && (
                  <div className="flex items-center gap-2 text-[#5F5F60]">
                    <FiMapPin />
                    <span>{item.location}</span>
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <div className="prose prose-sm max-w-none">
                    <h3 className="text-lg font-semibold text-[#0C0C08] dark:text-[#C1BFBE] mb-2">Description</h3>
                    <p className="text-[#4C4D4E] dark:text-[#5F5F60] whitespace-pre-line leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* Content (for blogs) */}
                {item.content && (
                  <div className="prose prose-sm max-w-none">
                    <h3 className="text-lg font-semibold text-[#0C0C08] dark:text-[#C1BFBE] mb-2">Content</h3>
                    <div className="text-[#4C4D4E] dark:text-[#5F5F60] whitespace-pre-line leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {item.technologies && item.technologies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0C0C08] dark:text-[#C1BFBE] mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#4C4D4E]/20 dark:bg-[#5F5F60]/30 text-[#2E2622] dark:text-[#C1BFBE] text-sm rounded-full border border-[#5F5F60]/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {item.skills && item.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0C0C08] dark:text-[#C1BFBE] mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#4C4D4E]/20 dark:bg-[#5F5F60]/30 text-[#2E2622] dark:text-[#C1BFBE] text-sm rounded-full border border-[#5F5F60]/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0C0C08] dark:text-[#C1BFBE] mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#C1BFBE]/30 dark:bg-[#4C4D4E]/30 text-[#0C0C08] dark:text-[#C1BFBE] text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Level (for skills) */}
                {item.level && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0C0C08] dark:text-[#C1BFBE] mb-2">Proficiency</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-[#4C4D4E] dark:text-[#5F5F60]">{item.level}</span>
                      <div className="flex-1 bg-[#C1BFBE]/30 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#2E2622] to-[#4C4D4E] h-full rounded-full"
                          style={{
                            width: item.level === 'Expert' ? '100%' :
                                   item.level === 'Advanced' ? '80%' :
                                   item.level === 'Intermediate' ? '60%' : '40%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-[#5F5F60]/20">
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#2E2622] hover:bg-[#4C4D4E] text-white rounded-lg transition flex items-center gap-2"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#0C0C08] hover:bg-[#2E2622] text-white rounded-lg transition flex items-center gap-2"
                    >
                      <FiGithub /> Source Code
                    </a>
                  )}
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#2E2622] hover:bg-[#4C4D4E] text-white rounded-lg transition flex items-center gap-2"
                    >
                      <FiLink /> View Credential
                    </a>
                  )}
                  {item.videoUrl && (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#4C4D4E] hover:bg-[#2E2622] text-white rounded-lg transition flex items-center gap-2"
                    >
                      <FiExternalLink /> Watch Video
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
