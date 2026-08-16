import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { projectService, Project } from "../../services/projectService";
import { AnimatedText } from "../ui/AnimatedText";

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "vi";
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = projects.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const getCardStyle = useCallback((index: number) => {
    const offset = index - activeIndex;
    const normalizedOffset =
      (offset + totalProjects) % totalProjects > totalProjects / 2
        ? ((offset + totalProjects) % totalProjects) - totalProjects
        : (offset + totalProjects) % totalProjects;

    const show5Cards = totalProjects >= 5;

    // Responsive multiplier for mobile
    const m = isMobile ? 0.5 : 1;

    if (normalizedOffset === 0) {
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
      };
    } else if (show5Cards) {
      if (normalizedOffset === -1) {
        return {
          x: -280 * m,
          z: -150,
          rotateY: 25,
          scale: isMobile ? 0.75 : 0.85,
          opacity: 0.85,
          zIndex: 8,
        };
      } else if (normalizedOffset === 1) {
        return {
          x: 280 * m,
          z: -150,
          rotateY: -25,
          scale: isMobile ? 0.75 : 0.85,
          opacity: 0.85,
          zIndex: 8,
        };
      } else if (normalizedOffset === -2) {
        return {
          x: -480 * m,
          z: -300,
          rotateY: 40,
          scale: isMobile ? 0.6 : 0.7,
          opacity: isMobile ? 0.3 : 0.5,
          zIndex: 6,
        };
      } else if (normalizedOffset === 2) {
        return {
          x: 480 * m,
          z: -300,
          rotateY: -40,
          scale: isMobile ? 0.6 : 0.7,
          opacity: isMobile ? 0.3 : 0.5,
          zIndex: 6,
        };
      } else {
        return {
          x: normalizedOffset > 0 ? 700 * m : -700 * m,
          z: -500,
          rotateY: normalizedOffset > 0 ? -45 : 45,
          scale: 0.5,
          opacity: 0,
          zIndex: 1,
        };
      }
    } else {
      if (
        normalizedOffset === -1 ||
        (normalizedOffset === totalProjects - 1 && totalProjects <= 3)
      ) {
        return {
          x: -300 * m,
          z: -200,
          rotateY: 30,
          scale: isMobile ? 0.72 : 0.82,
          opacity: 0.75,
          zIndex: 5,
        };
      } else if (
        normalizedOffset === 1 ||
        (normalizedOffset === -(totalProjects - 1) && totalProjects <= 3)
      ) {
        return {
          x: 300 * m,
          z: -200,
          rotateY: -30,
          scale: isMobile ? 0.72 : 0.82,
          opacity: 0.75,
          zIndex: 5,
        };
      } else {
        return {
          x: normalizedOffset > 0 ? 600 * m : -600 * m,
          z: -400,
          rotateY: normalizedOffset > 0 ? -45 : 45,
          scale: 0.6,
          opacity: 0,
          zIndex: 1,
        };
      }
    }
  }, [activeIndex, totalProjects, isMobile]);

  if (loading) {
    return (
      <section
        id="projects"
        className="scroll-mt-16 min-h-screen lg:h-screen lg:overflow-hidden overflow-hidden"
        style={{ backgroundColor: "#040B1D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 w-full">
          <div className="flex items-center justify-center h-[440px]">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="scroll-mt-16 min-h-screen lg:h-screen lg:overflow-hidden overflow-hidden"
        style={{ backgroundColor: "#040B1D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 w-full">
          <div className="flex items-center justify-center h-[440px]">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (totalProjects === 0) {
    return (
      <section
        id="projects"
        className="scroll-mt-16 min-h-screen lg:h-screen lg:overflow-hidden overflow-hidden"
        style={{ backgroundColor: "#040B1D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 w-full">
          <div className="flex items-center justify-center h-[440px]">
            <p className="text-gray-400">No projects available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="scroll-mt-16 min-h-screen lg:h-screen lg:overflow-hidden overflow-hidden"
      style={{ backgroundColor: "#040B1D" }}
    >
      <style>{`
        @keyframes project-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1); }
          50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.2); }
        }
        .project-active-glow {
          animation: project-glow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-4 sm:mb-8"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedText text={t("projects.title") + " "} />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              <AnimatedText text={t("projects.titleHighlight")} delay={0.3} />
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-3"
          />
        </motion.div>

        {/* Coverflow Carousel */}
        <div
          className="relative h-[320px] sm:h-[440px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {/* Cards Container */}
          <div
            className="relative flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => {
                const style = getCardStyle(index);
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={project._id}
                    className={`absolute group/card rounded-2xl overflow-hidden ${isActive ? "project-active-glow" : ""}`}
                    initial={false}
                    animate={{
                      x: style.x,
                      z: style.z,
                      rotateY: style.rotateY,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    whileHover={isActive ? { scale: 1.03, z: 50 } : {}}
                    style={{
                      left: "50%",
                      marginLeft: isMobile ? "-120px" : "-140px",
                      transformStyle: "preserve-3d",
                      zIndex: style.zIndex,
                    }}
                  >
                    <div
                      className={`w-[240px] sm:w-[280px] h-[320px] sm:h-[380px] bg-dark-200/80 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20 group-hover/card:shadow-cyan-500/40 group-hover/card:border-cyan-500/70"
                          : "border border-white/10 group-hover/card:border-white/20"
                      }`}
                      onClick={() => {
                        if (!isActive) {
                          setActiveIndex(index);
                        }
                      }}
                    >
                      {/* Project Image */}
                      <div className="relative h-36 sm:h-44 bg-dark-400 overflow-hidden">
                        {/* Project Image or Code icon fallback */}
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title[currentLang]}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              whileHover={{ rotate: 12, scale: 1.2 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Code2
                                className={`w-14 h-14 transition-all duration-500 ${
                                  isActive
                                    ? "text-primary/60 group-hover/card:text-primary/80"
                                    : "text-gray-600 group-hover/card:text-gray-500"
                                }`}
                              />
                            </motion.div>
                          </div>
                        )}

                        {/* Active indicator with pulse */}
                        {isActive && (
                          <div className="absolute top-3 right-3">
                            <div className="relative">
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-3 sm:p-5">
                        <h3
                          className={`text-sm sm:text-base font-bold mb-1 sm:mb-2 transition-all duration-300 ${
                            isActive
                              ? "text-white group-hover/card:text-primary"
                              : "text-gray-300 group-hover/card:text-white"
                          }`}
                        >
                          {project.title[currentLang]}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed line-clamp-2 group-hover/card:text-gray-300 transition-colors duration-300">
                          {project.description[currentLang]}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <motion.span
                              key={tech}
                              initial={false}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className={`text-[10px] px-2 py-0.5 rounded-md border transition-all duration-300 cursor-default ${
                                isActive
                                  ? "bg-primary/20 text-primary border-primary/30 group-hover/card:bg-primary/30"
                                  : "bg-primary/10 text-primary/60 border-primary/15 group-hover/card:bg-primary/15"
                              }`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-[10px] px-2 py-0.5 bg-dark-300/50 text-gray-500 rounded-md group-hover/card:bg-dark-300/70 transition-colors duration-300">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 lg:left-8 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-200/80 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-8 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-200/80 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-2">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              animate={{
                width: i === activeIndex ? 32 : 10,
                backgroundColor: i === activeIndex ? "#8b5cf6" : "#4b5563",
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="h-2.5 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
