export interface Project {
  id: string;
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  image: string;
  technologies: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 'ecommerce',
    title: {
      en: 'E-Commerce Platform',
      vi: 'Nền Tảng Thương Mại Điện Tử',
    },
    description: {
      en: 'Full-stack e-commerce solution with modern UI/UX',
      vi: 'Giải pháp thương mại điện tử full-stack với UI/UX hiện đại',
    },
    image: '/images/projects/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
  },
  {
    id: 'taskmanagement',
    title: {
      en: 'Task Management App',
      vi: 'Ứng Dụng Quản Lý Công Việc',
    },
    description: {
      en: 'Collaborative task management application',
      vi: 'Ứng dụng quản lý công việc cộng tác',
    },
    image: '/images/projects/taskmanagement.jpg',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    link: '#',
  },
  {
    id: 'cryptodashboard',
    title: {
      en: 'Crypto Dashboard',
      vi: 'Bảng Điều Khiển Tiền Điện Tử',
    },
    description: {
      en: 'Real-time cryptocurrency tracking dashboard',
      vi: 'Bảng điều khiển theo dõi tiền điện tử thời gian thực',
    },
    image: '/images/projects/crypto.jpg',
    technologies: ['React', 'TypeScript', 'Chart.js', 'WebSocket'],
    link: '#',
  },
  {
    id: 'chatapp',
    title: {
      en: 'Real-time Chat App',
      vi: 'Ứng Dụng Chat Thời Gian Thực',
    },
    description: {
      en: 'Messaging platform with private chats and group channels',
      vi: 'Nền tảng nhắn tin với chat riêng tư và kênh nhóm',
    },
    image: '/images/projects/chatapp.jpg',
    technologies: ['Node.js', 'Socket.io', 'Express', 'Redis'],
    link: '#',
  },
  {
    id: 'blogcms',
    title: {
      en: 'Blog CMS',
      vi: 'Hệ Quản Trị Blog',
    },
    description: {
      en: 'Content management system with rich text editor',
      vi: 'Hệ thống quản lý nội dung với trình soạn thảo phong phú',
    },
    image: '/images/projects/blogcms.jpg',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'S3'],
    link: '#',
  },
  {
    id: 'inventory',
    title: {
      en: 'Inventory Management',
      vi: 'Quản Lý Kho Hàng',
    },
    description: {
      en: 'Warehouse inventory tracking with barcode scanning',
      vi: 'Theo dõi kho hàng với quét mã vạch',
    },
    image: '/images/projects/inventory.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker'],
    link: '#',
  },
];
