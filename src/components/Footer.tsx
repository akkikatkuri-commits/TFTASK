import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xs font-bold tracking-widest text-gray-600 uppercase">
          © {new Date().getFullYear()} JOHN DOE. BUILT WITH REACT & EXPRESS.
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">GITHUB</a>
          <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">LINKEDIN</a>
          <a href="#" className="text-gray-600 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">TWITTER</a>
        </div>
      </div>
    </footer>
  );
}
