export interface Link {
  label: string;
  url: string;
  isEditing: boolean;
  emoji?: string;
}

export interface MockUser {
  username: string;
  title?: string;
  links: Link[];
} 