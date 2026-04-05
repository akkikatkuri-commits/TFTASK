import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Bookmark, Trash2, User, Plus, ArrowLeft, ChevronRight, ChevronLeft, LogOut, LogIn } from "lucide-react";
import { Project } from "../types";
import ProjectUploadForm from "./ProjectUploadForm";

interface ProfilePanelProps {
  savedProjects: Project[];
  allProjects: Project[];
  onToggleSave: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onClearSaved: () => void;
  onOpenCaseStudy: (project: Project) => void;
  onProjectUploaded: (newProject: Project) => void;
  isOpen: boolean;
  onToggle: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  user: any;
}

export default function ProfilePanel({ 
  savedProjects, 
  allProjects,
  onToggleSave, 
  onDeleteProject,
  onClearSaved,
  onOpenCaseStudy, 
  onProjectUploaded,
  isOpen,
  onToggle,
  isLoggedIn,
  onLogout,
  user
}: ProfilePanelProps) {
  const [isUploading, setIsUploading] = useState(false);

  const myUploads = allProjects.filter(p => p.id.length > 10);

  return (
    <div className="relative h-full flex">
      {/* Toggle Button for Desktop (Floating) */}
      <button
        onClick={onToggle}
        className={`fixed top-1/2 -translate-y-1/2 z-[70] hidden lg:flex items-center justify-center w-8 h-16 bg-blue-600 text-white rounded-l-xl border-y border-l border-white/10 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 ${
          isOpen ? "right-[400px]" : "right-0"
        }`}
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Main Panel */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 400 : 0,
          opacity: isOpen ? 1 : 0,
          x: isOpen ? 0 : 20
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="h-full bg-[#0a0a0a] border-l border-white/10 overflow-hidden shrink-0 z-[60]"
      >
        <div className="w-[400px] h-full p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl font-black tracking-tighter uppercase">
                {isUploading ? "UPLOAD" : "PROFILE"}<span className="text-blue-500">.</span>
              </h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                {isUploading ? "Add new project" : "Saved Projects & Activity"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isUploading && (
                <button
                  onClick={() => setIsUploading(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <button
                onClick={onToggle}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-10">
            {isUploading ? (
              <ProjectUploadForm 
                onClose={() => setIsUploading(false)} 
                onSuccess={(newProject) => {
                  onProjectUploaded(newProject);
                  setIsUploading(false);
                }}
              />
            ) : (
              <>
                {/* User Info Mock */}
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30 shrink-0 flex items-center justify-center bg-blue-600 text-white font-black">
                    {user?.username ? user.username.substring(0, 2).toUpperCase() : "GU"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm">{user?.username || "User"}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.email || "Guest User"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsUploading(true)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
                      title="Upload Project"
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      onClick={onLogout}
                      className="p-2 bg-white/5 text-gray-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Bookmark size={12} className="text-blue-500" />
                      Saved Projects ({savedProjects.length})
                    </h3>
                    {savedProjects.length > 0 && (
                      <button
                        onClick={onClearSaved}
                        className="text-[9px] font-bold text-gray-500 uppercase tracking-widest hover:text-red-500 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {savedProjects.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                      <Bookmark size={32} className="mx-auto text-gray-700 mb-4" />
                      <p className="text-gray-500 text-xs font-medium">No projects saved yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedProjects.map((project) => (
                        <motion.div
                          layout
                          key={project.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="group flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                            <div>
                              <h4 className="font-bold text-xs truncate">{project.title}</h4>
                              <p className="text-[9px] text-gray-500 line-clamp-1 mt-0.5">{project.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => onOpenCaseStudy(project)}
                                className="text-[9px] font-bold text-blue-500 uppercase tracking-widest hover:underline"
                              >
                                View
                              </button>
                              <button
                                onClick={() => onToggleSave(project.id)}
                                className="text-[9px] font-bold text-red-500 uppercase tracking-widest hover:underline flex items-center gap-1"
                              >
                                <Trash2 size={10} /> Remove
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* My Uploads Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Plus size={12} className="text-blue-500" />
                      My Uploads ({myUploads.length})
                    </h3>
                  </div>

                  {myUploads.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                      <Plus size={32} className="mx-auto text-gray-700 mb-4" />
                      <p className="text-gray-500 text-xs font-medium">No projects uploaded yet.</p>
                      <button
                        onClick={() => setIsUploading(true)}
                        className="mt-4 text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline"
                      >
                        Upload Now
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myUploads.map((project) => (
                        <motion.div
                          layout
                          key={project.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="group flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                            <div>
                              <h4 className="font-bold text-xs truncate">{project.title}</h4>
                              <p className="text-[9px] text-gray-500 line-clamp-1 mt-0.5">{project.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => onOpenCaseStudy(project)}
                                className="text-[9px] font-bold text-blue-500 uppercase tracking-widest hover:underline"
                              >
                                View
                              </button>
                              <button
                                onClick={() => onDeleteProject(project.id)}
                                className="text-[9px] font-bold text-red-500 uppercase tracking-widest hover:underline flex items-center gap-1"
                              >
                                <Trash2 size={10} /> Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
