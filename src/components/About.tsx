import { Code, Brain, Lightbulb, Target } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const highlights = [
  {
    icon: Brain,
    title: 'AI/ML Expertise',
    description: 'Deep knowledge in machine learning, deep learning, and neural network architectures.',
  },
  {
  icon: Target,
  title: 'Diffusion Models',
  description: 'Building and experimenting with diffusion models for image generation and generative AI applications.',
  },

  {
    icon: Lightbulb,
    title: 'Research Driven',
    description: 'Active researcher exploring cutting-edge AI technologies and methodologies.',
  },
  {
    icon: Code,
    title: 'Problem Solver',
    description: 'Passionate about solving real-world problems through innovative AI solutions.',
  },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title text-center mb-4">About Me</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
           Deeply interested in AI and machine learning, I enjoy exploring how intelligent systems work and building solutions that move ideas into real-world impact.
          </p>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {/* Left - Story */}
            <div
              className={`glass-card p-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </span>
                My Journey
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
  I am currently pursuing my M.Tech in Artificial Intelligence at NIT Jalandhar, where my focus is on designing and developing advanced AI systems. My work centers around machine learning, deep learning, and generative AI, with an emphasis on building solutions that are both technically rigorous and practically impactful.
</p>

<p>
  I actively engage in applied problem-solving through data science competitions and structured algorithmic practice, continuously strengthening my analytical thinking and model-building skills. I value depth of understanding and aim to translate theoretical concepts into scalable, real-world implementations.
</p>

<p>
  Beyond formal academics, I explore emerging research in AI, experiment with new ideas through independent projects, and contribute to the broader tech community. My long-term objective is to help build intelligent systems that create meaningful and measurable impact.
</p>

              </div>
            </div>

            {/* Right - Highlights Grid */}
            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {[
              { value: '4+', label: 'Projects Completed' },
              { value: '300+', label: 'LeetCode Problems' },
              { value: '7+', label: 'Kaggle Competitions' },
              { value: '2+', label: 'Years in AI/ML' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 glass-card hover:border-primary/30 transition-colors duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
