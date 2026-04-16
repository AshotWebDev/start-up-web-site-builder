import { AuthProvider } from '../contexts/AuthContext';
import EmailVerificationBanner from '../components/EmailVerificationBanner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>
          <EmailVerificationBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}