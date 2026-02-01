import { useState, useEffect, useRef } from 'react';
import { Download, Mail, Linkedin, Github } from 'lucide-react';
import TypewriterText from './TypewriterText';
import AnimatedProfileFrame from './AnimatedProfileFrame';

const roles = [
  'Generative AI Specialist',
  'Agentic AI & LLM Systems Practioner',
  'AI/ML Enthusiast',
  'Aspiring AI/ML Engineer',
  'M.Tech AI @NITJ',
  '300+ DSA Problem Solved',
  'Top 99.91%ile @GateOverflow',
  'Top 32%  @LeetCode',
  'Diffusion Model Practitioner',
  'Kaggler'
];


const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, hsl(195 100% 50% / 0.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(195 100% 50% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(195 100% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Profile Image */}
        <div 
          className="relative"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <AnimatedProfileFrame 
            imageUrl="/profile.jpeg" 
            alt="Vishy"
          />
        </div>

        {/* Content */}
        <div 
          className="flex-1 text-center lg:text-left"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-foreground">Vishesh</span>{' '}
            <span className="gradient-text">Shekhawat</span>
          </h1>
          
          <div className="text-xl md:text-2xl mb-8 h-8">
            <TypewriterText texts={roles} />
          </div>

          <p className="text-muted-foreground text-lg mb-8 max-w-xl">
            I’m exploring the evolving world of AI and Generative AI with one goal to build systems that don’t just perform well, but genuinely make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <a 
              href="/vishesh_2026.pdf" 
              download
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Download size={20} />
               Download CV
            </a>

            <button 
              onClick={scrollToContact}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <a 
              href="https://linkedin.com/in/vishesh-shekhawat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border bg-card hover:border-primary hover:glow-primary transition-all duration-300"
            >
              <Linkedin size={24} className="text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://github.com/vishesh-banna0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border bg-card hover:border-primary hover:glow-primary transition-all duration-300"
            >
              <Github size={24} className="text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
