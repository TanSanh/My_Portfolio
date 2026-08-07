import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { projects } from '../../data/projects';

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'vi';

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              {t('projects.title')}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            {t('projects.subtitle')}
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-dark-200/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-52 bg-dark-400 overflow-hidden">
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-white/80 text-sm font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Code2 className="w-16 h-16 text-gray-600 group-hover:text-primary/50 transition-colors duration-300" />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-dark-300 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      {t('projects.viewProject')}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title[currentLang]}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description[currentLang]}
                  </p>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                  >
                    {t('projects.viewProject')}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-10">
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
        </div>
      </div>
    </section>
  );
};
