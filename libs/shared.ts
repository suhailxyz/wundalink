export interface Link {
  label: string;
  url: string;
  isEditing: boolean;
}

/* Mocking */   
export interface MockUser {
  username: string;
  links: Link[];
}
