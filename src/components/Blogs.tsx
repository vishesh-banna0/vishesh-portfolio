import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const blogsData = [
  {
    id: 1,
    title: 'Physics Behind Diffusion Models',
    preview:
      'From Brownian motion to Stable Diffusion how physics shapes the world of generative AI.',
    image:
      '/blog1.png',
    url: 'https://vishesh-banna-blog1.blogspot.com/2025/11/welcome-file-physics-behind-diffusion.html',
  },
  {
    id: 2,
    title: 'Scikit-Learn Design: Building a Machine Learning Library',
    preview:
      'Learn how diffusion models work and how to implement your own image generation systemWhile reading Hands-On Machine Learning, I stumbled upon a section about Scikit-Learn’s design..',
    image:
      '/blog2.png',
    url: 'https://medium.com/@vishycodes/scikit-learn-design-4bde25b38cc3',
  },
  {
    id: 3,
    title: 'More Blogs Coming Soon',
    preview:
      'Stay tuned for more insights and tutorials on AI, machine learning, and technology topics.',
    image:
      'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg?w=2000',
    url: '',
  },
];

const Blogs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="blogs" className="py-20 md:py-32 relative">
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div ref={ref}>
          <h2
            className={`section-title text-center mb-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            Blogs
          </h2>

          <p
            className={`text-muted-foreground text-center mb-12 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Thoughts, tutorials, and insights on AI, machine learning, and technology.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {blogsData.map((blog, index) => (
              <article
                key={blog.id}
                className={`relative glass-card overflow-hidden group transition-all duration-500 hover:scale-[1.02] ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Blog Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {blog.preview}
                  </p>

                  {blog.url ? (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all"
                    >
                      Read Blog
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium opacity-60 cursor-not-allowed">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                  style={{
                    boxShadow: '0 0 25px hsl(195 100% 50% / 0.15)',
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
