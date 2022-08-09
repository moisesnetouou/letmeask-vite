import { ReactNode } from 'react';

import { AuthProvider } from './Auth';

export function AppProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}