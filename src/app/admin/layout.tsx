import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // This layout wraps all admin pages.
  // The login page itself should NOT check for session
  // We'll handle that in individual pages that need protection
  
  return <>{children}</>;
}
