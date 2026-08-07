import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Code2, Globe } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

export const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "nav.home", href: "#home" },
    { key: "nav.about", href: "#about" },
    { key: "nav.skills", href: "#skills" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.blog", href: "#blog" },
    { key: "nav.contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-300/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-white font-bold text-xl"
          >
            <Code2 className="w-6 h-6 text-primary" />
            <span>Portfolio</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  index === 0 ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {t(item.key)}
                {index === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLanguage === "en" ? "VI" : "EN"}</span>
            </button>

            {/* Hire Me Button */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="hidden sm:block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
            >
              {t("nav.hireMe")} ↗
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-400 hover:text-white transition-colors text-left text-sm font-medium"
                >
                  {t(item.key)}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#contact")}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-all w-full"
              >
                {t("nav.hireMe")} ↗
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
