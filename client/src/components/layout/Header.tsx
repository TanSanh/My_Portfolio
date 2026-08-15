import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Globe } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { Magnetic } from "../ui/Magnetic";

export const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { key: "nav.home", href: "#home", id: "home" },
    { key: "nav.about", href: "#about", id: "about" },
    { key: "nav.skills", href: "#skills", id: "skills" },
    { key: "nav.projects", href: "#projects", id: "projects" },
    { key: "nav.contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-300/80 backdrop-blur-md border-b border-white/5"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Magnetic strength={0.2}>
            <a href="#home" className="flex items-center gap-2 group">
              <motion.img
                src="/logo.jpg"
                alt="Logo"
                className="h-8 w-8 rounded-lg object-cover"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="text-white font-bold text-xl group-hover:text-primary transition-colors duration-300">
                Portfolio
              </span>
            </a>
          </Magnetic>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Magnetic key={item.key} strength={0.2}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-medium transition-colors relative pb-1 text-gray-400 hover:text-white group"
                  >
                    {t(item.key)}
                    {/* Animated underline */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </Magnetic>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Magnetic strength={0.2}>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm group"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>{currentLanguage === "en" ? "VI" : "EN"}</span>
              </button>
            </Magnetic>

            {/* Hire Me Button */}
            <Magnetic strength={0.15}>
              <button
                onClick={() => scrollToSection("#contact")}
                className="hidden sm:block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                {t("nav.hireMe")} ↗
              </button>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`transition-colors text-left text-sm font-medium ${
                        isActive
                          ? "text-white border-l-2 border-primary pl-3"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {t(item.key)}
                    </motion.button>
                  );
                })}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  onClick={() => scrollToSection("#contact")}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all w-full"
                >
                  {t("nav.hireMe")} ↗
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};
