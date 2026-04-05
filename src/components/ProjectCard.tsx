import { motion } from "motion/react";
import { ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
  isSaved: boolean;
  onToggleSave: (projectId: string) => void;
  onOpenCaseStudy: (project: Project) => void;
  key?: string | number;
}

export default function ProjectCard({ project, index, isSaved, onToggleSave, onOpenCaseStudy }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6 bg-[#111]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(project.id);
            }}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
              isSaved 
                ? "bg-blue-500 text-white" 
                : "bg-black/40 text-white hover:bg-white hover:text-black border border-white/10"
            }`}
          >
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="px-6 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all"
          >
            Case Study <ExternalLink size={16} />
          </button>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
      <p className="text-gray-400 mb-6 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-3">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-bold uppercase tracking-widest text-gray-500"
          >
            #{t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
