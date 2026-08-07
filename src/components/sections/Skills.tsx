import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import { Progress } from '../ui/Progress';

export const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 lg:py-32 bg-dark-100/50">
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
              {t('skills.title')}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            {t('skills.subtitle')}
          </h2>
        </motion.div>

        {/* Skills List - 3 columns layout like mockup */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${skill.color}20` }}
                  >
                    <skill.icon
                      className="w-5 h-5"
                      style={{ color: skill.color }}
                    />
                  </div>
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
                <span className="text-gray-400 text-sm font-medium">
                  {skill.percentage}%
                </span>
              </div>
              <Progress percentage={skill.percentage} color={skill.color} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
