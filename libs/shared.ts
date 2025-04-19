export interface Link {
  label: string;
  url: string;
  isEditing: boolean;
  emoji?: string; // Optional emoji for the link
}

/* Mocking */   
export interface MockUser {
  username: string;
  title?: string; // Optional title for their page
  links: Link[];
}
