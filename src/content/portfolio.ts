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

export const heroQuote = "Scale intelligence where it helps. Distill it where it matters. Rethink it where it fails.";

export const replacedProfileImages = [
  '/profile.jpeg',
  'https://hc8apjjbv2idkruy.public.blob.vercel-storage.com/image_with_ai_generated_but_single_color_background-d25KJUNhWuv9xiOZgnCxb5z3GpCZNi.png',
];

/** Typewriter roles — CRUD-editable in the admin (add / edit / reorder / remove). */
export const roles: string[] = [
  "M.Tech AI @ NIT Jalandhar",
  "AI / ML engineer",
  "Pythonist",
  "Problem solver",
  "Project builder",
];

/** Headline stats — CRUD-editable (values like ranks / DSA count change over time). */
export const stats: { value: string; label: string }[] = [
  { value: "206", label: "Amazon ML Challenge 2026 · team lead" },
  { value: "6th", label: "StatHack, IIT Goa · team lead" },
  { value: "238 / 4,370", label: "Heart Disease Prediction competition" },
  { value: "300+", label: "LeetCode problems solved" },
  { value: "73", label: "TensorTonic global rank" },
  { value: "203", label: "Deep-ML global rank" },
  { value: "2024 & 2025", label: "GATE qualified" },
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
    slug: "knect",
    title: "Knect",
    summary: "Keeps the reasoning behind code changes in reviewed, searchable project knowledge.",
    description:
      "A commit shows what changed but often loses why it changed. Knect pairs a VS Code review interface with a FastAPI and SQLite knowledge service: the backend captures commit evidence, prepares findings for contributor review, publishes only approved knowledge, and retrieves answers with citations. The backend workflow works locally; the extension currently uses demo data and is not yet connected to it.",
    stack: ["VS Code", "TypeScript", "React", "FastAPI", "SQLite"],
    githubUrl: "https://github.com/vishesh-banna0/Knect",
    featured: true,
    status: "building",
    year: "2026",
  },
  {
    slug: "prospera-ai",
    title: "Prospera.ai",
    summary: "Puts market research, paper trading, and strategy backtests in one place.",
    description:
      "Investment research is scattered across price feeds, headlines, and spreadsheets. Prospera brings those inputs together: a shared market-data service powers paper portfolios, news and company scorecards feed explainable Buy/Hold/Sell signals, and SIP or lump-sum backtests show historical risk and return. The backend runs locally; its Next.js interface is still being built.",
    stack: ["Python", "FastAPI", "SQLite", "Next.js", "pytest", "GitHub Actions"],
    githubUrl: "https://github.com/vishesh-banna0/prospera.ai",
    featured: true,
    status: "building",
    year: "2025–26",
  },
  {
    slug: "manos-ai",
    title: "Manos AI",
    summary: "Turns study documents into source-backed flashcards and a review plan for weak topics.",
    description:
      "Long PDFs are hard to turn into focused revision, and reviewing every topic equally wastes time. Manos extracts and semantically chunks study documents, retrieves supporting passages with FAISS and lexical search, then plans, writes, and critiques flashcards tied to those passages. Review history drives SM-2 scheduling and follow-up for weaker topics.",
    stack: ["Python", "FastAPI", "PostgreSQL", "FAISS", "Ollama", "React"],
    githubUrl: "https://github.com/vishesh-banna0/manOS-ai",
    featured: true,
    status: "building",
    year: "2025–26",
  },
  {
    slug: "multilingual-entity-resolution",
    title: "Multilingual Entity Resolution",
    summary: "Links messy business listings across languages so one company is not counted as several.",
    description:
      "Different spellings, scripts, and addresses make it hard to tell whether business records from three sources describe the same entity. The pipeline retrieves likely pairs, ranks them with XGBoost and a graph model, reranks ambiguous cases with XLM-R, and selects links with expected-F0.5 decoding. On held-out simulated-prior validation across 357,966 reference entities, it reached 0.99078 macro F0.5, 99.87% pair precision, and 97.44% pair recall. These are local validation results, not leaderboard scores; the team ranked 206 in Amazon ML Challenge 2026.",
    stack: ["Python", "XGBoost", "PyTorch", "XLM-R", "Graph Neural Network"],
    githubUrl: "https://github.com/vishesh-banna0/multilingual-entity-resolution",
    featured: true,
    year: "2026",
  },
  {
    slug: "newstack-ai",
    title: "NewStack AI",
    summary: "Cuts through AI news overload with a daily email digest tuned to the reader's interests.",
    description:
      "AI updates are spread across feeds and long videos. NewStack collects RSS articles and YouTube transcripts, converts them to readable text, summarizes them with LLMs, ranks items against a reader profile, and emails a curated digest without resending the same story.",
    stack: ["Python", "PostgreSQL", "SQLAlchemy", "LLMs", "Docker"],
    githubUrl: "https://github.com/vishesh-banna0/NewStack-AI",
    status: "shipped",
    year: "2025",
  },
  {
    slug: "cinematch",
    title: "CineMatch.ai",
    summary: "Finds films from a viewer's rating history instead of showing everyone the same popular titles.",
    description:
      "Popular-movie lists ignore individual taste. CineMatch trains separate user and film towers on MovieLens 10M ratings, stores film embeddings in FAISS, and retrieves unseen titles near a viewer's embedding. A FastAPI endpoint and Streamlit demo serve recommendations; full-catalogue Recall@10 and NDCG@10 are compared with a popularity baseline.",
    stack: ["Python", "PyTorch", "FAISS", "FastAPI", "Streamlit"],
    githubUrl: "https://github.com/vishesh-banna0/CineMatch",
    status: "shipped",
    year: "2026",
  },
  {
    slug: "revisit",
    title: "ReVisit",
    summary: "Shows which solved coding problems to review before they fade from memory.",
    description:
      "Solving a problem once does not mean it will still be familiar in an interview. ReVisit records attempts, hints, confidence, and revision history, then estimates mastery and schedules the next review from those signals. Its FastAPI backend and Next.js frontend recommend weak patterns or overdue problems and explain why each one comes next.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Supabase Auth", "Next.js"],
    githubUrl: "https://github.com/vishesh-banna0/ReVisit",
    status: "building",
    year: "2026",
  },
  {
    slug: "retail-operations-copilot",
    title: "Retail Operations Copilot",
    summary: "Helps retail teams triage incidents using policy evidence and operational CSV data.",
    description:
      "Store issues are hard to prioritize when policies and operational records live in separate files. This local Streamlit and CLI assistant classifies a request, applies fixed priority and escalation rules, retrieves relevant policy sections, and computes answers for supported CSV questions. It masks sensitive details and leaves actions for human review.",
    stack: ["Python", "Streamlit", "ChromaDB", "pandas", "OpenRouter"],
    githubUrl: "https://github.com/vishesh-banna0/HCLTech-Hackathon",
    status: "shipped",
    year: "2026",
  },
  {
    slug: "sales-forecasting",
    title: "Multi-State Sales Forecasting",
    summary: "Forecasts sales by state for the next 56 days while comparing four modelling approaches.",
    description:
      "State-level sales data can have missing days and inconsistent dates, making forecasts difficult to compare. This pipeline cleans the daily series, creates lag and calendar features, compares ARIMA, Prophet, XGBoost, and LSTM using chronological validation, and serves the saved 56-day forecasts through FastAPI.",
    stack: ["Python", "XGBoost", "LSTM", "Prophet", "FastAPI"],
    githubUrl: "https://github.com/vishesh-banna0/microgcc_assignment",
    status: "shipped",
    year: "2026",
  },
  {
    slug: "rag-components",
    title: "RAG Components",
    summary: "Provides reusable document search pieces that keep results tied to their source pages.",
    description:
      "Document assistants need a reliable way to find the right passage before generating an answer. RAG Components extracts PDF and text content, chunks it with page provenance, builds local embeddings and FAISS indexes, and offers dense, BM25, or hybrid retrieval. Optional reranking and image retrieval extend the search layer; answer generation is left to the app using it.",
    stack: ["Python", "FAISS", "BM25", "BGE", "CLIP"],
    githubUrl: "https://github.com/vishesh-banna0/RAG-Components",
    status: "shipped",
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
