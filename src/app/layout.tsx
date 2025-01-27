import './globals.css';

import {JSX, ReactNode} from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
    children: ReactNode;
}

export const metadata = {
    title: 'Perspetrix',
    description: 'Interactive data visualization and mapping platform',
    icons: {
        icon: '/favicon.ico',
    },
};

const RootLayout: ({children}: { children: any }) => JSX.Element = ({ children }) => {
    return (
        <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        {children}
        <Footer />
        </body>
        </html>
    );
};

export default RootLayout;
