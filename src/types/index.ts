export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  tags: string[];
  link?: string;
  github_url?: string;
  screenshot_url?: string;
  status: "Live" | "Beta" | "In Progress" | "Archived";
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}
