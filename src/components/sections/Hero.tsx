import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download, ArrowUpRight, Code2 } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";

export const Hero = () => {
  const { t } = useTranslation();

  const techIcons = [
    { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
    { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
    { icon: SiReact, color: "#61DAFB", label: "React" },
    { icon: SiNextdotjs, color: "#FFFFFF", label: "Next.js" },
    { icon: SiNodedotjs, color: "#339933", label: "Node.js" },
    { icon: SiPython, color: "#3776AB", label: "Python" },
    { icon: SiMongodb, color: "#47A248", label: "MongoDB" },
    { icon: SiMysql, color: "#4479A1", label: "MySQL" },
    { icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  ];

  return (
    <section
      id="home"
      className="scroll-mt-16 h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: "#000612" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full mb-6"
            >
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                I'M A BACKEND DEVELOPER
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-5xl font-bold text-white mb-3 leading-tight"
            >
              {t("hero.greeting")}{" "}
              <span className="text-gradient">{t("hero.name")}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl lg:text-5xl font-bold text-white mb-5"
            >
              {t("hero.tagline")}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-400 text-xl mb-6 max-w-lg leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
              >
                {t("hero.viewWork")}
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button className="inline-flex items-center gap-2 bg-dark-200 hover:bg-dark-400 text-white px-6 py-3 rounded-lg font-medium transition-all border border-white/10">
                {t("hero.downloadCV")}
                <Download className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Tech Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                {t("hero.technologies")}
              </p>
              <div className="flex flex-wrap gap-3">
                {techIcons.map((tech) => (
                  <div
                    key={tech.label}
                    className="w-10 h-10 rounded-xl bg-dark-200 border border-white/5 flex items-center justify-center hover:border-primary/50 transition-all duration-300 hover:scale-110"
                    title={tech.label}
                  >
                    <tech.icon
                      className="w-5 h-5"
                      style={{ color: tech.color }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Full Avatar Image + Code Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-end justify-center relative h-[580px]"
          >
            {/* Full Avatar Image */}
            <div className="h-full w-full flex items-end justify-center">
              <img
                src="/images/avatar/avatar.jpg"
                alt="Tấn Sanh - Backend Developer"
                className="h-full w-auto object-cover object-bottom"
              />
            </div>

            {/* Code Widget - Positioned in front of avatar */}
            <div className="absolute top-[250px] left-[400px] z-30">
              <div className="bg-dark-200/90 backdrop-blur-sm rounded-2xl border border-white/10 p-4 w-56">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500 text-sm">Code</span>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>

                {/* Code Content */}
                <pre className="text-[10px] font-mono leading-relaxed">
                  <code>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">developer</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-yellow-400">{"{"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">name</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-orange-300">"{t("hero.name")}"</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">skills</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-yellow-400">[</span>
                    <span className="text-orange-300">"Node.js"</span>
                    <span className="text-white">,</span>{" "}
                    <span className="text-orange-300">"NextJS"</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    {"    "}
                    <span className="text-orange-300">"Python"</span>
                    <span className="text-white">,</span>{" "}
                    <span className="text-orange-300">"Java"</span>
                    <span className="text-yellow-400">]</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">passion</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-orange-300">"Building things</span>
                    {"\n"}
                    {"    "}
                    <span className="text-orange-300">"for the web"</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    <span className="text-yellow-400">{"}"}</span>
                    <span className="text-white">;</span>
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
