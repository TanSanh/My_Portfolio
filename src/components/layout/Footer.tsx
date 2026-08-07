import { useTranslation } from "react-i18next";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-dark-300 border-t border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
