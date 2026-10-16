import {JSX} from "react";

type Experience = {
  date: string;
  title: string;
  description: string;
  role: string;
  companyName: string;
  website?: string;
  proofLink?: string;
  image?: string;
  points: string[];
  techStack: string[];
  fullLogo?: string;
  logo?: string;
};

type RouteLink = {
  name: string;
  path: string;
  icon: JSX.Element;
}

type Tool = {
  title: string;
  tag: string;
  image: string;
  link: string;
}

type CommonButtonProps = {
  className?: string;
  variant?: 'primary' | 'secondary'
}

export type {
  Experience, RouteLink, Tool, CommonButtonProps
}
