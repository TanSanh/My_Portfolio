import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Counter } from "../ui/Counter";
import { AnimatedText } from "../ui/AnimatedText";

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: t("about.stats.experience.value"),
      numValue: 1,
      suffix: "+",
      label: t("about.stats.experience.label"),
    },
    {
      value: t("about.stats.projects.value"),
      numValue: 15,
      suffix: "+",
      label: t("about.stats.projects.label"),
    },
    {
      value: t("about.stats.clients.value"),
      numValue: 5,
      suffix: "+",
      label: t("about.stats.clients.label"),
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-16 min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: "#040B1D" }}
    >
      {/* CSS Keyframes for swinging animation */}
      <style>{`
        @keyframes swing {
          0%, 100% {
            transform: rotate(-2deg) translateY(0);
          }
          33% {
            transform: rotate(1.5deg) translateY(-3px);
          }
          66% {
            transform: rotate(-1deg) translateY(0);
          }
        }
        .swing-animation {
          animation: swing 5s ease-in-out infinite;
          transform-origin: top center;
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-border {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #8b5cf6, #06b6d4);
          background-size: 300% 300%;
          animation: gradient-flow 4s ease infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            <AnimatedText text={t("about.title") + " "} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              <AnimatedText text={t("about.titleHighlight")} delay={0.3} />
            </span>
          </h2>
        </motion.div>

        {/* Main Card with Animated Gradient Border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl p-[1.5px] animated-gradient-border"
        >
          <div className="bg-[#0a0a1a] rounded-3xl p-4 sm:p-6 lg:p-10">
            <div className="grid lg:grid-cols-[30%_70%] gap-6 lg:gap-8 items-center">
              {/* Left - Profile Image with Hanging Ribbon Effect */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Fixed Hook at Top */}
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                      className="w-8 h-5 relative"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-b from-gray-300 to-gray-500 shadow-md" />
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-gradient-to-b from-gray-400 to-gray-600" />
                    </motion.div>
                  </div>

                  {/* Swinging Ribbon + Image Container */}
                  <div className="swing-animation">
                    {/* Decorative Ribbon */}
                    <div className="flex justify-center -mb-1 relative z-10">
                      <motion.svg
                        initial={{ opacity: 0, scaleY: 0 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        width="20"
                        height="60"
                        viewBox="0 0 20 60"
                        className="drop-shadow-lg"
                        style={{ transformOrigin: "top center" }}
                      >
                        <defs>
                          <linearGradient
                            id="ribbonGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#a78bfa" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M6,0 Q2,15 8,30 Q14,45 6,60"
                          fill="none"
                          stroke="url(#ribbonGrad)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14,0 Q18,15 12,30 Q6,45 14,60"
                          fill="none"
                          stroke="url(#ribbonGrad)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                        <circle
                          cx="10"
                          cy="58"
                          r="3"
                          fill="url(#ribbonGrad)"
                          opacity="0.8"
                        />
                      </motion.svg>
                    </div>

                    {/* Profile Image with Hole */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                      className="relative mt-0 w-40 h-52 sm:w-52 sm:h-64 rounded-2xl overflow-visible shadow-2xl"
                    >
                      {/* Hole/Punch at top of photo */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <div
                          className="w-7 h-7 rounded-full bg-[#0a0a1a] border-[3px] border-gradient-to-b from-violet-400 to-violet-600 shadow-inner flex items-center justify-center"
                          style={{ borderColor: "#8b5cf6" }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a1a]" />
                        </div>
                      </div>

                      {/* Photo */}
                      <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-inner">
                        <img
                          src="/images/about/about.jpg"
                          alt="Tấn Sanh"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Subtle glow behind photo */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/20 to-secondary/10 -z-10 blur-xl" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div>
                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-400 italic text-base mb-4 border-l-2 border-primary pl-4"
                >
                  {t("about.subtitle")}
                </motion.p>

                {/* Bio Paragraphs */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-400 text-sm leading-relaxed mb-3"
                >
                  {t("about.bio1")}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-gray-400 text-sm leading-relaxed mb-6"
                >
                  {t("about.bio2")}
                </motion.p>

                {/* Stats with Counter Animation */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="text-center lg:text-left"
                    >
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1">
                        <Counter
                          target={stat.numValue}
                          suffix={stat.suffix}
                          duration={2}
                        />
                      </div>
                      <div className="text-gray-500 text-[8px] sm:text-[10px] uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
