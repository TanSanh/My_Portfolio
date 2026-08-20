import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { Magnetic } from "../ui/Magnetic";

export const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Guard: suppress scroll-based detection during programmatic scroll
  const scrollingToRef = useRef<string | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const lenis = (window as any).__lenis;
      if (lenis) lenis.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        const lenis = (window as any).__lenis;
        if (lenis) lenis.start();
      }, 50);
      return () => clearTimeout(timer);
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      const lenis = (window as any).__lenis;
      if (lenis) lenis.start();
    };
  }, [isMenuOpen]);

  const navItems = [
    { key: "nav.home", href: "#home", id: "home" },
    { key: "nav.about", href: "#about", id: "about" },
    { key: "nav.skills", href: "#skills", id: "skills" },
    { key: "nav.projects", href: "#projects", id: "projects" },
    { key: "nav.contact", href: "#contact", id: "contact" },
  ];

  // Section detection — Lenis callback + scroll fallback
  useEffect(() => {
    const detectActiveSection = () => {
      if (scrollingToRef.current) return;

      let bestId = "home";
      let bestOffset = Infinity;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.top > -rect.height * 0.6) {
          if (rect.top <= bestOffset) {
            bestOffset = rect.top;
            bestId = item.id;
          }
        }
      }
      setActiveSection(bestId);
    };

    // Try Lenis native callback first
    const lenis = (window as any).__lenis;
    let destroyLenis: (() => void) | undefined;

    if (lenis && typeof lenis.on === "function") {
      destroyLenis = lenis.on("scroll", detectActiveSection);
      detectActiveSection();
    }

    // Scroll event fallback
    let ticking = false;
    const handleScroll = () => {
      if (scrollingToRef.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        detectActiveSection();
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver backup
    const observer = new IntersectionObserver(
      () => {
        if (!scrollingToRef.current) detectActiveSection();
      },
      { rootMargin: "-64px 0px -50% 0px", threshold: 0 }
    );
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      if (destroyLenis) destroyLenis();
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");

    // 1) Set active section immediately
    setActiveSection(id);

    // 2) Lock scroll detection
    scrollingToRef.current = id;

    // 3) Close mobile menu (triggers Lenis restart in useEffect)
    setIsMenuOpen(false);

    // 4) Wait for Lenis to be fully ready, then scroll
    const doScroll = () => {
      const lenis = (window as any).__lenis;
      const finishScroll = () => {
        scrollingToRef.current = null;
        setActiveSection(id);
      };

      if (href === "#home") {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2, onComplete: finishScroll });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(finishScroll, 1300);
        }
        return;
      }

      const element = document.getElementById(id);
      if (!element) {
        finishScroll();
        return;
      }

      if (lenis) {
        // Force Lenis to be running before scrollTo
        if (typeof lenis.start === "function") lenis.start();
        lenis.scrollTo(element, {
          offset: -64,
          duration: 1.2,
          onComplete: finishScroll,
        });
      } else {
        const y =
          element.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: "smooth" });
        setTimeout(finishScroll, 1300);
      }
    };

    // Delay to ensure Lenis has restarted after menu close
    setTimeout(doScroll, 200);
  }, []);

  return (
    <>
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
        </nav>
      </motion.header>

      {/* Mobile Menu — full-screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="fixed top-16 left-0 right-0 z-50 bg-dark-300 border-b border-white/5 md:hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-4 py-4">
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
          </>
        )}
      </AnimatePresence>
    </>
  );
};
