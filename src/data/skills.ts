import { FileCode2, Palette, Code2, Atom, Server, Wind, GitBranch } from 'lucide-react';

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  icon: typeof FileCode2;
  color: string;
}

export const skills: Skill[] = [
  {
    id: 'html',
    name: 'HTML',
    percentage: 95,
    icon: FileCode2,
    color: '#E34F26',
  },
  {
    id: 'css',
    name: 'CSS',
    percentage: 90,
    icon: Palette,
    color: '#1572B6',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    percentage: 90,
    icon: Code2,
    color: '#F7DF1E',
  },
  {
    id: 'react',
    name: 'React.js',
    percentage: 85,
    icon: Atom,
    color: '#61DAFB',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    percentage: 80,
    icon: Server,
    color: '#000000',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    percentage: 85,
    icon: FileCode2,
    color: '#3178C6',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    percentage: 90,
    icon: Wind,
    color: '#06B6D4',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    percentage: 80,
    icon: Server,
    color: '#339933',
  },
  {
    id: 'git',
    name: 'Git',
    percentage: 85,
    icon: GitBranch,
    color: '#F05032',
  },
];
