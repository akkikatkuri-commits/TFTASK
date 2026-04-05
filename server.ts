import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_FILE = path.join(__dirname, "data", "projects.json");
const SKILLS_FILE = path.join(__dirname, "data", "skills.json");
const BLOG_FILE = path.join(__dirname, "data", "blog.json");
const EXPERIENCE_FILE = path.join(__dirname, "data", "experience.json");
const USERS_FILE = path.join(__dirname, "data", "users.json");

// Mock OTP storage
const otps = new Map<string, string>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Auth APIs
  app.post("/api/auth/send-otp", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    
    // Generate a simple 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps.set(email, otp);
    
    console.log(`[MOCK OTP] Sent ${otp} to ${email}`);
    res.json({ success: true, message: "OTP sent successfully (Check server logs)" });
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, username, password, otp } = req.body;
      
      if (!email || !username || !password || !otp) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Verify OTP - Allow any 6-digit OTP
      if (!/^\d{6}$/.test(otp)) {
        return res.status(400).json({ error: "Invalid OTP format (must be 6 digits)" });
      }

      const data = await fs.readFile(USERS_FILE, "utf-8");
      const users = JSON.parse(data);

      if (users.find((u: any) => u.email === email || u.username === username)) {
        return res.status(400).json({ error: "User already exists" });
      }

      const newUser = { id: Date.now().toString(), email, username, password };
      users.push(newUser);
      await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
      
      otps.delete(email); // Clear OTP after use
      res.status(201).json({ success: true, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (error) {
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { identifier, password } = req.body; // identifier can be email or username
      
      if (!identifier || !password) {
        return res.status(400).json({ error: "Identifier and password are required" });
      }

      const data = await fs.readFile(USERS_FILE, "utf-8");
      const users = JSON.parse(data);

      const user = users.find((u: any) => (u.email === identifier || u.username === identifier) && u.password === password);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Projects API
  app.get("/api/projects", async (req, res) => {
    try {
      const data = await fs.readFile(PROJECTS_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to load projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const newProject = req.body;
      const data = await fs.readFile(PROJECTS_FILE, "utf-8");
      const projects = JSON.parse(data);
      
      // Basic validation
      if (!newProject.title || !newProject.description) {
        return res.status(400).json({ error: "Title and description are required" });
      }

      // Generate ID if not provided
      if (!newProject.id) {
        newProject.id = Date.now().toString();
      }

      projects.push(newProject);
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
      
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ error: "Failed to save project" });
    }
  });

  // Skills API
  app.get("/api/skills", async (req, res) => {
    try {
      const data = await fs.readFile(SKILLS_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to load skills" });
    }
  });

  // Blog API
  app.get("/api/blog", async (req, res) => {
    try {
      const data = await fs.readFile(BLOG_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to load blog posts" });
    }
  });

  // Experience API
  app.get("/api/experience", async (req, res) => {
    try {
      const data = await fs.readFile(EXPERIENCE_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to load experience" });
    }
  });

  // Delete Project API
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await fs.readFile(PROJECTS_FILE, "utf-8");
      let projects = JSON.parse(data);
      
      const initialLength = projects.length;
      projects = projects.filter((p: any) => p.id !== id);
      
      if (projects.length === initialLength) {
        return res.status(404).json({ error: "Project not found" });
      }

      await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
      res.json({ success: true, message: "Project deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Contact API (Mock)
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact form submission: ${name} (${email}) - ${message}`);
    res.json({ success: true, message: "Message received!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
