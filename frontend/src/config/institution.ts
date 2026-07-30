export interface InstitutionConfig {
  name: string;
  logoUrl?: string;
  portalTitle: string;
  academicYear: string;
  supportEmail: string;
}

export const INSTITUTION_CONFIG: InstitutionConfig = {
  name: import.meta.env.VITE_COLLEGE_NAME || 'National Institute of Technology',
  logoUrl: import.meta.env.VITE_COLLEGE_LOGO_URL || '',
  portalTitle: 'CampusHub Student Portal',
  academicYear: '2026–27',
  supportEmail: 'support@campushub.edu',
};
