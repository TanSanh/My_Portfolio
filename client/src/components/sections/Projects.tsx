import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { projectService, Project } from "../../services/projectService";

export const Projects = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as "en" | "vi";
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const normalizedOffset =
      (offset + totalProjects) % totalProjects > totalProjects / 2
        ? ((offset + totalProjects) % totalProjects) - totalProjects
        : (offset + totalProjects) % totalProjects;

    const show5Cards = totalProjects >= 5;

    if (normalizedOffset === 0) {
      // Center card
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
      };
    } else if (show5Cards) {
      // 2-1-2 layout for 5+ projects
      if (normalizedOffset === -1) {
        // Left inner
        return {
          x: -280,
          z: -150,
          rotateY: 25,
          scale: 0.85,
          opacity: 0.85,
          zIndex: 8,
        };
      } else if (normalizedOffset === 1) {
        // Right inner
        return {
          x: 280,
          z: -150,
          rotateY: -25,
          scale: 0.85,
          opacity: 0.85,
          zIndex: 8,
        };
      } else if (normalizedOffset === -2) {
        // Left outer
        return {
          x: -480,
          z: -300,
          rotateY: 40,
          scale: 0.7,
          opacity: 0.5,
          zIndex: 6,
        };
      } else if (normalizedOffset === 2) {
        // Right outer
        return {
          x: 480,
          z: -300,
          rotateY: -40,
          scale: 0.7,
          opacity: 0.5,
          zIndex: 6,
        };
      } else {
        // Hidden
        return {
          x: normalizedOffset > 0 ? 700 : -700,
          z: -500,
          rotateY: normalizedOffset > 0 ? -45 : 45,
          scale: 0.5,
          opacity: 0,
          zIndex: 1,
        };
      }
    } else {
      // 1-1-1 layout for <=4 projects
      if (
        normalizedOffset === -1 ||
        (normalizedOffset === totalProjects - 1 && totalProjects <= 3)
      ) {
        // Left card
        return {
          x: -300,
          z: -200,
          rotateY: 30,
          scale: 0.82,
          opacity: 0.75,
          zIndex: 5,
        };
      } else if (
        normalizedOffset === 1 ||
        (normalizedOffset === -(totalProjects - 1) && totalProjects <= 3)
      ) {
        // Right card
        return {
          x: 300,
          z: -200,
          rotateY: -30,
          scale: 0.82,
          opacity: 0.75,
          zIndex: 5,
        };
      } else {
        // Hidden
        return {
          x: normalizedOffset > 0 ? 600 : -600,
          z: -400,
          rotateY: normalizedOffset > 0 ? -45 : 45,
          scale: 0.6,
          opacity: 0,
          zIndex: 1,
        };
      }
    }
  };

  if (loading) {
    return (
      <section
        id="projects"
        className="scroll-mt-16 h-screen flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: "#040B1D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 w-full">
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
        className="scroll-mt-16 h-screen flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: "#040B1D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 w-full">
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
        className="scroll-mt-16 h-screen flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: "#040B1D" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 w-full">
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
      className="scroll-mt-16 h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#040B1D" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("projects.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t("projects.titleHighlight")}
            </span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          />
        </motion.div>

        {/* Coverflow Carousel */}
        <div
          className="relative h-[440px] flex items-center justify-center"
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
                    className="absolute group/card"
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
                      marginLeft: "-140px",
                      transformStyle: "preserve-3d",
                      zIndex: style.zIndex,
                    }}
                  >
                    <div
                      className={`w-[280px] h-[380px] bg-dark-200/80 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "border-2 border-primary/50 shadow-2xl shadow-primary/20 group-hover/card:shadow-primary/40 group-hover/card:border-primary/70"
                          : "border border-white/10 group-hover/card:border-white/20"
                      }`}
                      onClick={() => {
                        if (!isActive) {
                          setActiveIndex(index);
                        }
                      }}
                    >
                      {/* Project Image */}
                      <div className="relative h-44 bg-dark-400 overflow-hidden">
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover/card:from-primary/20 group-hover/card:to-secondary/15 transition-all duration-500" />

                        {/* Project Image or Code icon fallback */}
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title[currentLang]}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Code2
                              className={`w-14 h-14 transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-12 ${
                                isActive
                                  ? "text-primary/60 group-hover/card:text-primary/80"
                                  : "text-gray-600 group-hover/card:text-gray-500"
                              }`}
                            />
                          </div>
                        )}

                        {/* Hover Overlay - Only on active card */}
                        {isActive && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <motion.span
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="bg-white text-dark-300 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg"
                            >
                              {t("projects.viewProject")}
                              <ArrowUpRight className="w-4 h-4" />
                            </motion.span>
                          </motion.a>
                        )}

                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute top-3 right-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-5">
                        <h3
                          className={`text-base font-bold mb-2 transition-all duration-300 ${
                            isActive
                              ? "text-white group-hover/card:text-primary"
                              : "text-gray-300 group-hover/card:text-white"
                          }`}
                        >
                          {project.title[currentLang]}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2 group-hover/card:text-gray-300 transition-colors duration-300">
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
            className="absolute left-4 lg:left-8 z-30 w-12 h-12 rounded-full bg-dark-200/80 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-4 lg:right-8 z-30 w-12 h-12 rounded-full bg-dark-200/80 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
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
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
              className="h-2.5 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
