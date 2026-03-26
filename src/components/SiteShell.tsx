'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import MobileBottomBar from './MobileBottomBar';
import { ReactNode } from 'react';

export default function SiteShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <CartDrawer />
            <main className="flex-grow pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomBar />
        </>
    );
}
