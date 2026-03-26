import { ReactNode } from 'react';

// This layout replaces the root layout for all /admin/* routes,
// stripping out the site Header, Footer, MobileBottomBar, and CartDrawer.
export default function AdminLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
