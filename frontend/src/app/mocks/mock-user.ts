import { MockUser } from '../../../../libs/shared';

export const MOCK_USER: MockUser = {
    username: 'dashingfox39',
    title: '',  // Empty by default, will show username if not set
    links: [
      { label: 'My Website', url: 'https://example.com', isEditing: false },
      { label: 'GitHub', url: 'https://github.com/myprofile', isEditing: false }
    ]
  };