export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  email: string;
  experienceYears?: number;
  isHod?: boolean;
}

export interface DepartmentLocation {
  buildingName: string;
  floors: string;
  wing: string;
  roomNumbers: string;
  landmark: string;
  mapPinX: number;
  mapPinY: number;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  headOfDept: string;
  established: number;
  intake: number;
  accreditation: string;
  vision: string;
  mission: string[];
  achievements: string[];
  futureGoals: string[];
  uniqueFeatures?: string[];
  whatStudentsWillAchieve?: string[];
  hodDetails?: {
    name: string;
    designation: string;
    qualification: string;
    officeLocation: string;
    phone: string;
    email: string;
    message: string;
  };
  highlights: string[];
  labs: string[];
  careers: string[];
  topRecruiters: string[];
  techStack: string[];
  blueprintType: 'network' | 'circuit' | 'grid' | 'mechanical' | 'structure' | 'system';
  stats: {
    patents: number;
    placements: string;
    publications: number;
    alumniNetwork: string;
  };
  location: DepartmentLocation;
  faculties: FacultyMember[];
}

export interface Achievement {
  id: string;
  year: number;
  era: string;
  title: string;
  description: string;
  category: 'Foundation' | 'Innovation' | 'Accreditation' | 'Global Honor' | 'Robotics' | 'Placements';
  accent: string;
  emoji: string;
  image: string;
  verifier: string;
  impactMetric: string;
  keyDignitaries?: string;
}

export type Memory = Achievement;

export interface CampusBuilding {
  id: string;
  name: string;
  label: string;
  sqft: string;
  floors: number;
  description: string;
  facilities: string[];
  timings: string;
  highlight: string;
  pinX: number;
  pinY: number;
  color: string;
}

export interface NoticeEvent {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  category: 'event' | 'news' | 'placement' | 'circular';
  description: string;
  fullDetails: string;
  badge?: string;
  linkText?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  batch: string;
  message: string;
  timestamp: string;
  branch: string;
}
