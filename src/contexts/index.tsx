import { ReactNode } from 'react';

import { AuthProvider } from './Auth';

export default function AppProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
