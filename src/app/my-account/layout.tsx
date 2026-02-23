import type { Metadata } from 'next';

import AccountNav from '@/components/account/AccountNav';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'My Account | Lomash Wood',
  description: 'Manage your Lomash Wood account, orders, appointments, and saved designs.',
  robots: 'noindex, nofollow',
};

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({ children }: AccountLayoutProps) {

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
            <p className="text-slate-600 mt-1">
              Manage your orders, appointments, and account settings
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <AccountNav />
              </Card>
            </aside>

            {/* Page Content */}
            <main className="lg:col-span-3">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}