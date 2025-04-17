export interface Link {
  label: string;
  url: string;
  isEditing: boolean;
}

/* Mocking */   
export interface MockUser {
  username: string;
  title?: string; // Optional title for their page
  links: Link[];
}
