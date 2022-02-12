export type User = {
  id: string;
  name: string;
  avatar: string;
  email_user?: string;
  accessToken?: string;
};

export type AuthContextType = {
  user: User | undefined;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  createAccountEmailWithPassword: any;
  signInEmailWithPassword: any;
};
