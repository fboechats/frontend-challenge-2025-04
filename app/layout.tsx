import { ReactNode } from 'react';
import { QueryProvider } from '../components/QueryProvider';
import "../styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html><body><QueryProvider>{children}</QueryProvider></body></html>;
}
