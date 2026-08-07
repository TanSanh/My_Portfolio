import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { skills, getSkillIconUrl } from "../../data/skills";

export const Skills = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section
      id="skills"
      className="scroll-mt-16 h-screen flex flex-col justify-center"
      style={{ backgroundColor: "#000612" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
            {t("skills.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t("skills.titleHighlight")}
            </span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-2xl bg-[#0a0a1a] border border-white/[0.06] hover:border-primary/40 transition-all duration-300 cursor-default"
            >
              <img
                src={getSkillIconUrl(skill.icon)}
                alt={skill.name}
                className="w-9 h-9"
                loading="lazy"
              />
              <div className="text-center">
                <p className="text-[11px] font-semibold text-white group-hover:text-primary transition-colors leading-tight">
                  {skill.name}
                </p>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">
                  {isEn ? skill.label : skill.labelVi}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
