import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download, ArrowUpRight, Code2 } from "lucide-react";
import { AnimatedText } from "../ui/AnimatedText";
import { Magnetic } from "../ui/Magnetic";

export const Hero = () => {
  const { t } = useTranslation();

  const techIcons = [
    { icon: "javascript", label: "JavaScript" },
    { icon: "typescript", label: "TypeScript" },
    { icon: "react", label: "React" },
    { icon: "nextjs", label: "Next.js" },
    { icon: "nodejs", label: "Node.js" },
    { icon: "python", label: "Python" },
    { icon: "mongodb", label: "MongoDB" },
    { icon: "mysql", label: "MySQL" },
    { icon: "postgresql", label: "PostgreSQL" },
  ];

  return (
    <section
      id="home"
      className="scroll-mt-16 min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: "#000612" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-2 w-full">
        {/* Mobile Avatar - shown only on small screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="lg:hidden flex flex-col items-center mb-6"
        >
          <div className="relative mb-4">
            <img
              src="/images/avatar/avatar.jpg"
              alt="Tấn Sanh - Backend Developer"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover object-top border-4 border-primary/30 shadow-lg shadow-primary/20"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#000612]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Mobile Code Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="bg-dark-200/90 backdrop-blur-sm rounded-xl border border-white/10 p-3 w-56 hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-500 text-xs">Code</span>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
              </div>
              <pre className="text-[9px] font-mono leading-relaxed">
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
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/10 border border-primary/30 rounded-full mb-4 sm:mb-6"
            >
              <span className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider">
                I'M A BACKEND DEVELOPER
              </span>
            </motion.div>

            {/* Main Heading with Text Reveal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
              <AnimatedText text={t("hero.greeting")} delay={0.2} />
              <br />
              <span className="text-gradient">
                <AnimatedText text={t("hero.name")} delay={0.4} />
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-5xl font-bold text-white mb-3 sm:mb-5">
              <AnimatedText text={t("hero.tagline")} delay={0.5} />
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-gray-400 text-base sm:text-lg lg:text-xl mb-5 sm:mb-6 max-w-lg leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            {/* Buttons with Magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-wrap gap-3 sm:gap-4 mb-4"
            >
              <Magnetic strength={0.2}>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  {t("hero.viewWork")}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button className="group inline-flex items-center gap-2 bg-dark-200 hover:bg-dark-400 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5">
                  {t("hero.downloadCV")}
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
            </motion.div>

            {/* Tech Icons with staggered reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest mb-2">
                {t("hero.technologies")}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {techIcons.map((tech, index) => (
                  <Magnetic key={tech.label} strength={0.4}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.4 + index * 0.08,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-dark-200 border border-white/5 flex items-center justify-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                      title={tech.label}
                    >
                      <img
                        src={`https://skillicons.dev/icons?i=${tech.icon}`}
                        alt={tech.label}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </motion.div>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Avatar + Code Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="hidden lg:flex items-end justify-center relative h-[580px]"
          >
            {/* Full Avatar Image with gradient fade into background */}
            <div className="h-full w-full flex items-end justify-center relative">
              <img
                src="/images/avatar/avatar.jpg"
                alt="Tấn Sanh - Backend Developer"
                className="h-full w-auto object-cover object-bottom"
              />
              {/* Gradient overlays to blend image edges with background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000612] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#000612] via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#000612] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Code Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="absolute top-[250px] left-[400px] z-30"
            >
              <div className="bg-dark-200/90 backdrop-blur-sm rounded-2xl border border-white/10 p-4 w-56 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500 text-sm">Code</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-green-500"
                  />
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
