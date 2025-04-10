import { QueryProvider } from '../components/QueryProvider';
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return <html><body><QueryProvider>{children}</QueryProvider></body></html>;
}
