/**
 * Single source of truth for portfolio content.
 *
 * Everything the site renders lives here so there's one obvious place to edit,
 * and one clean seam for the CMS: Phase 5 seeds the database from these shapes,
 * Phase 6 swaps the components to read from the DB instead. The types below are
 * intentionally close to what the Prisma models will be.
 *
 * Content that changes often (typewriter `roles`, `stats` ranks/counts) is
 * called out because it becomes admin-editable CRUD, not a code edit.
 */

export const profile = {
  name: "Vishesh Shekhawat",
  githubHandle: "vishesh-banna0",
  role: "ML / AI Systems Engineer",
  location: "Jalandhar, Punjab, India",
  email: "visheshbanna0@outlook.com",
  resumeUrl: "/vishesh_2026.pdf",
  currently: "M.Tech AI @ NIT Jalandhar",
  // The hero thesis — one line, what he actually does.
  thesis:
    "I build ML systems that go the distance — from reading the paper to shipping the service. Diffusion models, LLM agents, and the backend that holds them together.",
  socials: {
    github: "https://github.com/vishesh-banna0",
    linkedin: "https://linkedin.com/in/vishesh-shekhawat",
  },
} as const;

/** Typewriter roles — CRUD-editable in the admin (add / edit / reorder / remove). */
export const roles: string[] = [
  "M.Tech AI @ NIT Jalandhar",
  "Global Rank 143 @ TensorTonic",
  "Global Rank 1474 @ deep-ml",
  "Diffusion model practitioner",
  "Agentic AI & LLM systems",
  "Generative AI specialist",
  "Kaggler",
];

/** Headline stats — CRUD-editable (values like ranks / DSA count change over time). */
export const stats: { value: string; label: string }[] = [
  { value: "143", label: "Global rank · TensorTonic" },
  { value: "1474", label: "Global rank · deep-ml" },
  { value: "350+", label: "DSA problems solved" },
  { value: "top 32%", label: "LeetCode" },
  { value: "6+", label: "Systems shipped" },
  { value: "7+", label: "Kaggle competitions" },
];

export const about = {
  lede: "Deeply interested in how intelligent systems actually work — and in building the ones that hold up outside a notebook.",
  paragraphs: [
    "I'm pursuing an M.Tech in Artificial Intelligence at NIT Jalandhar, focused on designing and building AI systems end to end. My work centers on machine learning, deep learning, and generative AI — and on making the results both rigorous and genuinely useful.",
    "I sharpen the fundamentals through data-science competitions and structured algorithmic practice, and I care about depth: understanding a method well enough to implement it from the paper, then turning it into something scalable.",
    "Outside coursework I read new research, test ideas through independent projects, and build in the open. The long-term goal is to help ship intelligent systems that make a measurable difference.",
  ],
  // Datasheet — a spec of the person, read as instrument fields.
  spec: [
    { k: "Role", v: "ML / AI Systems Engineer" },
    { k: "Currently", v: "M.Tech AI, NIT Jalandhar" },
    { k: "Based in", v: "Jalandhar, India" },
    { k: "Focus", v: "Diffusion · LLM agents · MLOps" },
    { k: "Open to", v: "Research & engineering roles" },
  ],
  // Focus areas — the working vocabulary of an ML systems engineer.
  focus: [
    "Diffusion & generative models",
    "LLMs & agentic systems",
    "RAG & retrieval",
    "MLOps & backend systems",
    "Distributed / systems engineering",
    "PyTorch · FastAPI · Docker",
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: "shipped" | "research" | "building";
  year?: string;
};

export const projects: Project[] = [
  {
    slug: "prospera-ai",
    title: "Prospera.ai",
    summary: "Agentic financial-intelligence platform turning market data into explainable investment decisions.",
    description:
      "An agentic financial intelligence platform that transforms market data into explainable investment intelligence. Built around a multi-environment market simulator and a centralized market-data service, it underpins portfolio management, research, prediction models, backtesting, reinforcement-learning agents, and autonomous decision-making. The backend follows Clean Architecture with modular bounded contexts, leaving room for news intelligence, RAG, AI reasoning, and portfolio optimization.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "SQLAlchemy", "LangGraph", "PyTorch", "XGBoost", "Reinforcement Learning", "Next.js", "Docker", "GitHub Actions"],
    githubUrl: "https://github.com/vishesh-banna0/prospera.ai",
    featured: true,
    status: "building",
    year: "2025",
  },
  {
    slug: "manos-ai",
    title: "Manos AI",
    summary: "Local-first adaptive learning system that turns documents into personalized instruction.",
    description:
      "A modular, local-first learning platform that adapts to individual performance. It processes documents, generates questions, manages flashcards with spaced repetition, runs adaptive tests, and reports analytics — all through per-subject instances running entirely on local models.",
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "Ollama", "LLaMA 3", "DeepSeek", "Phi-3", "Nomic Embeddings", "PyMuPDF"],
    githubUrl: "https://github.com/vishesh-banna0/manOS-ai",
    status: "shipped",
    year: "2025",
  },
  {
    slug: "newstack-ai",
    title: "NewStack AI",
    summary: "End-to-end pipeline that collects, summarizes, ranks, and delivers a daily AI briefing.",
    description:
      "An AI-powered news aggregation system that collects, summarizes, ranks, and delivers a personalized daily briefing on AI from multiple sources — RSS feeds, YouTube transcripts, and more — straight to your inbox.",
    stack: ["Python", "PostgreSQL", "SQLAlchemy", "Pydantic", "OpenAI API", "LLMs", "feedparser", "Docker", "uv"],
    githubUrl: "https://github.com/vishesh-banna0/NewStack-AI",
    status: "shipped",
    year: "2025",
  },
  {
    slug: "stable-diffusion",
    title: "Stable Diffusion — Text to Image",
    summary: "Latent-diffusion text-to-image system with prompt conditioning and sampling tuning.",
    description:
      "Worked with the Stable Diffusion architecture for high-resolution image synthesis — exploring fine-tuning, prompt conditioning, and sampling optimization to improve image quality and generation efficiency. Deployed as a live Hugging Face Space.",
    stack: ["Python", "PyTorch", "Stable Diffusion", "CLIP", "VAE"],
    githubUrl: "https://github.com/vishesh-banna0/stable-diffusion-model",
    liveUrl: "https://huggingface.co/spaces/THEGODX/Text-To-Image-Generation",
    status: "research",
    year: "2024",
  },
  {
    slug: "voyage-ai",
    title: "Voyage AI",
    summary: "Autonomous trip-planning agent with multi-step reasoning and tool use.",
    description:
      "An AI travel-planning agent that uses LLMs and external APIs to generate personalized itineraries. Features multi-step reasoning, dynamic tool usage, contextual memory, and real-time destination recommendations.",
    stack: ["Python", "LangChain", "LLMs", "FastAPI", "React"],
    githubUrl: "https://github.com/vishesh-banna0/VoyageAI",
    status: "shipped",
    year: "2024",
  },
  {
    slug: "ddpm",
    title: "DDPM — Paper Implementation",
    summary: "Denoising Diffusion Probabilistic Models built from scratch, from the paper.",
    description:
      "A research-focused, from-scratch implementation of the DDPM paper: forward and reverse diffusion processes, noise scheduling, and a U-Net backbone. Ran experiments on sampling steps and noise variance to improve convergence stability and visual fidelity.",
    stack: ["Python", "PyTorch", "U-Net", "Diffusion Models"],
    githubUrl: "https://github.com/vishesh-banna0/Denoising-Diffusion-Probabilistic-Model-Implementation",
    status: "research",
    year: "2024",
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  shortName: string;
  period: string;
  location: string;
  cgpa: string;
  description: string;
};

export const education: EducationEntry[] = [
  {
    degree: "M.Tech, Artificial Intelligence",
    institution: "National Institute of Technology, Jalandhar",
    shortName: "NIT Jalandhar",
    period: "2025 — Present",
    location: "Jalandhar, Punjab",
    cgpa: "8.78 / 10",
    description:
      "Advanced study in AI/ML with a focus on deep learning, computer vision, and NLP — building AI systems end to end.",
  },
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "SobhaSaria Group of Institutions",
    shortName: "SGI Sikar",
    period: "2020 — 2024",
    location: "Sikar, Rajasthan",
    cgpa: "8.45 / 10",
    description:
      "Foundations in CS: data structures, algorithms, and software engineering — where the pull toward machine learning started.",
  },
];

export type WritingEntry = {
  title: string;
  preview: string;
  source: string;
  url?: string;
};

export const writing: WritingEntry[] = [
  {
    title: "The Physics Behind Diffusion Models",
    preview: "From Brownian motion to Stable Diffusion — how physics shapes the world of generative AI.",
    source: "Blogspot",
    url: "https://vishesh-banna-blog1.blogspot.com/2025/11/welcome-file-physics-behind-diffusion.html",
  },
  {
    title: "Scikit-Learn Design: Building an ML Library",
    preview: "Reading Hands-On ML, I found a section on Scikit-Learn's design — consistency, composition, and sensible defaults.",
    source: "Medium",
    url: "https://medium.com/@vishycodes/scikit-learn-design-4bde25b38cc3",
  },
];

// ── View types shared by the section components (widened from the consts above,
//    and matched by the DB-backed queries in src/lib/queries.ts). ──
export type ProfileView = {
  name: string;
  githubHandle: string;
  role: string;
  location: string;
  email: string;
  resumeUrl: string;
  currently: string;
  thesis: string;
  socials: { github: string; linkedin: string };
};

export type StatView = { value: string; label: string };

export type AboutView = {
  lede: string;
  paragraphs: readonly string[];
  focus: readonly string[];
  spec: readonly { k: string; v: string }[];
};

/** Public navigation — section order reflects what matters most for a systems engineer. */
export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Timeline", href: "#timeline" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;
