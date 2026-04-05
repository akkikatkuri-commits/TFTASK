import { motion, AnimatePresence } from "motion/react";
import { Code2, Github, Linkedin, Mail, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { Project, SkillCategory, Experience } from "../types";
import { useState, useMemo } from "react";

interface HomeProps {
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  savedProjectIds: string[];
  onToggleSave: (projectId: string) => void;
  onOpenCaseStudy: (project: Project) => void;
  key?: string | number;
}

export default function Home({ projects, skills, experience, savedProjectIds, onToggleSave, onOpenCaseStudy }: HomeProps) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => techSet.add(t.toUpperCase())));
    return ["ALL", ...Array.from(techSet)].sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return projects;
    return projects.filter(p => 
      p.tech.some(t => t.toUpperCase() === activeFilter)
    );
  }, [projects, activeFilter]);

  return (
    <>
      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-blue-500/20 p-2">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=400&h=400&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-full border-4 border-[#050505]">
                <Code2 size={24} className="text-white" />
              </div>
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                  FULL-STACK <br />
                  <span className="text-blue-500">DEVELOPER.</span>
                </h1>
                <p className="max-w-2xl mx-auto lg:mx-0 text-lg text-gray-400 mb-10 leading-relaxed font-medium">
                  Hi, I'm John. I build high-performance web applications with a focus on clean code and exceptional user experiences. 
                  Currently exploring the intersection of AI and modern web architectures.
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-10">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={24} /></a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail size={24} /></a>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href="#projects"
                    className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    View Projects
                  </a>
                  <a
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    Contact Me
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-2">PROJECTS<span className="text-blue-500">.</span></h2>
              <p className="text-gray-500 font-medium">A selection of my recent work.</p>
            </div>
          </div>

          {/* Tech Filter */}
          <div className="flex flex-wrap gap-2 mb-16">
            {allTech.map(tech => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border ${
                  activeFilter === tech 
                    ? "bg-blue-500 border-blue-500 text-white" 
                    : "bg-transparent border-white/10 text-gray-500 hover:border-white/30"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  isSaved={savedProjectIds.includes(project.id)}
                  onToggleSave={onToggleSave}
                  onOpenCaseStudy={onOpenCaseStudy} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-2">EXPERIENCE<span className="text-blue-500">.</span></h2>
            <p className="text-gray-500 font-medium">My professional journey.</p>
          </div>

          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-4 gap-8">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-2 text-blue-500 font-bold text-sm mb-1 uppercase tracking-widest">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{exp.company}</h3>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Briefcase size={18} className="text-blue-500" />
                      </div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-wide">{exp.role}</h4>
                    </div>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex gap-3 items-start text-sm text-gray-500">
                          <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 md:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-2">SKILLS<span className="text-blue-500">.</span></h2>
            <p className="text-gray-500 font-medium">Technologies I master.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-blue-500" />
                  {skillGroup.category}
                </h3>
                <ul className="space-y-4">
                  {skillGroup.items.map((item) => (
                    <li key={item} className="text-gray-400 font-medium flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
