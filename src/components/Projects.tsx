import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ProjectModal from './ProjectModal';

const projectsData = [
  {
    id: 1,
    title: 'NewStack AI',
    summary: 'An AI news aggregator and summarization platform',
    description:
      'NewsStack AI is an end-to-end AI-powered news aggregation system that collects, summarizes, ranks, and delivers personalized daily AI updates from multiple sources.',
    image: 'https://www.brookings.edu/wp-content/uploads/2024/07/shutterstock_2322921091-2.jpg?quality=75',
    technologies: ['Python', 'PostgreSQL', 'SQLAlchemy', 'Pydantic', 'OpenAI API', 'LLMs', 'RSS (feedparser)', 'YouTube Transcript API', 'Gmail SMTP', 'Docker', 'UV']
,
    githubUrl: 'https://github.com/vishesh-banna0/NewStack-AI',
    liveUrl: '',
  },
  
  {
    id: 2,
    title: 'Stable Diffusion Project – Text-to-Image Generation',
    summary: 'Latent diffusion-based text-to-image generation system',
    description:
      'Worked with Stable Diffusion architecture for high-resolution image synthesis. Explored fine-tuning techniques, prompt conditioning, and sampling optimization to improve image quality and generation efficiency.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.QuGFYK-ebV04QATxOpRFEQHaFi?rs=1&pid=ImgDetMain&o=7&rm=3',
    technologies: ['Python', 'PyTorch', 'Stable Diffusion', 'CLIP', 'VAE'],
    githubUrl: 'https://github.com/vishesh-banna0/stable-diffusion-model',
    liveUrl: 'https://huggingface.co/spaces/THEGODX/Text-To-Image-Generation',
  },
  {
    id: 3,
    title: 'Voyage AI – Intelligent Trip Planner Agent',
    summary: 'Autonomous AI agent for smart travel planning',
    description:
      'An AI-powered travel planning agent that leverages LLMs and external APIs to generate personalized itineraries. Features include multi-step reasoning, dynamic tool usage, contextual memory, and real-time destination recommendations.',
    image: 'https://mihcm.com/wp-content/uploads/2024/12/Agentic-AI-the-new-breakthrough.webp',
    technologies: ['Python', 'LangChain', 'LLMs', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/vishesh-banna0/VoyageAI',
    liveUrl: '',
  },

  {
    id: 4,
    title: 'Denoising Diffusion Probabilistic Models (DDPM) – Paper Implementation',
    summary: 'From-scratch implementation of DDPM for image generation',
    description:
      'A research-focused implementation of the DDPM paper, covering forward and reverse diffusion processes, noise scheduling, and U-Net based architecture. Conducted experiments on sampling steps and noise variance to improve convergence stability and visual fidelity.',
    image: 'https://sushant-kumar.com/blog/ddpm-diffusion-process.png',
    technologies: ['Python', 'PyTorch', 'U-Net', 'Diffusion Models'],
    githubUrl: 'https://github.com/vishesh-banna0/Denoising-Diffusion-Probabilistic-Model-Implementation',
    liveUrl: '',
  },

  
 {
  id: 5,
  title: 'Next AI System – Coming Soon',
  summary: 'Currently building something impactful in AI',
  description:
    'An upcoming AI-driven project focused on solving real-world problems using advanced machine learning and generative AI techniques. Details will be revealed soon.',
  image: 'https://wallpapers.com/images/hd/black-and-white-coming-soon-bzi46iyao5sx2kc6.jpg',
  technologies: ['AI', 'Machine Learning', 'Generative AI'],
  githubUrl: '',
  liveUrl: '',
},

];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6">
        <div ref={ref}>
          <h2 
            className={`section-title text-center mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Projects
          </h2>
          <p 
            className={`text-muted-foreground text-center mb-12 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            A showcase of my work in AI, machine learning, and software development.
          </p>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projectsData.map((project, index) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`glass-card overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.summary}
                  </p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" 
                  style={{
                    boxShadow: '0 0 30px hsl(195 100% 50% / 0.2), 0 0 60px hsl(270 80% 60% / 0.1)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
