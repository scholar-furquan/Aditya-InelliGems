import { BookOpen, Calendar, GraduationCap, Briefcase, BarChart3, SearchCode, LucideIcon } from 'lucide-react';

export interface GemMetadata {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

export const GEMS: GemMetadata[] = [
  {
    id: 'regulations',
    title: 'University Regulations',
    tagline: 'Policy & Rules Assistant',
    description: 'Get instant answers about university rules, exam policies, and academic regulations.',
    icon: BookOpen,
    path: '/gems/regulations',
    color: 'border-blue-500 text-blue-500'
  },
  {
    id: 'lesson-plan',
    title: 'Lesson Plan Gem',
    tagline: 'Faculty Productivity Tool',
    description: 'Generate structured weekly lesson plans based on your subject, syllabus, and timeframe.',
    icon: Calendar,
    path: '/gems/lesson-plan',
    color: 'border-orange-500 text-orange-500'
  },
  {
    id: 'academics',
    title: 'Academics Gem',
    tagline: 'Study & Exam Assistant',
    description: 'Generate comprehensive notes, question banks, and tailored exam preparation strategies.',
    icon: GraduationCap,
    path: '/gems/academics',
    color: 'border-indigo-500 text-indigo-500'
  },
  {
    id: 'placements',
    title: 'Placements Gem',
    tagline: 'Career Accelerator',
    description: 'Build your resume, practice interview questions, and prepare for aptitude tests.',
    icon: Briefcase,
    path: '/gems/placements',
    color: 'border-emerald-500 text-emerald-500'
  },
  {
    id: 'reports',
    title: 'Reports Gem',
    tagline: 'Academic Insights',
    description: 'Analyze student performance, attendance data, and generate downloadable summaries.',
    icon: BarChart3,
    path: '/gems/reports',
    color: 'border-purple-500 text-purple-500'
  },
  {
    id: 'plagiarism',
    title: 'Project Plagiarism',
    tagline: 'Academic Integrity Tool',
    description: 'Analyze project documents for similarity and ensure original content for submissions.',
    icon: SearchCode,
    path: '/gems/plagiarism',
    color: 'border-rose-500 text-rose-500'
  }
];
