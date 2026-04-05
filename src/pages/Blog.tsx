import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { BlogPost } from "../types";

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <section id="blog" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">BLOG<span className="text-blue-500">.</span></h2>
            <p className="text-gray-500 font-medium">Thoughts on code and design.</p>
          </div>
          <BookOpen className="text-gray-800" size={48} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-[#0a0a0a] rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 px-2 py-1 bg-blue-500/10 rounded">
                  {post.category}
                </span>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                {post.date}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
