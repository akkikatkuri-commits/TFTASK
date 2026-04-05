import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Project, SkillCategory, BlogPost, Experience } from "./types";
import { FileText, Monitor, HardDrive } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProjectCard from "./components/ProjectCard";
import CaseStudyModal from "./components/CaseStudyModal";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import ProfilePanel from "./components/ProfilePanel";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [user, setUser] = useState<any>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("savedProjects");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedProjects", JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isLoggedIn, user]);

  const toggleSaveProject = (projectId: string) => {
    if (!isLoggedIn) return;
    setSavedProjectIds(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId) 
        : [...prev, projectId]
    );
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!isLoggedIn) return;
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      // Update local state
      setProjects(prev => prev.filter(p => p.id !== projectId));
      // Also remove from saved if it was there
      setSavedProjectIds(prev => prev.filter(id => id !== projectId));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleClearSaved = () => {
    setSavedProjectIds([]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSavedProjectIds([]);
    setIsProfileOpen(false);
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const savedProjects = projects.filter(p => savedProjectIds.includes(p.id));

  const fetchProjects = () => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  };

  useEffect(() => {
    // Loading timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    fetchProjects();

    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));

    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data))
      .catch((err) => console.error("Error fetching blog posts:", err));

    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => setExperience(data))
      .catch((err) => console.error("Error fetching experience:", err));

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-[1px] bg-blue-500 z-10"
              />
              
              <div className="flex items-center justify-center gap-8 mb-12 perspective-[1000px]">
                <motion.div
                  initial={{ opacity: 0, x: -50, rotateY: -45, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotateY: 0,
                    scale: 1,
                    y: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1,
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-blue-500 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <FileText size={40} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotateX: 45 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateX: 0,
                    y: [0, -20, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 1.2,
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                  className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl shadow-blue-600/30 relative z-10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Monitor size={48} />
                  <motion.div 
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20 rounded-[2.5rem] blur-xl"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50, rotateY: 45, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotateY: 0,
                    scale: 1,
                    y: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.4,
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                  className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-blue-500 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <HardDrive size={40} />
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-black tracking-[0.2em] text-white uppercase text-center px-4"
              >
                PERSONAL <br className="md:hidden" />
                <span className="text-blue-500">PORTFOLIO</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                className="mt-8 text-xs font-bold tracking-[0.5em] text-gray-600 text-center uppercase"
              >
                Initializing Experience
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 left-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border border-white/5 rounded-full flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        ) : !isLoggedIn ? (
          <AuthPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-blue-500/30"
          >
            <ScrollProgress />
            <CustomCursor />
            <Navbar 
              savedCount={savedProjects.length}
              onToggleProfile={() => setIsProfileOpen(!isProfileOpen)}
            />
            
            <div className="flex min-h-screen pt-20">
              <main className="flex-1 min-w-0">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Home 
                      projects={projects} 
                      skills={skills} 
                      experience={experience}
                      savedProjectIds={savedProjectIds}
                      onToggleSave={toggleSaveProject}
                      onOpenCaseStudy={(p) => setSelectedProject(p)} 
                    />
                  } 
                />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog posts={blogPosts} />} />
                <Route path="/contact" element={<Contact />} />
                <Route 
                  path="/projects" 
                  element={
                    <div className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <h2 className="text-4xl font-black tracking-tighter mb-16 uppercase">All Projects<span className="text-blue-500">.</span></h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {projects.map((project, index) => (
                          <ProjectCard 
                            key={project.id}
                            project={project}
                            index={index}
                            isSaved={savedProjectIds.includes(project.id)}
                            onToggleSave={toggleSaveProject}
                            onOpenCaseStudy={(p) => setSelectedProject(p)}
                          />
                        ))}
                      </div>
                    </div>
                  } 
                />
              </Routes>
              <Footer />
            </main>

              <ProfilePanel 
                isOpen={isProfileOpen}
                onToggle={() => setIsProfileOpen(!isProfileOpen)}
                savedProjects={savedProjects}
                allProjects={projects}
                onToggleSave={toggleSaveProject}
                onDeleteProject={handleDeleteProject}
                onClearSaved={handleClearSaved}
                onOpenCaseStudy={(p) => setSelectedProject(p)}
                onProjectUploaded={fetchProjects}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                user={user}
              />
            </div>

            <CaseStudyModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}
