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
  profileImageUrl: "/profile-portrait.png",
  currently: "M.Tech AI at NIT Jalandhar",
  thesis:
    "I build practical AI products, from recommendation and retrieval models to the APIs and interfaces that make them useful.",
  socials: {
    github: "https://github.com/vishesh-banna0",
    linkedin: "https://linkedin.com/in/vishesh-shekhawat",
  },
} as const;

export const heroQuote = "Good AI work starts with a clear problem and ends with something people can use.";

export const replacedProfileImages = [
  '/profile.jpeg',
  'https://hc8apjjbv2idkruy.public.blob.vercel-storage.com/image_with_ai_generated_but_single_color_background-d25KJUNhWuv9xiOZgnCxb5z3GpCZNi.png',
];

/** Typewriter roles — CRUD-editable in the admin (add / edit / reorder / remove). */
export const roles: string[] = [
  "M.Tech AI at NIT Jalandhar",
  "building Prospera.ai",
  "building ReVisit",
];

/** Headline stats — CRUD-editable (values like ranks / DSA count change over time). */
export const stats: { value: string; label: string }[] = [
  { value: "206", label: "Amazon ML Challenge 2026 · team lead" },
  { value: "6th", label: "StatHack, IIT Goa · team lead" },
  { value: "238 / 4,370", label: "Heart Disease Prediction competition" },
  { value: "300+", label: "LeetCode problems solved" },
];

export const about = {
  lede: "I like the part of AI where an idea has to become a tool someone can actually use.",
  paragraphs: [
    "I'm pursuing an M.Tech in AI at NIT Jalandhar. Alongside coursework, I build across the stack: data pipelines, models, backend services, and the interfaces people see.",
    "I care about honest evaluation and dependable software. Competitions sharpen that discipline; projects like CineMatch and Manos AI let me put it into practice.",
  ],
  spec: [
    { k: "Role", v: "ML / AI Systems Engineer" },
    { k: "Currently", v: "M.Tech AI at NIT Jalandhar" },
    { k: "Based in", v: "Jalandhar, India" },
    { k: "Focus", v: "recommendation · retrieval · applied AI" },
    { k: "Open to", v: "AI / ML engineering roles" },
  ],
  focus: [
    "Python", "PyTorch", "scikit-learn", "ranking & classification",
    "RAG", "FAISS & BM25", "LangGraph", "grounding & evaluation",
    "FastAPI", "PostgreSQL", "data pipelines", "Docker & CI",
    "React", "Next.js", "TypeScript",
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
    summary: "Market intelligence with paper trading, explainable signals, and backtesting.",
    description:
      "I built a shared market-data service and paper-trading portfolios, then added news intelligence, company scorecards, prediction baselines, explainable signals, and SIP and lump-sum backtests. It runs locally with SQLite; the Next.js interface is in progress.",
    stack: ["Python", "FastAPI", "SQLite", "Next.js", "pytest", "GitHub Actions"],
    githubUrl: "https://github.com/vishesh-banna0/prospera.ai",
    featured: true,
    status: "building",
    year: "2025–26",
  },
  {
    slug: "manos-ai",
    title: "Manos AI",
    summary: "Study material becomes grounded flashcards and a personal revision plan.",
    description:
      "Manos AI turns documents into source-grounded flashcards, plans revision from learning history, and schedules reviews with SM-2. Its retrieval pipeline blends semantic and lexical search, while an evaluation harness checks retrieval and card quality.",
    stack: ["Python", "FastAPI", "PostgreSQL", "FAISS", "Ollama", "React"],
    githubUrl: "https://github.com/vishesh-banna0/manOS-ai",
    featured: true,
    status: "building",
    year: "2025–26",
  },
  {
    slug: "newstack-ai",
    title: "NewStack AI",
    summary: "A daily AI briefing assembled from RSS feeds and YouTube transcripts.",
    description:
      "A modular pipeline collects AI news, converts articles and transcripts into readable summaries, ranks them against a reader profile, and sends a deduplicated email digest.",
    stack: ["Python", "PostgreSQL", "SQLAlchemy", "LLMs", "Docker"],
    githubUrl: "https://github.com/vishesh-banna0/NewStack-AI",
    status: "shipped",
    year: "2025",
  },
  {
    slug: "cinematch",
    title: "CineMatch.ai",
    summary: "A movie recommender that learns taste instead of repeating popular picks.",
    description:
      "A two-tower recommender trained on MovieLens 10M. It precomputes film embeddings for FAISS retrieval, compares full-catalogue Recall@10 and NDCG@10 against a popularity baseline, and serves recommendations through FastAPI and a Streamlit demo.",
    stack: ["Python", "PyTorch", "FAISS", "FastAPI", "Streamlit"],
    githubUrl: "https://github.com/vishesh-banna0/CineMatch",
    featured: true,
    status: "shipped",
    year: "2026",
  },
  {
    slug: "revisit",
    title: "ReVisit",
    summary: "A practice tracker that knows what to review, not just what you solved.",
    description:
      "ReVisit tracks coding attempts, confidence, and revision history to estimate what still sticks. It schedules the next review and explains each recommendation in plain language, with a FastAPI backend and Next.js frontend.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Supabase Auth", "Next.js"],
    githubUrl: "https://github.com/vishesh-banna0/ReVisit",
    status: "building",
    year: "2026",
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
  profileImageUrl: string;
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
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Blog", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;
