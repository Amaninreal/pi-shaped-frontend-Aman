export interface ProfileCardProps {
  name: string;
  age: number;
  email: string;
  avatarUrl: string;       // new: avatar
  badges?: string[];       // new: badges/skills
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
  children?: React.ReactNode;
}
