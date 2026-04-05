export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  caseStudy?: {
    problem: string;
    solution: string;
    features: string[];
    results: string[];
  };
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}
