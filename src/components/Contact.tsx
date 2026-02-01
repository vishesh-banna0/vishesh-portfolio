import { Mail, Linkedin, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <div ref={ref}>
          <h2
            className={`section-title text-center mb-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            Contact Me
          </h2>

          <p
            className={`text-muted-foreground text-center mb-12 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>

          {/* Contact Cards */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-3xl mx-auto">
            
            {/* Email */}
            <a
              href="mailto:visheshbanna0@outlook.com"
              className={`glass-card p-6 flex items-center gap-4 flex-1 group transition-all duration-500 hover:scale-[1.02] ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:glow-primary transition-all">
                <Mail size={24} />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground text-sm break-words">
                  visheshbanna0@outlook.com
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/vishesh-shekhawat"
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card p-6 flex items-center gap-4 flex-1 group transition-all duration-500 hover:scale-[1.02] ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:glow-primary transition-all">
                <Linkedin size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-foreground">LinkedIn</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with me
                </p>
              </div>
            </a>

            {/* Location */}
            <div
              className={`glass-card p-6 flex items-center gap-4 flex-1 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Location</h3>
                <p className="text-muted-foreground text-sm">
                  Jalandhar, Punjab, India
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
