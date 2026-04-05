import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { Project } from "../types";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white z-10 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="flex-1">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mb-4 block">Case Study</span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase leading-none">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/3">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full aspect-square object-cover rounded-2xl grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    The Challenge
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {project.caseStudy?.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    The Solution
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {project.caseStudy?.solution}
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.caseStudy?.features.map((feature, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                      <p className="text-gray-400 text-sm leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-8 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">The Impact</h4>
                <div className="space-y-4">
                  {project.caseStudy?.results.map((result, i) => (
                    <p key={i} className="text-gray-300 font-medium leading-relaxed">
                      {result}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest text-xs"
                >
                  View Repository
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
