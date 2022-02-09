export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type AuthContextType = {
  user: User | undefined;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};
