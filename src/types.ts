export interface ServiceDetail {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  iconName: string; // Used to look up Lucide icons
  features: string[];
  techStack: string[];
  accentColor: string;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  service: string;
  notes: string;
}

export interface WorkProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  rating: number;
  content: string;
}
