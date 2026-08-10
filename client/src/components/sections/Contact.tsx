import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Send,
  MapPin,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { contactService } from "../../services/contactService";

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const socialLinks = [
    {
      iconUrl: "https://skillicons.dev/icons?i=github",
      href: "https://github.com/TanSanh",
      label: "GitHub",
      color: "#fff",
    },
    {
      iconUrl: "https://skillicons.dev/icons?i=linkedin",
      href: "https://www.linkedin.com/in/t%E1%BA%A5n-sanh-0a1479322/",
      label: "LinkedIn",
      color: "#0A66C2",
    },
    {
      iconUrl: "https://simpleicons.org/icons/facebook.svg",
      href: "https://www.facebook.com/share/195xNBvtdP/?mibextid=wwXIfr",
      label: "Facebook",
      color: "#1877F2",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactService.submit(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-1">
            {t("contact.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {t("contact.titleHighlight")}
            </span>
          </h2>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-secondary/20 to-primary/40"
        >
          <div className="bg-[#0a0a1a] rounded-2xl p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left - Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-xl font-bold text-white mb-2"
                  >
                    {t("contact.subtitle")}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-gray-400 mb-5 text-sm leading-relaxed"
                  >
                    {t("contact.description")}
                  </motion.p>
                </div>

                {/* Contact Details */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="space-y-3 mb-5"
                >
                  <a
                    href="mailto:hotansanh0304@gmail.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">hotansanh0304@gmail.com</span>
                  </a>
                  <a
                    href="tel:0779518027"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">0779 518 027</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">Vietnam</span>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-3">
                    {t("contact.followMe")}
                  </p>
                  <div className="flex gap-2.5">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 rounded-xl bg-dark-200 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = link.color + "60";
                          e.currentTarget.style.color = link.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "";
                          e.currentTarget.style.color = "";
                        }}
                        aria-label={link.label}
                      >
                        <img src={link.iconUrl} className="w-5 h-5" alt={link.label} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-dark-200/30 backdrop-blur-sm rounded-xl border border-white/5 p-5 space-y-4"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all duration-300"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all duration-300"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all duration-300 resize-none"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        <>
                          {t("contact.form.send")}
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
                      initial={{ x: "100%" }}
                      animate={{ x: isHovered ? "0%" : "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-green-400 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {t("contact.form.success")}
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm"
                    >
                      {t("contact.form.error")}
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
