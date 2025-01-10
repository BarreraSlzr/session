export interface Project {
  name: string;
  description: string;
  skillsUsed: number[];
}

export interface JobExperience {
  title: string;
  razonSocial: string;
  description: string;
  startDate: string;
  endDate: string;
  projects: Project[];
}

export interface Skill {
  id: number
  name: string;
  popularity: number;
}

export interface URL {
  title: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  fullname: string;
  bio: string;
  email: string;
  phone: string;
  timezone: string;
  isOnline: boolean
  urls: URL[];
  height: string;
  sex: string;
  nationality: string;
  location: string;
  localTime: string;
  availability: string
}

export interface CVData {
  professionalPosition: string;
  jobExperiences: JobExperience[];
  skills: Skill[];
  contactInfo: ContactInfo;
}