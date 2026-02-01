import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const educationData = [
  {
    degree: 'M.Tech in Artificial Intelligence',
    institution: 'National Institute of Technology, Jalandhar',
    shortName: 'NIT Jalandhar',
    period: '2025 - Present',
    location: 'Jalandhar, Punjab',
    cgpa: '8.78 / 10',
    description:
      'Pursuing advanced studies in AI/ML with focus on deep learning, computer vision, and natural language processing. Engaged in cutting-edge research and development of AI systems.',
    image:
      'https://www.nitj.ac.in/nitj_files/links/MAIN_BUILDING_77768.png',
  },
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'SobhaSaria Group of Institutions',
    shortName: 'SGI Sikar',
    period: '2020 - 2024',
    location: 'Sikar, Rajasthan',
    cgpa: '8.45 / 10',
    description:
      'Built a strong foundation in computer science fundamentals, data structures, algorithms, and software development. Developed passion for machine learning and AI technologies.',
    image:
      'https://www.campusoption.com/images/colleges/gallery/22_12_16_094219_new_banner.jpg',
  },
];

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-20 md:py-32 relative">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title text-center mb-4">Education</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            My academic journey that shaped my expertise in AI and Computer Science
          </p>

          <div className="space-y-8 max-w-5xl mx-auto">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={edu.image}
                    alt={edu.institution}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1 max-w-2xl">
                      
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4 backdrop-blur-sm border border-primary/20">
                        <GraduationCap size={18} />
                        <span className="text-sm font-medium">{edu.shortName}</span>
                      </div>

                      {/* Degree */}
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {edu.degree}
                      </h3>

                      {/* Institution */}
                      <p className="text-lg text-foreground/90 mb-2">
                        {edu.institution}
                      </p>

                      {/* CGPA Badge */}
                      <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/15 text-primary text-sm font-semibold border border-primary/20 backdrop-blur-sm">
                        CGPA: {edu.cgpa}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {edu.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={16} className="text-primary" />
                          <span>{edu.period}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={16} className="text-primary" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Right Icon */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                        <GraduationCap size={48} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
