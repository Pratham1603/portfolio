
type BlogExperienceEnum = "experience";
type BlogProjectEnum = "project";
type BlogThoughtEnum = "thought";
type BlogOpinionEnum = "opinion";
type BlogTutorialEnum = "tutorial";
type BlogCheatsheetEnum = "cheatsheet";
type BlogResourceEnum = "resource";
type BlogOtherEnum = "other";

type BlogTypeEnum = BlogExperienceEnum | BlogProjectEnum | BlogThoughtEnum | BlogOpinionEnum |
  BlogTutorialEnum | BlogCheatsheetEnum | BlogResourceEnum | BlogOtherEnum;

type Blog = {
  title: string;
  description: string;
  highlight?: string;
  date: string;
  image?: string;
  cardImage?: string;
  content: string;
  type: BlogTypeEnum;
  link?: string;
  label?: string;
  canonical?: string;
  slug: string;
  hidden?: boolean;
  tags?: string[];
  summary?: string;
}

export type {
  Blog
}
