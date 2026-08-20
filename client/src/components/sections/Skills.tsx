import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { skills, getSkillIconUrl } from "../../data/skills";
import { AnimatedText } from "../ui/AnimatedText";
import { Magnetic } from "../ui/Magnetic";

export const Skills = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section
      id="skills"
      className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col"
      style={{ backgroundColor: "#000612" }}
    >
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.3), 0 0 10px rgba(139, 92, 246, 0.1); }
          50% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.2); }
        }
        .skill-glow:hover {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Spacer to push content below header */}
      <div className="h-12 lg:h-16 shrink-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 lg:pb-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-3 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
            <AnimatedText text={t("skills.title") + " "} />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              <AnimatedText text={t("skills.titleHighlight")} delay={0.3} />
            </span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 sm:gap-3">
          {skills.map((skill, index) => (
            <Magnetic key={skill.name} strength={0.15}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.33, 1, 0.68, 1],
                }}
                whileHover={{ scale: 1.06, y: -6, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.98 }}
                className="skill-glow group flex flex-col items-center justify-center gap-1 sm:gap-2 py-2 sm:py-4 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl bg-[#0a0a1a] border border-white/[0.06] hover:border-primary/50 transition-all duration-300 cursor-default relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                {/* Icon */}
                <motion.img
                  src={getSkillIconUrl(skill.icon)}
                  alt={skill.name}
                  className="w-6 h-6 sm:w-9 sm:h-9 relative z-10"
                  loading="lazy"
                  whileHover={{
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.4 },
                  }}
                />

                {/* Text */}
                <div className="text-center relative z-10">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-white group-hover:text-primary transition-colors duration-300 leading-tight">
                    {skill.name}
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-gray-500 uppercase tracking-wider mt-0.5 group-hover:text-gray-400 transition-colors duration-300">
                    {isEn ? skill.label : skill.labelVi}
                  </p>
                </div>
              </motion.div>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
};
