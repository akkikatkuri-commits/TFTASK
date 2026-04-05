import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Lock, Key, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

interface AuthPageProps {
  onLoginSuccess: (user: any) => void;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  
  const [formData, setFormData] = useState({
    identifier: "", // for login (email or username)
    email: "",      // for signup
    username: "",   // for signup
    password: "",
    otp: ""
  });

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email first");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOtpSent(true);
      alert("OTP Sent! For this demo, you can enter ANY 6-digit code to continue.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin 
      ? { identifier: formData.identifier, password: formData.password }
      : { email: formData.email, username: formData.username, password: formData.password, otp: formData.otp };

    try {
      // For this demo/request, we'll allow ANY login to succeed instantly
      if (isLogin) {
        // Simulate a short delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const user = {
          id: `user_${Math.floor(Math.random() * 1000)}`,
          username: formData.identifier.split('@')[0] || "User",
          email: formData.identifier.includes('@') ? formData.identifier : `${formData.identifier}@example.com`
        };
        
        onLoginSuccess(user);
        return;
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-black tracking-tighter uppercase mb-2"
          >
            {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}<span className="text-blue-500">.</span>
          </motion.h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
            {isLogin ? "Sign in to your portfolio" : "Join the developer community"}
          </p>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              {isLogin ? (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email or Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input
                      required
                      type="text"
                      value={formData.identifier}
                      onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-blue-500 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email ID</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-blue-500 transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Username</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                      <input
                        required
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-blue-500 transition-all outline-none"
                        placeholder="johndoe"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    required
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-blue-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">OTP Verification</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                      <input
                        required
                        type="text"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-blue-500 transition-all outline-none"
                        placeholder="Any 6-digit code"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading || otpSent}
                      className="px-4 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
                    >
                      {otpSent ? "Sent" : "Send"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">
              {isLogin ? "New to the platform?" : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-white text-xs font-black uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              {isLogin ? "Create an account" : "Back to login"}
            </button>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-gray-600">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secure Authentication</span>
        </div>
      </motion.div>
    </div>
  );
}
