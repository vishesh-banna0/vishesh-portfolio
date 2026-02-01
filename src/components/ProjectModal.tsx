import { X, Github, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-in" />
      
      {/* Modal */}
      <div 
        className="relative glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Project Image */}
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-xl">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* GitHub Button */}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2 flex-1"
              >
                <Github size={18} />
                GitHub Repository
              </a>
            )}

            {/* Live Demo Button (Only if exists) */}
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 flex-1"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
