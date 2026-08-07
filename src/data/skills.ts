export interface SkillItem {
  name: string;
  icon: string;
  label: string;
  labelVi: string;
}

export const skills: SkillItem[] = [
  // Frontend
  {
    name: "React",
    icon: "react",
    label: "Frontend Lib",
    labelVi: "Thư viện FE",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    label: "Web Framework",
    labelVi: "Web Framework",
  },
  {
    name: "Tailwind",
    icon: "tailwind",
    label: "CSS Framework",
    labelVi: "CSS Framework",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    label: "Language",
    labelVi: "Ngôn ngữ",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    label: "Type Safe",
    labelVi: "Type Safe",
  },
  { name: "HTML", icon: "html", label: "Markup", labelVi: "Markup" },
  { name: "CSS", icon: "css", label: "Styling", labelVi: "Styling" },

  // Backend & Database
  { name: "Node.js", icon: "nodejs", label: "Runtime", labelVi: "Runtime" },
  {
    name: "Express.js",
    icon: "express",
    label: "Backend Framework",
    labelVi: "Backend Framework",
  },
  {
    name: "NestJS",
    icon: "nestjs",
    label: "Backend Framework",
    labelVi: "Backend Framework",
  },
  { name: "Java", icon: "java", label: "Language", labelVi: "Ngôn ngữ" },
  { name: "Python", icon: "python", label: "Language", labelVi: "Ngôn ngữ" },
  {
    name: "MongoDB",
    icon: "mongodb",
    label: "NoSQL Database",
    labelVi: "Cơ sở dữ liệu",
  },

  // DevOps & Tools
  {
    name: "Git",
    icon: "git",
    label: "Version Control",
    labelVi: "Quản lý phiên bản",
  },
  {
    name: "GitHub",
    icon: "github",
    label: "Code Hosting",
    labelVi: "Lưu trữ code",
  },
  { name: "Docker", icon: "docker", label: "Container", labelVi: "Container" },
  { name: "Nginx", icon: "nginx", label: "Web Server", labelVi: "Web Server" },
  { name: "Redis", icon: "redis", label: "Cache", labelVi: "Bộ nhớ đệm" },
  {
    name: "RabbitMQ",
    icon: "rabbitmq",
    label: "Message Broker",
    labelVi: "Tin nhắn",
  },
  {
    name: "Postman",
    icon: "postman",
    label: "API Testing",
    labelVi: "Kiểm tra API",
  },
  {
    name: "Linux",
    icon: "linux",
    label: "Operating System",
    labelVi: "Hệ điều hành",
  },

  // Database
  {
    name: "PostgreSQL",
    icon: "postgresql",
    label: "SQL Database",
    labelVi: "Cơ sở dữ liệu SQL",
  },
  {
    name: "MySQL",
    icon: "mysql",
    label: "SQL Database",
    labelVi: "Cơ sở dữ liệu SQL",
  },

  // Design
  {
    name: "Figma",
    icon: "figma",
    label: "UI/UX Design",
    labelVi: "Thiết kế UI/UX",
  },
];

export const getSkillIconUrl = (icon: string) =>
  `https://skillicons.dev/icons?i=${icon}`;
