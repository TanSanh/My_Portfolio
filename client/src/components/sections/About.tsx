import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: t("about.stats.experience.value"),
      label: t("about.stats.experience.label"),
    },
    {
      value: t("about.stats.projects.value"),
      label: t("about.stats.projects.label"),
    },
    {
      value: t("about.stats.clients.value"),
      label: t("about.stats.clients.label"),
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-16 h-screen flex flex-col justify-center"
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
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 -mt-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            {t("about.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t("about.titleHighlight")}
            </span>
          </h2>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl p-[1px] bg-gradient-to-r from-primary via-secondary to-primary"
        >
          <div className="bg-[#0a0a1a] rounded-3xl p-6 lg:p-10">
            <div className="grid lg:grid-cols-[30%_70%] gap-8 items-center">
              {/* Left - Profile Image with Hanging Ribbon Effect */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Fixed Hook at Top */}
                  <div className="flex justify-center">
                    <div className="w-8 h-5 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-b from-gray-300 to-gray-500 shadow-md" />
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-gradient-to-b from-gray-400 to-gray-600" />
                    </div>
                  </div>

                  {/* Swinging Ribbon + Image Container */}
                  <div className="swing-animation">
                    {/* Decorative Ribbon */}
                    <div className="flex justify-center -mb-1 relative z-10">
                      <svg
                        width="20"
                        height="60"
                        viewBox="0 0 20 60"
                        className="drop-shadow-lg"
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
                      </svg>
                    </div>

                    {/* Profile Image with Hole */}
                    <div className="relative mt-0 w-52 h-64 rounded-2xl overflow-visible shadow-2xl">
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div>
                {/* Subtitle */}
                <p className="text-gray-400 italic text-base mb-4 border-l-2 border-primary pl-4">
                  {t("about.subtitle")}
                </p>

                {/* Bio Paragraphs */}
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {t("about.bio1")}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {t("about.bio2")}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-center lg:text-left"
                    >
                      <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-gray-500 text-[10px] uppercase tracking-wider">
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
