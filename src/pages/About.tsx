import { motion } from "motion/react";
import { Rocket } from "lucide-react";

export default function About() {
  return (
    <section id="about-page" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-12 uppercase"
          >
            I design & build <br />
            <span className="text-blue-500">digital products.</span>
          </motion.h2>
          
          <div className="space-y-8 text-gray-400 text-lg leading-relaxed font-medium">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              I'm a full-stack developer with a passion for creating clean, efficient, and user-centric digital experiences. 
              With a background in computer science and a keen eye for design, I bridge the gap between complex backend logic and intuitive frontend interfaces.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              My journey in tech began with a curiosity for how things work under the hood. 
              Today, I specialize in the MERN stack, building scalable applications that solve real-world problems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 p-8 bg-blue-600 rounded-3xl flex flex-col md:flex-row items-center gap-8"
          >
            <div className="p-4 bg-white/10 rounded-2xl">
              <Rocket className="text-white" size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Looking for my resume?</h3>
              <p className="text-blue-100 text-sm mb-6">Download my latest CV to see my full professional history and education.</p>
              <a 
                href="#" 
                className="inline-block px-8 py-3 bg-white text-black font-black rounded-full hover:bg-black hover:text-white transition-all uppercase tracking-widest text-xs"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
