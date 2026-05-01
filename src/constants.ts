import { BookOpen, Calendar, GraduationCap, Briefcase, BarChart3, SearchCode, FileText, TrendingUp, LucideIcon } from 'lucide-react';

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
    path: 'https://notebooklm.google.com/notebook/894957c8-bd51-4383-b31f-dde6148000fe',
    color: 'border-blue-500 text-blue-500'
  },
  {
    id: 'lesson-plan',
    title: 'Lesson Plan Gem',
    tagline: 'Faculty Productivity Tool',
    description: 'Generate structured weekly lesson plans based on your subject, syllabus, and timeframe.',
    icon: Calendar,
    path: 'https://gemini.google.com/gem/1lhZhE_aB4zbcLr9SJNcPvPpTenRuoGqb?usp=sharing',
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
    path: 'https://gemini.google.com/gem/1CuUvoTB1DP1GDYzHGiYOgPqeK4H6ozJn?usp=sharing',
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
  },
  {
    id: 'documents',
    title: 'Documents Generation',
    tagline: 'Official Documents Creator',
    description: 'Quickly generate certificates, letters, memos and other official university documents.',
    icon: FileText,
    path: 'https://gemini.google.com/gem/1fIGbqyf1VRUCcYUwVmiAuTlFi1PkVuDd?usp=sharing',
    color: 'border-teal-500 text-teal-500'
  },
  {
    id: 'forecast',
    title: 'Semester Outcome Forecast',
    tagline: 'Performance Predictor',
    description: 'Predict semester outcomes and get insights into academic performance trends.',
    icon: TrendingUp,
    path: 'https://gemini.google.com/gem/1WZASzHwkeuU1QE2iJyHMvGOabDlLEJJN?usp=sharing',
    color: 'border-amber-500 text-amber-500'
  }
];
