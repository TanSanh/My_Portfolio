import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Facebook,
  Mail,
  Phone,
  Quote,
} from 'lucide-react';

export const Contact = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/TanSanh', label: 'GitHub' },
    { icon: Facebook, href: 'https://www.facebook.com/share/195xNBvtdP/?mibextid=wwXIfr', label: 'Facebook' },
  ];

  return (
    <section id="contact" className="scroll-mt-16 py-20 lg:py-32 bg-dark-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Content - 3 columns */}
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('contact.title')}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {t('contact.subtitle')}
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t('contact.description')}
            </p>
            <a
              href="mailto:hotansanh0304@gmail.com"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
            >
              {t('contact.getInTouch')}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Middle - Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-dark-200/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Testimonial Content */}
              <div className="pt-6">
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "{t('contact.testimonial.quote')}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    TS
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {t('contact.testimonial.author')}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {t('contact.testimonial.role')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">
              {t('contact.followMe')}
            </p>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-dark-200 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 transition-all duration-300 hover:scale-110"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="mailto:hotansanh0304@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span>hotansanh0304@gmail.com</span>
              </a>
              <a
                href="tel:0779518027"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>0779 518 027</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
