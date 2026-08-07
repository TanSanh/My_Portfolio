import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Code2, Users, Award, User } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Calendar,
      value: t('about.stats.experience.value'),
      label: t('about.stats.experience.label'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Code2,
      value: t('about.stats.projects.value'),
      label: t('about.stats.projects.label'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Users,
      value: t('about.stats.clients.value'),
      label: t('about.stats.clients.label'),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Award,
      value: t('about.stats.satisfaction.value'),
      label: t('about.stats.satisfaction.label'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <section id="about" className="py-12 lg:py-16" style={{ backgroundColor: '#040B1B' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('about.title')}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t('about.subtitle')}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Button */}
            <button className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
              {t('about.learnMore')}
              <User className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Right Content - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-dark-200/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
