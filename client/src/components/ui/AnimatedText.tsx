import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  children?: ReactNode;
}

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.06,
    },
  }),
};

const charVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: i * 0.03,
    },
  }),
};

export const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  once = true,
  children,
}: AnimatedTextProps) => {
  if (children) {
    return (
      <span className={`inline-flex overflow-hidden pb-[0.15em] ${className}`}>
        <motion.span
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once }}
          transition={{
            duration: 0.6,
            ease: [0.33, 1, 0.68, 1],
            delay,
          }}
        >
          {children}
        </motion.span>
      </span>
    );
  }

  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => {
        const charStartIndex = words
          .slice(0, wordIndex)
          .join(" ")
          .length + (wordIndex > 0 ? 1 : 0);

        return (
          <span key={wordIndex} className="inline-flex overflow-hidden pb-[0.15em] mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                custom={charStartIndex + charIndex}
                variants={charVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </span>
  );
};
