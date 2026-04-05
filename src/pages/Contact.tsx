import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { ContactFormData } from "../types";

export default function Contact() {
  const [contactForm, setContactForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus("Message sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase">
              Let's build <br />
              <span className="text-blue-500">something great.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium">
              I'm currently available for freelance work and full-time positions. 
              Let's talk about your next project.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleContactSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  required
                  placeholder="NAME"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-6 py-4 bg-[#0a0a0a] border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-xs tracking-widest uppercase"
                />
                <input
                  type="email"
                  required
                  placeholder="EMAIL"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-6 py-4 bg-[#0a0a0a] border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-xs tracking-widest uppercase"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="MESSAGE"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-6 py-4 bg-[#0a0a0a] border border-white/5 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-xs tracking-widest uppercase resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
              {submitStatus && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center text-xs font-bold tracking-widest uppercase ${submitStatus.includes("success") ? "text-emerald-500" : "text-red-500"}`}
                >
                  {submitStatus}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
